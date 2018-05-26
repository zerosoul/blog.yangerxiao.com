---
slug: "jquery-best-practice"
cover: "https://unsplash.it/400/300/?random?BoldMage"
date: "2016-03-6 17:31:37"
category: "技术"
tags:
    - 前端
    - 备忘
    - jQuery
    - 最佳实践
---
![jquery](jquery.jpg)

[](#前言 "前言")前言
==============

使用[jQuery](http://jquery.com/)已经有两年，其[API](https://api.jquery.com/)用起来非常的爽，甚至都成为了事实上的标准，以至于好多前端小白把jQuery等同于Javascript。虽然jQuery的普及度很高，但遵循最佳实践来写jQuery代码的却寥寥无几，下面就自己在工作的积累来写一些jQuery的最佳实践（也有从网络上搜集的）。

[](#加载jQuery "加载jQuery")加载jQuery
================================

-   使用CDN加载，[去掉`http:`或者`https:`](http://www.paulirish.com/2010/the-protocol-relative-url/)，同时做好本地fallback。
    
    1
    
    2
    
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    
    <script>window.jQuery || document.write('<script src="js/jquery-2.1.4.min.js" type="text/javascript"><\/script>')</script>
    
-   如果可能，请在底部加载jQuery外部文件
    
-   有关版本问题
    -   如果需要支持Internet Explorer 6/7/8，那就不要使用2.x
    -   对于web app，请大胆使用最新版本的jQuery，当然，也可以选择[zepto.js](http://zeptojs.com/)
    -   不要使用[jquery-last.js CDN](http://blog.jquery.com/2014/07/03/dont-use-jquery-latest-js/)
-   检测浏览器特性，请用[Modernizr](http://modernizr.com/)

[](#变量 "变量")变量
==============

-   所有的jQuery对象命名最好加个`$`前缀加以区分
-   缓存通过选择符获取的jQuery对象，以待复用：
    
    1
    
    2
    
    var $myDiv = $("#myDiv");
    
    $myDiv.click(function(){...});
    

[](#DOM操作 "DOM操作")DOM操作
=======================

-   对于一些较为复杂的DOM操作，可以先`.detach()`，原因[参考此处](http://learn.jquery.com/performance/detach-elements-before-work-with-them/)
    
    1
    
    2
    
    3
    
    var $myList = $("#list-container > ul").detach();
    
    //...在$myList上做了一系列复杂的操作后...
    
    $myList.appendTo("#list-container");
    
-   链式调用
    
    -   链式调用让代码更具可读性
        
        1
        
        $("#myDiv").addClass("error").show();
        
    -   当调用过多时，注意合理加缩进，时刻维持代码可读性
        
        1
        
        2
        
        3
        
        4
        
        5
        
        $("#myLink")
        
            .addClass("bold")
        
            .on("click", myClickHandler)
        
            .on("mouseover", myMouseOverHandler)
        
            .show();
        

[](#选择器 "选择器")选择器
=================

-   尽可能使用ID选择器，因为jQuery源码中调用的是`document.getElementById()`
-   当使用类选择器时，没必要再附加元素标签了
    
    1
    
    2
    
    var $products = $("div.products"); // SLOW
    
    var $products = $(".products"); // FAST
    
-   对于像*Id->Child*这样的嵌套选择器，使用`.find()`性能更好些，因为id选择器不走Sizzle引擎，这能节约一些性能损耗。
    
    1
    
    2
    
    3
    
    4
    
    5
    
    // BAD, 全部走的Sizzle选择器引擎
    
    var $productIds = $("#products div.id");
    
    // GOOD, #products 走的是document.getElementById()，因此只有div.id走Sizzle 选择器引擎
    
    var $productIds = $("#products").find("div.id");
    
-   选择器父类越模糊越好，子类越详细越好。[参考此处](http://learn.jquery.com/performance/optimize-selectors/)
    
    1
    
    2
    
    3
    
    4
    
    5
    
    // 未经优化的
    
    $("div.data .gonzalez");
    
    // 优化后的
    
    $(".data td.gonzalez");
    
-   给选择器以上下文
    
    1
    
    2
    
    3
    
    4
    
    5
    
    // SLOWER 遍历了整个文档的class
    
    $('.class');
    
    // FASTER 只在#class-container下遍历
    
    $('.class', '#class-container');
    
-   避免使用通配符`*`
    
    1
    
    2
    
    $('div.container > *'); // BAD
    
    $('div.container').children(); // BETTER
    
-   没有必要嵌套或组合使用ID选择器
    
    1
    
    2
    
    3
    
    4
    
    $('#outer #inner'); // BAD
    
    $('div#inner'); // BAD
    
    $('.outer-container #inner'); // BAD
    
    $('#inner'); // GOOD,  document.getElementById()搞定一切
    

[](#事件 "事件")事件
==============

-   每个页面有且仅有一个DOMReady事件，便于调试。
-   尽量不要使用匿名函数来用作事件处理，因为不利于调试，测试，维护和复用。
    
    1
    
    2
    
    3
    
    4
    
    5
    
    // BAD
    
    $("#myLink").on("click", function(){...}); 
    
    // GOOD
    
    function myLinkClickHandler(){...}
    
    $("#myLink").on("click", myLinkClickHandler);
    
-   避免HTML结构中声明并绑定事件处理函数，这非常不利于调试，也破坏了HTML紧做结构表现的职责。
    
    1
    
    2
    
     <!\-\- BAD -->
    
    <a id="myLink" href="#" onclick="myEventHandler();">my link</a>
    
    1
    
    $("#myLink").on("click", myEventHandler); // GOOD
    
-   使用[事件代理机制](http://learn.jquery.com/events/event-delegation/)，一个明显的好处就是当有新子元素插入时，不用重新绑定事件，[参考此处](http://api.jquery.com/on/#direct-and-delegated-events)。
    
    1
    
    2
    
    $("#list a").on("click", myClickHandler); // BAD, 相当于给list下的所有a元素都绑定了click事件.
    
    $("#list").on("click", "a", myClickHandler); //GOOD, 只给父元素list绑定了click事件.
    

[](#Ajax "Ajax")Ajax
====================

-   熟习`$.ajax()`，尽量不要用`.get()`,`.getJson()`这样的简洁方式。
    
    1
    
    2
    
    3
    
    4
    
    5
    
    6
    
    7
    
    8
    
    9
    
    10
    
    11
    
    12
    
    13
    
    14
    
    15
    
    //ajax模板
    
    var jqxhr = $.ajax({
    
        url: url,
    
        type: "POST", // 默认GET
    
        cache: true, // 默认true, 但对于dataType为'script'或者'jsonp'，则为false
    
        data: {}, // 请求附带的参数
    
        dataType: "json", 
    
        jsonp: "callback", // 指定回调参数的名称
    
        statusCode: { // 在此指定相应的响应状态的回调函数
    
            404: handler404,
    
            500: handler500
    
        }
    
    });
    
    jqxhr.done(successHandler);
    
    jqxhr.fail(failureHandler);
    
-   请求地址最好用*无协议的URL*，即去除`http:/https:`
    
-   使用`data`对象传送数据，而非附加在URL里
    
    1
    
    2
    
    3
    
    4
    
    5
    
    6
    
    7
    
    8
    
    9
    
    10
    
    11
    
    // 可读性不好...
    
    $.ajax({
    
        url: "something.php?param1=test1&param2=test2",
    
        ....
    
    });
    
    // 更具可读性...
    
    $.ajax({
    
        url: "something.php",
    
        data: { param1: test1, param2: test2 }
    
    });
    
-   使用Promise风格，[例子](http://www.htmlgoodies.com/beyond/javascript/making-promises-with-jquery-deferred.html)
    
    1
    
    2
    
    3
    
    4
    
    5
    
    6
    
    $.ajax({ ... }).then(successHandler, failureHandler);
    
    // OR
    
    var jqxhr = $.ajax({ ... });
    
    jqxhr.done(successHandler);
    
    jqxhr.fail(failureHandler);
    

[](#动画效果 "动画效果")动画效果
====================

-   不要滥用动画效果，或者干脆不用，直到PM有切实需求。
-   如果用动画，优先使用像`show/hide`和`slideUp/slideDown`这样的简单API

[](#插件 "插件")插件
==============

-   优先考虑有良好文档，有测试用例，有社区支持的插件
-   使用插件前不要忘记检测与你正在使用的jQuery版本是否冲突
-   任何可复用的组件都应该插件化，这里有个[插件模板](https://john-dugan.com/jquery-plugin-boilerplate-explained/)。

[](#其他 "其他")其他
==============

-   使用对象字面量设置特性
    
    1
    
    2
    
    3
    
    4
    
    5
    
    6
    
    7
    
    8
    
    // BAD
    
    $myLink.attr("href", "#").attr("title", "my link").attr("rel", "external"); // 
    
    // GOOD
    
    $myLink.attr({
    
        href: "#",
    
        title: "my link",
    
        rel: "external"
    
    });
    
-   避免使用jQuery添加CSS
    
    1
    
    2
    
    // BAD
    
    $("#mydiv").css({'color':red, 'font-weight':'bold'}); // BAD
    
    定义好CSS rule
    
    1
    
    .error { color: red; font-weight: bold; } /\* GOOD */
    
    然后通过jQuery添加class
    
    1
    
    $("#mydiv").addClass("error"); // GOOD
    

[](#优秀资源 "优秀资源")优秀资源
====================

-   [jQuery API Docs](http://api.jquery.com/)
-   [jQuery Learn](http://learn.jquery.com/)
-   [jQuery Performance](http://learn.jquery.com/performance/)
-   [A jQuery Plugin Boilerplate Explained](https://john-dugan.com/jquery-plugin-boilerplate-explained/)