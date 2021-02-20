面向对象的编程语言(https://dart.dev/)

#### 资料
* 慕课 https://www.imooc.com/learn/1035
* 手记 https://www.imooc.com/article/260329
* 查找 http://codingdict.com/article/21908
* 资料 https://www.cnblogs.com/jukaiit/category/1636484.html

#### 应用场景
1. web开发
2. 跨平台移动应用开发(flutter)
3. 脚本或服务端开发

#### 版本
* Dart1.x 稳定版
* Dart2.x 开发版

#### SDK安装
* Windows平台: choco install dart-sdk #或者直接下载安装软件 http://www.cndartlang.com/920.html
* Linux平台: sudo apt-get install dart
* Mac平台: brew install dart--devel

#### 踩坑
* choco安装: https://chocolatey.org/install
* dart安装包: https://zhuanlan.zhihu.com/p/53672286
* vscoe运行 
	* https://blog.csdn.net/u010351267/article/details/87865318
	* https://blog.csdn.net/weixin_44826717/article/details/102490406

#### 数据类型
1. 变量与常量
	* ```var```声明变量，默认值为```null```
	* ```final```声明一个只能赋值一次的变量
	* ```const```声明常量
2. 内置数据类型
	* 数值型 Number ```num```声明
		* 整形 ```int```声明
		* 浮点型 ```double```声明
		* 运算符 ```+ - * / ~/(取整) %```
		* 常用属性 ```isNaN isEven(偶数) isOdd(奇数)```
		* 常用方法 ```abs() round() floor() ceil() toInt() toDouble()```
	* 字符串 String
		* 使用**单引号**或**双引号**或**三引号**表示
			```dart
			String  variable_name = 'value'  // 单行字符串
			String  variable_name = "value"  // 单行字符串
			String  variable_name = '''line1
			line2'''  // 多行字符串
			```
		* 使用```r"1\n2"```避免转义，使用```${}```插入变量
		* 运算符 ```+ * == []```
		* 常用属性 ```length isEmpty(为空) codeUnits(返回给定字符串的UTF-16代码单元列表)```
		* 常用方法 ```contains() split() replace() startsWith() endsWith() indexOf() lastIndexOf() trimLeft() trimRight()```
	* 布尔型 Boolean ```bool```声明
	* 列表 List
		* 声明列表
			```dart
			var list = []	// 创建一个列表
			var list = const[1]	// 创建一个不可变列表
			var list = new List()	// 创建一个空列表
			```
		* 常用属性 ```[index] length reversed(翻转) isEmpty isNotEmpty```
		* 常用方法 ```add() insert() remove() clear() indexOf() lastIndexOf() sort() sublist() shuffle()(打乱) asMap() forEach()```
	* 键值对 Map
		* 声明列表
			```dart
			var map = {}	// 创建Map
			var list = const{}	// 创建一个不可变Map
			var list = new Map()	// 创建一个Map
			```
		* 常用属性 ```[key] length keys values isEmpty isNotEmpty```
		* 常用方法 ```remove(key) addAll() containsKey() containsValue() forEach()```
	* Runes、Symbols
	* dynamic 表示是动态的，数据类型是指任意类型
		* ```dynamic```声明

#### 运算符
1. 算数运算符 + - * / ~/(取整) %
2. 自增自减 ++var --var var++ var--
3. 关系运算符 == ！= > < >= <=
4. 逻辑运算符 ! && ||
5. 赋值运算符 = ??= +=
6. 条件表达式 a?b:c a??b

#### 控制语句
* if for while break continue switch...case

#### 方法
1. 方法特性
	* 方法也是对象，并且有具体类型```Function```
	* 返回值类型、参数类型都可以省略
	* 箭头语法：只适用于一个表达式
	* 默认返回null方法
		```dart
		void main () {}
		() => {}
		String printStr(String name, int age) {
			print("name=$name, age=$age")
		}

		```
2. 可选参数
	* 可选命名参数```{param1, param2}```
	* 可选位置参数```[param1, param2]```
	* 如果存在具体参数，可选参数声明，必须在参数后面
		```dart
		void main () {
			printObj('name', age:20)
			printList('name', 20)
		}

		String printObj(String name, {int age}) {
			print("name=$name, age=$age")
		}
		String printList(String name, [int age]) {
			print("name=$name, age=$age")
		}

		```
3. 默认参数
	* 适用```=```在可选参数指定默认值
	* 默认值只能是编译时常量
4. 方法对象
	* 方法可作为对象赋值给其他变量
	* 方法可作为参数传递给其他方法
5. 匿名方法&闭包

#### 面向对象
1. 类与对象
	* 使用关键字```class```声明一个类
	* 使用关键字```new```创建一个对象
	* 所有对象都继承于```Object```
2. 属性与方法
	* 属性默认会生成```getter```和```setter```方法
	* 使用final声明的属性只有```getter```方法
	* 属性和方法通过```.```访问
	* 方法不能被重载
3. 类及成员可见性
	* Dart中的可见性以```library(库)```为单位
	* 默认情况下，每个Dart文件就是一个库
	* 使用```_```表示库/属性/方法的私有性
	* 使用```import```导入库
4. 计算属性
	* 通过计算而来，本身不存储值
	* 计算属性赋值，是通过计算转换到其他实例变量
		```dart
		void main () {
			var rect = new Rectangle();
			rect.width = 10;
			rect.height = 20;
			print(rect.area)
		}

		class Rectangle{
			num width,height;
			num get area {
				return width * height
			}
		}

		```
5. 构造方法
	* 常规的构造函数：用来构造当前类的函数，是一种特殊的函数，函数名称必须要和类名相同才行
	* 命名的构造函数：从另一类或现有的数据中快速实现构造函数
	* 常量构造方法：使用```const```声明，所有变量都是```final```
	* 工厂构造方法：在构造方法前添加关键字```factory```，可返回对象
	* 构造函数初始化列表：在构造方法体执行之前执行
	* 静态成员```static```
6. 对象操作符
	* 条件成员访问：```?.```
	* 类型转换：```as```
	* 是否指定类型：```is is!```
	* 重载操作符：```operator```
7. 继承
	* 使用```extends```继承
	* 子类会继承父类的属性和方法，不会继承构造方法
	* 子类能够复写父类的方法、getter和setter
	* 单继承、多态性
	* 继承中的构造方法
8. 抽象类
	* 使用```abstract```表示
	* 抽象方法不用```abstract```修饰，无实现
	* 抽象类可以没有抽象方法
	* 有抽象方法的类一定得声明抽象类
9. 接口
	* 类和接口是统一的，类就是接口
	* 每个类都隐式的定义了一个包含所有实例成员的接口
	* 如果是复用已有类的实现，使用继承```extends```
	* 如果只是使用已有类的外在行为，使用接口```implements```
10. Mixins
	* 类似多继承，是在多类继承中重用一个类代码的方式
	* 作为Mixin的类不能有显示声明构造方法
	* 作为Mixin的类只能继承自Object
	* 使用```with```关键字连接一个或多个mixin

#### 枚举&泛型
1. 枚举 ```enum```
2. 泛型```<type...>```