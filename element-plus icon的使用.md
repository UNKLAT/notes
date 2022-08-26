element-plus icon的使用

```javascript
在element-ui的版本中，icon图标的使用，可以在标签中使用class来实现，从而可以在js中先枚举需要的icon，然后根据需要，通过该枚举变量来访问
例如
let iconList = [ 'add', 'search', 'edit', 'delete' ]

假如在标签中需要查找的图标即可在通过 :class="iconList[1]" 来实现

但是在element-plus中，图标不能再通过这样的类名来使用，即是不能使用font样式来实现
其都是使用组件的调用来实现，详细见官方文档

那么针对可能出现以上需求的时候，可以使用vue的动态组件来实现, 如下
<componnet :is="iconList[1]" />
    
 

```

