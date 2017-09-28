## 基本类型和引用类型

### 基本类型

基本类型有Undefined，Boolean，Number，String，Null，基本类型是按值访问，可以直接操作保存在变量中的值。
    ** 基本特点如下：
    1. 基本类型的值不可变
```javascript
var name = 'jozo';
<!-- 大写，但是本身不会变 -->
name.toUpperCase(); // 输出 'JOZO'
console.log(name); // 输出  'jozo'

```
    会发现原始的name并未发生改变，而是调用了toUpperCase()方法后返回的是一个新的字符串。