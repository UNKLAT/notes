在ecahrt中的xAis和yAix中设置triggerEvent: true失效的问题

```javascript
    xAxis: {
      // show: true,
      type: 'category',
      silent: false,
      triggerEvent: true,
      data: xAxisData,
      nameTextStyle: {
        fontSize: labelFontSize,
        color: fontColor,
        // overflow: 'truncate',
        // ellipsis: '...',
      },
      axisLabel: {
        width: '100',
        fontSize: labelFontSize,
        color: fontColor,
        padding: [0, 0, 0, -20],
        margin: 20,
        rotate: 330,
        overflow: 'truncate',
        ellipsis: '...',
      },
    },
    yAxis: {
      type: 'value',
      silent: false,
      triggerEvent: true,
      name: '任务完成率(%)',
      min: 0,
      max: 100,
      nameTextStyle: {
        // fontSize: labelFontSize,
        color: fontColor,

      },
      axisLabel: {
        // fontSize: labelFontSize,
        color: fontColor,
      },
    },
// 如果在axisLabel中设置overflow: 'truncate', 会使得鼠标事件在xAis部分无法生效
// 即使triggerEvent: true,
```

