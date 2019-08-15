---
slug: "custom keyboard accessible radio buttons"
date: "2018-11-28 10:32:58"
category: "技术"
tags:
  - css
  - 前端
  - radio
---

radio 按钮在不同浏览器会有不同的 UI，在实际的业务开发中，出于对体验一致的考虑，往往会自定义下样式。当然，方式有多种，但是如果要考虑可访问性（accessible），可选择的技术实现就不多了，这篇文章就是介绍其中一种最佳实践。

# 大概过程

1. 初始化 HTML 代码
2. 使用 CSS 创建标签伪元素
3. 增加选中效果(selected)
4. 增加聚焦效果(focus)
5. 增加禁用效果(disabled)

# 开始撸代码

## 初始化 HTML

radio 按钮，也叫单选按钮，一般是多个同时出现。现在，罗列几位美女，请选出你心目中的女神：

```html
<fieldset>
  <legend>谁是你心目中的女神?</legend>
  <div class="radio-wrapper">
    <input type="radio" name="goddness" id="zhuyin" />
    <label for="zhuyin">朱茵</label>
  </div>
  <div class="radio-wrapper">
    <input type="radio" name="goddness" id="linqingxia" />
    <label for="linqingxia">林青霞</label>
  </div>
  <div class="radio-wrapper">
    <input type="radio" name="goddness" id="wangzuxian" />
    <label for="wangzuxian">王祖贤</label>
  </div>
  <div class="radio-wrapper">
    <input type="radio" name="goddness" id="guanzhilin" />
    <label for="guanzhilin">关之琳</label>
  </div>
</fieldset>
```

**fieldset**把所有的 radio 按钮从逻辑上归为一组，**legend**相当于组的标题，在这里就是问题的标题，当然，不要忘了把`label`用**id**和**for**关联起来。

![fieldset原生效果](/images/html.fieldset.demo.png)

## 略微修饰下

原生样式略丑，我们开始优化下：

首先，设置下字体，同时把 fieldset 的框去掉。

```css
* {
  font-family: "Microsoft YaHei", 微软雅黑, Tahoma, Arial, sans-serif;
}

fieldset {
  border: none;
}
```

代码不多，但是这样一搞，像那么回事了！

![fieldset without border](/images/html.fieldset.without.border.png)

接下来，进入正题！

## 创建伪元素

针对`label`新增`::before` 伪元素（使用 sass）

```scss
$muted-red: #db3846;

input[type="radio"] {
  + label {
    position: relative;
    cursor: pointer;
    margin-left: 20px; /* 这个后面会调整 */

    &::before {
      content: "";
      position: absolute;
      left: -22px; /* 这个后面会调整 */
      width: 20px;
      height: 20px;
      background: $muted-red;
    }
  }
}
```

![fieldset redbox](/images/html.fieldset.redbox.png)

为了方便看伪元素的效果，我们用红色背景突出下。

似乎选项之间有点拥挤，我们再加点间距

```css
.radio-wrapper {
  margin: 0.5rem 0;
}
```

![fieldset wrapper margin](/images/html.fieldset.wrapper.margin.png)

## 美化伪元素 3

```scss
input[type="radio"] {
  + label {
    position: relative;
    cursor: pointer;
    margin-left: 20px; /* 这个后面会调整 */

    &::before {
      content: "";
      position: absolute;
      left: -24px; /* 这个后面会调整 */
      // highlight-next-line
      border-radius: 50%;
      // highlight-next-line
      border: 1px solid #6f686a;
      width: 18px;
      height: 18px;
      // highlight-next-line
      background: transparent;
    }
  }
}
```

![fieldset border radius](/images/html.fieldset.border.radius.png)

直到现在，依然要保留原生的那个标准 raido，方便调试。

## 增加选中样式

利用`::checked`，我们可以控制选中样式。当然，在此之前需要对 label 再加个`::after`伪元素。

```scss
input[type="radio"] {
  + label {
    position: relative;
    cursor: pointer;
    margin-left: 20px; /* 这个后面会调整 */

    &::before {
      content: "";
      position: absolute;
      left: -24px; /* 这个后面会调整 */
      border-radius: 50%;
      border: 1px solid #6f686a;
      width: 18px;
      height: 18px;
      background: transparent;
    }
    // highlight-start
    &::after {
      content: "";
      position: absolute;
      left: -20px;
      top: 4px;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background: $muted-red;
    }
    // highlight-end
  }
}
```

现在，长这样了：
![fieldset checked style](/images/html.fieldset.checked.png)

接下来，微调下，只在选中的情况下给`::after`背景色：

```scss
input[type="radio"] {
  + label {
    &::after {
      content: "";
      position: absolute;
      left: -20px;
      top: 4px;
      border-radius: 50%;
      width: 12px;
      height: 12px;
    }
  }
  // highlight-start
  &:checked {
    + label::after {
      background: $muted-red;
    }
  }
  // highlight-end
}
```

现在，只有选中选项之后，才有样式，有点意思了！
![fieldset checked style](/images/html.fieldset.checked.style.png)

为了满足可访问性（accessible），需要关注下获取焦点时候的样式

## 新增获取焦点的样式

目前，如果选项获取焦点，`::after`是没有样式的，利用`:focus`和`box-shadow`组合，我们可以优化下这块的样式：

```scss
input[type="radio"] {
  &:focus {
    + label::before {
      box-shadow: 0 0px 8px $muted-red;
    }
  }
}
```

![fieldset focus style](/images/html.fieldset.focus.png)

## 新增禁用样式

同样的道理，`:disabled`可以做到禁用样式的自定义。新增个女神，范冰冰。

```scss
&:disabled {
  + label::before {
    border: 1px solid #ddd;
    box-shadow: 0 0px 4px #ddd;
  }
}
```

![fieldset disabled style](/images/html.fieldset.disabled.png)

## 大结局

- 原生 radio 的历史使命已完成，隐藏掉。
- 去掉 label 的左间距

```scss
input[type="radio"] {
  opacity: 0;

  + label {
    position: relative;
    cursor: pointer;
  }
}
```

最终样子：

![fieldset final style](/images/html.fieldset.final.png)

# 总结一下

自定义 radio 样式做到了以下几点：

- 使用正确的语义 HTML 结构
- 使用伪元素自定义元素样式
- `:checked`、`:focus`和`:disabled`来定义不同的状态，尤其是`:focus`，满足了可访问性。
- `opacity: 0`隐藏掉原有的 radio 按钮

源代码在此：

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="zerosoul" data-slug-hash="wvwGedx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="accessible radio buttons">
  <span>See the Pen <a href="https://codepen.io/zerosoul/pen/wvwGedx/">
  accessible radio buttons</a> by Tristan (<a href="https://codepen.io/zerosoul">@zerosoul</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
