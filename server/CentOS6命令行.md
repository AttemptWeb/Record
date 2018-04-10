# 命令行

在搬瓦工买的VPS，使用的是centOS6系统，顺便也当VPN用，可以搭载简易的web 服务

[我自己搭建的简易web 服务](http://97.64.18.58)，使用的是nginx映射。

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


## 常见命令行

```cmd
<!-- 查看进程 -->
# ps -af | grep nginx



```
