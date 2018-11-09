# 命令行

- [1.mac下连接centOS6](#mac下连接centOS6)
- [2.查看内核](#查看内核)
- [3.查看进程](#查看进程)
- [4.清理内存缓存](#清理内存缓存)
- [5.修改环境变量](#修改环境变量)
- [6.刷新swap缓存](#刷新swap缓存)
- [7.重启防火墙报错](#重启防火墙报错)
- [8.iptables防火墙](#iptables防火墙)
- [8.查询端口](#查询端口)

在搬瓦工买的VPS，使用的是centOS6系统，顺便也当VPN用，可以搭载简易的web 服务

[我自己搭建的简易web 服务](http://www.didiheng.com)，使用的是nginx映射。

## mac下连接centOS6

安装iTerm工具 ，打开iTerm
```
# ssh -p [port] name@serverIP地址

之后输入 VPS的密码，就连接完成了。如果要进行文件上传使用FTP即可。

```

同时也可以配置ssh中的config文件
```
# cd ~/.ssh

# ls // 查看是否存在config文件

# vim conf // 若不存在config文件，使用vim创建即可

<!--将一下复制到config文件，修改HostName User Port成你自己的即可-->
Host demohost
  HostName 192.168.1.1
  User username
  Port 10022


<!-- 在iterm中 -->
$ ssh demohost
```


## window下连接CentOS6

直接下载xshell工具即可，按照步骤即可连接服务。


### 常见命令行

#### 查看内核
```
系统环境
# cat /etc/redhat-release

# uname -a
```

#### 查看进程
```cmd
# ps aux|grep nginx
```
#### 清理内存缓存
```
# free -m                                     查看内存

# echo 1 > /proc/sys/vm/drop_caches           清理缓存
```

#### 修改环境变量
```
# cd /etc/

# vi profile                修改profile文件， 添加环境变量

# source profile            重新生成
```

### 刷新swap缓存
```
# swapoff -a && swapon -a
```

### 重启防火墙报错
报错信息:
```cmd
[root@host ~]# service iptables status
iptables: Firewall modules are not loaded.
```

解决方法:  清理iptables规则.测试成功
```cmd
iptables -F #清理iptables规则
service iptables save #保存
service iptables restart #重启防火墙
service iptables status #查看状态
```
[参考](https://www.centos.bz/2017/09/%E8%A7%A3%E5%86%B3-iptables-firewall-modules-are-not-loaded/)

### iptables防火墙

```cmd

[root@tp ~]# iptables -L -n     查看防火墙状态

[root@tp ~]# iptables -F        清除预设表filter中的所有规则链的规则

[root@tp ~]# iptables -X        清除预设表filter中使用者自定链中的规则

<!--远程SSH登陆, 开启22端口 -->
[root@tp ~]# iptables -A INPUT -p tcp --dport 22 -j ACCEPT
[root@tp ~]# iptables -A OUTPUT -p tcp --sport 22 -j ACCEPT (注:这个规则,如果你把OUTPUT 设置成DROP的就要写上这一部,好多人都是望了写这一部规则导致,始终无法SSH.在远程一下,是不是好了.

<!-- FTP服务器, 开启21端口 -->
[root@tp ~]# iptables -A INPUT -p tcp --dport 21 -j ACCEPT

[root@tp ~]# /etc/rc.d/init.d/iptables save 保存添加的规则

[root@tp ~]# service iptables restart  重启防火墙
```
[参考](https://www.cnblogs.com/banwagong/p/8034632.html)

### 查询端口

```cmd
[root@tp ~]# netstat -ntlp  列出所有端口
```
[参考](https://www.cnblogs.com/xqzt/p/4919191.html)
