## SASS & SCSS
1. 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名
2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似
    ```sass
    $font-stack: Helvetica, sans-serif  //定义变量
    $primary-color: #333 //定义变量
    body
    font: 100% $font-stack
    color: $primary-color
    ```
    ```scss
    $font-stack: Helvetica, sans-serif;
    $primary-color: #333;
    body {
    font: 100% $font-stack;
    color: $primary-color;
    }
    ```
## 目录索引

- [安装](#安装)
- [Sass的基本特性-基础](#Sass的基本特性-基础)
- [Sass的基本特性-运算](#Sass的基本特性-运算)
- [Sass的控制指令](#Sass的控制指令)
- [Sass函数](#Sass函数)
- [Sass的@规则](#Sass的@规则)
- [项目](#项目)
- [参考](#参考)

## [安装](https://www.sass.hk/install/)
1. [Ruby](https://rubyinstaller.org/downloads/)
2. 因为国内网络的问题导致gem源间歇性中断因此我们需要更换gem源
    ```js
    // 1.删除原gem源
    gem sources --remove https://rubygems.org/
    // 2.添加国内Ruby China社区源
    gem sources -a https://gems.ruby-china.com/
    // 3.打印是否替换成功
    gem sources -l
    // 4.更换成功后打印如下
    *** CURRENT SOURCES ***
    https://gems.ruby-china.com/
    ```
3. 安装
    ```ruby
    gem install sass
    gem install compass
    ```
4. 常用命令
    ```js
    // 更新sass
    gem update sass
    // 查看sass版本
    sass -v
    // 查看sass帮助
    sass -h
    ```
5. 编译
    1. 命令行编译
    2. GUI 界面工具编译
    3. 自动化编译
        ```js
        var gulp = require('gulp');
        var sass = require('gulp-sass');

        gulp.task('sass', function () {
            gulp.src('./scss/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('./css'));
        });

        gulp.task('watch', function() {
            gulp.watch('scss/*.scss', ['sass']);
        });

        gulp.task('default', ['sass','watch']);
        ```

## Sass的基本特性-基础
1. 变量
    ```scss
    $fontSize: 12px;    // 普通变量
    $baseLineHeight:1.5 !default;   // 默认变量
    // 调用变量
    p {
        font-size: $fontSize
    }
    // 局部变量&全局变量
    $color:orange !default;
    .block {
        color: $color;  // orange
    }
    em {
        $color: red;
        a {
            color: $color;  // red
        }
    }
    ```
2. 嵌套
    ```scss
    // 选择器嵌套
    div {
        color: red;
        p {
            color: blue;
        }
    }
    // 群组选择器嵌套
    .container {
        h1, h2, h3 {margin-bottom: .8em}
    }
    // 属性嵌套
    .box {
        border: {
            top: 1px solid red;
            bottom: 1px solid green;
        }
    }
    // 伪类嵌套
    article a {
        color: blue;
        :hover { color: red }
    }
    ```
3. 混合器
    * 声明混合宏(@mixin)
        ```scss
        // 不带参数混合宏
        @mixin border-radius1{
            -webkit-border-radius: 5px;
            border-radius: 5px;
        }
        // 带参数混合宏
        @mixin border-radius2($radius:5px){
            -webkit-border-radius: $radius;
            border-radius: $radius;
        }
        // 复杂的混合宏
        @mixin box-shadow($shadow...) {
            @if length($shadow) >= 1 {
                -webkit-box-shadow: $shadows;
                box-shadow: $shadows;
            } @else{
                $shadows: 0 0 2px rgba(#000,.25);
                -webkit-box-shadow: $shadow;
                box-shadow: $shadow;
            }
        }
        ```
    * 调用混合宏(@include)
        ```scss
        button {
            @include border-radius1;
        }
        .box {
            @include border-radius2(3px);
        }
        .boxs {
            @include box-shadow(0 0 1px rgba(#000,.5),0 0 2px rgba(#000,.2));
        }
        ```
4. 继承(@extend)
    ```scss
    .error {
        border: 1px solid red;
        background-color: #fdd;
    }
    .seriousError {
        @extend .error;
        border-width: 3px;
    }
    // .seriousError不仅会继承.error自身的所有样式，任何跟.error有关的组合选择器样式也会被.seriousError以组合选择器的形式继承
    ```
    * 占位符(%)
    ```scss
    %mt5 {
        margin-top: 5px;
    }
    .btn {
        @extend %mt5;
        @extend %pt5;
    }
    // %mt5没有被 @extend 调用时，不产生任何代码块，只是静静的躺在你的某个 SCSS 文件中。只有通过 @extend 调用才会产生代码
    ```
5. 插值语句(Interpolation: #{})
    ```scss
    // 通过 #{} 插值语句可以在选择器或属性名中使用变量
    $name: foo;
    $attr: border;
    p.#{$name} {
        #{$attr}-color: blue;
    }
    ```
6. 注释(Comments: /* */ and //)
7. 数据类型(Data Types)  
    SassScript 支持 6 种主要的数据类型：
    * 数字，1, 2, 13, 10px
    * 字符串，有引号字符串与无引号字符串，"foo", 'bar', baz
    * 颜色，blue, #04a3f9, rgba(255,0,0,0.5)
    * 布尔型，true, false
    * 空值，null
    * 数组 (list)，用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif
    * maps, 相当于 JavaScript 的 object，(key1: value1, key2: value2)
    > SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 !important 声明。然而Sass 不会特殊对待这些属性值，一律视为无引号字符串

## Sass的基本特性-运算
1. 数字运算(Number Operations)
    * SassScript 支持数字的加减乘除、取整等运算 (+, -, *, /, %)，如果必要会在不同单位间转换值
    * 关系运算 <, >, <=, >= 也可用于数字运算，相等运算 ==, != 可用于所有数据类型
        ```scss
        $full-width: 960px;
        .content {
            width: $full-width -  200px;
        }
        .box {
            width: 10px * 2;
        }
        .box {
            width: (100px / 2);  
        }
        ```
2. 颜色值运算 (Color Operations)
    * 颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值
        ```scss
        p { color: #010203 + #040506; }
        // 计算 01 + 04 = 05, 02 + 05 = 07, 03 + 06 = 09 然后编译为
        p { color: #050709; }

        p { color: #010203 * 2; }
        // 计算 01 * 2 = 02, 02 * 2 = 04, 03 * 2 = 06 然后编译为
        p { color: #020406; }
        ```
    * 颜色值的 alpha channel 可以通过 opacify 或 transparentize 两个函数进行调整
        ```scss
        $translucent-red: rgba(255, 0, 0, 0.5);
        p {
            color: opacify($translucent-red, 0.3);
            background-color: transparentize($translucent-red, 0.25);
        }
        // 编译为
        p {
            color: rgba(255, 0, 0, 0.8);
            background-color: rgba(255, 0, 0, 0.25);
        }
        ```
3. 字符串运算 (String Operations)
    * +可用于连接字符串
        ```scss
        p { cursor: e + -resize; }
        // 编译为
        p { cursor: e-resize; }
        ```
    * 如果有引号字符串（位于 + 左侧）连接无引号字符串，运算结果是有引号的，相反，无引号字符串（位于 + 左侧）连接有引号字符串，运算结果则没有引号
        ```scss
        p:before {
            content: "Foo " + Bar;
            font-family: sans- + "serif";
        }
        // 编译为
        p:before {
            content: "Foo Bar";
            font-family: sans-serif;
        }
        ```
4. 布尔运算 (Boolean Operations)
5. 数组运算 (List Operations)

## Sass的控制指令
1. @if
    ```scss
    @mixin color($type: ocean) {
        @if $type == ocean {
            color: blue;
        } @else if $type == matador {
            color: red;
        } @else if $type == monster {
            color: green;
        } @else {
            color: black;
        }
    }
    .red {
        @include color(matador)
    }
    ```
2. @for
    ```scss
    // through 表示包括 end 这个数，而 to 则不包括 end 这个数
    @for $i from 1 through 3 {
        .item-#{$i} { width: 2em * $i }
    }
    // 编译后
    .item-1 { width: 2em }
    .item-2 { width: 4em }
    .item-3 { width: 6em }

    @for $i from 1 to 3 {
        .item-#{$i} { width: 2em * $i }
    }
    // 编译后
    .item-1 { width: 2em }
    .item-2 { width: 4em }
    ```
3. @while
    ```scss
    $i: 6;
    @while $i > 0 {
        .item-#{$i} { width: 2em * $i; }
        $i: $i -2;
    }
    // 编译后
    .item-6 { width: 12em }
    .item-4 { width: 8em }
    .item-2 { width: 4em }
    ```
4. @each
    ```scss
    $list: puma, sea-slug, egret, salamander;
    @each $animal in $list {
        .#{$animal}-icon {
            background-image: url('/image/#{$animal}.png');
        }
    }
    // 编译后
    .puma-icon {  background-image: url('/images/puma.png'); }
    .sea-slug-icon { background-image: url('/images/sea-slug.png'); }
    .egret-icon { background-image: url('/images/egret.png'); }
    .salamander-icon { background-image: url('/images/salamander.png'); }
    ```

## Sass函数
* [字符串函数](#字符串函数)
* [数字函数](#数字函数)
* [列表函数](#List函数)
* [Map函数](#Map函数)
* [自省函数](#Introspection函数)
* [三元函数](#Miscellaneous函数)
* [颜色函数](#颜色函数)
* 自定义函数

## 字符串函数
* unquote($string)：从字符串中删除引号
* quote($string)：在字符串中添加引号
* str-length($string)：返回字符串中的字符数
* str-insert($string,  $ insert,  $ index)：在`$index`中将`$insert`插入`$string`
* str-index($string,  $ substring)：返回`$string`中第一次出现`$substring`的索引
* str-slice($string,  $ start-at,  [$ end-at])：从`$string`中提取子字符串
* to-upper-case($string)：将字符串转换为大写
* to-lower-case($string)：将字符串转换为小写

## 数字函数
* percentage($number)：将无单位的数转换为百分比值。
* round($number)：将数字四舍五入到最接近的整数。
* ceil($number)：将一个数字向上取整。
* floor($number)：将一个数字向下取整。
* abs($number)：返回数字的绝对值。
* min($numbers ...)：找到几个数字的最小值。
* max($numbers ...)：找到几个数字的最大值。
* random()：返回一个随机数。

## List函数
> Sass中的list是不可变的; 所有list函数都返回一个新list，而不是更新现有list  
> 所有list函数也适用于map，将它们视为lists of pairs  
> 所以有关索引的方法都是从1开始(nth, set-nth, index)
* length($list)：返回一个列表的长度值
* nth($list, $n)：返回一个列表中指定的某个标签值
* set-nth($list, $n, $value)：替换列表中的第n个项目
* join($list1, $list2, [$separator, $bracketed])：将两个列表连接合并成一个列表
* append($list1, $val, [$separator])：将某个值插入列表的末位
* zip($lists…)：将几个长度相同的列表结合成一个多维的列表
* index($list, $value)：返回一个值在列表中的位置值或false
* list-separator($list)：返回列表的分隔符
* is-bracketed($list)：返回列表是否包含方括号

## Map函数
* map-get($map,$key)：根据给定的key值，返回map中相关的值
* map-merge($map1,$map2)：将两个map合并成一个新的map
* map-remove($map,$key)：从map中删除一个 key，返回一个新map
* map-keys($map)：返回map中所有的 key
* map-values($map)：返回map中所有的 value
* map-has-key($map,$key)：根据给定的key值判断map是否有对应的 value 值，如果有返回 true，否则返回 false
* keywords($args)：返回一个函数的参数，这个参数可以动态的设置key和 value

## Introspection函数
* feature-exists($feature) : Returns whether a feature exists in the current Sass runtime.
* variable-exists($name) : Returns whether a variable with the given name exists in the current scope.
* global-variable-exists($name) : Returns whether a variable with the given name exists in the global scope.
* function-exists($name) : Returns whether a function with the given name exists.
* mixin-exists($name) : Returns whether a mixin with the given name exists.
* content-exists() : Returns whether the current mixin was passed a content block.
* inspect($value) : Returns the string representation of a value as it would be represented in Sass.
* type-of($value) : 返回一个值的类型
* unit($number) : 返回一个值的单位
* unitless($number) : 判断一个值是否带有单位
* comparable($number1, $number2) : 判断两个值是否可以做加、减和合并
* call($function, $args…) : Dynamically calls a Sass function reference returned by `get-function`.
* get-function($name, $css: false) : Looks up a function with the given name in the current lexical scope

## Miscellaneous函数
* 在这里把 Miscellaneous 函数称为三元条件函数，主要因为他和 JavaScript 中的三元判断非常的相似。他有两个值，当条件成立返回一种值，当条件不成立时返回另一种值
    ```scss
    if($condition, $if-true, $if-false)

    if(true,1px,2px)    // 1px
    if(false,1px,2px)   // 2px
    ```

## 颜色函数
1. RGB函数
    * rgb($red, $green, $blue) : 根据红、绿、蓝三个值创建一个颜色
    * rgba($red, $green, $blue, $alpha) : 根据红、绿、蓝和透明度值创建一个颜色
    * red($color) : 从一个颜色中获取其中红色值
    * green($color) : 从一个颜色中获取其中绿色值
    * blue($color) :从一个颜色中获取其中蓝色值
    * mix($color1, $color2, [$weight]) : 将两种颜色混合在一起
2. HSL函数
    * hsl($hue, $saturation, $lightness) : 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色
    * hsla($hue, $saturation, $lightness, $alpha) : 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色
    * hue($color) : 从一个颜色中获取色相（hue）值
    * saturation($color) : 从一个颜色中获取饱和度（saturation）值
    * lightness($color) : 从一个颜色中获取亮度（lightness）值
    * adjust-hue($color, $degrees) : 通过改变一个颜色的色相值，创建一个新的颜色
    * lighten($color, $amount) : 通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色
    * darken($color, $amount) : 通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色
    * saturate($color, $amount) : 通过改变颜色的饱和度值，让颜色更饱和，从而创建一个新的颜色
    * desaturate($color, $amount) : 通过改变颜色的饱和度值，让颜色更少的饱和，从而创建出一个新的颜色
    * grayscale($color) : 将一个颜色变成灰色，相当于desaturate($color,100%)
    * complement($color) : 返回一个补充色，相当于adjust-hue($color,180deg)
    * invert($color, [$weight]) : 反回一个反相色，红、绿、蓝色值倒过来，而透明度不变
3. 不透明度函数
    * alpha($color) / opacity($color) : 获取颜色透明度值
    * rgba($color, $alpha) : 改变颜色的透明度值
    * opacify($color, $amount) / fade-in($color, $amount) : 使颜色更不透明
    * transparentize($color, $amount) / fade-out($color, $amount) : 使颜色更加透明
4. 其他函数
    * adjust-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha]) : 增加或减少一个或多个组件一种颜色
    * scale-color($color, [$red], [$green], [$blue], [$saturation], [$lightness], [$alpha]) : 流畅地缩放颜色的一个或多个属性
    * change-color($color, [$red], [$green], [$blue], [$hue], [$saturation], [$lightness], [$alpha]) : 更改a的一个或多个属性颜色
    * ie-hex-str($color) : 将颜色转换为IE过滤器理解的格式

## Sass的@规则
* @import
* @media
* @extennd
* @at-root
* @debug
* @warn
* @error 

## 项目
* [七色卡](http://jsrun.net/tKhKp/edit)

## 参考
* [Sass中文网](https://www.sass.hk/docs/)
* [Sass函数Api](http://sass-lang.com/documentation/Sass/Script/Functions.html)
* [Sass入门](https://www.imooc.com/learn/311)
* [Sass进阶](https://www.imooc.com/learn/436)
