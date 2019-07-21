---
slug: "html notes"
date: "2018-3-9 20:32:58"
category: "技术"
tags:
  - html
  - 备忘
  - 面试
draft: true
---

# DOCTYPE 作用？标准模式与混杂模式如何区分？两种模式有何意义?

告诉浏览器使用哪个版本的 HTML 规范来渲染文档。DOCTYPE 不存在或形式不正确会导致 HTML 文档以混杂模式呈现。
标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。

# HTML5 为什么只需要写 <!DOCTYPE HTML>？

HTML5 不基于 SGML（Standard Generalized Markup Language 标准通用标记语言），因此不需要对 DTD（DTD 文档类型定义）进行引用，但是需要 DOCTYPE 来规范浏览器行为。

HTML4.01 基于 SGML，所以需要引用 DTD。才能告知浏览器文档所使用的文档类型，如下：
`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">`

# 行内元素有哪些？块级元素？ 空(void)元素？

行内元素：`a span img input select`
块级元素：`div ul ol li dl dt dd h1 p`
空元素：`<br> <hr> <link> <meta>`

# 页面导入样式时，使用 link 和@import 有什么区别？

相同：都是外部引用 CSS 方式，
不同：

- link 是 xhtml 标签，除了加载 css 外，还可以定义 rss 等其他资源；@import 属于 css 范畴，只能加载 css
- link 引用 css 时候，页面载入时同时加载；@import 需要在页面完全加载以后加载，而且@import 被引用的 css 会等到引用它的 css 文件被加载完才加载
- link 是 xhtml 标签，无兼容问题；@import 是在 css2.1 提出来的，低版本的浏览器不支持
- link 支持使用 javascript 控制去改变样式，而@import 不支持
- link 方式的样式的权重高于@import 的权重
- import 在 html 使用时候需要`<style type="text/css">`标签包裹

# HTML 语义化理解

- 去掉样式也能够让页面呈现出清晰的结构。
- 有助于爬虫抓取更多的信息，爬虫依赖于标签来确定上下文和各个关键字的权重，有利于 SEO。
- 提高可读性，有利于维护。

# cookies，sessionStorage 和 localStorage 的区别？

相同：都是保存在浏览器端，且遵循同源策略
不同：

- cookies 在浏览器和服务器间来回传递，而 sessionstorage 和 localstorage 不会自动把数据发给服务器，仅在本地保存。
- 存储大小的限制不同。cookie 保存的数据很小，不能超过 4k，而 sessionstorage 和 localstorage 保存的数据大，可达到 5M。
- 数据的有效期不同。cookie 在设置的过期时间之前一直有效，即使窗口或者浏览器关闭。sessionstorage 仅在浏览器窗口关闭之前有效。localstorage 始终有效，窗口和浏览器关闭也一直保存，用作长久数据保存。
- 作用域不同。cookie 在所有的同源窗口都是共享；sessionstorage 不在不同的浏览器共享，即使同一页面；localstorage 在所有同源窗口都是共享

# title 与 h1 的区别、b 与 strong 的区别、i 与 em 的区别？

- title 属性没有明确意义，只表示标题；h1 表示层次明确的标题，对页面信息的抓取也有很大的影响
- strong 标明重点内容，语气加强含义；b 是无意义的视觉表示
- em 强调文本；i 是斜体，是无意义的视觉表示
- 视觉标签：`b i u s`，着重视觉。
- 语义标签：`strong em ins del code`，着重语义。
