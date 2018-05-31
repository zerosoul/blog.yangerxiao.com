---
slug: "another-email-hiding-technique"
cover: "https://zerosoul.github.io/2016/01/23/another-email-hiding-technique/spambot.jpg"
date: "2016-01-23 17:31:37"
category: "技术"
tags:
    - 备忘
    - email
---
![spam bot](https://zerosoul.github.io/2016/01/23/another-email-hiding-technique/spambot.jpg)

#引子

我们经常会受到垃圾邮件的骚扰，究其原因，其中主要就是平时email地址赤裸裸地暴露在网页中，被垃圾邮件程序（[spambot](https://en.wikipedia.org/wiki/Spambot)）探测到，进而向你的邮箱发送大量的营销信息，恶心到吐。

#怎么办

上面提到的问题解决办法有许多，这里列举几个常用的：

-   使用图片（使用谷歌邮箱的同学应该有所体会）
-   使用javascript输出（爬虫只探测静态HTML）
-   使用AT, DOT,代替`@`,`.`（好像现在一些爬虫也能识别了）
-   简单加密，比如：foo@REMOVETHISbar.baz，真正的email是去掉 **REMOVETHIS**之后的（也可以更形象点foo@REMOVETHISbar.baz）
-   使用CSS中的伪类`:after`

``` html

p:after { content: "foo\\40bar.baz"; }

<p>email me: </p>

/* \\40 是Unicode字符 '@'*/
email me: foo@bar.baz

```
-   使用flash

``` html

<object type="application/x-shockwave-flash" data="media/flash/articles/email.swf" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">

    <param name="movie" value="media/email.swf">

</object>
```
#最优解

> 世界上本来没有最优解，用的人觉得很爽，于是就有了。 —詹姆斯.杨二

我个人比较喜欢最小化成本解决问题，所以除了上述几种方式，我更倾向于下面这种：  
不知道你有没有发现，Unicode中有个和 **@**符号很像的字符：`0xFF20`，除此之外，还有个和 **.**很像的字符：`0x2024`。那么这两个Unicode字符在此处就有用武之地了。在网页里，我们可以把foo@bar.com编码为  

1

foo&#xFF20;BAR&#X2024;com

最终显示效果：**foo＠BAR․com**

很强大有木有！

这种方式也不是完美无缺：

-   如果流行普及了，爬虫会重新设计算法将其也计入探测范围。
-   使用复制粘贴并非预期文本

总之，没有最好，只有最合适的。

#参考

-   [Methods to hide email addresses from page source](http://www.csarven.ca/hiding-email-addresses)
    
-   [exploring browser-supported Unicode characters](http://lea.verou.me/2009/11/exploring-browser-supported-unicode-characters-and-a-tweet-shortening-experiment/)
    
-   [Yet another email hiding technique?](http://lea.verou.me/2009/11/yet-another-email-hiding-technique/)