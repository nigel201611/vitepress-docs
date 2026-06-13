# MaxCompute
## MaxCompute 帮助文档
1. 开通 MaxCompute : https://help.aliyun.com/document_detail/58226.html
2. 创建 MaxCompute : https://help.aliyun.com/document_detail/27815.html
3. 连接 MaxCompute : https://help.aliyun.com/document_detail/27968.html
4. odps cmd 下载地址 : https://github.com/aliyun/aliyun-odps-console/releases/tag/v0.37.4?spm=a2c4g.11186623.0.0.aa317902uqRCsT&file=v0.37.4
5. odps cmd的使用 : https://help.aliyun.com/document_detail/27971.html#title-vrc-9fg-4nd
## 安装 pip 和 pyODPS
* 全局安装 pip 命令
* [PyODPS安装指南](https://help.aliyun.com/document_detail/90399.htm?spm=a2c4g.11186623.0.0.5b485ac4Atkftz#concept-e14-gjf-cfb)
>在安装 pip 命令时可能出现报错，如果报错使用第二种方式安装
```bash
$ python -m ensurepip --upgrade
```
* 第二种方式
```bash
curl 'https://bootstrap.pypa.io/get-pip.py' > get-pip.py
sudo python3 get-pip.py
```
* 查看版本
```bash
pip --version
```
* 安装 Python SDK
```js
pip install pyodps
// 调用 Python 文件
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
  	console.log('获取内容',output)
    res.sendStatus(200);
  });
```
### 连接 ODPS, 添加数据

>在使用PyODPS前，您需要用阿里云账号初始化一个MaxCompute的入口
o = ODPS(’<your_accesskey_id>’, ‘<your_accesskey_secret>’, ‘<your_default_project>’, endpoint=’<your_end_point>’)
your_accesskey_id：具备目标MaxCompute项目中待操作对象相关操作权限的AccessKey ID。您可以进入AccessKey管理页面获取AccessKey ID。
your_accesskey_secret：AccessKey ID对应的AccessKey Secret。您可以进入AccessKey管理页面获取AccessKey Secret。
your_default_project：使用的MaxCompute项目名称。您可以登录MaxCompute控制台，左上角切换地域后，即可在项目管理页签查看到具体的MaxCompute项目名称。
your_end_point：目标MaxCompute项目所在地域的Endpoint。详情请参见Endpoint。
execute_sql()和run_sql()方法可以执行SQL语句

```bash
#!/usr/bin/python3
print ('hello python')
from odps import ODPS
o = ODPS('your_accesskey_id', 'your_accesskey_secret',
project='liumeng', endpoint='http://service.cn-hangzhou.maxcompute.aliyun.com/api')
o.execute_sql('INSERT INTO 表名 (字段1 ,字段2) VALUES (value1, value2 )')
```

## MaxCompute 查询语句

### 监控日志创建

```js
// -- 创建监控日志表
DROP TABLE IF EXISTS test_my.my_monitor;
CREATE TABLE IF NOT EXISTS test_my.my_monitor
(
    appId STRING COMMENT '应用ID',
    pageId STRING COMMENT '页面ID',
    timestamp STRING COMMENT '埋点上报时间',
    ua STRING COMMENT '浏览器UserAgent',
    url STRING COMMENT '页面URL',
    args STRING COMMENT '自定义参数',
    eventType STRING COMMENT '日志类型'
)
PARTITIONED BY
(
    datetime STRING COMMENT '分区字段：日期'
)
LIFECYCLE 7;

// -- 在 my_monitor 表中添加 user_id 和 visitor_id 两个字段
alter table test_my.my_monitor add columns (
    user_id STRING COMMENT '用户ID',
    visitor_id STRING COMMENT '访客ID（当user_id存在时，取user_id）'
);

// -- 在 my_monitor 表中添加 mod_id 字段
alter table test_my.my_monitor add columns (
    mod_id STRING COMMENT '模块ID'
);

```

### 监控清洗表创建

```js

DROP TABLE IF EXISTS dwd_my_monitor;
CREATE TABLE IF NOT EXISTS dwd_my_monitor
(
    args STRING COMMENT '日志参数',
    timestamp STRING COMMENT '日志上报时间'
)
PARTITIONED BY
(
    `datetime` STRING COMMENT '时间分区'
)
LIFECYCLE 7;

```

### 生成监控数据指标表

```js
DROP TABLE IF EXISTS dwd_my_monitor_feature;
CREATE TABLE IF NOT EXISTS dwd_my_monitor_feature
(
    appId STRING COMMENT '应用ID',
    pageId STRING COMMENT '页面ID',
    modId STRING COMMENT '模块ID',
    `type` STRING COMMENT '指标类型',
    `value` STRING COMMENT '指标数据',
    `date` STRING COMMENT '指标日期'
)
PARTITIONED BY
(
    `datetime` STRING COMMENT '时间分区'
)
tblproperties ("transactional"="true");

```

### 监控数据清洗

```js
INSERT OVERWRITE TABLE dwd_my_monitor PARTITION (datetime='${biz_date}')
    SELECT args, timestamp
    FROM test_my.my_monitor
    WHERE type = 1 AND datetime = '${biz_date}';
```

### 监控日志查询

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

-- PV点击
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

-- UV点击

-- 停留时长
SELECT appid, pageid, datetime, AVG(stayTime)
FROM (
    SELECT appid, pageid, datetime, GET_JSON_OBJECT(args, '$.stayTime') AS stayTime
    FROM test_my.my_monitor 
    WHERE datetime = '20220504' AND eventtype = 'STAY'
) AS t1
WHERE stayTime > 0 AND stayTime < 600 * 1000
GROUP BY appid, pageid, datetime;

-- 纵表
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

-- PV点击率横表
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

-- UV点击率
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

### 更新监控数据指标

```js
-- 清空当天表数据
DELETE FROM test_my.dwd_my_monitor_feature WHERE datetime='${biz_date}';

-- 插入PV指标
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appId, pageId, '' AS modId, 'pv' AS type, COUNT(*) AS value, '${biz_date}' AS date
    FROM test_my.my_monitor 
    WHERE datetime = '${biz_date}' AND eventtype = 'PV'
    GROUP BY appid, pageid, datetime;

-- 插入UV指标
INSERT INTO TABLE test_my.dwd_my_monitor_feature PARTITION (datetime='${biz_date}')
    SELECT appId, pageId, '' AS modId, 'uv' AS type, COUNT(DISTINCT visitor_id) AS value, '${biz_date}' AS date
    FROM test_my.my_monitor 
    WHERE datetime = '${biz_date}' AND eventtype = 'PV'
    GROUP BY appid, pageid, datetime;

-- 插入PV点击指标
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

-- 插入UV点击指标
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

-- 插入停留时长指标
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

## 前端监控流量指标

### 页面访问行为

指标库

* PV：页面浏览量，count(type = pv)
* UV：用户浏览量，count(type = pv, distinct visitor_id)
visitor_id 不能 null
对于未登录用户，需要在客户端生成 visitor_id（uuid 持久化存储）
对于已登录用户，需要获取用户的 user_id，并将 user_id 写入 visitor_id
* PV点击率：页面点击率，count(type = click) / PV
可以大于100%
* UV点击率：用户点击率，count(type = click, distinct visitor_id) / UV
不可以大于100%
* 停留时长：用户从打开页面到关闭页面的总时长，leave page time（beforeunonload） - open time（onload）


#### 可视化

* 通过折线图的方式，展示24小时内每小时页面指标
* 通过表格的方式，展示一定时间段内页面的指标
### 模块访问行为
指标库

* 模块曝光：模块显示时发送的埋点，count(type = exp, mod=mod_id)
* 模块点击：模块被点击时发送的埋点，count(type = click, mod=mod_id)

#### 可视化

* 通过表格的方式，展示某个页面中所有模块的曝光和点击数据
### 页面的性能
指标库

* 首屏渲染时间：从打开页面到页面完全加载的时间，计算公式：
```js
window.onload = function() {
 new Date().getTime() - performance.timing.navigationStart 
}
```
### API请求时间
API发起，到API响应的时间，计算公式：API响应时间 - API发起时间

#### 可视化

* 折线图
* 表格

### 页面异常监控

#### 指标库

* JS Error：
全局的jserror：window.onerror
全局的promise error：window.onunhandledrejection
自定义抛出的jserror：自定义上报 stack 和 message
* API Error：API响应过程中，出现异常的信息, count(type = api_error)
业务异常：完全上报的方式进行实现，count(type = biz_error)

#### 可视化

* 折线图
* 表格

## 前端性能监控平台架构

<img src="/images/performanceDesign.png">

### 前端性能监控原理

https://developer.mozilla.org/zh-CN/docs/Web/API/Navigation_timing_API

<img src="/images/performanceTiming.png">

### FP（First Paint）
First Paint, part of the Paint Timing API, is the time between navigation and when the browser renders the first pixels to the screen, rendering anything that is visually different from what was on the screen prior to navigation. It answers the question "Is it happening?"
https://developer.mozilla.org/en-US/docs/Glossary/First_paint

### FCP（First contentful paint）
First Contentful Paint (FCP) is when the browser renders the first bit of content from the DOM, providing the first feedback to the user that the page is actually loading. The question “Is it happening?” is “yes” when the first contentful paint completes.
https://developer.mozilla.org/en-US/docs/Glossary/First_contentful_paint

### LCP（LargestContentfulPaint）
The LargestContentfulPaint interface of the Largest Contentful Paint API provides details about the largest image or text paint before user input on a web page. The timing of this paint is a good heuristic for when the main page content is available during load.
https://developer.mozilla.org/en-US/docs/Web/API/LargestContentfulPaint

### FMP（First Meaningful Paint）
First Meaningful Paint (FMP) is the paint after which the biggest above-the-fold layout change has happened and web fonts have loaded. It is when the answer to “Is it useful?” becomes “yes”, upon first meaningful paint completion.
https://developer.mozilla.org/en-US/docs/Glossary/first_meaningful_paint

### DCL（DOMContentLoaded）
The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event

### L（load）
The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images. This is in contrast to DOMContentLoaded, which is fired as soon as the page DOM has been loaded, without waiting for resources to finish loading.
https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event

<img src="/images/performancezibiao.png">

### 前端性能采集
```js
// PerformanceTiming
window.addEventListener('load', e => {
  // PerformanceTiming 毫秒
  const timing = window.performance.timing;
  const processingTiming = timing.domComplete - timing.domLoading;
  const dnsTiming = timing.domainLookupStart - timing.domainLookupEnd;
  console.log(processingTiming, dnsTiming);
  // PerformanceNavigationTiming 纳秒
  const perfEntries = window.performance.getEntries();
  console.log(perfEntries);
});
// 获取fp、fcp、fmp（PerformancePaintTiming）
// https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
// fp
const paint = window.performance.getEntriesByType('paint');
const fp = paint.find(e => e.name === 'first-paint').startTime;
const fcp = paint.find(e => e.name === 'first-contentful-paint').startTime;
console.log(fp, fcp);
// 获取更多性能指标：PerformanceObserver
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
