使用echart的关系图即series中type：'graph'时候

```
直接在option中定义grid是不起作用的，根据文档和博客，该属性不对graph生效
如果要对整个图形定位，可以在series中定义
例如
series: [
 {
   type: 'graph',
   left: '100',
   top: '100'
 }
]

注意 left和 top的值是数字字符串，使用数字不生效

根据数据的数量来定义画图的容器的高度的情景中，切换数据，长度不一的时候，图形会变形，因为没有使用grid或没在series中布局控制，详细的猜测是因为图形的高度每次变化，每次重绘的时候，图形会根据高度不同而进行不同的自动布局，所以只要对设置好left，top，right，bottom就可以解决
```

