# Mock Server & HTML2Canvas
是否需要选用 express，koa，egg.js 等等成熟的框架？

好用的 Mock Server 需要有的特点

* 快速搭建
* 支持标准 Restful 操作和路由规则
  * /templates - 拿全部数据
  * /templates/${id} - 拿一条数据
* 一些进阶扩展 - 自定义路由，中间件等等

## 隆重推出 JSON Server

>https://github.com/typicode/json-server#access-control-example

安装
```bash
npm install --save-dev json-server
```

启动

```bash
npx json-server --watch db.json
```
## HTML2Canvas 截图的原理


>目的：一个 canvas 元素，上面有绘制有一系列的 HTML 节点
局限：Canvas 中没法添加具体的 HTML 节点，它只是一张画布

通过 canvas.getContext(“2d”) 可以拿到 canvas 提供的2D 渲染上下文，然后在里面绘制形状，文本，图像和其他对象。
文档地址：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D

* 矩形 - fillRect()
* 文本 - fillText()
* 图像 - drawImage()
  
## SVG 来拯救我们
可缩放矢量图形（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形，基于 XML 的标记语言。
SVG 中有一个神奇的元素称之为 foreignObject

文档地址 https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/foreignObject

foreignObject 元素允许包含来自不同的XML命名空间的元素。在浏览器的上下文中，很可能是XHTML / HTML

## 解题思路

* 创建一个 canvas 元素
* 创建 svg 文件，使用 Blob 构造函数
* 将 svg 中的值填充 foreignObject，然后填充想要复制节点的 HTML
* 创建 image 标签，将 image.src = URL.createObjectURL(svg)
* 在 image 完成读取以后，调用 canvas 的 drawImage 方法，将图片绘制到画布上。

## Clipboard.js 基本原理
>Clipboard.js 的使用
文档地址：https://clipboardjs.com/


看起来很简单的问题，但是由于不同浏览器之间存在不同的 API 实现和各种 hack，所以它的实现很混乱

* 方法一 最现代的 Clipboard API
文档地址：https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API
还在 working draft 阶段，浏览器兼容性有待加强。
* 方案二 document.execCommand() 方法
文档地址：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand
它不仅仅是解决复制的场景，而且是给可编辑区域的提供一系列功能

### document.execCommand(‘copy’) 解决思路分析

* 手动创建可编辑元素，比如 textArea，然后将要拷贝的值设置为它的 value
* 将它插入到页面中，调用textArea 上的方法，对值进行选中
* 然后再调用 document.execCommand(‘copy’)
* 特别注意 textArea 要不可见，使用特殊的样式让它不出现在可见区域
* 最后要将 textArea 节点删除

## 下载文件的原理
>A 链接：可以创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。

### A 链接的一个特殊属性：download

* 文档地址：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a
* 此属性指示浏览器下载 URL 而不是导航到它，因此将提示用户将其保存为本地文件
### A 链接的另外一个特殊属性：rel

* 该属性指定了目标对象到链接对象的关系。
* noopener 一个重要的属性，对于web 安全来说非常关键。
* 当你使用 target=’_blank’ 打开一个新的标签页时，新页面的 window 对象上有一个属性 opener，它指向的是前一个页面的 window 对象，因此，后一个页面就获得了前一个页面的控制权

### 我们模拟这个过程来完成下载。

* 创建 A 链接
* 设置 href 以及 download 属性
* 触发 A 链接的点击事件
* download 属性仅适用于同源 URL

```js
export const downloadFile = (src: string, fileName = 'default.png') => {
  // 创建链接
  const link = document.createElement('a')
  link.download = fileName
  link.rel = 'noopener'
  if (link.origin !== location.origin) {
    //https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType
    axios.get(src, { responseType: 'blob'}).then(data => {
      link.href = URL.createObjectURL(data.data)
      setTimeout(() => { link.dispatchEvent(new MouseEvent('click')) })
      // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL
      setTimeout(() => { URL.revokeObjectURL(link.href)}, 10000 )
    }).catch((e) => {
      console.error(e)
      link.target='_blank'
      link.href= src
      link.dispatchEvent(new MouseEvent('click'))
    })
  } else {
  // 设置链接属性
  link.href= src
  // 触发事件
  link.dispatchEvent(new MouseEvent('click'))
  }
}
```
 
## 使用 FileSaver.js 完成下载

>文档地址：https://github.com/eligrey/FileSaver.js/

借助 HTTP 特殊的响应头，实现浏览器自动下载
文档地址：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Disposition

Content-Disposition 最佳的下载方式，需要服务器端的支持，并且不需要任何的 Javascript，需要在 HTTP 头部添加
