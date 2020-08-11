Vue.set()

Vue.$set()

在vue中，直接使用索引修改数据， 对象属性直接添加，不是响应式的，所以需要以上两个方法

例如

```javascript
var vm = new Vue({
    el: '#app',
    data: {
        list: ['apple', 'orange', 'banana'],
        info: {
            name: 'list',
            age: 12
        }
    }
    
})
// 当我们直接使用索引修改，页面是没有反应的，虽然实际上数据已经改变了
vm.list[1] = 'lemo'
// 所以，我们使用下面的方式来修改
Vue.set(vm.list, 2, 'list')
// 等价于 Vue.$set(vm.list, 1, 'list')
// 直接添加，添加的属性不是响应式的
vm.info.gender = 'female'
// 这样就是响应式的了
Vue.set(vm.info, ‘gender, 'female')
```

