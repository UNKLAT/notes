Array API 记忆

已记忆：

```javascript
let arr = new Array()

// 用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
Array.concat()
// 语法
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
// 描述
/**
    将原数据的元素复制到新数组，但是只是浅拷贝；
    即是非对象引用的数据直接复制;
    对象引用的数据只复制引用，如果对该引用对象进行修改，
    那么原数组和新数组中的该对象引用的元素也会发生改变。
**/
// 例子1
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]

/**
pop 尾部弹出一个元素
push 尾部压入一个元素
shift 头部弹出一个元素
unshift 头部压入一个元素
sort 对数组进行排序，可以传递一个cb作为排序规则
reverse 首尾颠倒，
splice 删除或者替换或者添加元素

*/
```



