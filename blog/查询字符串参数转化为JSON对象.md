---
slug: "convert-query-params-to-json"
date: "2014-7-29 17:31:37"
category: "技术"
tags:
    - hexo
    - github
    - nodejs
    - 前端
---
#引子

工作中经常需要获取浏览器地址栏URL的参数，常用的套路便是将这些参数转化为键值对，方法有许多，我喜欢简单明了，所以尝试自己总结下。

#过程

首先，获取参数字符串
``` javascript
location.search.slice(1);
``` 
这里用到了[location](https://developer.mozilla.org/en-US/docs/Web/API/window.location)和[slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

然后，将参数转为数组，然后在数组里做文章。

``` javascript
var pairs=location.search.slice(1).split('&');
``` 
接下来，使用[forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)遍历`pairs`，并在每次遍历时使用`=`分隔符，来提取键值对。当然，一些可能遇到的场景也需要考虑下，比如，**值为空**和**使用[decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)解码一下**。

``` javascript
var pairs = location.search.slice(1).split('&');

var result = {};

pairs.forEach(function(pair) {

    pair = pair.split('=');

    result[pair[0]] = decodeURIComponent(pair[1] || '');

});
``` 
最后一步，相当简单，使用[JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)解析一下，然后用[JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)再转化回来。

``` javascript
JSON.parse(JSON.stringify(result));
``` 
#最终代码
``` javascript

function QueryStringToJSON() {            

    var pairs = location.search.slice(1).split('&');

    var result = {};

    pairs.forEach(function(pair) {

        pair = pair.split('=');

        result[pair[0]] = decodeURIComponent(pair[1] || '');

    });

    return JSON.parse(JSON.stringify(result));

}

var query_string = QueryStringToJSON();
```