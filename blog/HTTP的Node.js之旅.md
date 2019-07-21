---
slug: "Anatomy-of-an-HTTP-Transaction"
cover: "/images/http.jpg"
date: "2016-04-29 17:31:37"
category: "它山之石"
tags:
  - 译文
  - 技术
  - nodejs
  - javascript
---

![http](/images/http.jpg)

# 前言

前两天 node.js 发布了新版本，想看看具体更新了啥，于是去[官网](http://nodejs.org)找 changelog 看了看，顺便逛了逛其它栏目。没想到，在 DOCS 下的[Guides](https://nodejs.org/en/docs/guides/)发现了一篇好文，讲的是 node.js 对 http 请求的处理过程，虽然不是很适合初学者，但顺藤摸瓜，能挖掘出许多知识点，串联起来，干货满满。下面是译文，没有逐字逐句翻译，有添油加醋的地方，但不影响原文的表达。

# 译文

## 温馨提示

这篇文章目的在于阐释 HTTP 请求在 node.js 中的处理过程。所以前提是假定你知道 HTTP 为何物，并且对 node.js 的[EventEmitters](https://nodejs.org/api/events.html)和[Streams](https://nodejs.org/api/stream.html)有所了解，否则，最好快速过一下有关的[API](https://nodejs.org/dist/latest-v6.x/docs/api)。

## 创建服务器

任何一个 node web server 在代码某一处都会通过[createServer](https://nodejs.org/api/http.html#http_http_createserver_requestlistener)创建一个 web 服务器对象.

```javascript
var http = require("http");
var server = http.createServer(function(request, response) {
  // 见证奇迹的时刻
});
```

作为参数传入`createServer`的函数是 http 请求必由之路，因此也叫作请求处理函数。事实上，`createServer`返回的`server`对象是一个`EventEmitter`，因此，上面那段代码也可以这么写：

```javascript
var server = http.createServer();
server.on("request", function(request, response) {
  // 见证奇迹的时刻
});
```

当请求来临时，node.js 会调用请求处理函数，并且封装好了两个常用对象：**request**和**response**。稍后我们会经常碰到这两个家伙的。

花开两朵，各表一枝。为了能够接收到 http 请求，还需要调用`server`对象的`listen`方法。多数情况下，你只需要传给`listen`一个端口号。还有一些其他设置，感兴趣的话请参考[这里](https://nodejs.org/api/http.html)

## Method-URL-和-Headers

处理一个请求时，你想知道的第一件事可能就是看一下这个请求的`method`和`url`，然后才会有相应的处理。node.js 把这两个信息放在了`request`对象里了，直接调用即可：

```javascript
var method = request.method;
var url = request.url;
```

> 注:request 对象是 [IncommingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)的一个实例

`Headers`也在`request`对象里：

```javascript
var headers = request.headers;
var userAgent = headers["user-agent"];
```

需要注意的是，无论客户端发送的是什么，node.js 把所有的头信息关键词都小写化了。变单一的同时也就减少了因分歧出错的可能性。还有，如果有重复的头信息，有些会重写，有些会使用`,`合并成字符串。在一些场景可能会出现问题，没关系，`request`中还有个[rawHeaders](https://nodejs.org/api/http.html#http_message_rawheaders)，你值得拥有。

## Request-Body（请求体）

当请求方法是`PUT`或者`POST`时，请求体就成了重点关注对象。获取请求体，相对于获取上面那三个值，就需要多知道点了：`request`对象实现了[ReadableStream](https://nodejs.org/api/stream.html#stream_class_stream_readable)接口，所以能够被监听或者管道化。因此，我们可以通过监听`data`和`end`事件来获取流内数据。

`data`过来的数据块都是[Buffer](https://nodejs.org/api/buffer.html)。如果你清楚的知道传输过来的数据是字符串，那么最好将它们存放在一个数组里，在`end`事件中，合并(concatenate)并字符串化(stringify)。

```javascript
var body = [];
request
  .on("data", function(chunk) {
    body.push(chunk);
  })
  .on("end", function() {
    body = Buffer.concat(body).toString();
    // 代码执行到这里，body就拥有了整个字符串形式的数据了。
  });
```

> 注：多数情况下，这样做有些啰嗦。幸运的是，npm 上有许多能将这些逻辑隐藏的优秀模块，比如[concat-stream](https://www.npmjs.com/package/concat-stream)和[body](https://www.npmjs.com/package/body)。即便如此，还是希望能够好好理解一下这个细节，因为这属于基础。

## 有关错误（Errors）

既然`request`是一个`EventEmitter`，那么当有错误时，就可以触发`error`事件。**如果你没有监听这个事件，错误会被抛出，进而很可能导致 node.js 程序的崩溃。**所以，最佳实践便是给`request`增加`error`事件，在事件回调函数里面做一下日志记录的同时，最好给客户端返回对应的错误码，这个在后面会提到。

```javascript
request.on("error", function(err) {
  // console的错误标准输出

  console.error(err.stack);
});
```

有关错误的处理，还有其它方式，可以参考[这里](https://nodejs.org/api/errors.html)。记住，错误随时会发生，要对此有所警惕，对其有专门的处理总是好的。

## 小结一下

走到这里，我们已经创建了一个 web 服务器，获取到了请求的`method`，`url`和`headers`，哦，还有请求体内容。现在我们将这些放在一起：

```javascript
var http = require("http");

http
  .createServer(function(request, response) {
    var headers = request.headers;

    var method = request.method;

    var url = request.url;

    var body = [];

    request
      .on("error", function(err) {
        console.error(err);
      })
      .on("data", function(chunk) {
        body.push(chunk);
      })
      .on("end", function() {
        body = Buffer.concat(body).toString();

        // 至此，我们就获取到了所有需要响应给客户端的数据
      });
  })
  .listen(8080); // Activates this server, listening on port 8080.
```

很显然，如果运行这个代码，服务器能接收到请求（request），但没发出响应（response）。也就是说，在浏览器里面发出请求，会超时。

目前为止，我们还未碰触`response`对象，它是[ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)的一个实例，也是一个[WritableStream](https://nodejs.org/api/stream.html#stream_class_stream_writable)，为了将数据传回客户端，其中包含了许多实用方法。好吧，依旧是花开两朵，各表一枝，我们先认识下 http 状态码，待会儿再谈`response`对象。

## HTTP 状态码

`response`默认状态码是`200`。当然，有些情况下，你需要返回不同的状态码。`response`中的`statusCode`属性就是为此存在的：

```javascript
response.statusCode = 404; //告诉客户端资源未找到...
```

## 设置响应头

`response`中的`setHeader`该出场了：

```javascript
response.setHeader("Content-Type", "application/json");

response.setHeader("X-Powered-By", "bacon");
```

需要注意的是，响应头关键词对大小写不敏感，如果重复设置一个响应头，那么客户端取到的是你最后一个。

## 显式发送响应头

上面提到的`statusCode`和`setHeader`属于**隐式头部**：意思是在发送 body 数据前，依赖的是 node.js 来发送头部数据。

如果你愿意，也可以显式地将头部信息写到响应流里。`writeHead`便是为此而生：

```javascript
response.writeHead(200, {
  "Content-Type": "application/json",

  "X-Powered-By": "bacon"
});
```

设置完头部，接下来便是发送响应数据了。

## 发送响应数据

既然`response`对象是个`WritableStream`，那么就可以使用流方法来向客户端写数据了。

```javascript
response.write("<html>");

response.write("<body>");

response.write("<h1>Hello, World!</h1>");

response.write("</body>");

response.write("</html>");

response.end();
```

以上代码也可以简写成以下形式：

```javascript
response.end("<html><body><h1>Hello, World!</h1></body></html>");
```

> 注:响应体在响应头之后，因此往 response 里写数据之前就设置好状态码和头信息，一切才会有意义。

## Response 的错误处理

与`request`一样，`response`也会触发`error`事件。所以，有关`request`错误处理最佳实践，同样也适用于`response`。

## 再来小结一下

目前来讲，我们已经不会让浏览器傻等了。那么，把所有代码放在一起，我们可以做到让服务端把浏览器过来的请求组织下数据再传送过去，注意，使用`JSON.stringify`格式化了下数据：

```javascript
var http = require("http");

http
  .createServer(function(request, response) {
    var headers = request.headers;

    var method = request.method;

    var url = request.url;

    var body = [];

    request
      .on("error", function(err) {
        console.error(err);
      })
      .on("data", function(chunk) {
        body.push(chunk);
      })
      .on("end", function() {
        body = Buffer.concat(body).toString();

        // BEGINNING OF NEW STUFF

        response.on("error", function(err) {
          console.error(err);
        });

        response.statusCode = 200;

        response.setHeader("Content-Type", "application/json");

        // 注：上面两行代码可以用下面一行替换

        // response.writeHead(200, {'Content-Type': 'application/json'})

        var responseBody = {
          headers: headers,

          method: method,

          url: url,

          body: body
        };

        response.write(JSON.stringify(responseBody));

        response.end();

        // 注：同样，可以这样替换

        // response.end(JSON.stringify(responseBody))

        // END OF NEW STUFF
      });
  })
  .listen(8080);
```

## Echo-服务器

基于上面代码，我们可以简化一下，做出一个 Echo 服务器，即请求什么数据，就返回什么数据。我们只需要从请求里面获取数据并写到响应里，和上面代码差不多：

```javascript
var http = require("http");

http
  .createServer(function(request, response) {
    var body = [];

    request
      .on("data", function(chunk) {
        body.push(chunk);
      })
      .on("end", function() {
        body = Buffer.concat(body).toString();

        response.end(body);
      });
  })
  .listen(8080);
```

好吧，有些过于简单，我们再增加两个需求，满足下面两个条件才给出正确响应：

1. 请求的`method`是`GET`
2. URL 是`/echo`，否则给出`404`。

```javascript
var http = require("http");
http
  .createServer(function(request, response) {
    if (request.method === "GET" && request.url === "/echo") {
      var body = [];
      request
        .on("data", function(chunk) {
          body.push(chunk);
        })
        .on("end", function() {
          body = Buffer.concat(body).toString();
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);
```

> 注：检查 URL，实质上就是一种路由`routing`形式。其它形式有简单如`swtich`语句，复杂如**[Express](https://www.npmjs.com/package/express)**框架。如果需要纯路由功能，可以试试[Router][https://www.npmjs.com/package/router]。](https://www.npmjs.com/package/router]。)

上面的代码能不能再精简下呢？别忘了，`request`对象是一个`ReadableStream`，`response`对象是一个`WritableStream`。这意味着可以使用管道（pipe）直接将数据从一端传到另一端。所以，更为精简的代码诞生了：

```javascript
var http = require("http");

http
  .createServer(function(request, response) {
    if (request.method === "GET" && request.url === "/echo") {
      request.pipe(response);
    } else {
      response.statusCode = 404;

      response.end();
    }
  })
  .listen(8080);
```

事情还没完，程序出错了怎么办？好吧，加上错误处理机制：在此，我们仅仅打印出错误，并将状态码置为`404`。（更为详细的错误处理机制可以参考[这里](https://nodejs.org/api/errors.html)）

```javascript
var http = require("http");

http
  .createServer(function(request, response) {
    request.on("error", function(err) {
      console.error(err);

      response.statusCode = 400;

      response.end();
    });

    response.on("error", function(err) {
      console.error(err);
    });

    if (request.method === "GET" && request.url === "/echo") {
      request.pipe(response);
    } else {
      response.statusCode = 404;

      response.end();
    }
  })
  .listen(8080);
```

OK，node.js 如何处理 http 请求，目前为止，我们已经把大部分的基础知识讲解到了。最后，我们总结下这些知识点：

1. 实例化一个 HTTP 服务器，并设置一个请求处理函数，另外别忘了监听一个端口
2. 从`request`获取`headers`,`url`,`method`,`body`等信息
3. 根据`url`或者其它信息路由
4. 通过`response`发送响应头、状态码和数据
5. `request`数据管道化到`response`
6. 对`request`和`response`设置错误处理机制

# 参考

- 原文链接：[Anatomy of an HTTP Transaction](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
- [EventEmitters](https://nodejs.org/api/events.html)
- [Streams](https://nodejs.org/api/stream.html)
- [HTTP](https://nodejs.org/api/http.html)
