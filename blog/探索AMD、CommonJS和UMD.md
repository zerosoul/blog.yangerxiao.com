---
slug: "amd-commonjs-and-umd"
date: "2014-8-22 17:31:37"
category: "技术"
tags:
  - amd
  - javascript
---

# 概述

这些年，Javascript 组件越来越丰富，作为前端开发者，只需要阅读下使用文档，便可引入到自己的项目中，相当便利。但是随着引入的组件越来越多，事情往往就不那么美好了，其中最突出的问题便是全局变量的纷杂容易导致冲突。

W3C 提出的模块规范，AMD 和 CommonJS 应运而生：下面就来探索下这两个规范。

# AMD：Asynchronous Module Definition

AMD 获得前端开发者的青睐，大概很大程度上是由于[RequireJS](http://requirejs.org/)的流行。

举个模块的例子：依赖于`jQuery`的`bar`模块

```js
//文件名: bar.js

define(["jquery"], function($) {
  function myFunc() {}

  //暴露出的函数

  return myFunc;
});
```

再来个稍微复杂的：多个依赖，并且有多个输出

```js
//文件名: bar.js

define(["jquery", "underscore"], function($, _) {
  function a() {} //私有函数

  function b() {} //公有函数

  function c() {} //公有函数

  // 暴露出的成员

  return {
    b: b,

    c: c
  };
});
```

`define`的第一个参数是一个依赖列表，第二个是依赖加载完毕后的回调函数。关于依赖是如何加载的，RequireJS 会帮我们搞定。需要注意的是依赖变量的顺序需要一一对应： jquery->\$, underscore->\_ 。

当然，我们可以映射任何变量名，比如把`$`改成`$$`，没问题，只要记得这样用`$$(“.selector”)`就行。

最后，还需谨记不要在`define`之外使用`$`、`_`变量，别问我为什么 o(╯□╰)o。

# CommonJS

如果你了解 Nodejs，应该对 CommonJS 不陌生。不过真正在前端开发中流行开来，[Browserify](http://browserify.org/)功不可没。

那么，上面的 AMD 模块换做 CommonJS，该怎么写呢？

```js
//文件名: bar.js

//获取依赖

var $ = require("jquery");

function myFunc() {}

//暴露函数

module.exports = myFunc;
```

复杂点的：

```js
//文件名: bar.js

//获取依赖

var $ = require("jquery");

var _ = require("underscore");

function a() {} //私有函数

function b() {} //公有函数

function c() {} //公有函数

//暴露成员

module.exports = {
  b: b,

  c: c
};
```

# UMD: Universal Module Definition

CommonJS 和 AMD 适用场景不太一样，一般 CommonJS 是同步加载，AMD 是异步加载，但是它们流行程度是一样的。有没有一种通用的模块规范来铲平两者的差异？程序员的智慧是无穷的，UMD 应运而生。

不得不预警，虽然兼容 AMD 和 CommonJS，而且也支持浏览器宿主环境，但代码看起来确实挺丑陋的：

```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD

    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node, CommonJS-like

    module.exports = factory(require("jquery"));
  } else {
    // 浏览器(root 就是 window)

    root.returnExports = factory(root.jQuery);
  }
})(this, function($) {
  function myFunc() {}

  //暴露的函数

  return myFunc;
});
```

复杂点的：

```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery", "underscore"], factory);
  } else if (typeof exports === "object") {
    // Node, CommonJS-like
    module.exports = factory(require("jquery"), require("underscore"));
  } else {
    // 浏览器(root 就是 window)
    root.returnExports = factory(root.jQuery, root._);
  }
})(this, function($, _) {
  function a() {} //私有函数
  function b() {} //公有函数
  function c() {} //公有函数
  //暴露的成员
  return {
    b: b,
    c: c
  };
});
```

UMD 虽然丑，但更实用啊，所以很多开源类库或组件都用这种方案。
