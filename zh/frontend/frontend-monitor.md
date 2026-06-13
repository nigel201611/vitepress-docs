# 前端监控
## 前端监控应用场景
### 为什么需要前端监控？
* 页面的访问行为，PV、UV、IP、PV点击率、UV点击率、停留时长
* 用户的操作行为，模块曝光、模块点击、滑动、表单操作
* 页面的性能，首屏渲染时间、API请求时间
* 异常的监控，JS Error、API异常、业务异常
### 常见的应用场景
* 流量分析
* 行为分析
* 性能监控
* 异常监控
## 常见的前端监控平台有哪些？
### 百度统计
* 流量统计和分析免费
* 行为分析需要覆盖
### 阿里云ARMS
* 流量分析、性能监控、异常监控
### 友盟
* 流量分析
* 行为分析
## 为什么要选择自建前端监控平台？
* 如果你的需求主要是流量分析，建议直接使用百度统计或阿里云ARMS
* 如果你的需求不仅仅需要做流量分析，还要做行为分析，那么可以考虑自建
  * 自建成本较高（人力成本），优势是数据掌握自己手里
  * 现成成本也有一定成本（向平台付费），数据是获取不到
* 希望数据能够储备在自己的数据库里，希望扩展更多的分析维度和能力时，需要自建

## 前端监控平台架构设计

## 架构设计

前端监控平台的分层

* 前端监控JSSDK
  * 采集
  * 上报
    * 默认上报：页面PV、性能
    * 手动上报：页面操作行为
* 前端监控API和大数据仓库
* 接收上报的数据
* 数据仓库：MaxCompute
  * 数据存储
  * 数据查询
* 前端监控数据可视化
  * 日志大数据清洗
  * 大数据回流RDS（非结构化数据=>结构化数据）
  * 对结构化进行运算生成图表

## 架构图

<img src="/images/monitor.jpg">

## 浏览器的5种 Observer

### 浏览器的5种 Observer
* MutationObserver
* IntersectionObserver
* PerformanceObserver
* ResizeObserver
* ReportingObserver

### MutationObserver

>MutationObserver: 监听 DOM 树的变化（属性、子节点的增删改）

### 语法
const observer = new MutationObserver(callback);
### demo 案例
```html
<div class="MutationObserverDOM">11</div>
<button class="addChildDOM" onclick="handleAddDom()">添加元素</button>
<button class="addAttribute" onclick="handleAttribute()">添加属性</button>
```
```js
const addAttributr = document.querySelector('.addAttribute')
const addChildDOM = document.querySelector('.addChildDOM')
const MtovDom = document.querySelector('.MutationObserverDOM')
const mutationObserver = new MutationObserver((mutationsList) => {
  console.log(mutationsList,'MutationObserver')
});
mutationObserver.observe(MtovDom,{
  attributes: true,
  childList: true,
  subtree: true
})
// 添加元素
function handleAddDom(){
  append(MtovDom, 'p', 'childClass', '子元素内容')
}
function append(parentElement,childElement,childClass,childElementContent){
  const child = document.createElement(childElement)
  child.className = childClass
  child.innerHTML = childElementContent ? childElementContent : '默认内容'
  parentElement.appendChild(child)
}
function handleAttribute(){
  MtovDom.setAttribute('data','addName')
}
```
方法
* observe: 监听指定的元素节点变化。
语法: mutationObserver.observe(target[, options])
* disconnect: 停止监听，直到重新调用observe方法
语法: mutationObserver.disconnect()

config 配置项
* childList: 子节点的新增和删除
* attributes: 属性的变化
* characterData: 节点内容或节点文本的变化
* subtree: 是否将该观察作用于该节点的所有后代节点
* attributeOldValue: 是否需要记录变动前的属性值
* attributeFilter: 需要观察的特定属性
* characterDataOldValue: 观察attributes变动时，是否需要记录变动前的属性值
  
返回参数
* type: 如果是属性发生变化,则返回attributes，如果是目标节点的某个子节点发生了变化,则返回childList.
* target: 返回此次变化影响到的节点即观察的 DOM
* addedNodes: 返回被添加的节点
* removedNodes: 返回被删除的节点
* previousSibling: 返回被添加或被删除的节点的前一个兄弟节点
* nextSibling: 返回被添加或被删除的节点的后一个兄弟节点
* oldValue: 跟据type值的不同,返回的值也会不同.如果type为attributes,则返回该属性变化之前的属性值.如果type为* characterData,则返回该节点变化之前的文本数据.如果type为childList,则返回null
  
### IntersectionObserver

>IntersectionObserver: 监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调

语法
const observer = new IntersectionObserver(callback, options);

demo 案例
```html
.demo1,.demo2{
  width: 120px;
  height: 120px;
  border: 1px solid #000;
  position: relative;
  text-align: center;
  line-height: 120px;
}
.demo1 {
top: 300px;
}
.demo2 {
  top: 900px;
}
<div class="demo1">demo1</div>
<div class="demo2">demo2</div>
```
```js
const intersectionObserver = new IntersectionObserver(
  function (entries) {
      console.log(entries);
  }, {
  threshold: [0.5, 1]
});
intersectionObserver.observe( document.querySelector('.demo1'));
intersectionObserver.observe( document.querySelector('.demo2'));
```
方法
* observe: 开始监听一个目标元素
语法: intersectionObserver.disconnect();
* disconnect: 停止监听
语法: IntersectionObserver.observe(targetElement);
* takeRecords: 返回所有观察目标的 IntersectionObserverEntry 对象数组。
语法: intersectionObserverEntries = intersectionObserver.takeRecords();
* unobserve: 使 IntersectionObserver 停止监听特定目标元素。
语法: IntersectionObserver.unobserve(targetElement);

配置项
* targetElement: 目标 DOM
* root: 指定根目录，也就是当目标元素显示在这个元素中时会触发监控回调
* rootMargin: 类似于css的margin，设定root元素的边框区域。
* threshold: 阙值.决定了什么时候触发回调函数
  
返回参数

* time: 可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
* rootBounds: 是在根元素矩形区域的信息
* intersectionRatio: 目标元素的可见比例
* intersectionRect: 目标元素与根元素交叉区域的信息
* isIntersecting: 判断元素是否符合options中的可见条件
* boundingClientRect: 目标元素的矩形区域的信息
* target: 被观察的目标元素
可以参考阮一峰老师的教程：https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

### PerformanceObserver

>PerformanceObserver: 用于监测性能度量事件，在浏览器的性能时间轴记录下一个新的 performance entries 的时候将会被通知。

语法

const observer = new PerformanceObserver(callback);

demo 案例
```html
<button onclick="clicked()">Measure</button>
var observer2 = new PerformanceObserver((list)=>{
  console.log(list.getEntries(), 'PerformanceObserver')
});
observer2.observe({entryTypes: ["measure"]});
function clicked() {
    performance.measure('点击事件');
}
```
方法

* disconnect: 阻止性能观察者接收任何 PerformanceEntry 事件。
语法: performanceObserver.disconnect();
* observe: 用于观察传入的参数中指定的 PerformanceEntry 类型的集合
语法: observer.observe(options);
* takeRecords: 返回当前存储在性能观察器中的 PerformanceEntry 列表，将其清空。
语法: var PerformanceEntry[] = performanceObserver.takeRecords();
* getEntries: 返回一个列表，该列表包含一些用于承载各种性能数据的对象,
  
配置项

* entryTypes: 声明需要观察哪几类性能数据 (mark（时间点）、measure（时间段）、resource（资源加载耗时)
* buffered: 声明回调函数是立即同步执行还是异步执行


### ResizeObserver

>ResizeObserver: 接口可以监听到 DOM 的变化（节点的出现和隐藏，节点大小的变化）
语法
var ResizeObserver = new ResizeObserver(callback)

demo 案例
```html
  <div class="ResizeObserver">ResizeObserver</div>
const MtovDom = document.querySelector('.ResizeObserver')
const myObserver = new ResizeObserver(entries => {
    console.log(entries, 'ResizeObserver')
  })
  myObserver.observe(MtovDom)
```
方法
* observe： 初始化观察一个指定元素。
语法：resizeObserver.observe(target);
* disconnect： 取消观察某个observer的所有observed目标元素
语法：resizeObserver.disconnect();
配置项

*options：指定观察设置的可选参数对象
*target: 被观察的 DOM 元素

### ReportingObserver

>ReportingObserver: 监听过时的 api、浏览器的一些干预行为的报告
语法

vat observe = new ReportingObserver(callback[, options]);

demo 案例

```js
// deprecation  和 intervention 不好模拟就不模拟了，intervention 可以查看 https://chromestatus.com/features#intervention 
const reportingObserver = new ReportingObserver((reports, observer) => {
    for (const report of reports) {
        console.log(report.body)
    }
}, {types: ['intervention', 'deprecation']});

reportingObserver.observe();

```
方法

* observe: 指示一个报告观察者开始在其报告队列中收集报告。
* takeRecords: 返回观察者的报告队列中包含的当前报告列表,并清空队列。
* disconnect: 停止之前已经开始观测的报告观测员收集报告。


配置项

* types：一个字符串数组，代表该观察者要收集的报告类型。可用的类型包括 deprecation，intervention 和 crash。
* buffered: 一个布尔值，它定义在可以创建观察者之前生成的报告是否应该可观察