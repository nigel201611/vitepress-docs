# MaxCompute
## MaxCompute Help Documentation
1. Activate MaxCompute: https://help.aliyun.com/document_detail/58226.html
2. Create MaxCompute: https://help.aliyun.com/document_detail/27815.html
3. Connect to MaxCompute: https://help.aliyun.com/document_detail/27968.html
4. ODPS cmd download: https://github.com/aliyun/aliyun-odps-console/releases/tag/v0.37.4?spm=a2c4g.11186623.0.0.aa317902uqRCsT&file=v0.37.4
5. ODPS cmd usage: https://help.aliyun.com/document_detail/27971.html#title-vrc-9fg-4nd
## Install pip and pyODPS
* Global install pip command
* [PyODPS Installation Guide](https://help.aliyun.com/document_detail/90399.htm?spm=a2c4g.11186623.0.0.5b485ac4Atkftz#concept-e14-gjf-cfb)
> If an error occurs during pip installation, use the second method to install.
```bash
$ python -m ensurepip --upgrade
```
* Second method
```bash
curl 'https://bootstrap.pypa.io/get-pip.py' > get-pip.py
sudo python3 get-pip.py
```
* Check version
```bash
pip --version
```
* Install Python SDK
```js
pip install pyodps
// Call Python file
const spawn = require('child_process').spawn;
  const py = spawn('python3', [`/xx.py`]);
  let output='';
  py.stdout.on("data", (data) => {
        output += data;
        console.log(data,output,122)
  });
  py.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
    // Error occurred;
  });
  py.stdout.on("close", () => {
  	console.log('Content received',output)
    res.sendStatus(200);
  });
```
### Connect to ODPS, Add Data

> Before using PyODPS, you need to initialize a MaxCompute entry using your Alibaba Cloud account.
o = ODPS('<your_accesskey_id>', '<your_accesskey_secret>', '<your_default_project>', endpoint='<your_end_point>')
your_accesskey_id: The AccessKey ID with the required permissions for the target MaxCompute project resources. You can obtain it from the AccessKey management page.
your_accesskey_secret: The AccessKey Secret corresponding to the AccessKey ID. You can obtain it from the AccessKey management page.
your_default_project: The name of the MaxCompute project to use. You can log in to the MaxCompute console, switch regions in the top-left corner, and find the specific MaxCompute project name under the Project Management tab.
your_end_point: The Endpoint for the region where the target MaxCompute project is located. See Endpoint for details.
The execute_sql() and run_sql() methods can execute SQL statements.

```bash
#!/usr/bin/python3
print ('hello python')
from odps import ODPS
o = ODPS('your_accesskey_id', 'your_accesskey_secret',
project='liumeng', endpoint='http://service.cn-hangzhou.maxcompute.aliyun.com/api')
o.execute_sql('INSERT INTO table_name (field1, field2) VALUES (value1, value2)')
```

## MaxCompute Query Statements

### Creating the Monitoring Log Table

```js
// -- Create monitoring log table
DROP TABLE IF EXISTS test_my.my_monitor;
CREATE TABLE IF NOT EXISTS test_my.my_monitor
(
    appId STRING COMMENT 'Application ID',
    pageId STRING COMMENT 'Page ID',
    timestamp STRING COMMENT 'Event reporting timestamp',
    ua STRING COMMENT 'Browser UserAgent',
    url STRING COMMENT 'Page URL',
    args STRING COMMENT 'Custom parameters',
    eventType STRING COMMENT 'Log type'
)
PARTITIONED BY
(
    datetime STRING COMMENT 'Partition field: date'
)
LIFECYCLE 7;

// -- Add user_id and visitor_id fields to the my_monitor table
alter table test_my.my_monitor add columns (
    user_id STRING COMMENT 'User ID',
    visitor_id STRING COMMENT 'Visitor ID (when user_id exists, use user_id)'
);

// -- Add mod_id field to the my_monitor table
alter table test_my.my_monitor add columns (
    mod_id STRING COMMENT 'Module ID'
);

```

### Creating the Monitoring Cleaning Table

```js

DROP TABLE IF EXISTS dwd_my_monitor;
CREATE TABLE IF NOT EXISTS dwd_my_monitor
(
    args STRING COMMENT 'Log parameters',
    timestamp STRING COMMENT 'Log reporting timestamp'
)
PARTITIONED BY
(
    `datetime` STRING COMMENT 'Time partition'
)
LIFECYCLE 7;

```

### Creating the Monitoring Data Metrics Table

```js
DROP TABLE IF EXISTS dwd_my_monitor_feature;
CREATE TABLE IF NOT EXISTS dwd_my_monitor_feature
(
    appId STRING COMMENT 'Application ID',
    pageId STRING COMMENT 'Page ID',
    modId STRING COMMENT 'Module ID',
    `type` STRING COMMENT 'Metric type',
    `value` STRING COMMENT 'Metric data',
    `date` STRING COMMENT 'Metric date'
)
PARTITIONED BY
(
    `datetime` STRING COMMENT 'Time partition'
)
tblproperties ("transactional"="true");

```

### Monitoring Data Cleaning

```js
INSERT OVERWRITE TABLE dwd_my_monitor PARTITION (datetime='${biz_date}')
    SELECT args, timestamp
    FROM test_my.my_monitor
    WHERE type = 1 AND datetime = '${biz_date}';
```

### Monitoring Log Queries

```js
SELECT *
FROM test_my.dwd_my_monitor_feature
WHERE datetime="20220504";

SELECT *
FROM test_my.my_monitor 
WHERE datetime = '20220504' AND eventtype = 'CLICK';

-- PV
SELECT appid, pageid, datetime, COUNT(*) AS pv
FROM test_my.my_monitor 
WHERE datetime = '20220504' AND eventtype = 'PV'
GROUP BY appid, pageid, datetime;

-- UV
SELECT appid, pageid, datetime, COUNT(DISTINCT visitor_id) AS uv
FROM test_my.my_monitor 
WHERE datetime = '20220504' AND eventtype = 'PV'
GROUP BY appid, pageid, datetime;

-- PV Click
SELECT appid, pageid, datetime, COUNT(*) AS click_pv
FROM (
    SELECT t1.appid AS appid, t1.pageid AS pageid, t2.datetime AS datetime
    FROM (
        SELECT appid, pageid
        FROM test_my.my_monitor 
        WHERE datetime = '20220504' AND eventtype = 'PV'
        GROUP BY appid, pageid, datetime
    ) AS t1 LEFT JOIN test_my.my_monitor AS t2 ON t1.appid = t2.appid AND t1.pageid = t2.pageid
    WHERE t2.datetime = '20220504' AND t2.eventtype = 'CLICK'
) AS t1
GROUP BY appid, pageid, datetime;

-- UV Click

-- Dwell Time
SELECT appid, pageid, datetime, AVG(stayTime)
FROM (
    SELECT appid, pageid, datetime, GET_JSON_OBJECT(args, '$.stayTime') AS stayTime
    FROM test_my.my_monitor 
    WHERE datetime = '20220504' AND eventtype = 'STAY'
) AS t1
WHERE stayTime > 0 AND stayTime < 600 * 1000
GROUP BY appid, pageid, datetime;

-- Vertical table
SELECT *
FROM (
    SELECT appid, pageid, datetime, COUNT(*) AS value, 'click' AS type
    FROM (
        SELECT t1.appid AS appid, t1.pageid AS pageid, t2.datetime AS datetime
        FROM (
            SELECT appid, pageid
            FROM test_my.my_monitor 
            WHERE datetime = '20220504' AND eventtype = 'PV'
            GROUP BY appid, pageid, datetime
        ) AS t1 LEFT JOIN test_my.my_monitor AS t2 ON t1.appid = t2.appid AND t1.pageid = t2.pageid
        WHERE t2.datetime = '20220504' AND t2.eventtype = 'CLICK'
    ) AS t1
    GROUP BY appid, pageid, datetime
) UNION ALL (
    SELECT appid, pageid, datetime, COUNT(*) AS value, 'pv' AS type
    FROM test_my.my_monitor 
    WHERE datetime = '20220504' AND eventtype = 'PV'
    GROUP BY appid, pageid, datetime
);

-- PV Click Rate Horizontal Table
SELECT appid, pageid, datetime, pv_click, pv, pv_click / pv
FROM (
    SELECT appid, pageid, datetime, COUNT_IF(eventtype = 'CLICK') AS pv_click, COUNT_IF(eventtype = 'PV') AS pv
    FROM (
        SELECT appid, pageid, datetime, eventtype
        FROM test_my.my_monitor 
        WHERE datetime = '20220504' AND (eventtype = 'PV' OR eventtype = 'CLICK')
    ) AS t1
    GROUP BY appid, pageid, datetime
);

-- UV Click Rate
SELECT CONCAT(uv_click / uv * 100, '%') AS uv_click_rate
FROM (
    SELECT appid, pageid, datetime, COUNT_IF(uv_click > 0) AS uv_click, COUNT(*) AS uv
    FROM (
        SELECT appid, pageid, datetime, visitor_id, uv_click, uv
        FROM (
            SELECT appid, pageid, datetime, visitor_id, COUNT_IF(eventtype = 'CLICK') AS uv_click, COUNT_IF(eventtype = 'PV') AS uv
            FROM (
                SELECT appid, pageid, datetime, visitor_id, eventtype
                FROM test_my.my_monitor
                WHERE datetime = '20220504' AND (eventtype = 'PV' OR eventtype = 'CLICK')
            ) AS t1
            GROUP BY appid, pageid, datetime, visitor_id
        )
    ) AS t1
    GROUP BY appid, pageid, datetime
);

```

### Updating Monitoring Data Metrics

```js
-- Clear the day's table data
DELETE FROM test_my.dwd_my_monitor_feature WHERE datetime='${biz_date}';

-- Insert PV metric
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appId, pageId, '' AS modId, 'pv' AS type, COUNT(*) AS value, '${biz_date}' AS date
    FROM test_my.my_monitor 
    WHERE datetime = '${biz_date}' AND eventtype = 'PV'
    GROUP BY appid, pageid, datetime;

-- Insert UV metric
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appId, pageId, '' AS modId, 'uv' AS type, COUNT(DISTINCT visitor_id) AS value, '${biz_date}' AS date
    FROM test_my.my_monitor 
    WHERE datetime = '${biz_date}' AND eventtype = 'PV'
    GROUP BY appid, pageid, datetime;

-- Insert PV Click metric
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appId, pageId, '' AS modId, 'pv_click' AS type, COUNT(*) AS value, '${biz_date}' AS date
    FROM (
        SELECT t1.appid AS appid, t1.pageid AS pageid, t2.datetime AS datetime
        FROM (
            SELECT appid, pageid
            FROM test_my.my_monitor 
            WHERE datetime = '${biz_date}' AND eventtype = 'PV'
            GROUP BY appid, pageid, datetime
        ) AS t1 LEFT JOIN test_my.my_monitor AS t2 ON t1.appid = t2.appid AND t1.pageid = t2.pageid
        WHERE t2.datetime = '${biz_date}' AND t2.eventtype = 'CLICK'
    ) AS t1
    GROUP BY appid, pageid, datetime;

-- Insert UV Click metric
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appid, pageid, '' AS modId, 'uv_click' AS type, COUNT_IF(uv_click > 0) AS value, '${biz_date}' AS date
    FROM (
        SELECT appid, pageid, datetime, visitor_id, uv_click, uv
        FROM (
            SELECT appid, pageid, datetime, visitor_id, COUNT_IF(eventtype = 'CLICK') AS uv_click, COUNT_IF(eventtype = 'PV') AS uv
            FROM (
                SELECT appid, pageid, datetime, visitor_id, eventtype
                FROM test_my.my_monitor
                WHERE datetime = '${biz_date}' AND (eventtype = 'PV' OR eventtype = 'CLICK')
            ) AS t1
            GROUP BY appid, pageid, datetime, visitor_id
        )
    ) AS t1
    GROUP BY appid, pageid, datetime;

-- Insert Dwell Time metric
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appId, pageId, '' AS modId, 'stay' AS type, AVG(stayTime) AS value, '${biz_date}' AS date
    FROM (
        SELECT appid, pageid, datetime, GET_JSON_OBJECT(args, '$.stayTime') AS stayTime
        FROM test_my.my_monitor 
        WHERE datetime = '${biz_date}' AND eventtype = 'STAY'
    ) AS t1
    WHERE stayTime > 0 AND stayTime < 600 * 1000
    GROUP BY appid, pageid, datetime;

```

## Frontend Monitoring Traffic Metrics

### Page Access Behavior

Metrics Library

* PV: Page views, count(type = pv)
* UV: Unique visitors, count(type = pv, distinct visitor_id)
visitor_id cannot be null.
For unauthenticated users, a visitor_id (uuid persisted in storage) needs to be generated on the client.
For authenticated users, the user's user_id needs to be obtained and written to visitor_id.
* PV Click Rate: Page click rate, count(type = click) / PV
Can be greater than 100%.
* UV Click Rate: User click rate, count(type = click, distinct visitor_id) / UV
Cannot be greater than 100%.
* Dwell Time: Total time from when a user opens a page to when they close it, leave page time (beforeunonload) - open time (onload)


#### Visualization

* Display hourly page metrics over 24 hours using line charts
* Display page metrics over a certain time period using tables

### Module Access Behavior
Metrics Library

* Module Exposure: Event sent when the module is displayed, count(type = exp, mod=mod_id)
* Module Click: Event sent when the module is clicked, count(type = click, mod=mod_id)

#### Visualization

* Display exposure and click data for all modules on a page using tables

### Page Performance
Metrics Library

* First Screen Rendering Time: Time from opening the page to when the page is fully loaded, formula:
```js
window.onload = function() {
 new Date().getTime() - performance.timing.navigationStart 
}
```
### API Request Time
Time from API initiation to API response, formula: API response time - API initiation time.

#### Visualization

* Line chart
* Table

### Page Exception Monitoring

#### Metrics Library

* JS Error:
Global JS error: window.onerror
Global promise error: window.onunhandledrejection
Custom thrown JS error: Custom reporting of stack and message
* API Error: Exception information during API response, count(type = api_error)
* Business Exception: Implemented via full reporting, count(type = biz_error)

#### Visualization

* Line chart
* Table

## Frontend Performance Monitoring Platform Architecture

<img src="/images/performanceDesign.png">

### Frontend Performance Monitoring Principles

https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API

<img src="/images/performanceTiming.png">

### FP (First Paint)
First Paint, part of the Paint Timing API, is the time between navigation and when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question "Is it happening?"
https://developer.mozilla.org/en-US/docs/Glossary/First_paint

### FCP (First Contentful Paint)
First Contentful Paint (FCP) is when the browser renders the first bit of content from the DOM, providing the first feedback to the user that the page is actually loading. The question "Is it happening?" is "yes" when the first contentful paint completes.
https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint

### LCP (LargestContentfulPaint)
The LargestContentfulPaint interface of the Largest Contentful Paint API provides details about the largest image or text paint before user input on a web page. The timing of this paint is a good heuristic for when the main page content is available during load.
https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint

### FMP (First Meaningful Paint)
First Meaningful Paint (FMP) is the paint after which the biggest above-the-fold layout change has happened and web fonts have loaded. It is when the answer to "Is it useful?" becomes "yes", upon first meaningful paint completion.
https://developer.mozilla.org/en-US/docs/Glossary/first_meaningful_paint

### DCL (DOMContentLoaded)
The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

### L (load)
The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images. This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event

<img src="/images/performancezibiao.png">

### Frontend Performance Data Collection
```js
// PerformanceTiming
window.addEventListener('load', e => {
  // PerformanceTiming in milliseconds
  const timing = window.performance.timing;
  const processingTiming = timing.domComplete - timing.domLoading;
  const dnsTiming = timing.domainLookupStart - timing.domainLookupEnd;
  console.log(processingTiming, dnsTiming);
  // PerformanceNavigationTiming in nanoseconds
  const perfEntries = window.performance.getEntries();
  console.log(perfEntries);
});
// Get fp, fcp, fmp (PerformancePaintTiming)
// https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
// fp
const paint = window.performance.getEntriesByType('paint');
const fp = paint.find(e => e.name === 'first-paint').startTime;
const fcp = paint.find(e => e.name === 'first-contentful-paint').startTime;
console.log(fp, fcp);
// Get more performance metrics: PerformanceObserver
// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
// PerformanceObserver
function observer_callback(perf) {
  perf.getEntries().forEach((timing) => {
    console.log(timing)
    if (timing.name === "first-paint") {
      fp = timing.startTime
    } else if (timing.name === "first-contentful-paint") {
      fcp = timing.startTime
    } else if (timing.entryType === "largest-contentful-paint") {
      lcp = timing.startTime
    }
    // if (timing.entryType === 'navigation') {
    //   const dns = timing.domainLookupEnd - timing.domainLookupStart;
    //   const tcp = timing.connectEnd - timing.connectStart;
    //   const http = timing.responseEnd - timing.requestStart;
    //   const dom = timing.domComplete - timing.domInteractive;
    //   const load = timing.loadEventEnd - timing.loadEventStart;
    //   console.log('dns', dns);
    //   console.log('tcp', tcp);
    //   console.log('http', http);
    //   console.log('dom', dom);
    //   console.log('load', load);
    // }
  })
  sendPerf({
    fp,
    fcp,
    lcp,
  })
}


let observer = new PerformanceObserver(observer_callback);
observer.observe({ entryTypes: ['paint', 'resource', 'mark'] });

window.performance.mark('own');
```
