```javascript
/**
 * 注意这个是get请求，后端使用requestParam接收参数，只会接收在url上的参数，是获取不到
 * data的，因为data是放在requestBody中，所以要拼接到url上
 * */
requestGet(param={ url:'', data:{} }){
    // console.log(qs.stringify(param.data))
    return service({
        url: param.url+'?'+qs.stringify(param.data),
        method: 'get',
        data: '',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
},
```