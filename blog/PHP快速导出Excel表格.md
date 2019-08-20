---
slug: "export excel with php"
date: "2018-07-24 13:00:41"
category: "技术"
tags:
  - php
  - 技巧
  - 备忘
---

这方法我一直在用，不用任何类库框架。

直接输出`html`格式的`<table>`就好了，并且指定为 Excel 的 Mime。

```php
$table = "<table>
    <thead>
    <tr>
        <th>姓名</th>
        <th>电话</th>
        <th>身份证</th>
        <th>购买产品</th>
        <th>消费金额</th>
        <th>奖品</th>
        <th>时间</th>
    </tr>
    </thead>
    <tbody>";

foreach ($all as $r) {
    $table .= "<tr>
        <td>{$r->name}</td>
        <td>{$r->mobile}</td>
        <td>{$r->idcard}&nbsp;</td>
        <td>{$r->product}</td>
        <td>{$r->price}</td>
        <td>{$r->prize_level}：{$r->prize_name}</td>
        <td>{$r->create_time}</td>
    </tr>";
}

$table .= "</tbody></table>";

header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="export.xls"');
echo $table;
```

温馨提示：

- 加上`charset=utf-8`解决中文乱码问题
- 针对纯数字，想身份证号码这样，Excel 显示的时候最后几位会变成 00000，解决办法就是在单元格里面加个`&nbsp;`，像这样：`<td>{$r->idcard}&nbsp;</td>`
