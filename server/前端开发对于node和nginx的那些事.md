# node和nginx组合那些事

作者：[HerryLo](https://github.com/HerryLo)

本文永久有效链接： [https://github.com/AttemptWeb/Record....](https://github.com/AttemptWeb/Record/)


对于前端开发，了解nodejs和nginx是有必要的。前端开发者自己构建项目时，更多的是自己使用nodejs+mongoDB搭建后端接口，使用nginx作为反向代理服务器。

为何选用nginx？对于前端来说，我觉得它是便于学习的，方便配置的。

下面是node和nginx组合的一点心得。

## nodejs

nodejs搭建简易的前端服务接口
```
const http = require('http');

http.createServer(function(request, response){
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(1234);
```

nodejs可以提供接口和服务，在前端开发中，完全可以满足我们的需要。但我们将node服务部署到服务器时，那么我们就此时就需要用到代理服务器。

不论是使用 [koa](https://koa.bootcss.com/)、[express](http://www.expressjs.com.cn/)、[egg](http://eggjs.org/zh-cn/index.html)，哪一种node框架编写后端接口，当代码上线时，都需要用到代理服务器。可能java或者php开发者用到的可能是 tomcat和apache。对于前端，我觉得nginx非常合适。

## nginx
在开发过程中你也可以直接使用nginx作为前端开发服务器
```
# 在window下使用nginx代理项目
# nginx.config
server {
        listen      7777;
        server_name  localhost;

        # 开启gzip压缩
        gzip on;

        location /{
            root  D:/code/caiyi;
            index index.html index.htm;
        }
}
```

配置nginx.config，对应功能，gzip压缩、缓存、域名配置、负载均衡。开启nginx，你就可以通过http://localhost:7777 访问本地前端页面了。

参考：

[nginx解决前端跨域](https://www.cnblogs.com/liliangel/p/7494853.html)

[前端对于nginx的使用](https://segmentfault.com/a/1190000013781162)

[nginx文档](http://nginx.org/en/docs/)

[个人nginx配置示例](https://github.com/HerryLo/Record/blob/master/server/%E4%BD%BF%E7%94%A8centos6%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93web%E6%9C%8D%E5%8A%A1.md)

## 如何将node和nginx在服务器组合使用

- 服务器环境 linux、centos
- 依赖
    - node
    - nginx

下面已[express](http://www.expressjs.com.cn/)为例子

```
<!-- node服务 -->
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(1234, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```

在服务端使用node和在客户端是基本一致的，使用 pm2 开启node服务, 当然在开启之前记得安装npm包依赖. 那么此时的node接口就是 htpp://locahost:1234，但是在客户端无法直接访问。
那么我们就需要代理服务器，使用nginx反向代理node服务接口，转换到我们的域名上面代码如下

```
<!-- nginx代理node 接口 -->
server {
        listen      80;
        server_name  www.xxx.com; # 域名地址

        # 开启gzip压缩
        gzip on;

        location /{
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    Host  $http_host;
            proxy_set_header    X-Nginx-Proxy true;
            proxy_set_header    Connection "";
            proxy_pass http://localhost:1234;
        }
}
```
启动nginx，那么此时我们可以就可以通过 www.xxx.com 调用node接口了。

[centos上node的安装](https://github.com/HerryLo/Record/blob/master/server/centos%E9%85%8D%E7%BD%AEnode%E6%9C%8D%E5%8A%A1.md)

[centos上nginx的安装和使用](https://github.com/HerryLo/Record/blob/master/server/%E4%BD%BF%E7%94%A8centos6%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93web%E6%9C%8D%E5%8A%A1.md)

ps: 顺便推一下自己的个人公众号：Yopai，有兴趣的可以关注，每周不定期更新，分享可以增加世界的快乐

![](https://i.screenshot.net/g2x6lbd)


