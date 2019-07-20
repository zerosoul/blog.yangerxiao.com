---
slug: "change-element-type-using-jquery"
date: "2015-8-8 17:31:37"
category: "技术"
tags:
  - jquery
  - javascript
  - 备忘
---

# 起因

工作当中遇到个有点意思的技术需求：把某个`div`元素替换成`a`元素。本以为使用 jQuery 会有现成的 API，类似`$(element).changeType("a")`啥的，一行代码搞定，结果没找到 o(╯□╰)o，看来好久没用 jQuery 的后果就是喜欢意淫没有的 API。自己动手，丰衣足食。

# 思路

1. 获取要替换的元素特性集合，暂存到一个变量里。
2. 构造新的元素，即目标元素，并将暂存的特性赋到该元素中。
3. 使用[jQuery API:replaceWith](http://api.jquery.com/replaceWith/)，将要替换的元素用新构造的元素替换之。

# 代码实现

```js
//source element:div.from
var attrs = {};
var $srcEle = $("div.from");
$.each($srcEle[0].attributes, function(idx, attr) {
  attrs[attr.nodeName] = attr.nodeValue;
});
var $targetEle = $("<a/>", attrs).append($srcEle.contents());
$(this).replaceWith(function() {
  return $targetEle;
});
```

当然，为了更具通用性，可以做成一个插件：

```js
(function($) {
  $.fn.changeElementType = function(newType) {
    this.each(function() {
      var attrs = {};
      $.each(this.attributes, function(idx, attr) {
        attrs[attr.nodeName] = attr.nodeValue;
      });
      $(this).replaceWith(function() {
        return $("<" + newType + "/>", attrs).append($(this).contents());
      });
    });
  };
})(jQuery);
```

# 最后说一句

意淫没关系，或许正是开始创作的好契机。
