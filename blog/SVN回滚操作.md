---
slug: "svn-rollback"
date: "2014-8-1 17:31:37"
category: "技术"
tags:
  - svn
  - 备忘
---

SVN 回滚，即取消对代码的修改，分为两种情况：

# 改动没有被提交（commit）

这种情况下，`svn revert`就能取消之前的修改。  
用法如下：

```bash
svn revert [-R] sth
```

其中`sth`可以是目录或文件的相对路径也可以是绝对路径。

- 当`sth`为单个文件时，直接`svn revert sth`就行了；
- 当`sth`为目录时，需要加上参数`-R`(Recursive,递归)，否则只会将`sth`这个目录的改动。

也可以使用`svn update`命令来取消对之前的修改，但不建议使用。因为`svn update`会去连接仓库服务器，比较耗时。  
**注意：`svn revert`有风险，因为它的目的是放弃未提交的修改。一旦你选择了恢复，Subversion 没有方法找回未提交的修改。**

# 改动已经被提交（commit）

这种情况下，用`svn merge`命令来进行回滚。回滚的操作过程如下：

1. 保证拿到的是最新代码：`svn update`。假设最新版本号是 28。
2. 然后找出要回滚的确切版本号：`svn log [sth]`。假设根据`svn log`日志查出要回滚的版本号是 25，如果想要更详细的了解情况，可以使用`svn diff -r 28:25 [sth]`
3. 回滚到版本号 25：`svn merge -r 28:25 sth`。为了保险起见，再次确认回滚的结果：`svn diff [sth]`。正确无误的话，提交。
4. 提交回滚：`svn commit -m "revert revision from r28 to r25,because of ..."`提交后版本变成了 29。

以上操作总结下：

1. `svn update`，`svn log`，找到最新版本
2. 找到自己想要回滚的版本号
3. 用`svn merge`来回滚：`svn merge -r latest:older sth`

# 温馨提示

回滚虽好，可不要贪多哦~~~^\_^
