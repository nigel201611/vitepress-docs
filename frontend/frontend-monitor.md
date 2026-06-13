# Frontend Monitoring
## Application Scenarios for Frontend Monitoring
### Why Is Frontend Monitoring Needed?
* Page access behavior: PV, UV, IP, PV click rate, UV click rate, dwell time
* User operation behavior: module exposure, module clicks, scrolling, form operations
* Page performance: first screen rendering time, API request time
* Exception monitoring: JS Error, API exceptions, business exceptions
### Common Application Scenarios
* Traffic analysis
* Behavior analysis
* Performance monitoring
* Exception monitoring
## Common Frontend Monitoring Platforms
### Baidu Analytics
* Traffic statistics and analysis: free
* Behavior analysis: requires additional setup
### Alibaba Cloud ARMS
* Traffic analysis, performance monitoring, exception monitoring
### Umeng
* Traffic analysis
* Behavior analysis
## Why Build Your Own Frontend Monitoring Platform?
* If your needs are mainly traffic analysis, it is recommended to use Baidu Analytics or Alibaba Cloud ARMS directly
* If your needs include not only traffic analysis but also behavior analysis, consider building your own
  * Building your own has higher costs (labor costs), but the advantage is that you have full control over the data
  * Using existing solutions also has costs (paying the platform), and you cannot obtain the data
* If you want the data to be stored in your own database and need to extend more analysis dimensions and capabilities, building your own is the way to go

## Frontend Monitoring Platform Architecture Design

## Architecture Design

Layers of the frontend monitoring platform

* Frontend Monitoring JSSDK
  * Data collection
  * Data reporting
    * Default reporting: page PV, performance
    * Manual reporting: page operation behavior
* Frontend Monitoring API and Big Data Warehouse
* Receiving reported data
* Data Warehouse: MaxCompute
  * Data storage
  * Data query
* Frontend Monitoring Data Visualization
  * Log big data cleaning
  * Big data backflow to RDS (unstructured data => structured data)
  * Computing structured data to generate charts

## Architecture Diagram

<img src="/images/monitor.jpg">

## The 5 Browser Observers

### The 5 Browser Observers
* MutationObserver
* IntersectionObserver
* PerformanceObserver
* ResizeObserver
* ReportingObserver

### MutationObserver

>MutationObserver: Listens for changes in the DOM tree (attributes, addition/removal of child nodes)

### Syntax
const observer = new MutationObserver(callback);
### Demo
```html
<div class="MutationObserverDOM">11</div>
<button class="addChildDOM" onclick="handleAddDom()">Add Element</button>
<button class="addAttribute" onclick="handleAttribute()">Add Attribute</button>
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
// Add element
function handleAddDom(){
  append(MtovDom, 'p', 'childClass', 'Child element content')
}
function append(parentElement,childElement,childClass,childElementContent){
  const child = document.createElement(childElement)
  child.className = childClass
  child.innerHTML = childElementContent ? childElementContent : 'Default content'
  parentElement.appendChild(child)
}
function handleAttribute(){
  MtovDom.setAttribute('data','addName')
}
```
Methods
* observe: Starts listening for changes to the specified element node.
Syntax: mutationObserver.observe(target[, options])
* disconnect: Stops listening until observe is called again.
Syntax: mutationObserver.disconnect()

Config options
* childList: Addition and removal of child nodes
* attributes: Attribute changes
* characterData: Changes to node content or node text
* subtree: Whether to apply observation to all descendants of this node
* attributeOldValue: Whether to record the attribute value before the change
* attributeFilter: Specific attributes to observe
* characterDataOldValue: Whether to record the attribute value before the change when observing attributes
  
Return parameters
* type: Returns `attributes` if an attribute changed, `childList` if a child node of the target node changed.
* target: Returns the DOM node affected by this change (the observed DOM)
* addedNodes: Returns the nodes that were added
* removedNodes: Returns the nodes that were removed
* previousSibling: Returns the previous sibling of the added or removed node
* nextSibling: Returns the next sibling of the added or removed node
* oldValue: Returns different values depending on the type. If type is `attributes`, returns the attribute value before the change. If type is `characterData`, returns the text data before the change. If type is `childList`, returns null.
  
### IntersectionObserver

>IntersectionObserver: Listens for the intersection ratio between an element and the viewport, triggering a callback when the visible ratio reaches a certain threshold.

Syntax
const observer = new IntersectionObserver(callback, options);

Demo
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
Methods
* observe: Starts observing a target element.
Syntax: intersectionObserver.disconnect();
* disconnect: Stops observing.
Syntax: IntersectionObserver.observe(targetElement);
* takeRecords: Returns an array of IntersectionObserverEntry objects for all observed targets.
Syntax: intersectionObserverEntries = intersectionObserver.takeRecords();
* unobserve: Stops the IntersectionObserver from observing a specific target element.
Syntax: IntersectionObserver.unobserve(targetElement);

Config options
* targetElement: The target DOM element
* root: Specifies the root element; the monitoring callback is triggered when the target element is visible within this element.
* rootMargin: Similar to CSS margin, sets the margin area around the root element.
* threshold: The threshold that determines when the callback function is triggered.
  
Return parameters

* time: The time when visibility changed, a high-precision timestamp in milliseconds.
* rootBounds: The rectangular area information of the root element.
* intersectionRatio: The visible ratio of the target element.
* intersectionRect: Information about the intersection area between the target element and the root element.
* isIntersecting: Determines whether the element meets the visibility conditions in the options.
* boundingClientRect: The rectangular area information of the target element.
* target: The observed target element.
Reference: Ruan Yifeng's tutorial: https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

### PerformanceObserver

>PerformanceObserver: Used to monitor performance measurement events. It is notified when a new performance entry is recorded in the browser's performance timeline.

Syntax

const observer = new PerformanceObserver(callback);

Demo
```html
<button onclick="clicked()">Measure</button>
var observer2 = new PerformanceObserver((list)=>{
  console.log(list.getEntries(), 'PerformanceObserver')
});
observer2.observe({entryTypes: ["measure"]});
function clicked() {
    performance.measure('Click Event');
}
```
Methods

* disconnect: Prevents the performance observer from receiving any PerformanceEntry events.
Syntax: performanceObserver.disconnect();
* observe: Used to observe the specified set of PerformanceEntry types.
Syntax: observer.observe(options);
* takeRecords: Returns the current list of PerformanceEntry objects stored in the performance observer and empties it.
Syntax: var PerformanceEntry[] = performanceObserver.takeRecords();
* getEntries: Returns a list containing objects that carry various performance data.
  
Config options

* entryTypes: Declares which types of performance data to observe (mark (points in time), measure (time periods), resource (resource load time)).
* buffered: Declares whether the callback should execute synchronously or asynchronously.


### ResizeObserver

>ResizeObserver: Can listen for DOM changes (node appearance and hiding, changes in node size).
Syntax
var ResizeObserver = new ResizeObserver(callback)

Demo
```html
  <div class="ResizeObserver">ResizeObserver</div>
const MtovDom = document.querySelector('.ResizeObserver')
const myObserver = new ResizeObserver(entries => {
    console.log(entries, 'ResizeObserver')
  })
  myObserver.observe(MtovDom)
```
Methods
* observe: Initializes observing a specified element.
Syntax: resizeObserver.observe(target);
* disconnect: Cancels observation of all observed target elements for a given observer.
Syntax: resizeObserver.disconnect();
Config options

* options: An optional parameters object specifying observation settings.
* target: The DOM element to be observed.

### ReportingObserver

>ReportingObserver: Listens for reports on deprecated APIs and browser intervention behaviors.
Syntax

vat observe = new ReportingObserver(callback[, options]);

Demo

```js
// deprecation and intervention are not simulated here as they are difficult to simulate. For intervention, see https://chromestatus.com/features#intervention 
const reportingObserver = new ReportingObserver((reports, observer) => {
    for (const report of reports) {
        console.log(report.body)
    }
}, {types: ['intervention', 'deprecation']});

reportingObserver.observe();

```
Methods

* observe: Instructs a reporting observer to start collecting reports in its report queue.
* takeRecords: Returns the current list of reports in the observer's report queue and empties the queue.
* disconnect: Stops a reporting observer that was previously started from collecting reports.


Config options

* types: An array of strings representing the types of reports this observer should collect. Available types include `deprecation`, `intervention`, and `crash`.
* buffered: A boolean that defines whether reports generated before the observer was created should be observable.
