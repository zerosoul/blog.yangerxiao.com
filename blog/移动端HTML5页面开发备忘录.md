---
slug: "html5 memo"
cover: "/images/html5.jpg"
date: "2016-11-15 17:31:37"
category: "技术"
tags:
  - 技术
  - 备忘
  - 前端
---

![html5](/images/html5.jpg)  
把平时开发工作中遇到的一些问题写下来，权当备忘录。

#有关 Meta

##基本 Meta

```html
<!-- 设置缩放 -->

<meta
  name="viewport"
  content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui"
/>

<!-- 可隐藏地址栏，仅针对IOS的Safari（注：IOS7.0版本以后，safari上已看不到效果） -->

<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 仅针对IOS的Safari顶端状态条的样式（可选default/black/black-translucent ） -->

<meta name="apple-mobile-web-app-status-bar-style" content="black" />

<!-- IOS中禁用将数字识别为电话号码/忽略Android平台中对邮箱地址的识别 -->

<meta name="format-detection" content="telephone=no, email=no" />
```

##搜索引擎 Meta

```html
<!-- 搜索引擎索引方式：通常有如下几种取值：none，noindex，nofollow，all，index和follow。-->

<meta name="robots" content="index,follow" />

<!--

    all：文件将被检索，且页面上的链接可以被查询；

    none：文件将不被检索，且页面上的链接不可以被查询；

    index：文件将被检索；

    follow：页面上的链接可以被查询；

    noindex：文件将不被检索；

    nofollow：页面上的链接不可以被查询。

 -->
```

##页面缓存设置 Meta

```html
<!-- 清除缓存 -->

<meta http-equiv="pragma" content="no-cache" />

<meta http-equiv="cache-control" content="no-cache" />

<meta http-equiv="expires" content="0" />
```

#常见问题

##移动端字体设置

```css
/*中英字体名对照表

宋体      SimSun

黑体      SimHei

微信雅黑   Microsoft Yahei

微软正黑体 Microsoft JhengHei

新宋体    NSimSun

新细明体  MingLiU

细明体    MingLiU

标楷体    DFKai-SB

仿宋     FangSong

楷体     KaiTi

仿宋\_GB2312  FangSong\_GB2312

楷体\_GB2312  KaiTi\_GB2312  

说明：中文字体多数使用宋雅黑，英文用Helvetica

*/

body {
  font-family: Microsoft Yahei, SimSun, Helvetica;
}
```

##打电话发短信写邮件

```html
// 打电话

<a href="tel:010-88888">打电话给:010-88888</a>

// 发短信

<a href="sms:88888">发短信给: 88888</a>

// 写邮件 //注：在添加这些功能时，第一个功能以"?"开头，后面的以"&"开头
//1.普通邮件

<a href="mailto:haha@wtf.com">快来点我啊，给你发种子。</a>

//2.收件地址后添加?cc=开头，可添加抄送地址（Android存在兼容问题）

<a href="mailto:haha@wtf.com?cc=666@wtf.com">快来点我啊，给你发种子。</a>

//3.跟着抄送地址后，写上&bcc=,可添加密件抄送地址（Android存在兼容问题）

<a href="mailto:haha@wtf.com?cc=666@wtf.com&bcc=384900096@wtf.com"
  >快来点我啊，给你发种子。</a
>

//4.包含多个收件人、抄送、密件抄送人，用分号(;)隔开多个邮件人的地址

<a href="mailto:haha@wtf.com;384900096@wtf.com">快来点我啊，给你发种子。</a>

//5.包含主题，用?subject=

<a href="mailto:haha@wtf.com?subject=邮件主题">快来点我啊，给你发种子。</a>

//6.包含内容，用?body=;如内容包含文本，使用%0A给文本换行

<a
  href="mailto:haha@wtf.com?body=邮件主题内容%0A我是第二行内容%0A你没有猜错，这是我是第三行。"
  >快来点我啊，给你发种子。</a
>

//7.内容包含链接，含http(s)://等的文本自动转化为链接

<a href="mailto:haha@wtf.com?body=http://www.wtf.com"
  >快来点我啊，给你发种子。</a
>

//8.内容包含图片（PC不支持）

<a href="mailto:haha@wtf.com?body=<img src='images/torrent.jpg' />"
  >快来点我啊，给你发种子。</a
>

//9.完整示例

<a
  href="mailto:haha@wtf.com;384900096@wtf.com?cc=666@wtf.com&bcc=993233461@wtf.com&subject=[邮主题\]&body=我是第一行内容%0A%0Ahttp://www.baidu.com%0A%0A<img src='images/1.jpg' />"
  >快来点我啊，给你发种子。</a
>
```

## touch 事件

事件响应顺序：`ontouchstart` > `ontouchmove` > `ontouchend` > `onclick`

- `touchstart`——当手指触碰屏幕时候发生
- `touchmove`——当手指在屏幕上滑动时连续触发。
- 通常在滑屏页面，会调用`event`的`preventDefault()`可以阻止默认情况的发生：阻止页面滚动
- `touchend`——当手指离开屏幕时触发
- `touchcancel`——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面`alert()`，此时会触发该事件，这个事件比较少用。

TouchEvent 说明：

- touches：屏幕上所有手指的信息
- targetTouches：手指在目标区域的手指信息
- changedTouches：最近一次触发该事件的手指信息
- touchend 时，touches 与 targetTouches 信息会被删除，changedTouches 保存的最后一次的信息，用于计算手指信息

参数信息(changedTouches[0])

- clientX、clientY 在显示区的坐标
- target：当前元素

## 科普：移动端 click 事件 200-300ms 的延时响应

以下是历史原因：

> 2007 年苹果发布首款 iphone 上 IOS 系统搭载的 safari 为了将适用于 PC 端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个 PC 上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。  
> 双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。  
> 原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接`<a href="#"></a>`，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先 Hold 一段时间 t，如果在 t 时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果 t 时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间 t 有多少呢？在 IOS safari 下，大概为 300 毫秒。这就是延迟的由来。

造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于 web 开发者来说是，页面 js 捕获 click 事件的回调函数处理，需要 300ms 后才生效，也就间接导致影响其他业务逻辑的处理。

解决方案：

- [fastclick](https://github.com/ftlabs/fastclick)
- zepto 的[touch 模块](https://github.com/madrobby/zepto/blob/master/src/touch.js#files)

## 点击元素产生背景或边框问题

```css
a,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  -webkit-user-modify: read-write-plaintext-only; //-webkit-user-modify有个副作用，就是输入法不再能够输入多个字符
}
```

/_也可以...，简单粗暴_/

\* { -webkit-tap-highlight-color: rgba(0,0,0,0); }

## 字体单位 font-size 选择 px 还是 rem

```css
/*如需适配多种移动设备，建议使用rem。以下为参考值：*/

html {
  font-size: 62.5%;
} /*10÷16 = 62.5%\*/
```

/\*设置 12px 字体。

注：在 rem 前要加上对应的 px 值，解决不支持 rem 的浏览器的兼容问题，做到优雅降级\*/

body { font-size:12px; font-size:1.2rem; }

## 其它一些实用 CSS 技巧

```css
/*禁止长按链接与图片弹出菜单*/

a,
img {
  -webkit-touch-callout: none;
}

/*禁止ios和android用户选中文字*/

html,
body {
  -webkit-user-select: none;
  user-select: none;
}

/*改变输入框placeholder的颜色值*/

::-webkit-input-placeholder {
  /* WebKit browsers */

  color: #999;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */

  color: #999;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */

  color: #999;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */

  color: #999;
}

input:focus::-webkit-input-placeholder {
  color: #999;
}

/*android上去掉语音输入按钮\*/

input::-webkit-input-speech-button {
  display: none;
}
```

## 禁用 input 在 ios 下，输入英文首字母的默认大写

```html
<input autocapitalize="off" autocorrect="off" />
```

## 屏幕旋转的事件和样式

JS 处理：

```javascript
function orientInit() {
  var orientChk =
    document.documentElement.clientWidth > document.documentElement.clientHeight
      ? "landscape"
      : "portrait";

  if (orientChk == "lapdscape") {
    //横屏下需要执行代码
  } else {
    //竖屏下需要执行代码
  }
}

orientInit();

window.addEventListener(
  "onorientationchange" in window ? "orientationchange" : "resize",
  function() {
    setTimeout(orientInit, 100);
  },
  false
);
```

CSS 处理：

```css
/*竖屏时样式*/

@media all and (orientation: portrait) {
}

/*横屏时样式*/

@media all and (orientation: landscape) {
}
```

## 播放视频不全屏

```html
<!--

1.ios7+支持自动播放

2.支持Airplay的设备（如：音箱、Apple TV)播放

x-webkit-airplay="true" 

3.播放视频不全屏

webkit-playsinline="true" 

-->
<video
  x-webkit-airplay="true"
  webkit-playsinline="true"
  preload="auto"
  autoplay
  src="http://"
></video>
```

## 消除 transition 闪屏

```css
.css {
  -webkit-transform-style: preserve-3d;

  -webkit-backface-visibility: hidden;

  -webkit-perspective: 1000;
}
```
