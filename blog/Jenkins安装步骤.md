---
slug: "install and uninstall jenkins"
date: "2020-01-12 11:33:35"
category: "阅读笔记"
tags:
  - 技术
  - 备忘
  - jenkins
---

## 前置条件

系统：CentOS 7
Java 环境已有

## 下载安装包

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/jenkins/redhat-stable/jenkins-2.222.1-1.1.noarch.rpm
```

_版本可以根据最新的来替换_，最新稳定版请在这里找：[https://pkg.jenkins.io/redhat-stable/](https://pkg.jenkins.io/redhat-stable/)

## 安装

一条命令即可：`rpm -ivh jenkins-2.121.1-1.1.noarch.rpm`

## 启动

`service jenkins start`

## 一些比较常用的 Jenkins 目录

`rpm -ql jenkins`:

- /etc/init.d/jenkins
- /etc/logrotate.d/jenkins
- /etc/sysconfig/jenkins：修改端口号就在此
- /usr/lib/jenkins
- /usr/lib/jenkins/jenkins.war
- /usr/sbin/rcjenkins
- /var/cache/jenkins
- /var/lib/jenkins
- /var/log/jenkins

## 彻底删除

### 删除程序

`rpm -e jenkins`

`rpm -ql jenkins`：检查是否卸载成功

### 删除残余文件

`find / -iname jenkins | xargs -n 1000 rm -rf`

## 插件更新加速

首次安装 Jenkins ，插件下载有时候很慢，常规是替换插件源为国内，但是然并卵，最终找到一个不那么优雅的方式：

`/var/lib/jenkins/updates/default.json`文件内，替换 `updates.jenkins-ci.org/download` 为 `mirrors.tuna.tsinghua.edu.cn/jenkins`，`www.google.com`替换为`www.baidu.com`

vim 替换方式：`%s/updates\.jenkins-ci\.org\/download/mirrors\.tuna\.tsinghua\.edu\.cn\/jenkins/g`

重启下`service jenkins restart`
