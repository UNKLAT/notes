# **vuex详解**

##   vue组件通信(共享数据)方式

  1、父传子:通过在子组件定义属性，父组件使用的时候利用v-bind绑定来实现

  2、子传父：在子组件通过$emit注册自定义事件，事件处理函数中设置需要传递的信息；然后父组件

​        在使用子组件时候用v-on绑定该自定义事件，当事件触发时，子组件的事件处理函数将数据发送到父组件

​       的事件处理函数作为默认参数

 3、兄弟之间：,

```javascript
使用EventBus的方式，引入 EventBus组件;

然后在需要发送数据的组件的destroyed生命钩子函数中调用
eventBus.$emit('事件名',data)注册事件;

在接收的组件的created生命钩子中调用   
eventBus.$on('getParams', item => {       
    this.name = item        
    console.log(this.name)    
})
触发事件，获取数据;

并且在每次使用完之后移除应用内所有对此事件的监听，
mounted() {    
    Bus.$off('getParmas') 
}
```



 4、以上是面试需要，实际开发中使用vuex来实现;vuex是实现组件全局**状态(数据)**管理的一种机制，可以方便实现**组件之间数据的共享**

```
优点
易于开发和后期维护
高效实现组件通信，提高开发效率
存在vuex中的数据是响应式的

只有组件之间共享的数据才有必要存在vuex中
```



```

const store = new Vuex.store({
   state:{
     count: 0,
     list: []
   },
   mutations:{
    // 只有mutation修改数据
    // 不要执行异步任务
      add(state){
        state.count++
      }
   },
   actions:{
     // 用于处理异步操作，但是在actions中还是会通过触发mutation来间接变更数据
     addAsync(context){
       setTimeout( ()=>{
         // 不能直接修改state中数据，要使用commit触发mutation来修改
         context.commit('add')
       }, 1000)
     }
   },
   getter:{
     // 不修改数据源，对数据进行包装，根据需求按需包装数据
     infoList(state){
       // 返回done为true的元素集合
       return state.list.filter( x => x.done === true)
     }
   }
})
```

vuex中不允许组件中使用this.$store.state.name来操作store中数据，建议使用mutations;

```
import { mapState, mapMutaions, mapActions } from 'vuex'
new vue({
   data(){
     return {
     
     }
   },
   computed: {
     // 第一种方法 使用state的数据 this.$store.state.count
     // 第二种方法 使用state的数据
     ...mapState(['count'])
   },
   methods: {
     // 第二种方式，这样可以如同组件的普通方法一样调用mutation中方法
     ...mapMutation(['add']),
     // 第二种方式，这样可以如同组件的普通方法一样调用action中方法
     ...mapActions(['addAsync']),
     handle(){
       // 第一种方式 触发mutation中add方法
       this.$store.commit('add')
     },
     handleAsync(){
       // 使用dispatch触发store中的action
       this.$store.dispatch('addAsync')
       // 第二种方法
       this.addAsync()
     }

   }
})
```



**vuex的状态管理与sessionStorage区别**

**sessionStorage只是存储字符串，而且数据不是响应式，只要不关闭页面，刷新也不会影响数据，可以用于页面传值**

**vuex等通一个变量提升工具，将全局变量集中管理，数据是响应式的，刷新页面会把数据重置，页面中组件的数据通信**

**登录的token使用cookie存储**

