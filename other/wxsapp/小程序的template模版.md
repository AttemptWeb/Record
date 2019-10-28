## 小程序的template

template的方法对于一些重复的简单的模版比较适用。在之前的文章中大致讲解了小程序 [小程序开发](https://github.com/HerryLo/Record/blob/master/other/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91.md)
，现在这里专门讲解怎么调用template模版
## 创建template

**1.template模版目录:**

![img1](https://didiheng.com/Img/1532526492429.jpg)

对于template模版的存放目录，可以根据功能和项目而定。template模版的文件依然使用.wxml和.wxss扩展名, 其中js文件的作用是将template使用的公用方法抽离。**其中name为模版的名称**，其中的两个变量是调用template传入。

**2.template的公共方法:**

![img2](https://didiheng.com/Img/1532527136457.jpg)

使用 module.exports 暴露方法，便于其他page页面调用。后面将导入到page中，所以可以在这里可以直接使用 this。

## 使用template

**3.在page页中引入模版:**

![im3](https://didiheng.com/Img/1532528038421.jpg)

使用import引入模版，使用template调用，其中data中就是传入的参数。**在template模版中中wxml文件使用的变量，在引入时的data中传入，此时的data既可以是数据，也可以是方法函数**。

**4.在page中引入模版方法:**

![img4](https://didiheng.com/Img/1532528443993.jpg)

小程序支持Es6/7的部分特性在之前说到过，可以使用import 引入方法，一定要将方法导入到Page中，否则是失效的。

别忘记在data中定义template需要的变量。

**5.在page中引入模版样式:**

![img5](https://didiheng.com/Img/1532529024205.jpg)

**6.点击按钮调用template模版**

![img6](https://didiheng.com/Img/1532529149915.jpg)

模版调用成功。这里只写出了调用的方法，记录下来，可以时刻回顾。
