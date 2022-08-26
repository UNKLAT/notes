echart悬浮提示抖动

```javascript
tooltip: { 
    show: true,
        transitionDuration:0,//echart防止tooltip的抖动
},
可在option中设置以上代码，一般都能解决，如果还抖动，那说明容器的大小可能刚好满足或者略小，可以扩大容器，或者在css中添加overflow：hidden
个人理解，echart图形抖动其实是因为容器大小稍微不足，然后悬浮提示的时候会令内容增加，导致计算的大小稍微增加，然后把容器撑大一点，假如布局的弹性不够，就出现抖动和页面滚动条
```

