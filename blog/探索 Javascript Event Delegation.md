---
slug: "JavaScript-Event-Delegation"
date: "2014-5-12 17:31:37"
category: "技术"
tags:
  - 前端
  - javascript
---

# 引子

事件代理也算是 Javascript 中的热点话题，它可以给节点的某个父节点增加监听行为，从而避免了在每个节点都做监听。父节点分析冒泡过来的事件，并找到是来自于哪个节点。概念很简单，但是到底是怎么个过程，还是有些迷糊。下面，通过例子来探索下。

# 实例探索

比如说，有一个父元素:`ul`，下面有几个子元素：

```javascript
<ul id="parent-list">
  <li id="post-1">Item 1</li>

  <li id="post-2">Item 2</li>

  <li id="post-3">Item 3</li>

  <li id="post-4">Item 4</li>

  <li id="post-5">Item 5</li>

  <li id="post-6">Item 6</li>
</ul>
```

我想给子元素加上单击事件，当然可以单独为每个`li`设置事件监听，但是，如果`li`的改动很频繁，比如新增或删除，该怎么办？如果随之改动各自的监听事件，那将是一场噩梦。比较好的一种解决方式便是给`ul`设置监听事件，但是问题又来了，如何知道是哪个元素被点击的？

其实也不难，当事件冒泡到`ul`，可以通过`event`对象下的`target`来获取实际节点的引用。就像下面代码这样：

```javascript
document.getElementById("parent-list").addEventListener("click", function(e) {
  // e.target是被点击的元素!

  if (e.target && e.target.nodeName == "LI") {
    console.log(
      "List item ",
      e.target.id.replace("post-", ""),
      " was clicked!"
    );
  }
});
```

事件触发时，检查元素，如果符合条件，那么就是我们想找的元素`li`，如果不是，那么直接忽略。这个例子比较简单：`ul`和`li`有直接的比较关系。下面，我们来点有难度的：比如说有个`div`元素下面有许多子元素，但我们关心的只有一个`a`标签，它的特征是`class="classA"`:

```javascript
document.getElementById("myDiv").addEventListener("click", function(e) {
  if (e.target && e.target.matches("a.classA")) {
    console.log("Anchor element clicked!");
  }
});
```

注：通过[Element.matches API](https://davidwalsh.name/element-matches-selector)，我们能够过滤出想要的元素。

# 最后说两句

当然，在大多数业务场景下，我们常用的是类库来写 JS 代码，比如：[jQuery](http://jquery.com/)。但是基本上每个类库都有事件代理自己的实现，甚至做了许多高级扩展，使用起来非常方便，比如：[jQuery 的`on`](http://api.jquery.com/on/)。
