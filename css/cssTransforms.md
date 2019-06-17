## CSS开启硬件加速来提高网站性能

在桌面端和移动端用CSS开启硬件加速

**CSS animations, transforms 以及 transitions 不会自动开启GPU加速，而是由浏览器的缓慢的软件渲染引擎来执行**。
那我们怎样才可以切换到GPU模式呢，很多浏览器提供了某些触发的CSS规则。

现在，像Chrome, FireFox, Safari, IE9+和最新版本的Opera都支持硬件加速，当它们检测到页面中某个DOM元素应用了某些CSS规则时就会开启，
最显著的特征的元素的3D变换。

例如：
```css
.cube { 
   -webkit-transform: translate3d(250px,250px,250px) 
   rotate3d(250px,250px,250px,-120deg) 
   scale3d(0.5, 0.5, 0.5); 
}
```
可是在一些情况下，我们并不需要对元素应用3D变换的效果，那怎么办呢？这时候我们可以使用个小技巧“欺骗”浏览器来开启硬件加速。

虽然我们可能不想对元素应用3D变换，可我们一样可以开启3D引擎。例如我们可以用transform: translateZ(0); 来开启硬件加速 。

```css
.cube { 
   -webkit-transform: translateZ(0); 
   -moz-transform: translateZ(0); 
   -ms-transform: translateZ(0); 
   -o-transform: translateZ(0); 
   transform: translateZ(0); 
   /* Other transform properties here */ 
}
```
在 Chrome and Safari中，当我们使用CSS transforms 或者 animations时可能会有页面闪烁的效果，下面的代码可以修复此情况：

```css
.cube { 
   -webkit-backface-visibility: hidden; 
   -moz-backface-visibility: hidden; 
   -ms-backface-visibility: hidden; 
   backface-visibility: hidden; 
  
   -webkit-perspective: 1000; 
   -moz-perspective: 1000; 
   -ms-perspective: 1000; 
   perspective: 1000; 
   /* Other transform properties here */ 
}
```
在webkit内核的浏览器中，另一个行之有效的方法是
```css
.cube { 
   -webkit-transform: translate3d(0, 0, 0); 
   -moz-transform: translate3d(0, 0, 0); 
   -ms-transform: translate3d(0, 0, 0); 
   transform: translate3d(0, 0, 0); 
  /* Other transform properties here */ 
}
```
原生的移动端应用(Native mobile applications)总是可以很好的运用GPU，这是为什么它比网页应用(Web apps)表现更好的原因。
硬件加速在移动端尤其有用，因为它可以有效的减少资源的利用(注：移动端本身资源有限)。

## 总结
只对我们需要实现动画效果的元素应用以上方法，如果仅仅为了开启硬件加速而随便乱用，那是不明智的。

小心使用这些方法，如果通过你的测试，结果确是提高了性能，你才可以使用这些方法。
使用GPU可能会导致严重的性能问题，因为它增加了内存的使用，而且它会减少移动端设备的电池寿命。
