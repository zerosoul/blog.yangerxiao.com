---
slug: "array-filter-map-reduce-in-js"
cover: "/images/array-1.png"
date: "2016-12-06 17:31:37"
category: "它山之石"
tags:
  - 译文
  - 技术
  - javascript
  - array
---

# 写在前面的话

前几天[写了篇文章](/array-filter-trick)科普了下 Javascript 中`Array.filter()`的妙用，后来无意间发现了[一篇好文章](http://atendesigngroup.com/blog/array-map-filter-and-reduce-js)，一次性科普了三个 API：`filter`、`map`和`reduce`，生动形象，尤其是配图，显然是用了心思。下面是译文：

# 译文

![array top image](/images/array-1.png)

最近，一直在为一个客户做一个视觉化数据的项目，从服务端 API 拉取数据回来然后转换出视觉效果，自然少不了大量的数据操作，为此我一再使用 Javascript 中的 Array 三个 API：`filter`、`map`和`reduce`。

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)和[Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)常常被用于对一个数组做一些操作，进而转换成某个新的东西（数据类型不一定还是数组哦~）。下面是我对这三个 API 的直观认识：

# Map

![array-map](/images/array-map.png)  
你想将一个数组中的每一项做个转换，结果生成了一个新数组，并且新数组的长度和原数组一致。

# Filter

![array-filter](/images/array-filter.png)  
你想将一个数组做一个过滤，按照某规则提取出一些特定的项来。结果也生成了一个新数组，但新数组的长度小于或等于原数组。

# Reduce

![array-reduce](/images/array-reduce.png)  
你想通过遍历一个数组的每一项来计算出一个新东西，最后生成的结果可以是任何类型的变量：一个新数组，一个新对象，一个新布尔值…

`filter`、`map`和`reduce`共同点就是并不会对原数组做任何改动，结果都是生成一个新变量。让我们来看一些例子：

# Array.map()

现在我们有一个对象列表，其中每个对象代表的是一种变形金刚（译注：看来这位歪果仁是个变形金刚粉丝）：

```javascript
var transformers = [
  {
    name: "Optimus Prime",

    form: "Freightliner Truck",

    team: "Autobot"
  },

  {
    name: "Megatron",

    form: "Gun",

    team: "Decepticon"
  },

  {
    name: "Bumblebee",

    form: "VW Beetle",

    team: "Autobot"
  },

  {
    name: "Soundwave",

    form: "Walkman",

    team: "Decepticon"
  }
];
```

那么，问题来了，如果想得到一个包含所有变形（form）的列表该怎么做呢？`Array.map()`让一切变得简单。它的基本使用语法是这样的：

```javascript
Array.prototype.map(callback(item));
```

当然，还有种更复杂点的语法场景，只不过不常用到：

```javascript
Array.prototype.map(callback(item[, index], array])[, thisArg]);
```

`callback`会遍历数组的每个元素，在其中返回的每一个数值将会组成新数组。`callback`有多种书写方式：  
命名函数：

```javascript
function getForm(transformer) {
  return transformer.form;
}

var robotsInDisguise = transformers.map(getForm);

/* robosInDisguise === ['Freightliner Truck', 'Gun', 'VW Beetle', 'Walkman'] */
```

匿名函数：

```javascript
robotsInDisguise = transformers.map(function(transformer) {
  return transformer.form;
});
```

箭头函数：

```javascript
robotsInDisguise = transformers.map(transformer => transformer.form);
```

ES2015 的箭头函数和`Array.map()`搭配使用简直不能更爽了！

# Array.filter()

语法：

```javascript
Array.prototype.filter(callback(item));
```

`callback`将数组元素当参数传入，并返回一个布尔值。当返回值为真时，该元素被加入新数组中，反之则被过滤掉。  
现在我们把这些变形金刚过滤出**汽车人**(Autobots)

```javascript

function isAutobot(transformer) {

  return transformer.team === ‘Autobot’;

}

var autobots = transformers.filter(isAutobot);

/**

autobots ==  [

  {

    name: 'Optimus Prime',

    form: 'Freightliner Truck',

    team: 'Autobot'

  },

  {

    name: 'Bumblebee',

    form: 'VW Beetle',

    team: 'Autobot'

  }

]

*/
```

# Array.reduce()

`Array.reduce()`是通过遍历每个数组元素对其做运算，因此，也是三个 API 之间最富有技巧的，其使用语法也略显复杂：

```javascript

Array.prototype.reduce(callback(previousValue, currentValue[, index], array]), initialValue)
```

谨记一条：我们是将数组元素通过遍历减少到一个值。比如现在有一组**可组合变形金刚**（译者注：我也不知道什么鬼，该怎么翻译，原词：Construction Transformers），它们能够组合成更大的变形金刚，我们可以通过代码来做出这样的组合：

```javascript
var constructicons = [
  {
    name: "Scrapper",

    form: "Freightliner Truck",

    team: "Decepticon",

    bodyPart: "rightLeg"
  },

  {
    name: "Hook",

    form: "Mobile Crane",

    team: "Decepticon",

    bodyPart: "upperTorso"
  },

  {
    name: "Bonecrusher",

    form: "Bulldozer",

    team: "Decepticon",

    bodyPart: "leftArm"
  },

  {
    name: "Scavenger",

    form: "Excavator",

    team: "Decepticon",

    bodyPart: "rightArm"
  },

  {
    name: "Mixmaster",

    form: "Concrete Mixer",

    team: "Decepticon",

    bodyPart: "leftLeg"
  },

  {
    name: "Long Haul",

    form: "Dump Truck",

    team: "Decepticon",

    bodyPart: "lowerTorso"
  }
];
```

Reduce 的`callback`需要至少两个参数。第一个是从上次遍历中返回的一个值，第二个是当前数组遍历到的一个值，返回值又将当做第一个参数被传入到下一次遍历。

```javascript
function assemble(combiner, transformer) {
  //每次遍历都会将当前的变形金刚（transformer）的名字加入到组合器（combiner）的form中去。

  combiner.form[transformer.bodyPart] = transformer.name;

  return combiner;
}
```

这样，我们可以在调用 reduce 的时候，将`assemble`当做第一个参数传入，第二个参数是用来初次调用时的初始数据。接下来的例子便是我们提供一个仅仅有名字（name）和派别（team）的变形金刚，通过 reduce 中的`assemble`我们来组合成一个强大的变形金刚吧！

![transforming](/images/transform.gif)

```javascript
var devastator = constructicons.reduce(assemble, {

  name: ‘Devastator’,

  team: ‘Decepticon’,

  form: {}

});

/*
devastator == {

  name: ‘Devastator’,

  team: ‘Decepticon’,

  form: {

    leftArm: "Bonecrusher"

    leftLeg: "Mixmaster"

    lowerTorso: "Long Haul"

    rightArm: "Scavenger"

    rightLeg: "Scrapper"

    upperTorso: "Hook"

  }

}

*/
```

这些三个基本 API 一旦组合起来使用，也是很强大的。在此只是根据自己的使用经验抛砖引玉，想进一步了解的同学可以移步万能的[MDN 有关 Array API 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)。
