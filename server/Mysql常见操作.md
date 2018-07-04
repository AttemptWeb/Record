## mysql初次安装服务启动
----------

>   MySQL的bin目录, 在命令行窗口输入:**mysqld --install**

****

>   将 **D:\Mysql\bin**    添加到环境变量 **path** 中

****
> 1. 命令执行 **mysqld --initialize --user=mysql --console**
>   * 获得一个临时密码，需要记录，之后会用到。**最后locahost一串字符**
>   * 清除生成的随机密码，进入mysql---> 命令 mysql > ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';

****
> 2.**net start mysql** 启动服务

****
> 3.**mysql -uroot -p**，利用之前的临时密码输入即可登录数据库成功。

****
> 4.修改临时密码，设置密码：**mysql admin -u USER -p password PASSWORD**，注意USER和PASSWORD为自己定义的数值。

创建、删除数据库
----------
```javascript
<!-- 查看全部数据库 -->
$ show databases;

<!-- 查看当前数据库 -->
mysql> select database();

<!-- 切换当前数据库 -->
mysql> use [数据库名];

<!-- 创建数据库 -->
mysql> create database [数据库名];

<!-- 删除数据库 -->
mysql> drop database [数据库名];
```

创建、删除数据表
----------
```
<!-- 查询数据表 -->
mysql> select tables;

<!-- 查询数据表信息 -->
mysql> desc ['数据表名']

<!-- 创建数据表 -->
mysql> create table runoob_tbl(
   -> runoob_id int not null auto_increment,
   -> runoob_title varchar(100) not null,
   -> runoob_author varchar(40) not null,
   -> submission_date date,
   -> primary key ( runoob_id )
   -> )engine=InnoDB default charset=utf8;

*   如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。
*   auto_increment定义列为自增的属性，一般
用于主键，数值会自动加1。
*   primary key关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
```
