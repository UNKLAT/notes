js高级程序设计零碎笔记

let和var的区别

let 与 var 的另一个重要的区别，就是 let 声明的变量不会在作用域中被提升。

var声明的变量会成为window对象的属性，而let不会

const与let的区别

const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量

const 声明的限制只适用于它指向的变量的引用。换句话说，如果 const 变量引用的是一个对象，

那么修改这个对象内部的属性并不违反 const 的限制。



Undefined 类型只有一个值，就是特殊值 undefined。初始化变量时候，应该给变量初始化值，而该值，一般不设为undefined，虽然不初始化，其值为undefined，但是在对未初始化的变量调用 typeof 时，返回的结果是"undefined"，容易混淆。



Null 类型同样只有一个值，即特殊值 null。逻辑上讲，null 值表示一个空对象指针，这也是给

typeof 传一个 null 会返回"object"的原因



任何涉及 NaN 的操作始终返回 NaN（如 NaN/10），在连续多步计算时这可能是个问题。

NaN 不等于包括 NaN 在内的任何值



```javascript
字符串插值通过在${}中使用一个 JavaScript 表达式实现:
let interpolatedTemplateLiteral = `${ value } to the ${ exponent } power is ${ value * value }`;
所有插入的值都会使用 toString()强制转型为字符串，而且任何 JavaScript 表达式都可以用于插
值

Symbol（符号）是 ECMAScript 6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。
符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。
```

