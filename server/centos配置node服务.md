# 安装node服务

* Centos6 系统
* 使用 nginx反向代理nodejs服务
* 安装npm包时，注意Centos上node版本

## 安装nginx
[查看nginx配置文件](../server/使用centos6搭建简易web服务.md)

## 安装nodejs
```
# wegt https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz

# tar node-v9.3.0-linux-x64.tar

完成后，进到该目录，依次

#./configure

# make

# make install

# node -v // 查看版本

```
