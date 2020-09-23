```javascript
/**
创建事件，
获取需要触发事件的元素
使用cb.dispatchEvent(event)触发事件


**/
simulateClick() {
  let event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });
  let cb = document.querySelector('#file');
  cb.dispatchEvent(event);
},

```

