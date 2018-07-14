# 刷阅读量很简单

[文章地址](https://github.com/HerryLo/Record/blob/master/other/%E9%80%9A%E8%BF%87node%E5%88%B7%E9%98%85%E8%AF%BB%E9%87%8F.md)

绝对不含恶意，只希望可以提出自己的建议。谢谢！！在简书上也有这篇文章哦！！

使用nodejs刷了一下 **慕课网手记** 文章的阅读量，阅读量上去了，害怕被封IP。所以赶紧提了意见反馈，然后我的文章就从第一掉下来了。**刷的文章 [CentOS6搭建简易的web服务](https://www.imooc.com/article/43033)**。

希望给大家分享一下怎么刷阅读量，目前 **慕课网手记** 的文章 和 **简书**上的文章可以直接通过刷新使阅读量上升。其实CSDN也是可以的，不过需要加一个定时器。

**目前不是使用的动态IP，所以可能会被封！！**下面的代码仅供学习，请不要随意使用。

喜欢研究的同学可以研究一下动态IP的请求

## node刷阅读量

安装依赖:
    - 需要安装 nodejs

[代码](https://github.com/HerryLo/JavascriptCode/blob/master/node_learn/src/request.js)

```
const https = require('https');
const hostname = `www.imooc.com`
const hostpath = `/article/43033`

const options = {
  hostname: hostname,
  port: 443,
  path: hostpath,
  method: 'GET',
  headers: {
    'Cookie': 'UM_distinctid=162f1d130d21ce-03800955807383-336c7b05-13c680-162f1d130d32d1; CNZZDATA1261110065=1500861835-1524473432-https%253A%252F%252Fwww.baidu.com%252F%7C1524473432; imooc_uuid=2a3b905e-ee72-4e57-bd30-1e913806335e; imooc_isnew_ct=1524475442; imooc_isnew=2; IMCDNS=0; PHPSESSID=ppb2ulka03gingrd146go1ool2; loginstate=1; apsid=IwZmM3NTVmNGJlM2E4YmVmNTA2OGFmOWU1MTkxMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDAzNjE0MQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTY5MTcwMTY1QHFxLmNvbQAAAAAAAAAAAAAAAAAAADY1Y2U0N2NiYWVkZDUwYzU3NDU0Yzg1YTY4YTJlYjcxjW1DW41tQ1s%3DZj; last_login_username=1169170165%40qq.com; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1531364486,1531374595,1531377700,1531393846; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1531364486,1531374595,1531377700,1531393846; Hm_lpvt_fb538fdd5bd62072b6a984ddbc658a16=1531393855; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1531393855; cvde=5b436d5ef259b-605',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    accept: '*/*',
    'Origin':'https://www.imooc.com',
    'Referer':'https://www.imooc.com/article/43312',
    'Host':'www.imooc.com',
    'Connection':'keep-alive'
  }
};

function httpRequest(options) {
    return new Promise((resolve, reject)=> {
        try{
            const req = https.request(options, (res) => {
                // console.log('状态码：', res.statusCode);
                // console.log('请求头：', res.headers);
                res.on('data', (d) => {
                    resolve(d);
                });
            });
            req.on('error', (e) => {
                console.error(e);
                reject(e)
            });
            req.end();
        }catch(e){
            console.log(e);
        }
    })
}

async function main() {
    for (let i = 0; i < 2; i++) {
        await httpRequest(options).then((d)=> {
            console.log(`请求${hostname}${hostpath}的次数达到${i+1}次`);
        })
    }
}

main();

```

这个代码量相当少了。考虑设置动态IP

**喜欢点个推荐哦！！不过希望大家了解，刷阅读量会被封IP的**
