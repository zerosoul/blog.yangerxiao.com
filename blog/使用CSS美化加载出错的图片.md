---
slug: "style-broken-image-using-css"
date: "2015-05-7 17:31:37"
category: "技术"
tags:
  - css
  - 前端
  - 备忘
---

# 引子

浏览网页时有时会遇到图片加载失败的场景，浏览器往往会给出一个非常丑陋的显示效果：

![加载失败](/images/img_err.png)  
为了更好的用户体验，这里可以仅仅通过 CSS 来优化一下样式。恰巧最近工作上遇到了这样的需求，在此记录下自己是如何解决的。

# 思路

需要注意两个偏理论上的知识点：

1. `img`标签是个[可替换元素](https://www.w3.org/TR/CSS21/generate.html#before-after-content)，即其呈现是由外部资源决定的，也因此`:before`和`:after`这两个伪元素对其不起作用。但是，当图片加载失败时，伪元素就能派上用场了。
2. 可以对`img`标签使用排版相关的 CSS 规则，比如字体，这些规则只对`alt`特性起作用。

运用上面两个特性，我们就能做到当图片加载失败时，对其美化。

# 代码

使用下面结构当做例子：

```html
<img
  src="http://www.somewhere.com/images/broken.jpg"
  alt="马蛋，图片加载出错了..."
/>
```

图片加载失败，下面的 CSS 会发挥作用：

```css
img {
  font-family: "Helvetica";
  font-weight: 300;
  line-height: 2;
  text-align: center; //自此以上的css会影响alt的样式
  width: 100%;
  height: auto;
  display: block;
  position: relative;
}
img:before {
  content: "\\f1c5"" " attr(alt); //content的使用方式请自行谷歌之
  font-family: FontAwesome; //注意使用的是font awesome 哦，别忘了引入。
  color: rgb(100, 100, 100);
  display: block;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

img:after {
  content: "(url: " attr(src) ")";
  display: block;
  position: relative;
  color: #00aeef;
  bottom: -10px;
  z-index: 1000;
}
```

最后，如果图片加载失败，将呈现如下样式：  
![加载失败](/images/img_err_styled.png)

肿么样，是不是好看了很多！
