---
slug: "array-filter-trick"
date: "2016-11-29 17:31:37"
category: "技术"
tags:
  - javascript
  - array
  - filter
---

# filter 简述

`filter`是 Javascript 中 Array 常用的操作，它用于把 Array 的某些元素过滤掉，然后返回剩下的元素。

和[`map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)类似，Array 的`filter`也接收一个函数。但是和 map 不同的是，`filter`把传入的函数依次作用于每个元素，然后根据返回值是`true`还是`false`决定保留还是丢弃该元素。

例如，在一个 Array 中，删掉偶数，只保留奇数，可以这么写：

```javascript
var arr = [1, 2, 4, 5, 6, 9, 10, 15];

var r = arr.filter(function(x) {
  return x % 2 !== 0;
});

r; // [1, 5, 9, 15]
```

把一个 Array 中的空字符串删掉，可以这么写：

```javascript
var arr = ["A", "", "B", null, undefined, "C", "  "];

var r = arr.filter(function(s) {
  return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
});

arr; // ['A', 'B', 'C']
```

可见用`filter`这个高阶函数，关键在于正确实现一个“筛选”函数。

# 回调函数

`filter`接收的回调函数，其实可以有多个参数。通常我们仅使用第一个参数，表示 Array 的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身：

```javascript
var arr = ["A", "B", "C"];

var r = arr.filter(function(element, index, self) {
  console.log(element); // 依次打印'A', 'B', 'C'

  console.log(index); // 依次打印0, 1, 2

  console.log(self); // self就是变量arr

  return true;
});
```

利用`filter`，可以巧妙地去除 Array 的重复元素：

```javascript
var r,
  arr = [
    "apple",
    "strawberry",
    "banana",
    "pear",
    "apple",
    "orange",
    "orange",
    "strawberry"
  ];

r = arr.filter(function(element, index, self) {
  return self.indexOf(element) === index;
});

console.log(r.toString());
```

去除重复元素依靠的是`indexOf`总是返回第一个元素的位置，后续的重复元素位置与`indexOf`返回的位置不相等，因此被`filter`滤掉了。
