**this 的绑定**

默认绑定：函数调用无任何前缀时候，一般默认绑定的this指向window，在严格模式环境中，默认绑定的this指向undefined

this隐式绑定： 隐式绑定规则会把函数调用中的this绑定到这个上下文对象

```javascript
function foo() {
 console.log( this.a );
}
var obj = {
 a: 2,
 foo: foo
};
var bar = obj.foo; // 函数别名！

var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global" 此时this绑定的是全局
obj.foo()// "2" 此时this绑定的是obj
```

this显式绑定

```javascript
function foo() {
 console.log( this.a );
}
var obj = {
 a: 2,
 foo: foo
};

var a = "oops, global"; // a 是全局对象的属性

foo.call(obj)// "2" 此时this绑定的是obj,通过foo.call(..)，可使得调用 foo 的 this 绑定到 obj 上。
```

new 绑定， js中的构造函数只是一些使用new操作符时被调用的函数

实际上js中并不存在所谓的“构造函数”，只有对于函数的“构造调用”   

```javascript
/**
使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行[[Prototype]]连接。
3. 这个新对象会绑定到函数调用的this。
4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象
**/
function foo(a) {  this.a = a; }  
var bar = new foo(2); 
console.log( bar.a ); // 2

注意：new和call/apply无法一起使用，new  foo.call(obj1)是错误的。




1. 函数是否在new中调用（new绑定）？
如果是的话this绑定的是新创建的对象。var bar = new foo()

2. 函数是否通过call、apply（显式绑定）或者硬绑定调用？
如果是的话，this绑定的是指定的对象。var bar = foo.call(obj2)

3. 函数是否在某个上下文对象中调用（隐式绑定）？
如果是的话，this绑定的是那个上下文对象。var bar = obj1.foo()

4. 如果都不是的话，使用默认绑定。
如果在严格模式下，就绑定到undefined，否则绑定到全局对象。var bar = foo()

绑定例外
1.把null或者undefined作为this的绑定对象传入call、apply或者bind，
这些值在调用时会被忽略，实际应用的是默认绑定规则

那么什么情况下你会传入null呢？
一种非常常见的做法是使用apply(..)来“展开”一个数组，并当作参数传入一个函数。类似地，bind(..)可以对参数进行柯里化（预先设置一些参数），这种方法有时非常有用：
function foo(a,b) {     console.log( "a:" + a + ", b:" + b ); } // 把数组“展开”成参数
foo.apply( null, [2, 3] ); // a:2, b:3
// 使用 bind(..)进行柯里化
var bar = foo.bind( null, 2 );  bar( 3 ); // a:2, b:3
在es6中可以使用...展开符号替代apply(..)这种方法来展开数组
但是传入null，会使得this绑定在window上，可能会对全局有所影响，所以更安全的做法是传入一个空对象
let kong = Object.create( null ) 或者 let kong = {}
Object.create(null)和{}很像，但是并不会创建Object.prototype这个委托，所以它比{}“更空”

2. 间接引用，创建一个函数的“间接引用”，会可能调用这个函数会应用默认绑定规则
function foo() {      console.log( this.a ); }
var a = 2;  
var o = { a: 3, foo: foo };
var p = { a: 4 }; o.foo(); // 3 
(p.foo = o.foo)(); // 2
赋值表达式p.foo  =  o.foo的返回值是目标函数的引用，因此调用位置是foo()而不是p.foo()或者o.foo()

注意：对于默认绑定来说，决定this绑定对象的并不是调用位置是否处于严格模式，而是函数体是否处于严格模式。如果函数体处于严格模式，this会被绑定到undefined，否则this会被绑定到全局对象。


this的软绑定
硬绑定这种方式可以把this强制绑定到指定的对象（除了使用new时），防止函数调用应用默认绑定规则
如果可以给默认绑定指定一个全局对象和undefined以外的值，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改this的能力。这种方法称为软绑定
```

