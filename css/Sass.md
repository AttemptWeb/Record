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
- [Sass的函数功能](#Sass的函数功能)
- [Sass的@功能](#Sass的@功能)

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
    * + 可用于连接字符串
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







