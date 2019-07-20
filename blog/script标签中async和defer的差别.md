---
slug: "async-and-defer-in-html5-script-tag"
date: "2014-08-23 17:31:37"
category: "技术"
tags:
  - 前端
  - 翻墙
  - 备忘
  - html5
---

早就知道 HTML5 script 标签多了个`async`特性，但没注意到`async`和`defer`的差别。通过[查文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)，终于懂了。

```html
<script src="test.js"></script>
```

页面的绘制会停下，等`test.js`下载完并执行完，才会继续绘制。

```html
<script src="test.js" defer></script>
```

页面的绘制不会停下，`test.js`在背景下载，待[DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)再执行`test.js`。

```html
<script src="test.js" async></script>
```

页面的绘制不会停下，`test.js`在背景下载，待其下载完毕，页面绘制会停下，执行`test.js`，执行完毕，页面继续绘制。

另，这儿有张[时序图](http://peter.sh/2010/09/last-week-asynchronous-script-execution-and-gpu-acceleration-by-default/)可参考。
