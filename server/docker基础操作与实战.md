<!--
 * @Descripttion: 
 * @version: 
 * @Author: EastSummer
 * @Date: 2020-11-03 15:26:04
 * @LastEditors: EastSummer
 * @LastEditTime: 2021-01-13 18:35:20
-->
### Build Ship Run
* 镜像 仓库 容器
1. Docker镜像 - 联合文件系统
2. Docker容器 - 虚拟机
3. Docker仓库

### linux
1. 安装
  * termi 打开终端  
  * uname -r  版本  
  * su  切到root用户  
  * apt-get update  保证最新版本  
  * 系统自带的安装包
  apt-get install -y docker.io  安装docker
  * 拉去最新安装包
  curl -s https://get.docker.com|sh
2. 安装完成
  * service docker start  启动
  * docker version  版本  
    包括 Client & Derver 端
3. [Centos](https://www.cnblogs.com/yufeng218/p/8370670.html)

### 使用
1. docker pull [```OPTIONS```] NAME[```:TAG```] 用来从远程仓库拉取镜像
  * OPTIONS 参数
  * :TAG  版本
2. docker images [```OPTIONS```] [```REPOSITORY```[```:TAG```]] 查看本机有哪些镜像、pull是否成功
  * OPTIONS 参数
  * REPOSITORY[:TAG]  指定镜像和tag
2. docker run [```OPTIONS```] IMAGE ```[:TAG] [COMMAND] [ARG...]``` 运行镜像
  * OPTIONS 参数
  * IMAGE  镜像名称（必填）
  * COMMAND  镜像运行的时候需要执行的命令
  * ARG  这条命令所依赖的参数
3. docker --help  查看命令
4. docker exec [```OPTIONS```] CONTAINER COMMAND [```ARG...```] 在一个运行的容器中可以执行的命令
  * CONTAINER 容器的名字或ID
  * docker exec --help
5. docker stop ID  停止
6. docker rm ID  删除容器
7. docker rmi ID  删除镜像
8. [坑1](https://blog.csdn.net/jamesdodo/article/details/106075462) docker容器启动不了
9. [坑2](https://blog.csdn.net/qq_41919792/article/details/106405662) Error: GPG check FAILED
10. [坑3](https://www.mayanpeng.cn/archives/121.html) container启动后退出
11.  RUN yum install initscripts

### 运行Nginx
1. docker pull hub.c.163.com/library/nginx:latest   网易蜂巢镜像中心
2. docker images
3. docker ps  查看目前正在这台机器上运行的容器 docker ps -a
4. docker run -d hub.c.163.com/library/nginx  后台运行
5. docker exec -it f4 bash  进入容器
6. ls clear pwd(linux根目录)
7. which nginx  查看nginx位置（linux命令）
8. ps -ef       当前服务有哪些进程（linux命令）
9. exit 退出容器

### Docker网络
1. 网络类型
  * Bridge桥接 docker容器默认分配一个独立的network namespace
  * host  与主机通用一个ip和端口
  * None  没有网络
2. 端口映射 docker run -d -p 8080:80 hub.c.163.com/library/nginx
  * 第一个主机端口，第二个容器端口
  * netstat -na|grep 8080

### 制作镜像
1. Dockerfile
2. docker build -t xxx:latest .
  * 当前目录

### 示例
1. 虚拟机上准备好文件，参考
2. 创建 ```init.sh``` 脚本
  ``` shell
#!/bin/bash

START_CMD="jt2_fiqs"
exec service $START_CMD start &

tail -f /dev/null
  ```
3.  创建 ```Dockerfile``` 文件
```docker
FROM centos:centos7　　　　　　　　　　　　　　
MAINTAINER EastSummer

RUN yum install initscripts --nogpgcheck -y
COPY export/ /export/
COPY export/wy/www/jt2_fiqs/bin/jt2_fiqs /etc/init.d/
COPY export/wy/www/jt2_fiqs/bin/init.sh /etc/init.d/

WORKDIR /etc/init.d/
RUN pwd

ENTRYPOINT ["bash","init.sh"]
# CMD ["./init.sh"]
# CMD ["service", "jt_fiqs", "start"]
# CMD ["service", "/etc/init.d/jt_fiqs", "start"]
```
4. docker build -t fiqs:latest .
5. docker run -dit -p 8080:8080 fiqs:latest
6. docker exec -it ID bash

### 声明
[本文](https://www.imooc.com/learn/824)
