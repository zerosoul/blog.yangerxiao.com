---
slug: "new-web-features-in-safari-10-1"
cover: "/images/qiaobusi.jpg"
date: "2017-03-31 17:31:37"
category: "它山之石"
tags:
  - 前端
  - 翻译
  - html5
---

![乔布斯与HTML5](/images/qiaobusi.jpg)

伴随着 iOS 10.3 和 macOS Sierra 10.12.4 的更新，一个新版本的 Safari 也随之而来，其中有许多值得一提的 web 新特性让前端工程师激动不已，恩，值得唠唠。

这次新版本的发布不仅让 web 更为强大，同时也简化了当前代码的维护，使得 web 开发更得心应手。前端工程师利用这些改进能够给用户带来更好的体验，想想都有些小激动呢。

好了，废话不多说，下面看看都有哪些新特性：

# Fetch

Fetch 是`XMLHttpRequest`的改进版本。它能够以更简洁的方式异步获取资源，不仅如此，它还利用 ECMAScript 2015(ES6)中的[Promises](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects),简化和链式响应操作。相对于`XMLHttpRequest`，Fetch API 更简洁，更具有可读性，从而也就更易维护。

```js
let jsonURLEndpoint =
  "https://svn.webkit.org/repository/webkit/trunk/Source/WebCore/features.json";

fetch(jsonURLEndpoint, {
  method: "get"
})
  .then(function(response) {
    response.json().then(function(json) {
      console.log(json);
    });
  })
  .catch(function(error) {
    console.error(error);
  });
```

想了解更多请参考：[Fetch 标准](https://fetch.spec.whatwg.org/)

# CSS 栅格(CSS Grid Layout)

CSS 栅格基于容器的行与列，给前端工程师带来一种强大的新布局方式。通过 CSS 提供的这种可控的页面布局工具，可以针对不同视口做出复杂的平面排版设计。以前利用 CSS 中的奇淫技巧才能实现的打印样式，像浮动和 Flexbox，现在可以通过 CSS 栅格轻松实现。

想了解更多请参考：[CSS 栅格系统: 一种新的布局方式](https://webkit.org/blog/7434/css-grid-layout-a-new-layout-module-for-the-web/)

#ECMAScript 2016 & ECMAScript 2017

ECMAScript 2016 和 ECMAScript 2017 是 Javascript 的最新语言标准，Safari 10.1 新增了一些支持。当然，对 ECMAScript 2016 只是做了些微小的工作，毕竟 2016 版的标准由来已久，但 2017 版的标准却带来了不小的改进。

[ECMAScript 2016](https://www.ecma-international.org/ecma-262/7.0/)带来的改进包括：

- 求幂运算符（`x ** y`可以替代`Math.pow(x,y)`，更简洁了！）
- `Array.prototype.includes`（与`Array.prototype.indexOf`类似，只不过能对`NaN`做出识别）

[ECMAScript 2017](https://tc39.github.io/ecma262/)带来了:

- `async`和`await`语法，
- 共享内存对象，包括原子类型（Atomics）和（缓冲数组）Shared Array Buffers
- `String.prototype.padStart`,`String.prototype.padEnd`,`String.prototype.values`和`String.prototype.entries`
- 允许在函数参数列表和调用中使用逗号

# IndexDB 2.0

新版本的 IndexDB 有了更大的提升。它更快，与标准更兼容，并且支持 IndexDB 2.0 的新特性。IndexedDB 2.0 加入了对二进制数据的支持，比如索引键，这样就不用再将其序列化为字符串或者对象数组。不仅如此，还有对象存储和索引重命名，`IDBObjectStore`的`getKey()`和`IDBIndex`的`getPrimaryKey()`。

想了解更多请参考文档：[Indexed Database API 2.0](https://www.w3.org/TR/IndexedDB-2/)

# 自定义元素(Custom Elements)

前端工程师不用再依赖 Javascript 框架来创建可复用组件啦，自定义元素可以轻松做到。和那些内置元素一样，自定义元素也可以通过特性（attributes）设置和获取值，并且还可以通过回调函数响应用户的交互。

了解更多请参考：[自定义元素简介](https://webkit.org/blog/7027/introducing-custom-elements/)

#游戏手柄（Gamepad）

Gamepad API 让 Web App 使用游戏手柄成为可能。在 macOS 中任何无需通过额外驱动就可以使用的游戏手柄，Web App 都可以完美兼容，当然，iOS 中的 MFi 游戏手柄也同样支持。

了解更多请参考：[Gamepad 规范](https://www.w3.org/TR/gamepad/)

# 指针锁

macOS 中的 Safari 通过在元素中使用指针锁，可以让鼠标指针隐藏，同时还可以获取鼠标移动的数据。这个在开发 Web 游戏中特别有用。指针锁还扩展了`MouseEvents`接口，新增了`movementX`和`movementY`两个属性，即使鼠标移出了可视区域，依然能获取流信息。鼠标锁于某个元素时，Safari 还会显示提示栏通知用户鼠标指针已隐藏。第一次按`ESC`键，会关闭提示栏，再次按`ESC`，将会释放指针锁。

更多信息请移步：[Pointer Lock 规范](https://www.w3.org/TR/pointerlock/)

# 全屏下的键盘输入

WebKit 通常会限制在全屏模式下的键盘输入，随着 macOS Safari 10.1 的更新，这一限制已去掉。

# 交互式的表单验证

在旧浏览器时代，你知道我指的是哪一款 o(╯□╰)o，表单验证一直是件头痛的事情，后来 HTML5 引入了一些表单元素的特性，解决了一些常见的验证需求，比如必填，约束数据类型等。Safari 10.1 更进一步，引入了`checkValidity()`和`reportValidity()`两个扩展接口，让提示更标准化，大大减少了 Javascript 代码。

了解更多：[HTML 交互式表单验证](https://webkit.org/blog/7099/html-interactive-form-validation/)

# 输入事件

输入事件简化了富文本输入的实现。新增的`beforeinput`监听并截获默认的输入行为，并通过新特性强化了该事件。

了解更多：[使用输入事件增强编辑体验](https://webkit.org/blog/7358/enhanced-editing-with-input-events/)

# HTML5 的下载特性

`a`标签中的`download`特性标识了是个可下载的链接，用户点击后往往会直接下载资源而非跳转新页面。不仅如此，前端工程师也可以完全使用 Javascript 来创建 blob 数据当做文件资源来下载。如果`download`指定了值，那么就相当于重命名了下载文件的名字。

```html
<a href="https://webkit.org/favicon.ico" download="webkit-favicon.ico"
  >Download Favicon</a
>
```

了解更多：[HTML5 中下载资源](https://html.spec.whatwg.org/multipage/semantics.html#downloading-resources)

# HTML 媒体捕捉

在新版的 Safari 中，HTML 媒体捕捉扩展了其捕捉类型，可以使用设备上的相机和麦克来获取用户输入。

```html
<input name="imageCapture" type="file" accept="image/*" capture />

<input name="videoCapture" type="file" accept="video/*" capture />

<input name="audioCapture" type="file" accept="audio/*" capture />`
```

更多细节请移步：[HTML 媒体捕捉](https://www.w3.org/TR/html-media-capture/)

# 改进了`fixed`和`sticky`元素的定位

当捏合放大（pinch-to-zoom）时，固定和粘连元素的定位表现有了提升，这得归功于**视觉窗口**(visual viewports)。有了视觉窗口，输入元素获取焦点时不再会禁用固定和粘连元素的定位了。

# 改进的 Web 调试

WebKit 新增了针对 Web Worker 的调试支持，同时对正在调试和即将执行的语句高亮，这样，就能清楚看出哪条代码即将执行，在一些控制流程非常复杂或者多条语句写在了一行中，这种改进的体验非常棒。

更详细的介绍请移步：[Javascript 调试改进](https://webkit.org/blog/7219/javascript-debugging-improvements/)

# CSS 全范围色彩（Wide-Gamut Colors）

现在的设备能够支持色域更广的颜色。随着新版本 Safari 的发行，前端工程师能够扩展出更多的色彩想象力，包括 Display P3 色彩域。通过`color-gamut`媒体查询可以测试出显示器是否支持该特性，然后用 CSS 新增的`color()`函数，定义出新的颜色。

```css
@media (color-gamut: p3) {
  .brightred {
    color: color(display-p3 1 0 0);
  }
}
```

更多请访问：[CSS 颜色模块标准](https://drafts.csswg.org/css-color/)

# 后记

这篇文章翻译自[New Web Features in Safari 10.1](https://webkit.org/blog/7477/new-web-features-in-safari-10-1/)，内容略有删减，有些特性我也没搞懂，比如`color-gamut`，所以可能会有词不达意的地方，望见谅。
