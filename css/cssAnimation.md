# GPU Animation
- [GPU Animation: Doing It Right](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- [一篇文章说清浏览器解析和CSS(GPU)动画优化](https://segmentfault.com/a/1190000008015671?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly)
- [精选！CSS 动画之工具、框架和教程](https://zhuanlan.zhihu.com/p/24931899)

# CSS-Animation&Transition
- [AlloyTouch-transformjs](http://alloyteam.github.io/AlloyTouch/transformjs/)
> [搞定这些疑难杂症，向css3动画说yes](http://www.imweb.io/topic/5643850eed18cc424277050e#rd?sukey=fc78a68049a14bb2e0c1218507468463348227540e9805b2e8c45e71b9671beff10ba45526d3bb306c8c4c38d140aed3)

CSS3 提供了    `transition` 过渡、    `transform 变换`和    `animation 动画`来实现页面中的一些样式转化

## Transition(变换)

W3C对css transition 的定义是允许css属性值在指定的持续时间内发生平滑地变化。而mozilla上介绍它是transition-property, transition-duration, transition-timing-function和transition-delay的简写属性，它允许定义一个元素两个状态之间的过渡过程。不同的状态可以通过像:hover或:active这样的伪类来定义，还可以使用JavaScript来动态地设置。Transition的基本语法如下所示：

``` 
transition : transition-property transition-duration transition-timing-function transition-delay [, ...]
```

- transition-property

用来指定执行transition效果的属性，可以为 none , all 或者特定的属性。

- transition-duration

动画执行的持续时间，单位为 s(秒) 或者 ms(毫秒) 。

- transition-timing-function

变换速率效果，可选值为 ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier(自定义时间曲线) 。

- transition-delay

用来指定动画开始执行的时间，取值同 transition-duration ，但是可以为负数。

一个最简单的例子如下所示：

``` html
<div style="height:150px;">
  <h2><span></span>热门网站</h2>
    <ul>
      <li><a href="http://info.3g.qq.com/g/s?aid=index&g_f=2543">腾讯</a></li>
      <li><a href="http://m.sohu.com/?_trans_=000012_qq_dh">搜狐</a></li>
      <li><a href="http://3g.163.com/links/3810">网易</a></li>         
    </ul>
</div>
```

相对应的CSS代码为：

``` css
    .main{ overflow:hidden; -webkit-transition: all 0.5s ease-in 0s; -moz-transition: all 0.5s ease-in 0s;
    -o-transition: all 0.5s ease-in 0s; transition: all 0.5s ease-in 0s; background:#fff;}
    .main .close{ height:0!important;}
```

上面代码会使得类名为main的div元素的所有属性值中任何一个发生改变时，如height属性由150px变为0时(可通过将”main”类名修改为”main close”实现)执行transition动画效果，动画持续时间为0.5s，属性值的改变速率为加速，延迟时间为0s，即立即执行。当然，div元素的height属性由0变为150px时同样会自动执行该动画。考虑到该属性的标准还没有稳定下来，不同的浏览器对它的支持都需要加上对应的前缀，比如像chrome和safari这样的基于webkit内核的浏览器需要添加-webkit作为前缀。

## Transform

transform 分为2D 和 3D。

### 2D

其主要包含以下几种变换:    旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix，语法如下:  

``` 
transform: rotate | scale | skew | translate |matrix;
```

- rotate 旋转      
  
  rotate 的单位是      `deg 度`
  
  ，正数表示顺时针旋转，负数表示逆时针旋转。      
  
  DEMO:      [http://codepen.io/CodingMonkeyzh/pen/XbNYOa](http://codepen.io/CodingMonkeyzh/pen/XbNYOa)
  
- scale 缩放      
  
  scale 的取值范围是      `0~n`
  
  ，小于      `1`
  
  时表示缩小，反之表示放大。例如      `scale(0.5, 2)`
  
  表示水平方向缩小1倍，垂直方向放大1倍， 另外，也可以通过      `scaleX`
  
  或者      `scaleY`
  
  对一个方向进行设置。      
  
  DEMO:      [http://codepen.io/CodingMonkeyzh/pen/doOKrg](http://codepen.io/CodingMonkeyzh/pen/doOKrg)
  
- skew 扭曲      
  
  skew 的单位跟      `rotate`
  
  一样都是      `deg 度`
  
  。例如      `skew(30deg, 10deg)`
  
  表示水平方向倾斜30度，垂直方向倾斜10度。      
  
  DEMO:      [http://codepen.io/CodingMonkeyzh/pen/KpNeYg](http://codepen.io/CodingMonkeyzh/pen/KpNeYg)
  
- translate 偏移      
  
  偏移同样包括水平偏移和垂直偏移。      `translate(x,y)`
  
  水平方向和垂直方向同时移动(也就是X轴和Y轴同时移动)；      `translateX(x)`
  
  仅水平方向移动(X轴移动)；      `translateY(Y)`
  
  仅垂直方向移动(Y轴移动)。      
  
  DEMO:      [http://codepen.io/CodingMonkeyzh/pen/waoXbB](http://codepen.io/CodingMonkeyzh/pen/waoXbB)

## Animation

### Keyframes

CSS3 中的 animation 是通过一个叫    `Keyframes 关键帧`的玩意来控制的，他的命名是由"@keyframes"开头，后面紧接着是这个“动画的名称”加上一对花括号“{}”，括号中就是一些不同时间段样式规则，有点像我们css的样式写法一样。对于一个"@keyframes"中的样式规则是由多个百分比构成的，如“0%”到"100%"之间，语法如下:  

``` 
@keyframes IDENT {
  from {
    Properties: Properties value;
  }
  Percentage {
    Properties: Properties value;
  }
  to {
    Properties: Properties value;
  }
}

或者全部写成百分比的形式: 
@keyframes IDENT {
  0% {
    Properties: Properties value;
  }
  Percentage {
    Properties: Properties value;
  }
  100% {
    Properties: Properties value;
  }
}

```

### animation

animation 属性是一个简写属性，用于设置动画属性：

1. animation-name----规定需要绑定到选择器的 keyframe 名称。

语法：animation-name: keyframename|none；

Keyframename：规定需要绑定到选择器的    keyframe     的名称。  

None: 规定无动画效果(可用于覆盖来自级联的动画)。

例如：

{

-webkit-animation-name: my_animation;

-moz-animation-name    :    my_animation;  

-ms-animation-name    :    my_animation;  

-o-animation-name: my_animation;

animation-name: my_animation;

}

@-webkit-keyframes my_animation{}

@-moz-keyframes my_animation{}

@-ms-keyframes my_animation{}

@-o-keyframes my_animation{}

@keyframes my_animation{}

2. animation-duration----规定完成动画所花费的时间，以秒或毫秒计。

语法：animation-duration: time;

time : 规定完成动画所花费的时间。默认值是 0，意味着没有动画效果。

例如：

{

-webkit-animation-duration: 2s;

-moz-animation-duration    :    2s;  

-ms-animation-duration    :    2s;  

-o-animation-duration: 2s;

animation--duration: 2s;

}

3. animation-timing-function----规定动画的速度曲线

语法:    animation-timing-function: value;  

Value    值    :  

linear：动画从头到尾的速度是相同的。

ease：默认。动画以低速开始，然后加快，在结束前变慢。

ease-in：动画以低速开始。

ease-out ：动画以低速结束。

ease-in-out：动画以低速开始和结束。

cubic-bezier(n,n,n,n)：在    cubic-bezier     函数中自己的值。可能的值是从     0     到     1     的数值。  

例如：

{animation-timing-function:linear;}

{animation-timing-function:ease;}

{animation-timing-function:ease-in;}

{animation-timing-function:ease-out;}

{animation-timing-function:ease-in-out;}

4. animation-delay----规定在动画开始之前的延迟

语法:    animation-delay: time;  

Time    值：可选。定义动画开始前等待的时间，以秒或毫秒计。默认值是     0    。允许负值，    -2s     使动画马上开始，但跳过     2     秒进入动画。  

{

animation-delay:2s;

-webkit-animation-delay:2s;

}

5. animation-iteration-count----规定动画应该播放的次数

语法:    animation-iteration-count: n|infinite;  

n：定义动画播放次数的数值。

infinite    ：规定动画应该无限次播放。默认值为：1    。  

示例：

{

animation-iteration-count:infinite;

-webkit-animation-iteration-count:infinite;

}

6. animation-direction----规定是否应该轮流反向播放动画

语法:    animation-direction: normal|alternate;  

normal    ：默认值。动画应该正常播放。  

alternate ：动画应该轮流反向播放。

注释：如果把动画设置为只播放一次，则该属性没有效果。

示例：

{

animation-direction:alternate;

-webkit-animation-direction:alternate;

}

7. animation-play-state 属性规定动画正在运行还是暂停

语法:    animation-play-state: paused|running;  

paused    ：规定动画已暂停。  

running    ：规定动画正在播放。  

注释：可以在    JavaScript     中使用该属性，这样就能在播放过程中暂停动画。  

示例：

{

animation-play-state:running;

-webkit-animation-play-state:running;

}

8. animation-fill-mode 属性规定动画在播放之前或之后，其动画效果是否可见

语法:    animation-fill-mode : none | forwards | backwards | both;  

none    ：不改变默认行为。  

forwards ：当动画完成后，保持最后一个属性值(在最后一个关键帧中定义)。

backwards    ：在     animation-delay     所指定的一段时间内，在动画显示之前，应用开始属性值(在第一个关键帧中定义)。  

both ：向前和向后填充模式都被应用。

# JavaScript-Animation
## requestAnimationFrame
- [Understanding JavaScript's requestAnimationFrame() method for smooth animations](http://www.javascriptkit.com/javatutors/requestanimationframe.shtml)
- [性能更好的js动画实现方式——requestAnimationFrame](http://www.js-code.com/JavaScript/2016022453238.html)
- [CSS3动画那么强，requestAnimationFrame还有毛线用？](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%e5%8a%a8%e7%94%bb%e7%ae%97%e6%b3%95/)

## tick
```
/* tick https://github.com/AlloyTeam/AlloyTouch/blob/master/transformjs/asset/tick.js
 * By dntzhang|当耐特
 */
; (function () {

    if (!Date.now)
        Date.now = function () { return new Date().getTime(); };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
                                   || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }

    var tickArr = [];

    var tick = function (fn) {
        tickArr.push(fn);
    };

    var execTick = function () {
        var i = 0, len = tickArr.length;
        for (; i < len; i++) {
            tickArr[i]();
        }
        requestAnimationFrame(execTick);
    };
    execTick();

    window.tick = tick;
})();
```
