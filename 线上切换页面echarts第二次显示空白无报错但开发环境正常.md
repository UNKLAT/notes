# vue线上环境切换页面echarts第二次显示空白,且控制台没有报错，开发环境显示正常

```javascript
// 对于以上问题，可以从以下四点考虑
// 第一  需要有固定宽高
<div id="content-analysis" style="width:100%; height:500px"></div>


// 第二  需要在页面加载完成后再去初始化
    nextTick(() => {       
      let chartDom = document.getElementById('pie-chart');
      let myChart = echarts.init(chartDom);
      let option = {
            tooltip: {
               trigger: 'item'
            },
            legend: {
               top: '5%',
               left: 'center'
            },
            series: []
       }
        option && myChart.setOption(option);
    })

// 第三   离开页面canvas没有被销毁导致第二次进页面无法显示，
// 在进入或者离开页面时销毁即可
 
echarts.init(document.getElementById('pie-chart')).dispose()

//第四  给setOption 一个延时操作
  setTimeout(() => { option && myChart.setOption(option); }, 100);
 
```

