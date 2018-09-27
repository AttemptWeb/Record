## js常见方法

- [1.window.open()和location.href()比较](#1.window.open()%E5%92%8Clocation.href()%E6%AF%94%E8%BE%83)
- [2.请求html文件时，正则截取body中的内容](#2.当请求html文件时，截取body中的内容时，可以使用：)
- [3.字符串正则添加，从右到左每三位添加一个','号](#3.字符串正则添加，从右到左每三位添加一个','号)
- [4.ios中的Date时间格式兼容问题](#4.ios中的Date时间格式兼容问题)
- [5.URL地址获取参数](#5.URL地址获取参数)
- [6.将时间转换为--分钟(或小时)前或者--年--月--日](#6.将时间转换为--分钟(或小时)前或者--年--月--日)
- [7.js禁止或解除-移动端滑动方法](#7.js禁止或解除-移动端滑动方法)
- [8.阻止默认冒泡](#8.阻止默认冒泡)
- [9.获取document.cookie中的值](#9.获取document.cookie中的值)
- [10.正则替换DOM节点](#10.正则替换DOM节点)
- [11.ajax传递参数时_非法字符替换](#11.ajax传递参数时_非法字符替换)
- [12.ios和安卓系统判断](#12.ios和安卓系统判断)
- [13.移动设备判断](#13.移动设备判断)


#### 1.window.open()和location.href()比较

相对于window.open,location.href更加安全，js脚本控制跳转使用location.href,相当于页面点击a标签跳转链接，浏览器不会认为是非法链接，相对来说不会被浏览器阻止

#### 2.当请求html文件时，截取body中的内容时，可以使用：

```javascript
content.match(/<body[^>]*>([\s\S]*)<\/body>/)[0]
// 截取body的内容
```

#### 3.字符串正则添加，从右到左每三位添加一个','号

```javascript
    str.replace( /\B(?=(?:\d{3})+$)/g, ',' ); 
```

#### 4.ios中的Date时间格式兼容问题

```javascript
let dd = '2017-11-07 21:15:00'
const nUAnce = navigator.userAgent;
if(!!nUAnce.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){ // 判断ios设备
  dd = dd.replace(/\-/g,'/');
}else{
  dd = dd;
}
// 在ios中时间格式支持 2017/11/07 21:15:00
```

#### 5.URL地址获取参数

```javascript
/*
* 获取location.search 地址参数
* params n 参数名
*/
function locsearch(n) {
    var ls = location.search;
    var lo = '';
    var r = new RegExp("[\?\&]"+n+"=([^&?]*)(\\s||$)", "gi");
    var r1=new RegExp(n+"=","gi");
    if(ls.indexOf('?') > -1){
        lo = ls.match(r);
        if(lo == null){
            return "";
        }else{
            return typeof(lo[0].split(r1)[1])=='undefined'?'':decodeURIComponent(lo[0].split(r1)[1]);
        }
    }
    return lo
}
```

#### 6.将时间转换为 --分钟(或小时)前或者 --年--月--日

```javascript
var releaseTime = function(t){
        var d = new Date(t);
        var n = new Date();
        var year = d.getFullYear();
        var year1 = n.getFullYear();
        var month = d.getMonth()+1;
        var day = d.getDate();
        var day1 = n.getDate();
        var Hours = d.getHours();
        var Minutes = d.getMinutes();
        var value = n.getTime() - d.getTime();
        var m = value/1000/60;
        var h = value/1000/3600;
        /*console.log(m +' '+ h);*/
        if(m <= 59 && day == day1){
            if(parseInt(m) == 0){
                m = 1;
            }
            return parseInt(m)+'分钟前'
        }else if(h >= 1 && h < 24 && day == day1){
            return parseInt(h)+'小时前'
        }else if(h >=24 && year != year1){
            return year+'/'+month+'/'+day
        }else if((h >=24 || day != day1) && year == year1){
            return (month > 9 ?month:('0'+month))+'/'+(day > 9 ?day:('0'+day))
        }
}
```

#### 7.js禁止或解除-移动端滑动方法

```javascript
function onHandler(event) {
    let ev = event || window.event;
    ev.preventDefault(); // 阻止默认事件
  }

function CancelEvent() { //禁止触屏滑动
    document.addEventListener('touchmove', onHandler, false);
  }

function RemovEvent() { //解除触屏滑动
    document.removeEventListener('touchmove',onHandler, false);
  }
```

#### 8.阻止默认冒泡

```javascript
event.stopPropagation(); //阻止默认冒泡
```

#### 9.获取document.cookie中的值

```javascript
function getCookie(key) {
  let reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  let token = '';
  if(typeof document !== 'undefined'){
    token = document.cookie.match(reg);
  }
  if (token) {
    return token[2];
  }
  return '';
};
```

#### 10.正则替换DOM节点

```javascript
<!-- 替换所有DOM节点 -->
'<div>123123<img href=123123 /></div>'.replace(/<[\/]?(\S)([^<>]*)>/g, '')
```

#### 11.ajax传递参数时_非法字符替换

```javascript
str= str.toString();
str=str.replace(/\+/g,"%2B");
```
如果不替换queryString将无法识别，直接会使用空格替换

#### 12.ios和安卓系统判断

```javascript
const u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

alert('是否是Android：'+isAndroid);
alert('是否是iOS：'+isiOS);
```

#### 13.移动设备判断

```javascript
var browser={  
    versions:function(){   
        var u = navigator.userAgent, app = navigator.appVersion;   
        return {//移动终端浏览器版本信息   
            _weixin: u.toLowerCase().indexOf("micromessenger") > -1,// 微信
            trident: u.indexOf('Trident') > -1, //IE内核  
            presto: u.indexOf('Presto') > -1, //opera内核  
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核  
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核  
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端  
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端  
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器  
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器  
            iPad: u.indexOf('iPad') > -1, //是否iPad    
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信   
            qq: u.match(/\sQQ/i) == " qq" //是否QQ  
        };  
    }(),  
    language:(navigator.browserLanguage || navigator.language).toLowerCase()  
}   
  
if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||   
browser.versions.iPhone || browser.versions.iPad){        
    window.location = "http://didiheng.com";  
} 
```
