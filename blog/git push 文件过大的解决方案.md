---
slug: "git push big file problem"
date: "2017-11-9 20:32:58"
category: "技术"
tags:
  - 互联网
  - 技术
  - git
  - 备忘
---

# 问题起因

git 初始化新项目时，往往文件比较多，比较大，初次 PUSH 到远程仓库，会抛出如下错误：

```bash
$ git push

Counting objects: 893, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (857/857), done.
error: RPC failed; HTTP 413 curl 22 The requested URL returned error: 413 Request Entity Too Large
fatal: The remote end hung up unexpectedly
Writing objects: 100% (893/893), 2.23 MiB | 1.32 MiB/s, done.
Total 893 (delta 228), reused 0 (delta 0)
fatal: The remote end hung up unexpectedly

```

注意，最后一条信息：`fatal: The remote end hung up unexpectedly`，表示推送失败，出现了错误。

# 原因

原因可能有二：

1. 可能问题出在客户端，也就是本机的 git 配置上。一般情况下 git 传输内容的大小有限制（默认 1M），可以通过修改`http.postBuffer`的值来突破大小限制。

参考：
[http.postbuffer]: https://www.kernel.org/pub/software/scm/git/docs/git-config.html

​

2. 问题也可能出在服务器端，也就是远程机器的 nginx 配置。`client_max_body_size`限制了数据传输的大小。

# 解决

从客户端着手：`git config --global http.postBuffer 157286400`

从服务端着手：找到 nginx 配置文件，新增或修改`client_max_body_size`为`client_max_body_size 1024m`
