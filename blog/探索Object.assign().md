---
slug: "explore-object-assign"
cover: "/images/obj.jpg"
date: "2016-03-25 17:31:37"
category: "技术"
tags:
  - javascript
  - ES6
  - 前端
---

![extend obj](/images/obj.jpg)

# 起因

最近在重构以前写过的**javascript**代码，目的是为了去掉对**jQuery**的依赖。其中有多处用到了[`$.extend()`](http://api.jquery.com/jQuery.extend/)方法，自然而然会想到这么一个问题：如何用自己的方式来实现？

# 思路

首先，定义函数的功能：**传入多个对象，将多个对象的内容合并到第一个对象中，最后返回合并后的对象，即参数中的第一个对象。**这样的定义是否似曾相识？没错，和 ES6 中的新特性`Object.assign()`几乎一模一样。所以，可以从探索`Object.assign()`开始。

#探索 Object.assign()

`Object.assign(target, ...sources)`

# 使用场景

## 拷贝对象

只需要传入的第一个参数是空对象即可：

```js
var obj = { foo: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { foo: 1 }
```

## 合并对象

注意第一个传参将会被改变，所以如果不想改变第一个有值参数，可以传入一个空对象：

```js
var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };
var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }, 注意第一个参数，即o1有了变化。
```

# 注意事项

- 在`Object.assign()`中，原型属性和非可枚举属性不会被拷贝。（[两种属性的解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)）

  ```js
  var obj = Object.create(
    { foo: 1 },
    {
      // foo是obj原型链上的属性
      bar: {
        value: 2 // bar 是非可枚举（non-enumerable）属性.
      },
      baz: {
        value: 3,
        enumerable: true // baz是可枚举属性.
      }
    }
  );
  var copy = Object.assign({}, obj);
  console.log(copy); // { baz: 3 }，只拷贝了baz属性
  ```

- 元类型会被转化为对象

  ```js
  var v1 = "abc";
  var v2 = true;
  var v3 = 10;
  var obj = Object.assign({}, v1, null, v2, undefined, v3);
  //元类型里面的字符串被转化为字符数组，null和undefined被忽略
  console.log(obj); // { "0": "a", "1": "b", "2": "c" }
  ```

- 异常会抛出，但是已经执行的代码会生效

  ```js
  var target = Object.defineProperty({}, "foo", {
    value: 1,
    writable: false
  }); // target.foo 为只读属性
  Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
  // 会抛出异常：TypeError: "foo" is read-only，但是之前的赋值操作已经生效。
  console.log(target.bar); // 2
  console.log(target.foo2); // 3
  console.log(target.foo); // 1, 异常就是在这儿发生的，所以还是1
  console.log(target.foo3); // undefined
  console.log(target.baz); // undefined
  ```

  #pollyfill

上面是对`Object.assign()`概念层面的探索，由于要考虑旧版本浏览器兼容性问题，需要写一个**pollyfill**，其实这才是重头戏。不过，只有理解了`Object.assign()`都干了些什么，才有可能写出来：

```js
(function() {
  if (typeof Object.assign != "function") {
    Object.assign = function(target) {
      //第一个传参不能是undefined和null，因为它们不能被转为对象
      if (target === undefined || target === null) {
        throw new TypeError("Can not convert undefined or null to object");
      }
      //使用Object对象化target
      var output = Object(target);
      for (var idx = 1, l = arguments.length; index < l; idx++) {
        var source = arguments[idx];
        //后续传参也需要判断undefined和null
        if (source !== undefined && source !== null) {
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              output[key] = source[key];
            }
          }
        }
      }
      return output;
    };
  }
})();
```

# 结束

好了，现在可以在宿主环境大胆使用`Object.assign()`了，Let’s rock it~~~

# 参考链接：

[MDN:Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill)
