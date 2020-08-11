**vue路由**

SPA 单页面应用程序：ajax实现局部更新，同时，支持浏览器地址栏的前进后退

spa实现原理之一：基于URL的hash，hash变化会导致浏览器历史记录的变化，但是不会触发url请求

spa核心技术是路由技术



router-view 路由填充位，通过路由规则匹配到的组件将会被渲染到router-view的位置

路由参数传递，在路由设置中，可以设置props的属性为true或者设置成对象或者函数,那么在组件中设置prop获取，也可以使用this.$router.params来获取。具体请看路由文档

**路由导航守卫控制访问权限**

这涉及到登录功能，可以结合如何记录登录状态的笔记移液器查看

```JavaScript
// 为路由对象，添加beforeEach导航守卫
// to将要访问的对象
// from 从哪个路径跳转过来的
// next 函数，表示放行，不带参数就默认跳到to的要访问的页面，带参数就跳转参数的页面
router.beforeEach( (to, from, next)=>{
    // 如果用户访问登录页面，直接放行
    if ( to.path === '/login' ) {
       return next()
    }
    // 获取token
    const tokenStr = window.sessionStprage.getItem('token')
    // 如果token不存在，跳转到login页面
    if (!tokenStr) {
        return next('/login')
    }
    next()
} )
```

