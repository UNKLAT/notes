js深拷贝对象

```javascript
var clone = function (obj) { 
    if(obj === null) return null 
    if(typeof obj !== 'object') return obj;
    if(obj.constructor===Date) return new Date(obj); 
    if(obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor ();  //保持继承链
    for (var key in obj) {
        //不遍历其原型链上的属性，for..in枚举会枚举原型链上的可枚举属性
        //hasOwnProperty 只会检查本对象独有的属性，所以可以用来过滤
        if (obj.hasOwnProperty(key)) {   
            var val = obj[key];
            // 使用arguments.callee解除与函数名的耦合
            // Javascript没有重载函数的功能，但是Arguments对象能够模拟重载。Javascrip中每个函
            // 数都会有一个Arguments对象实例arguments，它引用着函数的实参，可以用数组下标的方式"[]"引
            // 用arguments的元素。arguments.length为函数实参个数，arguments.callee引用函数自身。
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; 
            
        }
    }  
    return newObj;  
};
```

