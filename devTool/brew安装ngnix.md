系统: mac

第一步: 

首先需要安装Homebrew，若未安装可使用一下命令:
```cmd
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
安装完之后，即可使用brew;


第二步:
```cmd
$ brew install nginx
<!-- 若报错可参考报错信息修改 -->

<!-- 查看已经安装的软件 -->
$ brew list

$ brew services start nginx

$ brew services stop nginx
```


第三步:

如果希望修改html文件和nginx端口号，可以继续一下操作;

```cmd
<!-- 查看 nginx安装目录 -->
$ brew list nginx
<!--  打印出的安装地址
/usr/local/Cellar/nginx/1.15.5/.bottle/etc/ (15 files)
/usr/local/Cellar/nginx/1.15.5/bin/nginx
/usr/local/Cellar/nginx/1.15.5/homebrew.mxcl.nginx.plist
/usr/local/Cellar/nginx/1.15.5/html -> ../../../var/www
/usr/local/Cellar/nginx/1.15.5/share/man/man8/nginx.8
-->

<!-- 看上面的第四条记录，找到/usr/local/var下的www文件夹,即是nginx目标文件 -->
$ /usr/local/var/www

<!-- 修改nginx.config 配置文件，即可修改配置文件 -->
$ /usr/local/etc/nginx
```
