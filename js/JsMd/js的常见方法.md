## js常见方法

- [**【Markdown】** js常见的面试题](./常见的面试题.md)

- [1.window.open()和location.href()比较](#window)
- [2.请求html文件时，正则截取body中的内容](#html中截取body中的内容)
- [3.字符串正则添加，从右到左每三位添加一个','号](#字符串正则添加从右到左每三位添加一个逗号)
- [4.ios中的Date时间格式兼容问题](#ios中的date时间格式兼容问题)
- [5.URL地址获取参数](#url地址获取参数)
- [6.将时间转换为--分钟(或小时)前或者--年--月--日](#时间转换)
- [7.js禁止或解除-移动端滑动方法](#js禁止或解除移动端滑动方法)
- [8.阻止默认冒泡](#阻止默认冒泡)
- [9.获取document.cookie中的值](#获取cookie中的值)
- [10.正则替换DOM节点](#正则替换DOM节点)
- [11.ajax传递参数时_非法字符替换](#ajax传递参数时非法字符替换)
- [12.ios和安卓系统判断](#ios和安卓系统判断)
- [13.移动设备判断](#移动设备判断)
- [14.window.scroll无法触发滚动条事件](#window的scroll事件无法触发问题)
- [15.html中正则获取全部的img标签的src地址](#html中正则获取全部的img标签的src地址)
- [16.createDocumentFragment创建文档片段](#createDocumentFragment)

#### window

相对于window.open,location.href更加安全，js脚本控制跳转使用location.href,相当于页面点击a标签跳转链接，浏览器不会认为是非法链接，相对来说不会被浏览器阻止

#### html中截取body中的内容

```javascript
content.match(/<body[^>]*>([\s\S]*)<\/body>/)[0]
// 截取body的内容
```

#### 字符串正则添加从右到左每三位添加一个逗号

```javascript
    str.replace( /\B(?=(?:\d{3})+$)/g, ',' ); 
```

#### ios中的date时间格式兼容问题

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

#### url地址获取参数

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

#### 时间转换

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

#### js禁止或解除移动端滑动方法

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

#### 阻止默认冒泡

```javascript
event.stopPropagation(); //阻止默认冒泡
```

#### 获取cookie中的值

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

#### 正则替换DOM节点

```javascript
<!-- 替换所有DOM节点 -->
'<div>123123<img href=123123 /></div>'.replace(/<[\/]?(\S)([^<>]*)>/g, '')
```

#### ajax传递参数时非法字符替换

```javascript
str= str.toString();
str=str.replace(/\+/g,"%2B");
```
如果不替换queryString将无法识别，直接会使用空格替换

#### ios和安卓系统判断

```javascript
const u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

alert('是否是Android：'+isAndroid);
alert('是否是iOS：'+isiOS);
```

#### 移动设备判断

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

#### window的scroll事件无法触发问题

滚动条事件很常见。但有的时候竟会无法触发这个事件，真的让人有点捉急！

```window.scroll()```，是window的滚动，window代表的是当前窗口,但是如果我们把html和body设置了```overflow:auto;height:100%；```, 则无法```window.scroll()```的滚动条事件。

解决方案: 

所以```overflow: auto;```和```height:100%```,应该尽量避免同时使用，去除其中一个就可以了

### html中正则获取全部的img标签的src地址
```javascript
let imgArr = html.match(/<img\b.*?(?:\>|\/>)/gi);

imgArr.macth(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)
```

### createDocumentFragment

ocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

```
var element  = document.getElementById('ul'); // assuming ul exists
var fragment = document.createDocumentFragment();
var browsers = ['Firefox', 'Chrome', 'Opera', 
    'Safari', 'Internet Explorer'];

browsers.forEach(function(browser) {
    var li = document.createElement('li');
    li.textContent = browser;
    fragment.appendChild(li);
});

element.appendChild(fragment);
```
