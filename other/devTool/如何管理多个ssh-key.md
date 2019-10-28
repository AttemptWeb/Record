# 管理多个ssh-key

ssh-key密钥 常用来管理我们的git仓库，gitlab、github都是很常见的。它可以避免我们重复的输入密码，提高开发效率。

下面就来说一说，如何管理多个ssh-key，下面我们以**gitlab**和**github**作为示例:

## 查看ssh目录

查看是否存在```~/.ssh```目录
```
$ cd ~/.ssh
```
如果不存在，就新建一个.ssh目录
```
$ mkdir ~/.ssh
```

后面讲到的ssh-key密钥文件 就会配置```~/.ssh```

## 生成多个ssh-key密钥

进入```~/.ssh```目录
```
$ cd ~/.ssh
```

1. 生成github的ssh-key公钥

```
$ ssh-keygen -t rsa -C "对应的邮箱地址"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/herrylo/.ssh/id_rsa): id_github_rsa
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/schacon/.ssh/id_rsa.
Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```

**别直接Enter回车哦！那样会在```~/.ssh```目录下直接生成默认的密钥文件```id_rsa```,我们需要管理自己的ssh密钥文件，需要修改文件名**，文件名可以自己定，不过最好是简单明了。如
```
Enter file in which to save the key (/Users/herrylo/.ssh/id_rsa): id_github_rsa
```

2. 生成gitlab的ssh-key公钥
```
$ ssh-keygen -t rsa -C "对应的邮箱地址"
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/herrylo/.ssh/id_rsa): id_gitlab_rsa
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/schacon/.ssh/id_rsa.
Your public key has been saved in /home/schacon/.ssh/id_rsa.pub.
The key fingerprint is:
d0:82:24:8e:d7:f1:bb:9b:33:53:96:93:49:da:9b:e3 schacon@mylaptop.local
```

同上:
```
Enter file in which to save the key (/Users/herrylo/.ssh/id_rsa): id_gitlab_rsa
```

查看生成的ssh-key密钥文件目录
```
$ ls ~/.ssh 
```
![ssh目录](https://didiheng.com/Img/sshDir.png)

上面的 ```id_rsa_github.pub```、```id_rsa_gitlab.pub```文件即是github与gitlab需要的公钥文件

vi查看文件内容，复制文件内容到gitlab和github的ssh配置中心，添加ssh
```
$ vi id_rsa_github.pub

$ vi id_rsa_gitlab.pub
```

ssh密钥配置基本完成，上面我们生成了两个密钥，将他们添加到了gitlab和github的ssh配置中心。现在还需要对两个ssh密钥进行管理。

## 管理 多个ssh密钥

```config```文件是管理多个sshkey密钥的配置文件，下面我们需要修改```config```文件

![ssh的config](https://didiheng.com/Img/sshConfig.png)

使用```vi```编辑查看config文件, 文件修改成如下配置即可:

![config配置](https://didiheng.com/Img/configSsh.png)

在```config```文件添加上图中的配置, 记得根据自己的文件位置和用户名修改。下面我们来试试github是否可以连接成功。

![sshConnect](https://didiheng.com/Img/sshConnect.png)

当然这个只是管理gitlab和github,告诉你是连通的，基本大功告成！

```ssh```也可用来访问自己的远程服务器.

## ssh访问远程服务器

依然是修改config文件
```
$ vi config
```
![sshServer](https://didiheng.com/Img/sshServer.png)

配置完之后保存退出, 在命令行窗口输入```$ ssh VPS```，随后输入服务器密码，即可访问远程服务器。当然这是在mac系统中，如果是window系统可以使用Xshell访问。

好了，以上就是平时会使用到的ssh了，管理git的sshkey、访问远程服务器。

欢迎留言，如果有不对的地方希望可以指正。

参考: 

[SSH原理与运用（一）：远程登录](http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)

[Git - 生成 SSH 公钥](https://git-scm.com/book/zh/v1/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)
