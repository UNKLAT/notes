对于keep-alive，要注意在使用include的时候，变量中的值要与组件的name一致，在开发过程中，会出现设置变量，但是没有对应组件的name，从而设置无效，导致不触发activated和deactivated，

例如：在项目中，使用element-ui的tags组件的数据，

```javascript
let aliveTags = [
    {
        key1: 'value1',
        key2: 'value2',
    },
    {
        key1: 'value11',
        key2: 'value22',
    }
]
```

然后，keep-alive组件不会出错，但是是无法实现组件的缓存，也无法触发activated和deactivated，

keep-alive是无法记录滚动条的，一般而言，是需要自己手动记录滚动位置，切换的时候，更新对应的滚动条位置