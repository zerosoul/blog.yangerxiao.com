---
slug: "upgrade-hexo-to-3-2"
cover: "https://zerosoul.github.io/2016/06/15/upgrade-hexo-to-3-2/crazy.jpg"
date: "2016-06-15 17:31:37"
category: "技术"
tags:
    - hexo
    - 备忘
---
![crazy](https://zerosoul.github.io/2016/06/15/upgrade-hexo-to-3-2/crazy.jpg)

[](#动机 "动机")动机
==============

好久没去[Hexo官网](https://hexo.io)逛逛了，陡然发现有[新版本](https://hexo.io/news/2016/02/28/hexo-3-2-released/)了，其重要的改进在于生成静态文件的速度，对于文章越写越多，生成时间越来越长的我，是个极大的诱惑。作为一个还停留在2.X版本的Hexo党，毅然决然地要尝一下鲜。

[](#思路 "思路")思路
==============

1.  先全局升级`hexo-cli`：
    
    1
    
    npm i hexo-cli -g
    
    通过`hexo version`查看下版本：
    
    ``` shell
    hexo: 3.2.0 //版本号已变
    
    hexo-cli: 1.0.2
    
    os: Darwin 15.5.0 darwin x64
    
    http_parser: 2.7.0
    
    node: 6.2.1 
    
    v8: 5.0.71.52
    
    uv: 1.9.1
    
    zlib: 1.2.8
    
    ares: 1.10.1-DEV
    
    icu: 57.1
    
    modules: 48
    
    openssl: 1.0.2h
    ```
    注：我的node版本略高，不建议使用高版本，因为经常踩坑，5就足够了。当然，可以使用nvm工具来管理node版本。
    
2.  找个风水宝地，初始化一个新版本的hexo博客目录：
    
    ``` shell
    hexo init new\_blog && cd new\_blog && npm i && hexo s
    ```
3.  访问下`http://localhost:4000`，确认下初始化成功了么。正常的话，看到的是默认主题的首页。
    
4.  把原博客目录`source`下的东西全部拷贝到新目录对应位置上。这是关键的一步，相当于迁移数据源。
    
5.  接下来，是容易踩坑的地方了，不要把原Hexo的配置文件`_config.yml`直接覆盖过来，因为新版本的Hexo有些插件不走配置文件了，容易出错。所以我在踩了这个坑之后，索性基于新`_config.yml`来更新对应值，至于插件的配置，全部放弃。
6.  接下来，是主题的更新，我使用的是[Next](http://theme-next.iissnan.com/)。发现这个也有新版本了，索性一起更新了。具体步骤请参照[这里](http://theme-next.iissnan.com/getting-started.html)。另，原有主题我更改了一些地方，又花了点时间把琐碎的增量更改也做了。
7.  接下来，`hexo g`一下，发现有报错，看了下报错信息和我使用[`hexo-qiniu-sync`](https://github.com/gyk001/hexo-qiniu-sync)插件有关，于是把七牛插件给装上：`npm install hexo-qiniu-sync --save`。注意，别忘了更新`_config.yml`对应的配置，这个可以从原来的地方拷贝过来。
8.  另外，我还用到了两个插件`hexo-generator-sitemap`，`hexo-generator-feed`，一行代码搞定：
    
    1
    
    npm i hexo-generator-sitemap hexo-generator-feed --save
    
9.  下面到了最坑的地方了，平时使用`hexo-browsersync`来边写边看效果，所以升级后自然也得想着它。装上这个插件在我的环境下会导致大部分页面白板，动画效果也没有了。查看了下生成的页面代码，底部有乱码。估计是我的node版本太高导致的，使用nvm降到5，问题依旧。然后去插件[Github地址](https://github.com/hexojs/hexo-browsersync)逛逛有没有遇到类似问题的同学，很遗憾，就四个提问题的，和我遇到的问题无关。转变思路，看看是不是版本依赖问题，`hexo-browsersync`最重要的依赖便是`browsersync`，将其升级到最新版本：修改该模块的`package.json`对应的`browsersync`版本号为`*`，然后`npm update --save`。接下来，试试问题有没有解决，果然！不出所料！这样做并没有什么卵用…o(╯□╰)o。  
    纠结到最后，还是暂时去掉了这一功能：`npm uninstall hexo-browsersync --save`。以后会看一下里面源码，看看到底哪儿的问题。而现在，我需要的就是一个可以写文章和发布的Hexo，虽然用起来不是很便捷，但这已足够了。
    
10.  最后：`npm i --save hexo-deployer-git`，配置下`_config.yml`对应的git选项。
    

[](#感想 "感想")感想
==============

断断续续折腾了两天，才升级成功。所以，如果有啥感想，那就是：**没事别瞎TM升级！**当然，如果一定要升级，最好做增量升级：另起炉灶，一项一项地加功能，这样好定位问题，也容易回滚。