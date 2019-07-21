---
slug: "json-and-jsonp"
date: "2015-08-27 17:31:37"
category: "技术"
tags:
  - json
  - jsonp
  - javascript
  - jquery
  - 前端
---

# 前言

前端开发有个问题不可避免：**跨域获取异步数据**。我比较推崇的解决方式是：**用 JSON 传数据，靠 JSONP 来跨域**。JSONP 是旧有概念的延伸，所以兼容性非常好，这也是推崇的首要理由。

JSON 和 JSONP 虽然只有一个字母的差别，但其实他们根本不是一回事儿：**JSON 是一种数据交换格式，而 JSONP 是一种依靠开发人员的聪明才智创造出的一种非官方跨域数据交互协议。一个是描述信息的格式，一个是信息传递双方约定的方法。**

# 什么是 JSON

有关 JSON 的概念，曾经写过一篇文章专述，请[移步这里](https://blog.yangerxiao.com/posts/explore-json/)。

概括下其优点：

- 基于纯文本，跨平台传递；
- Javascript 原生支持，后台语言几乎全部支持；
- 轻量级数据格式，占用字符少，特别适合网络传递；
- 可读性较强，虽然比不上 XML 一目了然，但在合理的缩进之后还是易识别的；
- 容易编写和解析；

# 什么是 JSONP

# JSONP 是怎么产生的

我试着用自己的方式来阐释一下这个问题：

1. 一个众所周知的问题，AJAX 直接请求普通文件存在跨域访问的问题，甭管网页是静态的还是动态的，只要是跨域请求，一律不准；
2. 不过，WEB 页面上调用 js 文件时则不受是否跨域的影响（不仅如此，凡是拥有`src`这个属性的标签都有跨域的能力，比如`<script>`、`<img>`、`<iframe>`）；
3. 于是可以判断，当前阶段如果想通过纯 WEB 端（ActiveX 控件、服务端代理、属于未来的 HTML5 之 Websocket 等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进 js 文件里，供客户端调用和进一步处理；
4. JSON 的纯字符数据格式可以简洁的描述复杂数据，更妙的是 JSON 被 javascript 原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；
5. 这样子解决方案就水到渠成了，WEB 客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的 js 格式文件（一般以 JSON 为后缀），显而易见，服务器之所以要动态生成 JSON 文件，目的就在于把客户端需要的数据装入进去。
6. 客户端在对 JSON 文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像 AJAX，但其实并不一样。
7. 为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作 JSONP，该协议的一个要点就是允许用户传递一个`callback`参数给服务端，然后服务端返回数据时会将这个 callback 参数作为函数名来包裹住 JSON 数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

我想 JSONP 的发展历程大概就是这样子，应该八九不离十，下面看一看具体实现。

# 具体实现

1.远程服务器`remote.server.com`根目录下有个`remote.js`文件代码如下：

1

alert('我来自远程文件');

本地服务器`local.server.com`下有个测试页面`test.html`代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JSONP测试页面</title>
    <script src="http://remote.server.com/remote.js"></script>
  </head>
  <body></body>
</html>
```

毫无疑问，页面将会弹出一个提示窗体，显示跨域调用成功。  
2.现在`test.html`页面定义一个函数，然后在远程`remote.js`中传入数据进行调用。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JSONP测试页面</title>
    <script>
      var localHandler = function(data) {
        alert(
          "我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：" +
            data.result
        );
      };
    </script>
    <script src="http://remote.server.com/remote.js"></script>
  </head>
  <body></body>
</html>
```

remote.js 文件代码如下：

```js
localHandler({ result: "我是远程js带来的数据" });
```

运行之后查看结果，页面成功弹出提示窗口，显示本地函数被跨域的远程 js 调用成功，并且还接收到了远程 js 带来的数据。很好，跨域远程获取数据的目的基本实现了，但是又一个问题出现了，怎么让远程 js 知道它应该调用的本地函数叫什么名字呢？毕竟是 JSONP 的服务者都要面对很多服务对象，而这些服务对象各自的本地函数都不相同啊？

3.很容易想到，只要服务端提供的 js 脚本是动态生成的就行了，这样调用者可以传一个参数过去告诉服务端“我想要一段调用 XXX 函数的 js 代码，请你返回给我”，于是服务器就可以按照客户端的需求来生成 js 脚本并响应了。

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JSONP测试页面</title>
    <script>
      // 得到航班信息查询结果后的回调函数
      var flightHandler = function(data){
          alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
      };
      // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
      var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
      // 创建script标签，设置其属性
      var script = document.createElement('script');
      script.setAttribute('src', url);
      // 把script标签加入head，此时调用开始
      document.getElementsByTagName('head')\[0\].appendChild(script);
    </script>
  </head>
  <body></body>
</html>
```

这次的代码变化比较大，不再直接把远程 js 文件写死，而是编码实现动态查询，而这也正是 JSONP 客户端的核心部分。

调用的 url 中传递了一个 code 参数，告诉服务器我要查的是**CA1998**次航班的信息，而**callback**参数则告诉服务器，我的本地回调函数叫做**flightHandler**，所以请把查询结果传入这个函数中进行调用。

服务器很聪明，这个叫做 flightResult.aspx 的页面生成了一段这样的代码提供给 test.html（服务端的实现这里就不演示了，与选用的语言无关，说到底就是拼接字符串）：

```js
flightHandler({
  code: "CA1998",
  price: 1780,
  tickets: 5
});
```

传递给 flightHandler 函数的是一个 JSON，它描述了航班的基本信息。运行页面，成功弹出提示窗口，JSONP 的执行全过程顺利完成。  
4.什么？你用的是 jQuery？那再来一个使用 jQuery 实现 JSONP 的例子：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JSONP测试页面</title>
    <script src="jquery.min.js"></script>
    <script>
      $(function() {
        $.ajax({
          type: "get",
          async: false,
          url: "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998",
          dataType: "jsonp",
          jsonp: "callback",
          //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
          jsonpCallback: "flightHandler",
          //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
          success: function(json) {
            alert(
              "您查询到航班信息：票价： " +
                json.price +
                " 元，余票： " +
                json.tickets +
                " 张。"
            );
          },
          error: function() {
            alert("fail");
          }
        });
      });
    </script>
  </head>
  <body></body>
</html>
```

是不是有点奇怪？为什么这次没有写`flightHandler`这个函数呢？竟然也运行成功了！这就是 jQuery 的功劳了，在处理 JSONP 类型的 ajax 时（虽然 jQuery 也把 JSONP 归入了 AJAX，但它们真的不是一回事儿），自动帮你生成回调函数并把数据取出来供 success 属性方法来调用，很爽有木有？

# 总结

- AJAX 和 JSONP 这两种技术在调用方式上**看起来很像**，目的也一样，都是请求一个 url，然后把服务器返回的数据进行处理，因此 jQuery 把 JSONP 作为 AJAX 的一种形式进行了封装；

- AJAX 和 JSONP 其实本质上是不同的东西。AJAX 的核心是通过[XmlHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)获取非本页内容，而 JSONP 的核心则是动态添加`<script>`来调用服务器提供的 js 脚本。

- AJAX 与 JSONP 的区别不在于是否跨域，AJAX 通过服务端代理一样可以实现跨域，JSONP 本身也不排斥同域的数据的获取。

- JSONP 是一种方式或者说非强制性协议，如同 AJAX 一样，它也不一定非要用 json 格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用 JSONP 提供公开服务。

总而言之，JSONP 不是 AJAX 的一个特例。
