
[centos6.8安装mongodb](#centos68安装mongodb)

[window配置mongoDB](#window配置mongoDB)

[centOS配置mongoDB](#centos-配置mongodb)

[查询和创建doc](#查询和创建doc)

[增删改查](#增删改查)

[符号的含义](#符号的含义)

## centos6.8安装mongodb
```
1. 下载安装包
# wget  https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.4.0.tgz

2. 解压
# tar -zxvf mongodb-linux-x86_64-amazon-3.4.0.tgz

解压完成即成功
```

## window配置mongoDB

> 1.添加环境变量 如 D:\MongoDB\bin

> 2.在文件中创建data文件，保存数据文件

> 3.以上弄好之后，即可启动 MongoDB,命令行输入： **mongod --dbpath D:\MongoDB\data**

> 4.MongoDB 客户端，命令行输入 : **mongo**

* 在这里我们可以直接使用**配置**中第三项启动mongodb服务，当然也可使用配置Mongodb.conf启动mongodb服务:

> 创建D:\MongoDB\log\Mongodb.log 文件 存放日志记录,创建即可

> 创建D:\MongoDB\conf\Mongodb.conf 文件 存放配置, 配置如下:

```javascript
#port 端口号  
port=23000  
#dbpath 数据库存储文件目录  
dbpath=D:/MongoDB/data  
#logpath 日志路径  
logpath=D:/MongoDB/data/log/Mongodb.log  
#logappend 日志追加形式  false:重新启动覆盖文件  
logappend=true  
#fork 后台启动  
fork=true  
  
#设置日志级别  
#0 - 关闭性能分析，测试环境可以打开，生成环境关闭，对性能有很大影响;  
#1 - 开启慢查询日志，执行时间大于100毫秒的语句  
#2 - 开启所有操作日志  
profile=1  
```

启动即可MongoDB可用: ** mongod -f D:\MongoDB\conf\Mongodb.conf**

[conf文件配置参数参考](http://blog.csdn.net/zhu_tianwei/article/details/44261235)

## centOS 配置mongoDB

>  默认安装成功mongodb, 目录为/usr/local/mongodb
  
1. /usr/local/mongodb下新建配置
```cmd
vi mongodb.conf

# 复制如下文件 若无data logs 文件 记得创建
dbpath = /usr/local/mongodb/data #数据文件存放目录
logpath = /usr/local/mongodb/logs/mongodb.log #日志文件存放目录
port = 27017  #端口
fork = true  #以守护程序的方式启用，即在后台运行
nohttpinterface = true
auth=true  #管理认证，若单人开发可关闭
bind_ip=0.0.0.0
```

2.启动
在/usr/local/mongodb下
```cmd
./bin/mongod -f mongodb.conf
```

3.关闭
```cmd
./bin/mongod -f mongodb.conf --shutdown
```

## 查询和创建doc

```javascript
// 展示默认数据库
> db

// 查询所有的数据库
> show dbs

// 指定到一个数据库/或者创建
> use databaseName(数据库名)

// 删除指定数据库
> db.dropDatabase()


// 创建集合
> db.createCollection(name, options)
|  参数     属性                描述                         
|  name     String      要创建的集合的名称                   
|  options  document    (可选)指定有关内存大小和索引的选项   

options参数是可选的，因此只需要指定集合的名称。 以下是可以使用的选项列表：
|字段             类型                            描述
|capped         Boolean     (可选)如果为true，则启用封闭的集合。如果指定true，则还需要指定size参数。
|autoIndexId    Boolean    （可选)如果为true，则在_id字段上自动创建索引。默认值为false。
|size           Number     (可选)指定上限集合的最大大小(以字节为单位)。
|max            Number     (可选)指定上限集合中允许的最大文档数。

// 指定储存大小
> db.createCollection("mycoll",{capped:true,size 10000})

// 查看创建的集合
> show collections

// 删除集合
> db.集合名.drop()
```

## 增删改查
```cmd
// 在集合中插入文档
> db.集合.insert({key: values})
> db.集合名.insertOne({key: values}) 插入一条
> db.集合名.insertMany([{},{},..,{}]) 可插入多条

// 集合中查询文档
> db.集合名.find({key: values})
values 可为数组、对象、字符串


// 修改单个文档
> db.集合名.updateOne(
   { key: values},
   {
     $set: { key: values,key: values },
     $currentDate: { lastModified: true }
   }
)
使用$set运算符修改字段，使用$currentDate运算符将lastModified字段的值更新为当前日期


// 修改多个文档
db.集合名.updateMany(
   { "qty": { $lt: 50 } },
   {
     $set: { "size.uom": "in", status: "P" },
     $currentDate: { lastModified: true }
   }
)
{$lt: 50}查找小于50的所有文档


// 替换文档
db.集合名.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
)

// 删除文档
db.集合名.deleteMany({  key: values}) 多个
db.集合名.deleteOne( { key: values} )  单个
```

## 符号的含义
```javascript
$lt 小于
$lte 小于等于
$gt 大于
$gte 大于等于
$ne 不等于
$or 或者
```

