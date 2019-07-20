---
slug: "ssh timeout solution"
date: "2017-04-29 14:00:41"
category: "技术"
tags:
  - 运维
  - linux
  - shell
  - 备忘
---

![ssh](/images/ssh.png)

# 问题

SSH 登录远程服务器(Centos 7)，有时会遇到这样的问题：一段时间没有操作，会自动断开连接。

# 解决

通过设置`sshd_config`的`ServerAliveInterval`和`ClientAliveInterval`，可以达到目的。默认情况下，这两个设置项没有或者值为 0，也是导致我们连接长时间不响应就断开的原因。

首先，确认自己有 root 权限，然后：

```bash
# vim /etc/ssh/sshd_config
```

找到`ClientAliveInterval`，如果没有，就添加，将其做如下设置（单位：秒）

```
ClientAliveInterval 60
```

重启 sshd 服务：

```bash
sudo systemctl restart sshd.service
```

至此，每隔 60 秒，服务器会给客户端发送一个消息，确认客户端还活着。如果收不到响应，就会断开连接，所以需要注意电脑不要设置自动休眠时间，至少不要设置太短。

# 参考

[How to Prevent SSH Timing out from Server and Client](https://www.ehowstuff.com/prevent-ssh-timing-out/)
