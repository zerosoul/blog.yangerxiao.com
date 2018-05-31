---
slug: "build-personal-site-with-hexo-and-github-pages"
date: "2015-11-05 17:31:37"
category: "技术"
tags:
    - hexo
    - github
    - nodejs
    - 前端
---
#准备工作

[](#Github "Github")[Github](http://github.com)
-----------------------------------------------

1.  登陆你的Github
2.  新建一个Repository
3.  将之命名为*yourGithubName.github.io*(注意替换yourGithubName)
4.  关键步骤已经完成，其他选项随意啦。点击新建后，别忘了把*SSH*的地址copy一份，后面有用到

#[Hexo](http://hexo.io)

1.  打开终端
2.  Hexo依赖 Node 环境，如果没有先安装 Node & npm，参考[官网](http://nodejs.org)
3.  安装 Hexo  
    `npm install -g hexo`
4.  齐活，Hexo准备完毕

#使用Hexo撸Github需要的东西

1.  进入到你想放置github pages repository的目录
2.  在此创建Hexo Project  
    `hexo init yourGithubName.github.io`
3.  切换到刚刚创建的目录  
    `cd yourGithubName.github.io`
4.  安装依赖&生成静态文件&启动本地服务器  
    `npm install & hexo g & hexo s`
5.  目测现在就可以通过访问localhost:4000来瞅瞅网站啥样了

#部署到Github上

1.  首先，停掉Hexo `Control + C`
2.  打开根目录的_config.yml，设置Github地址  
    `deploy: type: git repo: git@github.com:yourGithubName/yourGithubName.github.io.git`
3.  部署前，先确认有没有安装*[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)*  
    `npm install hexo-deployer-git --save`
4.  部署  
    `hexo d`
5.  打开浏览器，访问 *yourGithubName.github.io*

#写作

1.  使用Markdown写作，完事后保存到source/_posts/
2.  重新生成静态文件  
    `hexo g`
3.  运行`hexo s`在本地查看刚刚写的文章
4.  木问题的话，更新至Github  
    `hexo d`

#绑定自己的域名

> 我通过淘宝代理[Godaddy](https://www.godaddy.com/)购买了 [zerosoul.github.io](http://zerosou.us) 域名，就拿这个举例如何绑定吧

1.  Github上进入 zerosoul.github.io
2.  创建并提交CNAME文件，里面只有一行内容，就是域名：`zerosoul.github.io`
3.  去Godaddy网站管理域名页面  
    ![godaddy setting](https://zerosoul.github.io/2015/11/05/build-personal-site-with-hexo-and-github-pages/godaddy_setting.jpg)
4.  增加一条 A 记录:host=`@`，Points to=`192.30.252.153`
5.  增加一条 CNAME 记录:host=`www`，Points to=`zerosoul.github.io`
6.  最后，一定要记得保存更改！  
    ![godaddy saving](https://zerosoul.github.io/2015/11/05/build-personal-site-with-hexo-and-github-pages/godaddy_saving.jpg)
7.  静待更改生效，大概一两个小时。

#两个小时后…

**装X成功！**

#相关链接

[hexo doc](https://hexo.io/docs/)  
[github pages basic](https://help.github.com/categories/github-pages-basics/)  
[Configuring a Godaddy domain name with github pages](http://andrewsturges.com/blog/jekyll/tutorial/2014/11/06/github-and-godaddy.html)