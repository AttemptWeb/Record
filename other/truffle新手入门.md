# truffle新手实验

>	属于区块链truffle框架的HelloWorld的级别，😄

**安装要求**

	* Mac系统
	
	* node 	(已经默认安装成功)

	* truffle

	* TestRsp

## 开发环境
```cmd
$ sudo npm install -g truffle  //安装

$ sudo npm install -g ethereumjs-testrpc //安装testrpc

<!-- 创建文件目录 -->

$ mkdir truf

$ cd truf

$ truffle init

```

目录如下

![文件目录](https://didiheng.com/Img/FileDir.png)

truffle 会自动安装一个样例工程，我们只需在此基础上进行开发，极大地提升了工作效率。这个样例工程是MetaCoin，一个简单的辅币合约contract。

```cmd
//  开启testrpc
$ testrsp
```
![开启testRsp](https://didiheng.com/Img/testRsp.png)


待testrpc运行后，你可在终端中输入
```cmd
$ truffle compile // 首先编译样本合约

$ truffle migrate // 部署合约到testrpc节点。
```

配置truffle.js
```
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```
![truffle.js配置](https://didiheng.com/Img/truffle配置.png)


## 开始hello World
创建新的目录
```cmd
$ truffle create contract helloworld

定义一个balance变量，在构造函数中赋值
```
![创建hellowworld](https://didiheng.com/Img/CreateHW.png)

编译 ```truffle complie``` ，生成helloworld.json文件

![生成json文件](https://didiheng.com/Img/compJson.png)

第二步是migration

```truffle migrate``` migration是指truffle将工程中多个contract按照相关的顺序相互链接和部署deploy的过程，各种contract彼此之间有依赖关系（dependency）。不仅如此，truffle的migration功能能够判断在整条blockchain上，这个contract是否之前曾被部署过。

创建编辑 2_deploy_contracts.js 文件

![创建deplay文件](https://didiheng.com/Img/deplay.png)
```
var helloworld = artifacts.require("./helloworld.sol");

deployer.deploy(helloworld);

```

再次编译 ```truffle complie```

输入命令
```
$ truffle migrate --reset
```
![migrate](https://didiheng.com/Img/migrate.png)

第三 truffle console

```$ helloworld.deployed()``` 输出一系列contract的配置和参数

![console](https://didiheng.com/Img/console.png)

第四：获取balance：

```
$ var hw 
$ helloworld.deployed().then(function(instance){hw = instance})
$ hw.balance.call().then(console.log())
```
![获取balance](https://didiheng.com/Img/balance.png)

有两种方式与blockchain发生交互：

* Read-only指令或方法：这些方法并不改变blockchain状态。 Query / call 发出问询获取某个值或者状态，运行纯计算指令由你的计算机负责完成，与blockchain无关，这些指令仅读取状态，执行计算，返回结果，由本地计算机执行完成无需消耗gas，定义时加constant

* Transactional 方法： 这种方法在contract中改变blockchain状态或者发生资金流动，必须发布transaction到blockchain，有整个Eethereum Virtual Machine 执行并消耗gas。Update the state of blockchain。

第五：改变balance的值，状态

![改变banlance](https://didiheng.com/Img/changeHWFile.png)

创建一个deposit函数，重新compile 和 migrate, 务必加上--reset参数

```
$ truffle migrate --reset
```
获取账户信息：accounts[0] 账户拥有998507 ether

![查看账户](https://didiheng.com/Img/lookUser.png)

给这个helloworld 本身增加500 balance

```cmd
$ helloworld.deployed().then(function(instance) {return instance.deposit(500)}).then(console.log());

```

![changeBalance](https://didiheng.com/Img/changeBalance.png)

此交易完成：有一个交易的hash码，同时helloworld本身变成1500 balance。
非常明显此交易改变了blockchain的状态，因此必然消耗了gas，因此我们看到accounts[0]的ether变为998480。消耗998507 - 998480 = 27

****

参考：

[使用EthereumJS TestRPC和truffle搭建ethereum开发环境——Helloworld](https://zhuanlan.zhihu.com/p/26735367)

[truffle配置](http://truffleframework.com/docs/advanced/configuration)





