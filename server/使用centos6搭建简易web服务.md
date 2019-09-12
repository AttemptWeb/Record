# 利用CentOS6搭建简易的web服务

	提示: 其中没有涉及到MySQl、MongoDB的安装和使用,包括docker容器等,使用nginx反向代理静态服务

## centOS服务器

	可以选用国外或者国内的服务器，这里只展示centOS系统配置，本人实在window系统下完成下列操作

- 选购一台合适的云服务器，系统为centOS

- 在window系统下安装xshell和xftp, 保证可以系统访问centOS系统

- 使用xshell连接上云服务器，使用超级管理员root登录

* 登录完成之后安装nginx

- 下面是需要下载的文件：
	- 首先安装wget ```# yum install wget```
	- nginx以来与gcc的编译环境 ```# yum install gcc-c++```
	- nginx的http模块需要使用pcre来解析正则表达式 ```# yum -y install pcre pcre-devel```
	- 依赖的解压包 ```# yum -y install zlib zlib-devel```
	- 下载nginx压缩包 ```# wget -c https://nginx.org/download/nginx-1.10.3.tar.gz```
	
- 解压与安装：
	- 解压nginx ```# tar -zxvf nginx-1.10.3.tar.gz```
	- 进入nginx目录 ```#cd nginx-1.10.3```
	- 对nginx的源码进行编译 ```# ./configure```
	- 开始编译 ```# make```
	- 继续编译 ```# make install```
	- 查看nginx安装的目录 ```# whereis nginx``` 它会告诉你nginx在哪，nginx的命令在/usr/local/nginx/sbin目录下
	
- nginx命令：
	- nginx命令```开启# ./nginx ```
		```停止# ./nginx -s stop```
		```# ./nginx -s quit```
		```重启# ./nginx -s reload```
		
	- 开启nginx ```# ./nginx ``` 必须在nginx的安装目录下的sbi文件开启，当然也可全局配置
	- 查看是否开启nginx ```# ps aux|grep nginx```

## nginx配置

以下是nginx配置的部分参考

```
# http server
http{
    server {
        listen       80;
        server_name  www.didiheng.com;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

	access_log off; #缓存日志关闭
	server_tokens off;
	tcp_nopush on;
	tcp_nodelay on;

	gzip  on; #gzip开启
	gzip_comp_level 6; #gzip比率
	gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

	proxy_connect_timeout 5;  #缓存链接
	proxy_read_timeout 60;	
	proxy_send_timeout 5;  
	proxy_buffer_size 16k;  
	proxy_buffers 4 64k;  
	proxy_busy_buffers_size 128k;  
	proxy_temp_file_write_size 128k;     

    location / {
	root   /www; #此处绝对地址
	index  index.html index.htm;
	try_files $uri $uri/ /index.html;  //使用客户端路由需配置
	rewrite ^(.*)$  https://$host$1 permanent;  /强制定向https  	
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
   }
    
    #node server
    server {
    	listen      7777;
        server_name  www.didiheng.com; # 域名地址
    
    	location / {
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    Host  $http_host;
            proxy_set_header    X-Nginx-Proxy true;
            proxy_set_header    Connection "";
            proxy_pass http://localhost:12345;	
	}
    }
    
    #https server
    server {
    	listen       443 ssl;
        server_name  www.didiheng.com;

        ssl_certificate      server.crt;
        ssl_certificate_key  server.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        access_log off;
        server_tokens off;

        tcp_nopush on;
        tcp_nodelay on;

        expires epoch;
	gzip  on;
        gzip_comp_level 6;
        gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

        proxy_connect_timeout 5;
        proxy_read_timeout 60;
        proxy_send_timeout 5;
        proxy_buffer_size 16k;
        proxy_buffers 4 64k;
        proxy_busy_buffers_size 128k;
        proxy_temp_file_write_size 128k;

        location / {
            root   /www;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
    }
    
}
```
**在以上配置中我直接将https开启了，若没有相关的ssl配置，请将https服务注释 使用 # 即可**

修改之后重启nginx 
``` # ./nginx -s reload```

使用serverIP或域名访问 访问

ps: 顺便推一下自己的个人公众号：Yopai，有兴趣的可以关注，每周不定期更新，分享可以增加世界的快乐

![](https://i.screenshot.net/g2x6lbd)
