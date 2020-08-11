变异方法：

```javascript
// 会触发vue视图更新，这些方法会改变原始的数组
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
```

替换方法：

```javascript
// 这些方法不会改变原始的数组，而是返回新的数组,直接使用不会引动vue的视图更新
// 使用这些方法，还需要把返回值赋给原数组
filter()
concat()
slice()
map()
```

