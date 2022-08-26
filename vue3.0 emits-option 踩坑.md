vue3.0 emits-option 踩坑

在子组件使用emit的时候，提示if the listener is intended to be a component custom event listener only, declare it using the "emits" option

```javascript
根据提示的意思在子组件的script中写下如下代码
  emits: ['hss-confirm', 'hss-cancel'],

  methods: {
    clickConfirm(){
      this.$emit('hss-confirm')
    },

    clickCancel(){
      this.$emit('hss-cancel')
    },
  },
结果，依然提示该警告。
猜测，应该是emits简单用法接受的参数不能有效识别对应带'-'的参数，于是改成如下
  emits: ['hssConfirm', 'hssCancel'],

  methods: {
    clickConfirm(){
      this.$emit('hssConfirm')
    },

    clickCancel(){
      this.$emit('hssCancel')
    },
  },
这时，不再提示该警告。
故而，即使是在写组件的自定义注册事件也应该要按照书写习惯，按照小驼峰写，不应当去追求与使用html时候那样改为带'-'的写法，即是遵循每个语言的常用写法习惯
```

