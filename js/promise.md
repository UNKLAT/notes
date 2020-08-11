promise异步编程的一种解决方案

好处：

1、可以避免多层异步调用嵌套问题，即回调地狱

2、promise对象提供了简洁的api，使得控制异步操作更加容易



promise实例用于处理异步任务，即resolve()和reject，然后通过then接收结果

即

```javascript
var p = new Promise(fucntion(resolve, reject){
    // 进行异步任务，成功调用resolve，resolve的参数为成功的数据；失败调用reject，参数为报错        信息
    if(sucess){
       resolve('sucess')
    } else {
        reject('error')
    }                
})
// 第二个函数参数可选
p.then(function(data){
    // data是resolve传递的数据
    console.log(data)
},fucntion(error){
     //error是reject传递的数据
    console.log(error)
 })
```

多次异步回调，要求按照顺序输出

```javascript
function query(){
    var p = new Promise(fucntion(resolve, reject){
    // 进行异步任务，成功调用resolve，resolve的参数为成功的数据；失败调用reject，参数为报错        信息
        if(sucess){
           resolve('sucess')
        } else {
            reject('error')
        }                
	})
}
// 改善代码的写法，依然是回调
query(A).then(function(A){
    console.log(A)
    return query(B)
})
.then(function(B){
    console.log(B)
    return query(C)
})
.then(function(C){
     console.log(C)
})

```

如果return的不是promise对象，而是普通值，then中的function的data直接接收这个普通值

**常用API**

p.then() 获得异步任务的正确结果

p.catch() 获取异常信息

p.finally() 不过成功失败都会执行，用来做一些提示或者销毁资源

 **对象方法**

Promise.all()  并发处理多个 异步任务，所有任务都执行完成才得到结果

Promise.race()  并发处理多个异步任务，只要有一个任务完成就能得到结果

---

**fetch基本用法**

```javascript
fetch(url).then(data=>{
    // fetch返回的数据，通过data.text方法获取最终数据
    return data.text()
}).then(ret=>{
    // ret是最终数据
    console.log(ret)
})

// 参数传递
// 传统方式传参
fetch(url?param, {method:'get'}).then(data=>{
    // fetch返回的数据，通过data.text方法将返回处理成字符串
    // data.json() 返回json对象  
    return data.text()
}).then(ret=>{
    // ret是最终数据
    console.log(ret)
})

// restful方式
fetch(url/param, {method:'get'}).then(data=>{
    // fetch返回的数据，通过data.text方法获取最终数据
    return data.text()
}).then(ret=>{
    // ret是最终数据
    console.log(ret)
})

// post方法
fetch(url, {
    method:'post'，
    body: 'uname=list&pwd=123',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
 .then(data=>{
    // fetch返回的数据，通过data.text方法获取最终数据
    return data.text()
}).then(ret=>{
    // ret是最终数据
    console.log(ret)
})
// json格式
fetch(url, {
    method:'post'，
    body: JSON.stringfy({
      uname: 'list',
      pwd: '123'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
})
 .then(data=>{
    // fetch返回的数据，通过data.text方法获取最终数据
    return data.text()
}).then(ret=>{
    // ret是最终数据
    console.log(ret)
})
```

----

**axios**

**基本用法**

```javascript
axios.get(url).then(ret=>{
    // data属性是固定用法，是api中写死的,用于后端响应的数据
    console.log(ret.data)
})
// 可以按照正常的get方法传参
// 也可以用一下方式（开发中常用）
axios.get(url, {
    params:{
        id: '123'
    }
})
    .then(ret=>{
    console.log(ret.data)
})

// post请求，第一种常用
axios.post(url, {
  id: '123'
  pwd: '123'
})
    .then(ret=>{
    console.log(ret.data)
})

// 这个参数格式是 name=list&pwd=123
var params = new URLSearchParams()
params.append('name', 'list')
params.append('pwd', '123')
axios.post(url, params)
    .then(ret=>{
    console.log(ret.data)
})



```

**axios 响应结果**

```javascript
// data  响应的数据
// headers 响应头信息
// status 响应码
// statusText 响应状态信息
```

**axios的全局配置**

```javascript
axios.default.timeout = 3000; // 超时时间
axios.default.baseURL = ''; // 根地址
axios.default.headers['mytoken'] = 'adafdsgfva'; // 设置请求头
```

**axios拦截器**

```javascript
// 请求拦截器
axios.interceptors.request.use(function(config){
    // 在请求发出前进行信息设置，然后返回新的config
    return config
}, function(err){
    // 错误处理
    console.log(err)
})

// 响应拦截器
axios.interceptors.response.use(function(res){
    // 对返回的数据进行处理，然后返回处理后的数据
    return res
}, function(err){
    // 错误处理
    console.log(err)
})
```

