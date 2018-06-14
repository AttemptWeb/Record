# 安装node服务

* Centos6 系统
* 使用 nginx反向代理nodejs服务
* 安装npm包时，注意Centos上node版本

## 安装nginx
[查看ngin配置](https://github.com/HerryLo/Knowledge/blob/master/server/%E4%BD%BF%E7%94%A8centos6%E6%90%AD%E5%BB%BA%E7%AE%80%E6%98%93web%E6%9C%8D%E5%8A%A1.md)

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
