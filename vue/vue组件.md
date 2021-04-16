组件

```javascript
vue的高阶组件的开发一般使用v-bind='$attrs',避免在过多的父组件属性需要使用prop来传递而声明大量prop的变量

v-model 实现3种双向绑定

v-model 是什么？
1. v-model 即可以作用在普通表单元素上，又可以作用在组件上。

2. vuejs隐式添加 value 的 prop，子组件通过 props.value 接收值。

3. 子组件通过 this.$emit('input')，改变父组件 v-model 绑定的值。

4. v-model 可以实现双向绑定，无需定义接收事件。



为什么v-model可以实现双向绑定？
v-model 其实是一个语法糖，以下是经过 vue 转换后的模板：

<input v-model="message" />JavaScript

// 转换后：
<input
  v-bind:value="message"
  v-on:input="message=$event.target.value">

1. 添加 v-bind:value。

2. 添加 v-on:input 的自定义事件。

动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值，这样实际上就完成了数据双向绑定。

双向绑定其实就是普通单向绑定和事件组合来完成的。


基本模型：父组件 - 当前组件（转发参数，高阶组件） - 子组件

父级组件不用过多解释，使用 v-model 传参。

<template>
  <div>
    <!-- $attrs & observer -->
    <BaseInputAttrs v-model="pModel"/> <br>

    <!-- watch & data & emit('input') -->
    <BaseInputWatch v-model="pModel"/> <br>

    <!-- computed & emit('input') -->
    <BaseInputComputed v-model="pModel"/> 
   </div>
</template>

<script>
export default {
  data () {
    return {
      pModel: 'v-model双向绑定',
    }
  },
}
</script>


下面是三种<当前组件>的 v-model 实现方案



方案1：

<template>
  <input type="text" v-bind="$attrs" v-on="$listeners">
</template>


$attr: 向 子组件 传递，当前组件 没有接收的，父组件传递下来的 prop 。

$listeners: 向父组件传递，当前组件没有接收的，子组件抛出的自定义事件。



这样实现后，发现输入后会变成一个 [object InputEvent] 的事件对象。

是因为 v-on="input" 是内置事件，vue 判断 当前组件 的 tag 是 'input' 类的表单元素，才会关联 value。

当前组件 经过封装后，tag 已经改变，父组件实际处理的是 this.$emit('input', el) 的传参，el 就是 [object InputEvent] 表单对象。



解决方案：拦截内置的 input 事件，改变引用，向 父组件 传递最终值，如下。

<template>
    <input type="text" v-bind="$attrs" @input="observerInput">
</template>

<script>
  export default {
    methods: {      
      // 拦截内置事件      
      observerInput (el) {
        this.$emit('input', el.target.value)
      },
    },  
  }
</script>

对于element-ui或者说可兼容vue.js的ui组件的二次封装
<template>
  <div class="label-input" >

    <span class="input-label">
      <span class="required-flag">*</span> 
      线路编号:
    </span>

    <el-input
        placeholder="请输入线路编号"
        class="filter-item--input"
        v-bind="$attrs"
        @input="inputValue"
    >
    </el-input>

  </div>
</template>
<script>
  export default {
    methods: {      
      // 拦截内置事件      
      inputValue (el) {
        this.$emit('input', el.target.value)
      },
    },  
  }
</script>

即是封装原生html与封装已经封装好的自定义html的原理一致，通过v-bind="$attrs"，使得子组件能获取父组件的属性，然后利用v-on（触发的事件回传）
在父组件中，v-model='message'经过vue的解析为：:value='message' @input='message=event.target.value'

方案2：watch监听 和 过渡属性

分别监听 父组件和子组件，通过过渡属性 model 存储值

<template>
  <input type="text" v-model="model">
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
    },

    data () {
      return {
        model: '',
      }
    },

    watch: {
      value: {
        immediate: true,
        handler (newVal) {
          this.model = newVal
        },
      },

      model (newVal) {
        this.$emit('input', newVal)
      },
    },
  }
</script>






方案3：计算属性 setter getter

尤雨溪的方案 setter 去拦截修改







<template>
    <input type="text" v-model="model">
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: '',
      },
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set (newVal) {
          this.$emit('input', newVal)
        },
      },
    },
  }
</script>
```

