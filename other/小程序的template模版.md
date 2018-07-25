## 小程序的template

template的方法对于一些重复的简单的模版比较适用。

## 创建template

template:

![img1](https://raw.githubusercontent.com/HerryLo/Knowledge/master/Img/1532526492429.jpg)

对于template模版的存放目录，可以根据功能和项目而定。template模版的文件依然使用.wxml和.wxss扩展名, 其中js文件的作用是将template使用的公用方法抽离。**其中name为模版的名称**，其中的两个变量是调用template传入。

template的公共方法:

![img2](https://raw.githubusercontent.com/HerryLo/Knowledge/master/Img/1532527136457.jpg)

使用 module.exports 暴露方法，便于其他page页面调用。后面将导入到page中，所以可以在这里可以直接使用 this。

## 使用template