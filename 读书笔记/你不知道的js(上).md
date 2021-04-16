**你不知道的js(上)**

-    **第一章 作用域**	

   

- **第二章  词法作用域**

  ```javascript
  /**
  词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的，因此当词法分析器处理代码时会保持作用域不变（大部分情况下是这样的）
  
  运行时修改词法作用，即欺骗词法作用域，会导致性能下降
  在运行时修改词法作用域的两种机制
  (1) eval(..) 通常被用来执行动态创建的代码
  eval(..) 函数可以接受一个字符串为参数，并将其中的内容视为好像在书
  写时就存在于程序中这个位置的代码.
  其原理以动态形式插入进来，并对词法作用域的环境进行修改的，如下代码
      function foo(str, a) { 
       eval( str ); // 欺骗！
       console.log( a, b ); 
      } 
      var b = 2; 
      foo( "var b = 3;", 1 ); // 1, 3
  在严格模式的程序中，eval(..) 在运行时有其自己的词法作用域，意味着其
  中的声明无法修改所在的作用域
  
  (2) with (不推荐用来修改词法作用域，不推荐使用，性能较差)通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身, with会根据传进来的对象创建一个新的词法作用域，例如：
  var obj = { 
   a: 1, 
   b: 2, 
   c: 3 
  }; 
  // 单调乏味的重复 "obj" 
  obj.a = 2; 
  obj.b = 3; 
  obj.c = 4; 
  // 简单的快捷方式
  with (obj) { 
   a = 3; 
   b = 4; 
   c = 5; 
  }
   with 块内部，我们写的代码看起来只是对变量 a 进行简单的词法引用，实际上就是一个
  LHS 引用，如果对象中有属性就给对应的属性赋值，如果对象没有属性就不会在这个对象中
  创建这个属性，输出时候就是undefined，同时还有一个副作用，如上例中的a=3, 如果obj中
  没有就会在全局中创建一个变量a并赋值为3
  
  以上两种机制都会使性能大大下降，如果代码中存在大量eval和with速度就大大下降，尽量不要使用
  
  **/
  ```

  

- **第三章  函数作用域**

  ```javascript
  /**
  函数作用域的含义是指，属于这个函数的全部变量都可以在整个函数的范围内使用及复
  用（事实上在嵌套的作用域中也可以使用）
  
  (function foo(){ .. }) 作为函数表达式意味着 foo 只能在 .. 所代表的位置中
  被访问，外部作用域则不行。foo 变量名被隐藏在自身中意味着不会非必要地污染外部作
  用域
  函数被包含在一对 ( ) 括号内部，因此成为了一个表达式，通过在末尾加上另外一个
  ( ) 可以立即执行这个函数，比如 (function foo(){ .. })()。第一个 ( ) 将函数变成表
  达式，第二个 ( ) 执行了这个函数。另一个改进的形式：(function(){ .. }())。
  IIFE，代表立即执行函数表达式
  
  考虑以下代码：
  function process(data) { 
   // 在这里做点有趣的事情
  } 
  var someReallyBigData = { .. }; 
  process( someReallyBigData ); 
  var btn = document.getElementById( "my_button" ); 
  btn.addEventListener( "click", function click(evt) { 
   console.log("button clicked"); 
  }, /*capturingPhase=*/false );
  函数作用域和块作用域 ｜ 33
  click 函数的点击回调并不需要 someReallyBigData 变量。理论上这意味着当 process(..) 执
  行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于 click 函数形成
  了一个覆盖整个
  
  函数声明和变量声明都会被提升。但是一个值得注意的细节（这个细节可以出现在有多个
  “重复”声明的代码中）是函数会首先被提升，然后才是变量
  
  JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。
  但是 this 机制某种程度上很像动态作用域。
  主要区别：词法作用域是在写代码或者说定义时确定的，而动态作用域是在运行时确定
  的。（this 也是！）词法作用域关注函数在何处声明，而动态作用域关注函数从何处调用
  例子：
  function foo() { 
  /**
  动态作用域输出3，静态作用域输出2，js没有动态作用域，
  所以在js中输出2，js中使用this来实现动态作用域的；
  动态作用域是通过调用栈来确定变量的，静态作用域是在书写的时候确定的
  该输出为2，是js执行从上到下确定var a= 2，然后调用bar，在bar内部调用foo，
  foo中有a，不会顺着调用链在bar中找a，而是在定义的环境中找到a
  */
   console.log( a ); // 
  } 
  
  function bar() { 
   var a = 3; 
   foo(); 
  } 
  var a = 2; 
  bar();
  */
  
  this的绑定， 参见文件 D:\Typora\开发笔记\this的绑定.md
  
  对象相关
  针对一个对象的复制，要区分浅复制与深复制。浅复制，可使用object.assign()实现，实质是通过赋值=来实现的，其中源对象的属性的某些特性是复制不了的；深复制，如果对象属性均可以json序列化，即是对于json安全的，可以使用JSON来实现深复制
  
  var myObject = {     
      // 给 a 定义一个getter
      get a() { return this._a_;      },
      // 给 a 定义一个setter
      set a(val) { this._a_ = val * 2;     }  
  }; 
  myObject.a = 2;
  myObject.a ; // 4
  this._a_ 即使在myObject中定义了一个a的属性，get和set定义了a的getter和setter的函数
  
  对象的属性包含三个特性： 可写， 可枚举， 可配置，使用Object.defineProperty()可以添加或者修改一个属性并可设置它的特性
  writable（可写）决定是否可以修改属性的值。
  Configurable（可配置） 决定是否可以使用defineProperty()
  Enumerable(可枚举) 控制属性是否会出现在对象的属性枚举中，若是true则可以被 for..in 检索到
  最好只在对象上应用for..in循环，如果要遍历数组就使用传统的for循环来遍历数值索引。
  
  for..of会寻找内置(一般数组、对象有内置)或者自定义的@@iterator对象并调用它的next()方法来遍历数据值。
  普通的对象没有内置的@@iterator，所以无法自动完成for..of遍历
  但可以给想遍历的对象定义@@iterator，如下：
  var myObject = {      a: 2,     b: 3  }; 
  Object.defineProperty( myObject, Symbol.iterator, {      
      enumerable: false,     
      writable: false,     
      configurable: true,     
      value: function() {  
          var o = this; 
          var idx = 0; 
          var ks = Object.keys( o );  
          return {             
              next: function() { 
                  return {                     
                      value: o[ks[idx++]],                      
                      done: (idx > ks.length)                 
                  };              
              }         };      
      } } ); // 手动遍历myObject 
  var it = myObject[Symbol.iterator]();  
  it.next(); // { value:2, done:false } 
  it.next(); // { value:3, done:false } 
  it.next(); // { value:undefined, done:true }
  // 用for..of遍历myObject 
  for (var v of myObject) {      
      console.log( v ); 
  } 
  // 2  
  // 3
  
  number
  string
  boolean
  undefined
  null
  object
  symbol
  ```

  

- 第四章 混合对象“类”

  ```javascript
  1. 类理论
     面向对象编程强调的是数据和操作数据的行为本质上是互相关联的（当然，不同的数据有不同的行为），因此好的设计就是把数据以及和它相关的行为打包（或者说封装）起来。
     类核心概念: 继承，实例化，多态
     类理论强烈建议父类和子类使用相同的方法名来表示特定的行为，从而让子类重写父类
     
     在继承或者实例化时，JavaScript的对象机制并不会自动执行复制行为。简单来说，JavaScript中只有对象，并不存在可以被实例化的“类”。一个对象并不会被复制到其他对象，它们会被关联起来（参见第5章）。其他语言中类表现出来的都是复制行为。
     
     混入： js中用来模拟类的复制行为的方法
     显示混入：手动实现复制 extend(..) 或者 mixin(..)
     
     使用混入的方法容易使得逻辑变得复杂，更难维护
  2.原型
  js中一般每个对象都具有一个不可枚举的prototype的属性，该属性即为对象的原型对象，它的作用是用于对象之间的关联。
    例如let a = new foo(), 创建a对象的时候，会把a的prototype与foo.prototype关联.我们可以通过prototype关联形成的原型链在原型链的底层访问到原型链高层的属性，例如可通过a访问foo的属性；原型链继承不是其他的类中继承，不是复制（个人理解就是回溯），但是原型链继承可以用来模仿类的继承
  
  Foo.prototype默认（在代码中第一行声明时！）有一个公有并且不可枚举的属性.constructor，这个属性引用的是对象关联的函数（本例中是Foo）。此外，我们通过“构造函数”调用new  Foo()创建的对象也有一个.constructor属性，指向“创建这个对象的函数
  Foo和你程序中的其他函数没有任何区别。函数本身并不是构造函数，然而，当你在普通的函数调用前面加上new关键字之后，就会把这个函数调用变成一个“构造函数调用”。实际上，new会劫持所有普通函数并用构造对象的形式来调用它
  
  在JavaScript中对于“构造函数”最准确的解释是，所有带new的函数调用。
  
  
  回顾“构造函数”之前讨论.constructor属性时我们说过，看起来a.constructor  ===  Foo为真意味着a确实有一个指向Foo的.constructor属性，但是事实不是这样。这是一个很不幸的误解。实际上，.constructor引用同样被委托给了Foo.prototype，而Foo.prototype.constructor默认指向Foo。把.constructor属性指向Foo看作是a对象由Foo“构造”非常容易理解，但这只不过是一种虚假的安全感。a.constructor只是通过默认的[[Prototype]]委托指向Foo
  即是对于以下例子
  let a = Object.create({});console.log(a,a.constructor,'11111',Object)
  ```
  
  ![image-20210303133557438](C:\Users\19836\AppData\Roaming\Typora\typora-user-images\image-20210303133557438.png)

```javascript
如上图，确实存在一个prototype的属性在a对象中，但是不存在constructor属性，根据js的机制，会在a.prototype中找，若没有，会沿着a.prototype.prototype..这条链寻找，直至Object，显现，在该例中，会找到Object.prototype。所以在该例子中，a.constructor 等价于 Object.constructor，而Object.constructor 则指向名为Object的函数。最终，a.constructor == Object// true

.__proto__（在ES6之前并不是标准！）属性“神奇地”引用了内部的[[Prototype]]对象。如果你想直接查找（甚至可以通过.__proto__.__ptoto__...来遍历）原型链的话，这个方法非常有用。

.__proto__看起来很像一个属性，但是实际上它更像一个getter/setter。.__proto__的实现大致上是这样的（对象属性的定义参见第3章）：
Object.defineProperty( Object.prototype, "__proto__", {      
    get: function() { return Object.getPrototypeOf( this );      },     
    set: function(o) {         
        // ES6中的setPrototypeOf(..)         
        Object.setPrototypeOf( this, o ); return o;     
    }  
} );
因此，访问（获取值）a.__proto__时，实际上是调用了a.__proto__()（调用getter函数）。虽然getter函数存在于Object.prototype对象中，但是它的this指向对象a（this的绑定规则参见第2章），所以和Object.getPrototypeOf( a )结果相同

bject.create(..)会创建一个新对象（bar）并把它关联到我们指定的对象（foo）;Object.create(null)会创建一个拥有空（或者说null）[[Prototype]]链接的对象，这个对象无法进行委托。由于这个对象没有原型链，所以instanceof操作符（之前解释过）无法进行判断，因此总是会返回false。这些特殊的空[[Prototype]]对象通常被称作“字典”，它们完全不会受到原型链的干扰，因此非常适合用来存储数据
```

