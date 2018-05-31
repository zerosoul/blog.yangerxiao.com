---
slug: "using-image-error-event-correctly"
date: "2014-11-25 17:31:37"
category: "技术"
tags:
    - 前端
    - jquery
    - javascript
---
#问题

经常遇到图片加载不上的问题，一般解决这个问题的方式就是给`image`绑定`error`事件，当图片加载出错，触发该事件，然后给image重新指定一个通用图片：

#解决
``` html

<img src="image.png" onerror="imgError(this);"/>

<script>

function imgError(image) {

    image.onerror = "";

    image.src = "/images/error.gif";

    return true;

}

</script>
```

更简短的方式：

``` html

<img src="image.png" onError="this.onerror=null;this.src='/images/noimage.gif';" />
```
有个地方值得注意：当触发错误事件时，首先要做的就是清楚错误事件`image.onerror = "";`，否则万一后面重新指定图片时，依然报错，就会陷入死循环，直接stack overflow了。

#更好的方式（jQuery）

以上方式虽然精简，但并不提倡将绑定事件混合在HTML结构中，所以我们用jQuery重新实现一下：

``` js
$("img").error(function () {

  $(this).off("error").attr("src", "/images/error.gif");

});
``` 
jQuery还有个API：[.one](http://api.jquery.com/one/)，也就是给元素绑定只触发一次的事件，非常适合干这事儿：


``` js
$('img').one('error', function() { this.src = '/images/error.gif'; });
```