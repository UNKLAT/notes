你不知道的js中卷

```javascript
JavaScript有七种内置类型：
• 空值（null）
• 未定义（undefined）
• 布尔值（boolean）
• 数字（number）
• 字符串（string）
• 对象（object）
• 符号（symbol，ES6中新增）
除了对象之外，其他统称基本类型

typeof undefined     === "undefined"; // true 
typeof true          === "boolean";   // true 
typeof 42            === "number";    // true 
typeof "42"          === "string";    // true 
typeof { life: 42 }  === "object";    // true 
typeof null      === "object";    // true
typeof function a(){}      === "function";    // true function是对象的子类型，是可调用的对象
// ES6中新加入的类型
typeof Symbol()      === "symbol";    // true


许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过“借用”数组的非变更方法来处理字符串
let a = 'foo'; 
let c = Array.prototype.join.call(a, '-'); 
console.log(c) // 'f-o-o'
当然，我们是无法“借用”数组的可变更成员函数，因为字符串是不可变的，字符串反转（JavaScript面试常见问题）。数组有一个字符串没有的可变更成员函数reverse()，对此，对于简单的字符串可以将其转换成数组，然后转换，然后再拼成字符串

NaN是一个特殊值，它和自身不相等，是js中唯一的，如果检查一个值是否是NaN，即若 a !== a => true, 那么 a就是NaN
isNaN检查一个变量，这个变量可以是为非number的值或者是NaN
在es6中，number.isNaN则是检查这个变量是否是NaN


函数参数就经常让人产生这样的困惑：function foo(x) {     
    x.push( 4 );     
    x; // [1,2,3,4]     
    // 然后    
    x = [4,5,6];     
    x.push( 7 );     
    x; // [4,5,6,7] } 
    var a = [1,2,3]; 
    foo( a ); a; // 是[1,2,3,4]，不 是[4,5,6,7]
    我们向函数传递a的时候，实际是将引用a的一个复本赋值给x，而a仍然指向[1,2,3]。在函数中我们可以通过引用x来更改数组的值（push(4)之后变为[1,2,3,4]）。 但x  =  [4,5,6]并不影响a的指向，所以a仍然指向[1,2,3,4]。
    
    
    对JSON不安全的值，undefined、function、symbol（ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合JSON结构标准
    JSON.stringify(..)在对象中遇到undefined、function和symbol时会自动将其忽略，在数组中则会返回null（以保证单元位置不变）
    
    a  +  ""（隐式）和前面的String(a)（显式）之间有一个细微的差别需要注意。根据ToPrimitive抽象操作规则，a  +  ""会对a调用valueOf()方法，然后通过ToString抽象操作将返回值转换为字符串。而String(a)则是直接调用ToString()。
    
|| 和 && 本质上是操作数选择运算符，其返回是两个操作数中的一个且仅一个，而不是返回布尔值
其可以等价于一个三元表达式，如下
a || b <=> a ? a : b
a && b <=> a ? b : a
在需要条件判断时候会通过js的隐式类型转换转换成布尔值

数字和布尔值比较，会把布尔值转换成数字再比较（===除外），42 == true => false 
true 转成 1，false 转成 0 
所以，建议不要使用 == true 或 == false 这样的判定

涉及ToPrimitive强制类型转换，会调用valueOf()，容易发生 a == 2 && a == 3 是 true的情况， a其实不是同时等于2和3，而是先等于2，然后再等于3，
	var i = 2; 
    Number.prototype.valueOf = function() {     
        return i++; 
    }; 
    var a = new Number( 42 ); 
    if (a == 2 && a == 3) {     
        console.log( "Yep, this happened." ); 
    }
new Number(42) 会封装成一个数字对象，直接log输出就是Number(42)，即是在其进行运算的时候，会先调用valueOf() 将其转换成对应的数字，该例子中，正常而言就是42，但是其修改了valueOf，第一次调用时候值为2，
此时 a == 2 => true, a == 3 第二次调用，值为3，故也是true，所以会输出if块内的log的文字

因为使用 == 比较时候，会存在不少坑，遵守以下两个原则能有效避免坑，两个原则延展出使用 === 的建议
• 如果两边的值中有true或者false，千万不要使用==。
• 如果两边的值中有[]、""或者0，尽量不要使用==。
这时最好用===来避免不经意的强制类型转换。这两个原则可以让我们避开几乎所有强制类型转换的坑。
在目前开发而言，代码规范建议是使用 === 。
    
javaScript的最佳实践是：
1、不要扩展原生原型


事件循环：
先通过一段伪代码了解一下这个概念:
    // eventLoop是一个用作队列的数组
    // （先进，先出）
    var eventLoop = [ ];var event;
    // “永远”执行
    while (true) {    
        // 一次tick     
        if (eventLoop.length > 0) {         
            // 拿到队列中的下一个事件        
            event = eventLoop.shift();         
            // 现在，执行下一个事件        
            try {             
                event();         
            }         
            catch (err) {             
                reportError(err); 
            }     
        } 
    }
    这当然是一段极度简化的伪代码，只用来说明概念。不过它应该足以用来帮助大家有更好的理解。你可以看到，有一个用while循环实现的持续运行的循环，循环的每一轮称为一个tick。对每个tick而言，如果在队列中有等待事件，那么就会从队列中摘下一个事件并执行。这些事件就是你的回调函数。一定要清楚，setTimeout(..)并没有把你的回调函数挂在事件循环队列中。它所做的是设定一个定时器。当定时器到时后，环境会把你的回调函数放在事件循环中，这样，在未来某个时刻的tick会摘下并执行这个回调。即是定时器等于把在定时时间内的定时器中的代码在执行中忽略，定时器到时后再塞进事件队列中，如果这时候还有有20个项目在事件队列中，那么还要等待这20个事件执行完毕，才到定时器中的代码执行，所以定时器精度是不高的。
    程序通常分成了很多小块，在事件循环队列中一个接一个地执行。严格地说，和你的程序不直接相关的其他事件也可能会插入到队列中。
    
    异步是关于现在和将来的时间间隙，而并行是关于能够同时发生的事情。
    事件循环把自身的工作分成一个个任务并顺序执行，不允许对共享内存的并行访问和修改。通过分立线程中彼此合作的事件循环，并行和顺序执行可以共存。
    
    
    
    
```

