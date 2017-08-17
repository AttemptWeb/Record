```javascript
str= str.toString()
str=str.replace(/\+/g,"%2B");
```
如果不替换queryString将无法识别，直接会使用空格替换
