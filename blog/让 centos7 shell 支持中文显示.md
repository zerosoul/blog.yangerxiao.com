---
slug: "centos 7 shell chinese display"
date: "2017-9-28 20:32:58"
category: "技术"
tags:
  - shell
  - 技术
  - linux
  - 备忘
---

## 问题描述

linux 系统对中文默认支持本身就不太友好，最近又入手了一台阿里云机器，用的是 CentOS 7，shell 远程连接后发现中文全部显示问号，这比较恼火，以前应该解决过类似的问题，当时应该是安装了个中文语言包，但是包的名字和地址都忘了，Google 了一下，发现有更简单的解决方式，在此记录一下，备忘。

## 解决

其实很简单，让 shell 支持 utf8 即可。先使用`locale`命令看一下设置情况：

```bash
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
.
.
.
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

`LC_ALL`没有设置，需要赋值`en_US.UTF-8`，很简单：

```bash
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bash_profile
```

最后，不要忘了`source`一下`bash_profile`，让其生效。

# 参考

[How to display Chinese characters correctly on remote Red-Hat machine?](https://unix.stackexchange.com/a/365347)
