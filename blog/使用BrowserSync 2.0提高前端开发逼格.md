---
slug: "Improve-Your-Workflow-With-BrowserSync-2-0"
date: "2016-01-14 17:31:37"
category: "技术"
tags:
  - 前端
  - 工具
  - BrowserSync
---

# 引子

Web 开发，尤其是前端开发，经常要做的就是不停地“试错”。下面的场景你是否熟悉：

1.在浏览器打开网页  
2.更改一两行代码  
3.点击浏览器的刷新，重复 **步骤 2**

周而复始，还要在不同的设备，不同的浏览器，不同的测试方法，Oh God，编码本来是一项充满创造性的工作，为何如此苦逼？

# 希望

程序员应该养成一个优秀习惯：当意识到有重复性的动作，反思一下能不能交给机器来做？有关上面提到的不停地“试错”，其实早就有了解决方式：BrowserSync。我比较懒，懒到人家都出 2.0 了，才开始了解与使用。

> 好工具从来不会缺席，只是有时候会迟到。 – 尼古拉斯•杨二

让我们先来看一下新版本有哪些特性：

# 实时刷新 (Live reloading)

这个应该是基本的吧。修改某个文件（html,css,js），会自动刷新你所打开的所有浏览页面，对，也包括手机端的，这个挺酷的。

# 交互同步(Interaction synchronization)

一句话概括就是：镜像你的交互。滚动页面，点击，表单操作等等会被同步到每个你打开的浏览器。这招在调试移动端页面相当有用，都知道在手机输入文字的痛苦，尤其是英文，有了它，妈妈再也不会看到你拿着手机打字纠结的表情了：完全可以在 PC 上相应文本框输入文本，然后会同步到每个关联的移动设备上，Amazing！除此之外，你还可以选择哪些交互可以被镜像，真贴心！

# 远程调试(Remote inspector)

可以使用类似谷歌的 [Dev Tools](https://developer.chrome.com/devtools) 来远程调试页面。

![](/images/browsersync2-weinre.png)

# 模拟网速(Simulate slower connections)

Dev Tools 里面已有这个功能，相当实用的一个功能，有些开发问题只有在网速慢的情况才好复现。看来，优秀的工具总是能戳中使用者的痛点。

# 记录浏览历史(URL history)

浏览历史被记录的好处就是可以随时推送某个测试网址到所有设备，免去记忆和输入的成本，相当便捷。

# 新 UI！(New UI)

如果不习惯命令行控制方式，可以使用基于网页的 UI 管理。

![UI](/images/browsersync2-gui.png)

# 兼容构建工具(Build-tool compatibility)

可以和 Gulp,Grunt 以及其它构建工具配套使用。  
**注：这个特性我还没有尝试，不过看起来很高级很好玩的样子。**

# 下载即用！(Install anywhere for free)

BrowserSync 是开源作品，并且支持 Windows, Mac OS and Linux 三大操作平台。不需要安装浏览器插件或者其他软件，妈妈再也不用担心乱装东西啦。

# BrowserSync 是怎样的工作原理

启用 BrowserSync 时，会建立一个小型 web 服务器。如果本地存在一个 web 服务器或者需要与一个线上网站建立联系，可以将 BrowserSync 当做一个代理服务器。它将在每个访问的页面注入一小段 js 代码，并使用 [**websocket**](https://developer.mozilla.org/en-US/docs/WebSockets/WebSockets_reference)与服务器通信。当有事件触发时，比如更改了某个文件或者触发了滚动操作，服务端便会向所有的连接设备发送更新。

如果你的定位是使用而非参与开发 BrowserSync，了解到这里就足够啦。

# 如何安装

那么…如何安装呢？有个前提条件：安装[Node.js](http://nodejs.org/)。

命令行执行`node -v`，确保 Node 安装 OK。

全局安装 BrowserSync:`npm install browser-sync -g`

注：我在 Mac 下遇到个问题，需要在 npm 前面加`sudo`，才能执行成功，应该跟本人的环境配置有关。

测试安装 OK 与否：`browser-sync --version`

看看 BrowserSync 下有哪些命令可以使用：`browser-sync --help`

# 如何使用

举个例子：  
假设有个`test`文件夹，里面有 HTML 文件和 css 文件夹，css 文件夹里面当然是 css 文件啦。  
首先，先跑到`test`文件夹下：`cd test`

然后 BrowserSync 之：`browser-sync start --server --files "*.html, css/*.css"`

随后将启用一个小型服务器，并监听 test 下的所有 html 和 css 文件夹下的 css 文件。此时此刻，命令行界面应该显示类似这样的一列信息：

```
[BS] Access URLs:
 -------------------------------------
       Local: http://localhost:3000
    External: http://192.168.1.21:3000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.1.21:3001
 -------------------------------------
[BS] Serving files from: ./
[BS] Watching files...

```

`External`表示在同一网段下的所有设备都可以访问这个地址。`UI`的意思就是网页版的控制中心。

还有许多其它特性可以从命令行挖掘。总而言之，花上一两个小时来体验一下，相信你从今以后会离不开它！

# 参考

[BrowserSync 官网](http://www.browsersync.io/)  
[BrowserSync 文档](http://www.browsersync.io/docs/command-line/)
