问题：鼠标一移入echarts，右滚动条就一直抖动，查了一下，是使用tooltip后，鼠标悬浮事件频繁触发的问题。https://www.cnblogs.com/intbingbing/archive/2018/10/19/9817545.html

```js
tooltip: {
  ...
  transitionDuration:0,    //[defaule:0.4]
},
```

尝试了一下，解决方案有两个：
1、不使用 tooltip；
2、将 transitionDuration 设置为0，让提示框跟随鼠标。

3、在容器的样式中，设置overflow：hidden，使得容器变成bfc，内部的变化不影响外部