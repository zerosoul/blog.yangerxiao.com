---
slug: "javascript symbol"
date: "2018-1-29 20:32:58"
category: "技术"
tags:
    - es6
    - javascript
    - 备忘
---
# ES6第七种数据类型：Symbol

Javascript已有6种数据类型: **Undefined,Null,布尔值,字符串,数值,对象**。现在ES6新加入一种数据类型：Symbol。

它的最大特点: **独一无二**。

``` js
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false
```

这里的`foo`是该Symbol的一个描述，并非两个参数都为'foo' ，就能够使得这两个Symbol相同。

作为属性名的使用

``` js
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
var a = { [mySymbol]: 'Hello!'};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

注意，这里不可以使用 `a.mySymbol = 'hello';` 来填充该属性值。因为点运算符后面总是字符串.

# 为什么要使用Symbol?

那么问题来了，究竟为什么要使用Symbol呢？有这样一种场景：我们想区分两个属性，其实我们并不在意，这两个属性值究竟是什么，我们在意的是，这两个属性绝对要区分开来！例如:
``` js
var shapeType = { triangle: 'Triangle'};
function getArea(shape, options) { 
    var area = 0; 
    switch (shape) { 
      case shapeType.triangle:
      area = .5 * options.width * options.height; 
      break; 
    } 
    return area;
}
getArea(shapeType.triangle, { width: 100, height: 100 });
```

这个时候，我们仅仅是想区分各种形状，因为不同的形状用不同公式来算面积。这里使用的是triangle的名字叫做**Triangle**，事实上我们不想对triangle去特地取个名，我们只想要区分triangle这个形状不同于任何其他形状，那么这个时候Symbol就派上用场了。

``` js
const shapeType = {
   triangle: Symbol()
};
```
也就是说，不用非要去给变量赋一个字符串的值，去区分它和别的变量的值不同，因为去给每个变量取个语义化而又不同的值是一件伤脑子的事，当我们只需要知道每个变量的值都是百分百不同，这时候就可以用Symbol。