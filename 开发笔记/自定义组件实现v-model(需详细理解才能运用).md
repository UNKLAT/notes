[自定义组件实现v-model](https://www.cnblogs.com/yn-cn/p/13830494.html)

一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件。

 

```javascript
Vue.component(``'base-checkbox'``, {`` ``model: {``  ``prop: ``'checked'``,``  ``event: ``'change'`` ``},`` ``props: {``  ``checked: Boolean`` ``},`` ``template: ```  ``<input``   ``type=``"checkbox"``   ``v-bind:checked=``"checked"``   ``v-on:change=``"$emit('change', $event.target.checked)"``  ``>`` `````})
```

　　这样，我们就可以在自定义组件使用v-model了：

```
<base-checkbox v-model=``"lovingVue"``></base-checkbox>
```

　　

需要注意的是：

1. `model:{prop:'checked'}` 这里的`checked` 必须在`props` 里也有声明；
2. `model.prop` 绑定的变量命名不能是关键字。如：`value`
3. `model.prop`绑定的变量不要在自定义组件里直接改动。需要调用`model.event`来修改`绑定的变量`的值。例如，上面的例子，就不能在自定义组件内再对`checked`进行双向绑定。