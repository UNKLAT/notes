```javascript
      let submitTable = []
      submitTable = submitTable.concat(this.PRItable)
      submitTable = submitTable.concat(this.Abistable)
      submitTable = submitTable.concat(this.Atable)
      // concat 合并得新数组是对原来的引用，通过JSON API的转换等于深拷贝
      // 使得下面循环修改值的时候不会让页面的值发生变化
      submitTable = JSON.parse(JSON.stringify(submitTable)) 
      submitTable.forEach((item)=>{
        item.acoustolight = item.acoustolight ? 1 : 0
      })
```

