---
slug: "svn-cleanup-error"
date: "2014-09-24 17:31:37"
category: "技术"
tags:
  - svn
  - 备忘
---

# 问题

svn 执行 clean up 后出现提示:

```bash
svn cleanup failed

previous operation has not finished; run cleanup if it was interrupted
```

# 分析

可能是因为上次`cleanup`中断后，进入死循环了。

# 解决

1. 下载[sqlite3.exe](http://pan.baidu.com/s/1i3ie1HN)
2. 找到项目的**.svn**文件，查看是否存在**wc.db**
3. 将**sqlite3.exe**放到**.svn**的同级目录
4. 启动**cmd**，执行`sqlite3 .svn/wc.db "select * from work_queue"`
5. 不出意外的话，会看到很多记录，下一步执行`delete from work_queue`
6. 现在再到项目里面，执行`cleanup`，没问题了，图标状态也已经恢复了，完美~~~

![完美](perfect.gif)
