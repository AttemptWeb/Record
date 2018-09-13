### SASS & SCSS
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

### [安装](https://www.sass.hk/install/)
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

### Sass的基本特性-基础
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

