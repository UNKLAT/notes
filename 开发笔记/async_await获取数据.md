想使用async/await获取请求数据，然后进行同步操作，需要使用解构赋值来获取数据，直接获取会返回await后面返回的promise对象

```javascript

async reload() {
  let param = {
    url: '/rbcInfo/findAll',
  }
  let { data: result } = await this.$http.requestGet(param)

  console.log(result)
},
```

