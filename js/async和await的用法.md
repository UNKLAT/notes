**async/await的用法**

async用在函数上，async函数返回值是promise实例对象

await用于async函数中，await可以得到异步结果

```java
// 返回的对象是promise对象，可以使用then来获取返回的结果
async function query(id){
    // 可以获取异步结果，不需要使用then来获取
    var ret = await axios.get(url)
        console.log(ret)
        return ret 
}
query(id).then(ret=>{
    console.log(ret)
})
```

利用await在async函数中获取异步的结果，然后async函数返回一个promise对象，这样来解决异步编程

**多个异步请求处理**

await处理异步，会按照书写的顺序返回结果，如果遇到多个异步，后一个需要前一个异步结果作为参数，可以按照顺序书写



可以应用在请求数据的操作上，简化代码，本质上也是promise，这async和await可以理解为语法糖