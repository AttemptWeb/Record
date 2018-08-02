有爬取过一些网站的图片，或者爬取网站的信息的需求，对于开发人员来说，ProxyIP是必不可少的。当然，
不是每个人都愿意去花钱来买代理IP，那么当然剩下一个好的方法，直接使用**网络爬虫爬取ProxyIP**。

基于node的爬虫获取proxy IP：

 * request获取html页面；
    
 * 使用cheerio获取文档的DOM节点，通过对DOM节点的解析；
    
 * 通过代理IP访问百度，验证IP的正确性；
    
 * 将获取的IP保存在json文件中，剩下的就随便玩了；
 
|系统 |运行环境  |工具包 |
|:-----|:-------:|:-----|
|不限     |   node  |  [request](https://www.npmjs.com/package/request)、[cheerio](https://www.npmjs.com/package/cheerio)、[bluebird](https://www.npmjs.com/package/bluebird) |
 
有兴趣的可以了解，[github源码地址](https://github.com/HerryLo/proxyIP)

展示部分代码
```javascript
/**
 * 筛选有效IP
 * @param {*} data 数据IP
 */
async function check(data) {
    console.log('开始验证数据:')
    try {
        const valid = []  //有效数据
        await new Promise((res, rej) => {
            let length = data.length
            for (let i = 0; i < data.length; i++) {
                const options = {
                    url: "https://www.baidu.com",
                    proxy: data[i]
                }
                request.get(options, (err, req, body) => {
                    if (err) {
                        if ((--length) === 0) {
                            return res()
                        }
                    }else{
                        if(body&&req.statusCode===200){
                           valid.push(data[i])
                         }
                    }
                      
                    if ((--length) === 0) {
                        return res()
                    }
                })
            }
        })
        console.log('有效数据:' + valid.length)
        return valid
    } catch (err) {
        console.log(err)
    }
}
```
后面会持续的迭代，[github源码地址](https://github.com/HerryLo/proxyIP)，如果代码有问题，可以直接[issues](https://github.com/HerryLo/Record/issues)。
