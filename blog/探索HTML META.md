---
slug: "explore-html-meta"
date: "2014-3-18 17:31:37"
category: "技术"
tags:
  - 前端
  - html
---

# 概述

元数据(metadata)是指**数据的数据**，通常是通过 HTML 中的`<meta>`标签来表示的。它的作用就是用来描述页面的信息，而这些信息通常情况下不能通过其它标签来呈现。除此之外，`<meta>`也可以用来模拟 HTTP 响应头（像跳转另一个页面），还有像`http-equiv`和`charset`这样的特性，具体细节在[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)已经描述的很清楚了。

# `<meta>`很重要

在过去，`<meta>`为搜索引擎所用，根据其提供的**标题**、**描述**和**关键字**来建立网页索引。如果人人都遵守规则地使用它，将带来巨大的好处：信息检索准确。然而，后来一些网站开始滥用`<meta>`，向里面添加了许多流行词，以期望能从搜索引擎带来更多的流量。魔高一尺，道高一丈，Google 在 2009 年已经宣布不再使用**描述**和**关键字**来建立索引。

虽然**描述**对搜索引擎的排行没有影响，但它还是会出现在搜索结果中。这意味着用户在点进去之前，会先读一读这个网页的描述，从这个角度来看，我们还是得写好描述，不是给机器人看到，是给用户看。  
![description](/images/desc.png)

# `<meta>`的多种用途

根据`<meta>`不同的[`name`](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#standard-metadata-names)，会有不同作用的`<meta>`。

比如：

```html
<meta name="description" content="页面的描述" />
<meta name="author" content="杨二" />
<!-- 声明页面的作者 -->
<meta charset="UTF-8" />
<!-- 声明页面的编码 -->
<meta http-equiv="refresh" content="5;url=https://zerosoul.github.io/" />
<!-- 5秒后页面跳转到https://zerosoul.github.io/ -->
```

# 一些过时的用法

```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="copyright" content="SitePoint" />
```

# 用于社交

```html
<!-- facebook -->
<meta property="og:title" content="The best site" />
<meta property="og:image" content="link\_to\_image" />
<meta property="og:description" content="description goes here" />
<!-- twitter -->
<meta property="twitter:title" content="The best site" />
<meta property="twitter:image" content="link\_to\_image" />
<meta property="twitter:description" content="description goes here" />
```

# 总结

`<meta>`并不会解决所有的 SEO 问题，但它确实在这个领域里扮演重要角色。
