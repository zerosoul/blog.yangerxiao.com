---
slug: "everything-about-promise"
cover: "/images/promise.jpg"
date: "2016-05-26  17:31:37"
category: "它山之石"
tags:
  - 译文
  - 技术
  - javascript
  - promise
---

![javascript promise](/images/promise.jpg)

#引子

先看一段代码：

```javascript
p.then(function(result) {
  // do something with the result
});
```

如果有似曾相识的感觉，那么你在理解 javascript 中的 promise 道路上已经迈出了一步。如果完全懵逼，别怕，接下来我们通过例子来了解 promise 为何物。

作为新概念，一些人理解 promise 起来会有些困难，因为这需要思维上的转变。但是请相信我，经过几个实例的讲解，你会发现它的优雅：它使得让人头痛的异步代码写起来更为轻松，而且可以避免“回调大坑”（[callback hell](http://callbackhell.com/)）。

promise 背后的思想是：

> promise 代表的是异步操作的**最终**（eventual）结果

这意味着异步操作的结果并不能立即获取，而是要等到 promise 稳定了（settled）。

想想你在日常生活中做出承诺（promise）的例子：小时候，你出门对老妈说：我保证（promise）把垃圾带出去。这句话的意思是在稍后的某个时间点你会去做**扔垃圾**这件事并兑现你的承诺。也许几分钟，也许几小时，也许…

promise 亦是如此。当一个函数返回一个 promise，它其实是在说：嘿！我向你承诺，一旦完事，我将带着结果去找你！

#举例

好啦，理论和术语的东西讲多了让人烦，下面我们来例证上面说的一堆话。

AJAX 的概念应该不陌生吧，相信你之前使用过原生[XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)，或者 jQuery 的[\$.ajax()](http://api.jquery.com/jquery.ajax/)，或者其它类库。不过，XMLHttpRequest API 既复杂又难记忆。谢天谢地，新 API [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)简化了 ajax 的应用，并且，它用到了 promise！

这意味着什么？其实，每当你使用 fetch()发出请求，像这样：

```javascript
fetch("/some/endpoint");
```

它就会返回一个 promise 对象。

通常我们会使用回调函数来响应异步请求完成时的操作。但是，在 promise 的世界里，我们得使用`then()`来达到这一目的。

通过链式调用`.then(onFulfilled, onRejected)`来访问`fetch`的结果：

```javascript
fetch("/some/endpoint").then(
  function(result) {
    console.log("Response from the endpoint " + result);
  },
  function(error) {
    console.log("An error occurred: " + error);
  }
);
```

`then`方法提供两个参数：

1. `onFulfilled`：当 promise 完成（fulfilled）时调用，第一个参数表示 promise 的结果。
2. `onRejected`：当 promise 被拒（rejected）时调用，第一个参数表示 promise 被拒的原因。

**完成**和**被拒**是 promise 的两个状态，其实还有第三种状态：挂起（pending）。现在，我们来总结下`fetch`使用 promise 的经过：

1. 从调用`fetch()`那一刻，它就返回了一个 promise 对象
2. 在请求完成之前，promise 的状态一直处于**挂起**
3. promise 由挂起状态，可能会转为**完成**，也可能会是**被拒**。

值得一提的是，一旦 promise 的状态转为完成或被拒，其值将不再改变。

#使用`catch()`错误处理

[Promises/A+ 规范](https://promisesaplus.com/) 提供了一种语法糖来处理 promise 的错误。

假设有个`lookupPrice(itemId)`函数，功能是查找数据库中特定商品的价格，如果存在记录则表示成功，否则表示失败。无论如何，最终返回一个 promise 对象，我们可以使用`catch()`来使代码更具可读性：

```javascript
lookupPrice(123)
  .then(function(price) {
    console.log("The item costs: " + price);
  })

  .catch(function(error) {
    console.log("Could not find an item with that ID");
  });
```

如果商品存在，将会打印：`The item costs: 50`，如果不存在，则打印：`Could not find an item with that ID`。

如果你对`then()`情有独钟，上面的那段代码可以改写成下面的链式调用：

```javascript
lookupPrice(123)
  .then(function(price) {
    console.log("The item costs: " + price);
  }, null)

  .then(null, function(error) {
    console.log("Could not find an item with that ID");
  });
```

> 如果一个 promise 被拒，代码将直接跳到第一个`catch`或者有`onRejected`的`then`链式调用处。

比如当我们使用一个不存在的商品 id 来调用`lookupPrice()`：

```javascript
lookupPrice(99999)
  .then(function(price) {
    console.log("The item costs: " + price);

    return price;
  })

  .then(function(price) {
    console.log("Double the price: " + price * 2);
  })

  .catch(function(error) {
    console.log("Could not find an item with that ID");
  });
```

由于两个`then`都没有`onRejected`，均被忽略了，代码直接跳到`catch`执行。

接下来再列举两个代码片段，它们有细微差别，您瞧好了：  
片段 1：

```javascript
// 使用 then(onFulfilled, onRejected)

lookupPrice(123).then(
  function(price) {
    // lookup another price and return the promise created by lookupPrice(456)

    return lookupPrice(456);
  },
  function(error) {
    console.log("Item 123 does not exist");
  }
);
```

片段 2：

```javascript
// 使用 catch()

lookupPrice(123)
  .then(function(price) {
    // lookup another price and return the promise created by lookupPrice(456)

    return lookupPrice(456);
  })

  .catch(function(error) {
    console.log("Either item 123 OR 456 does not exist");
  });
```

片段 1 中，如果商品 123 不存在，带有`onRejected`的`then`将会被立即执行：

- 在这个例子中将会打印“Item 123 does not exist”
- 然而，并没有给`lookupPrice(456)`指定错误处理函数，所以，如果商品 456 不存在，什么都不会打印。这是个未捕捉到的错误(Uncaught error)。

需要提醒的一点：当你链式调用`then(onFulfilled, onRejected)`，被执行的或者是`onFulfilled`，或者是`onRejected`，绝对不是两个都执行。

片段 2 中：

- 如果商品 123 不存在，代码直接进入`catch`，打印“Either item 123 OR 456 does not exist”
- 由于在`then`之后链式调用了`catch`，在此之前任何 promise 转到了被拒状态，都将进入`catch`。所以，如果商品 456 也不存在，也会在屏幕上看到“Either item 123 OR 456 does not exist”。

# 使用`new Promise()`创建 promise

目前为止，我们通过`fetch`API 来了解了 promise，通过`then`来使用 promise 的结果。多数情况下，我们会用到各式各样的类库来使用 promise。然而，有时还是需要自己创建 promise，自主决定什么情况下转入完成，什么情况下转入被拒。

使用构造函数`Promise(resolver)`来创建 promise 实例，其中`resolver`接收两个参数：resolve 和 reject。似曾相识？恩哼？！

举个栗子：比如我们想创建一个随机数 1 到 10 生成函数，并且返回一个 promise。如果数字小于 5，进入`resolve`（意味着操作成功），如果大于 5，进入`reject`（意味着操作失败）。

```javascript
function generateRandomNumber() {
  return new Promise(function(resolve, reject) {
    var randomNumber = Math.floor(Math.random() * 10 + 1);

    if (randomNumber <= 5) {
      resolve(randomNumber);
    } else {
      reject(randomNumber);
    }
  });
}

generateRandomNumber()
  .then(function(result) {
    console.log("Success: " + result);
  })
  .catch(function(error) {
    console.log("Error: " + error);
  });
```

#链式调用：一次只完成一个任务

链式调用多个`then`，可以做到进一步处理返回值，并且顺序化执行其它异步任务。

在一些业务场景，这非常有用。比如，你要调用某个终端来认证用户，一旦认证成功，我们调用另一个终端来获取用户资料。

上面那个场景用代码来表示的话，类似这样：

```javascript
// 认证id为333的用户

fetch("/auth/333")
  //将响应对象传值给authStatus，用以确认认证成功与否

  .then(authStatus)

  //认证成功了，则继续调用loadProfile，并传入用户名

  .then(loadProfile)

  //认证失败了，进入catch处理程序

  .catch(function(error) {
    console.log(error);
  });

function authStatus(response) {
  if (response.status === 200) {
    //用户名将传入下一个`then`，即loadProfile

    return Promise.resolve(response.userName);
  } else {
    // 认证失败，进入reject

    return Promise.reject("User cannot be authenticated");
  }
}

function loadProfile(userName) {
  fetch("/profile/" + userName).then(function(response) {
    console.log(response.profileData);
  });
}
```

建议花上一两分钟看上几遍上面代码，研究下各个部分是如何组合在一起的。

有两个地方需要特别注意下：

- 一旦 promise 转为**完成**状态，它的值将被当做参数自动传入下一个`then`方法中。
- 如果认证失败，将立即进入`catch`，并略过`.then(loadProfile)`。

# Promise.all()：一次搞定

如果我们不关心异步操作的执行顺序，换句话说，假如我们想在获取用户信息的同时，把最近发表的文章也获取了，该怎么办？

这时候就该`Promise.all()`上场了。它将 promise 数组作为参数传入，并且实例化一个 promise，只有当数组中所有的 promise 都转为完成状态时，该实例化 promise 才进入完成状态。但是，请记住，一旦参数中有一个 promise 是被拒状态，Promise.all()也就进入了被拒状态。要么所有的 promise 都完成，要么全部被拒。

Promise.all()完成返回的结果是一个数组，其中的值对应参数中的 promise 数组。下面根据刚刚提到的那个场景，我们使用 Promise.all()来实现下：

```javascript
Promise.all([
  fetch("/profile/333"), // 获取用户信息

  fetch("/posts/user/333") // 获取用户文章
]).then(function(result) {
  // `result`是一个长度为2的数组

  var profileInfo = result[0].profileData;

  var recentPosts = result[1].posts;

  //处理数据 BLA BLA ~~~
});
```

#就这些了！我保证！（I Promise）

一旦开始在代码中实践 Promise，你会发现一切都变得相当简单。因此我建议你打开 Chrome/Firefox 的开发者工具，走一遍这篇文章里的例子。

需要指出的是，有一个 Promise 的 API 我还没有提及:`Promise.race()`。它和`Promise.all()`类似，传入一个 promise 数组，并实例化一个 promise，但不同之处在于传入的 promise 有任何一个转为完成，实例化的 promise 便进入完成，任何一个 promise 转为被拒，便进入被拒。个人认为，这并不十分实用，但我认为有一些特定业务场景会用得上它，你可以在[这儿](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)熟悉下这个 API，祝好运！

#参考链接

- [JavaScript Promises: Plain and Simple](https://coligo.io/javascript-promises-plain-simple/)

- [MDN:Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
