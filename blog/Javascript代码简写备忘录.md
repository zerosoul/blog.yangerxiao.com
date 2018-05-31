---
slug: "shorthand-javascript-coding"
date: "2014-10-17 17:31:37"
category: "技术"
tags:
    - javascript
    - 前端
    - 备忘
---
Javascript代码写多了，就会下意识想用更简短的方式来表述同一逻辑。在此把工作中用到的简写方式记录下，权当备忘录。

#`If true … else`

传统写法：  
``` js
var test;

if(x>10){

    test=true;

}else{

    test=false;

}
```
简写：  

``` js

var test=(x>10)?true:false;
``` 
当然，如果是仅仅赋值布尔类型变量，还可以再精简下：  
``` js

var test=(x>10);

//来个嵌套层次更深一些的例子

var x=3;

test=(x>10)?"大于10":(x<5)?"小于5":"大于5小于10";

console.log(test);//小于5

//函数调用也可以用到

function x() {console.log('x')};

function y() {console.log('y')};

var z = 3;

(z==3?x:y)();
``` 
#`if`判断

传统写法：  
``` js

if(test == true){

    //do sth

}

if(test != true){

    //do sth

}
``` 
简写：  
``` js

if(test){

    //do sth

}

if(!test){

    //do sth

}
``` 
#`null`,`undefined`与空检测

传统写法：  
``` js
if (var1 !== null || var1 !== undefined || var1 !== '') {

     var var2 = var1;

}
``` 
简写：  

``` js
var var2 = var1 || '';
``` 
#声明变量

传统写法：  
``` js

var x;

var y;

var z = 3;
``` 
简写：  

``` js

var x, y, z=3;
``` 
这种声明变量的场景用到的比较少，也记录下吧，谁让咱这是备忘录呢。

#`charAt()`简写

传统写法：  

``` js

"myString".charAt(0);
``` 
简写：  

``` js

"myString"[0]
``` 
#比较返回值

传统写法：  
``` js

if (!(ret == undefined)) {

    return ret;

} else{

   return fun();

}
``` 
简写：  
``` js

return ret || fun();
``` 
#取整

传统写法：  
``` js

Math.floor(4.9) === 4  //true
```
简写：  
``` js

~~4.9 === 4  //true
```
#未完待续…