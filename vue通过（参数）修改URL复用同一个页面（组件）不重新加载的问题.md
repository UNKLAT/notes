[王子乔](https://www.cnblogs.com/wangqiao170/)

每一个认真生活的人，都值得被认真对待

## [vue通过ID（参数）修改URL复用同一个页面（组件）不重新加载的问题](https://www.cnblogs.com/wangqiao170/p/9176204.html)

项目中经常会用到同一个页面，结构是相同的，我只是在vue-router中通过添加参数的方式来区分状态，参数可以在页面跳转时带上params，或者query，但是有一个问题，即使我们修改了参数，URL也显示已经改变，但页面并不会刷新，因为路由是相同的，vue就会认为你是同一个页面，从而复用已加载的页面，而不会重新加载，所以如果在created钩子中来区分状态明显是行不通的，可以通过watch监听事件来监听路由的变化：

watch: {

​     '$route' (to, from) {

​           if (to.name === 'projectAdd') {

​               console.log(to.query)   // 在此调用函数

​           }

​      }

}

 

通过watch监听即可实现，这里顺带说一下params和query的区别：

 

相同：

使用方法相同，都是在路由跳转的时候带过去：

manageProject (toseId) {

​      this.$router.push({

​          name: 'projectAdd',

​          query: {toseId: toseId}    //  params: {toseId: toseId}

​      })

}

 

不同：

params需要在路由设置index.js中添加参数（ 

path: '/projectAdd/:id'），而query不需要；

 

 

 

跳转后在URL的显示不同，params显示的是（http://localhost:8082/#/projectAdd/6），query显示的是（http://localhost:8082/#/projectAdd?toseId=6）；

 

 

 

接收方式不同，params为this.$route.params，query为this.$route.query。