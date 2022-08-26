构造函数，含有prototype的属性，属于显式原型属性；在通过console，显示就是prototype；而由构造函数（Date等等 ）通过new来创建对象，如 new Date（）得到的对象，只是隐式原型，表现为

[[Prototype]]

对于构造函数，使用该构造函数引用的时候, 如下

```javascript
function fn(){}
 //undefined
fn.prototype.test = 'fn'
//'fn'
fn.test
//undefined
a = new fn()
a.test
//'fn'

fn.__proto__.test1 = 'test1'
//'test1'
fn.test1
//'test1'
a.test1
//undefined
fn.prototype === a.__proto__
//true


// 使用构造函数引用属性，如果该属性不在构造函数中，其不会去引用显式原型上的属性
// 使用构造函数创建的对象，同样引用该属性，虽然对象上没有，但是其隐式原型上存在该
// 属性，就会通过原型链，获得隐式原型上的该属性的值
// 在使用中prototype是原型属性；__proto__ 是隐式原型属性，会通过原型链关联
// fn.prototype === a.__proto__

native object 本地对象，由es规范实现，不依赖其他任何运行环境
如js原生对象

built-in-object，内置对象，es环境运行的时候就已经存在的，由es规范实现，
那么所有内置对象都是本地对象

host object 宿主对象，依赖额外的运行环境，例如页面的widnow对象，该对象是浏览器环境提供的
是js在浏览器运行中对es环境的补充和完善


es5内置对象
每个内置Function对象，无论构造器还是普通函数，都有一个length属性，值为整数，等于形式参数个数包括可选参数
```

