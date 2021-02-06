js获取月份的最后一天

```javascript
//使用new Date(year,month,0)的方式,可以获取该月的最后一天
var lastDay= new Date(2019,11,0).getDate()

new Date(2019,11,0)
 // 2019-11-30 // 默认返回最后一天的日期，然后获取day就ok了
```

