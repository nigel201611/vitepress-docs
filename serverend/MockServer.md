# Mock Server & HTML2Canvas
Do we need to choose mature frameworks like express, koa, egg.js, etc.?

A good Mock Server should have the following characteristics:

* Quick setup
* Support standard RESTful operations and routing rules
  * /templates - Get all data
  * /templates/${id} - Get one item
* Advanced extensions - Custom routes, middleware, etc.

## Introducing JSON Server

>https://github.com/typicode/json-server#access-control-example

Installation
```bash
npm install --save-dev json-server
```

Start

```bash
npx json-server --watch db.json
```
## HTML2Canvas Screenshot Principles


>Goal: A canvas element with a series of HTML nodes drawn on it
>Limitation: Canvas cannot contain actual HTML nodes; it is just a drawing surface

Through `canvas.getContext("2d")`, you can get the 2D rendering context provided by canvas, and then draw shapes, text, images, and other objects in it.
Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

* Rectangle - fillRect()
* Text - fillText()
* Image - drawImage()
  
## SVG to the Rescue
Scalable Vector Graphics (SVG) is an XML-based markup language for describing two-dimensional vector graphics.
SVG has a magical element called foreignObject.

Documentation: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject

The foreignObject element allows inclusion of elements from a different XML namespace. In the context of a browser, this is most likely XHTML/HTML.

## Solution Approach

* Create a canvas element
* Create an SVG file using the Blob constructor
* Fill foreignObject inside the SVG with the HTML to be copied
* Create an image tag, set image.src = URL.createObjectURL(svg)
* After the image finishes loading, call canvas's drawImage method to draw the image onto the canvas.

## Clipboard.js Basic Principles
>Using Clipboard.js
>Documentation: https://clipboardjs.com/


It may seem like a simple problem, but due to different API implementations and various hacks across browsers, the implementation is quite messy.

* Method 1: The most modern Clipboard API
  Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
  Still in working draft stage, browser compatibility needs improvement.
* Method 2: document.execCommand() method
  Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
  It handles more than just copy scenarios, providing a range of features for editable regions.

### document.execCommand('copy') Solution Analysis

* Manually create an editable element, such as a textArea, and set the value to be copied as its value
* Insert it into the page, call methods on the textArea to select the value
* Then call document.execCommand('copy')
* The textArea must be invisible; use special styles to keep it out of the visible area
* Finally, remove the textArea node

## File Download Principles
>An A link can create hyperlinks to other web pages, files, locations within the same page, email addresses, or any other URL.

### A Special Attribute of the A Link: download

* Documentation: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
* This attribute instructs the browser to download the URL instead of navigating to it, prompting the user to save it as a local file.
### Another Special Attribute of the A Link: rel

* This attribute specifies the relationship between the target object and the link object.
* noopener is an important attribute, crucial for web security.
* When you open a new tab using target='_blank', the new page's window object has an attribute called opener that points to the previous page's window object, giving the latter page control over the former.

### Simulating the Download Process

* Create an A link
* Set the href and download attributes
* Trigger a click event on the A link
* The download attribute only works for same-origin URLs

```js
export const downloadFile = (src: string, fileName = 'default.png') => {
  // Create link
  const link = document.createElement('a')
  link.download = fileName
  link.rel = 'noopener'
  if (link.origin !== location.origin) {
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
    axios.get(src, { responseType: 'blob'}).then(data => {
      link.href = URL.createObjectURL(data.data)
      setTimeout(() => { link.dispatchEvent(new MouseEvent('click')) })
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
      setTimeout(() => { URL.revokeObjectURL(link.href)}, 10000 )
    }).catch((e) => {
      console.error(e)
      link.target='_blank'
      link.href= src
      link.dispatchEvent(new MouseEvent('click'))
    })
  } else {
  // Set link attributes
  link.href= src
  // Trigger event
  link.dispatchEvent(new MouseEvent('click'))
  }
}
```
 
## Using FileSaver.js for Download

>Documentation: https://github.com/eligrey/FileSaver.js/

Leveraging special HTTP response headers to achieve automatic browser downloads
Documentation: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition

Content-Disposition is the best download method, requiring server-side support and no JavaScript at all. It needs to be added to the HTTP header.
