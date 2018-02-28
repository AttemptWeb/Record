# 利用CentOS6搭建建议的web服务

	提示: 其中没有涉及到MySQl、MongoDB的安装和使用,包括docker容器等

## centOS服务器

	可以选用国外或者国内的服务器，这里只展示centOS系统配置，本人实在window系统下完成下列操作

- 选购一台合适的云服务器，系统为centOS

- 在window系统下安装xshell和xftp, 保证可以系统访问centOS系统

- 使用xshell连接上云服务器，使用超级管理员root登录

* 登录完成之后安装nginx
	- 首先安装wget ```# yum install wget```
	- nginx以来与gcc的编译环境 ```# yum install gcc-c++```
	- nginx的http模块需要使用pcre来解析正则表达式 ```# yum -y install pcre pcre-devel```
	- 依赖的解压包 ```# yum -y install zlib zlib-devel```
	- 下载nginx压缩包 ```# wget -c https://nginx.org/download/nginx-1.10.3.tar.gz```
	- 解压nginx ```# tar -zxvf nginx-1.10.3.tar.gz```
	- 进入nginx目录 ```#cd nginx-1.10.3```
	- 对nginx的源码进行编译 ```# ./configure```
	- 开始编译 ```# make```
	- 继续编译 ```# make install```
	- 查看nginx安装的目录 ```# whereis nginx``` 它会告诉你nginx在哪，nginx的命令在/usr/local/nginx/sbin目录下
	- ```./nginx 
		./nginx -s stop
		./nginx -s quit
		./nginx -s reload
		```
