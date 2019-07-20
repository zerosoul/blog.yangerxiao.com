---
slug: "php timezone setting"
date: "2017-6-2 14:00:41"
category: "技术"
tags:
  - php
  - timezone
  - 备忘
---

`date("Y-m-d G:i T",time())` 取出来的时间和本地时间总是差 8 个小时，系统明明是中国标准时（GMT+8），最后终于找到了问题所在：

原来从`php5.1.0`开始，`php.ini`里加入了`date.timezone`这个选项，默认情况下是关闭的，所以通过 PHP 获取的时间默认都是格林威治标准时间，和我们的时间（北京时间）差了正好 8 个小时，有以下两种方法可以恢复正常的时间：

- 一劳永逸，直接修改`php.ini`：打开`php.ini`，查找`date.timezone`，去掉注释，**=**后面加上中国时区`Asia/Shanghai`(或者`PRC`)，重启 http 服务（nginx 或者 Apache）。
- 如果不想修改`php.ini`，则在关于时间的初始化的语句的上面加上`date_default_timezone_set('PRC')`;

参考：

- [PHP 支持的时区列表](http://php.net/manual/en/timezones.php)
