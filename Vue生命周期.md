Vue生命周期

beforeCreate(创建前）
在数据观测和初始化事件还未开始。
created(创建后）
完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来。
beforeMounted(挂载前）
在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置:

编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。

*在vue中设置html的各种初始，例如给table设置height，如果在data中给了值（如果是空值，会报错），*

*那么通过method中定义init函数，然后再mounted中调用init中，更改height的值，*

*虽然height的值已经更变，但是在视图中是不会更新的*



mounted(挂载后）
在el被新创建的vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置:
用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
beforeUpdate（更新前）
在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
updated(更新后）
在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操
作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
beforeDestroy（销毁前）
在实例销毁之前调用。实例仍然完全可用。
destroyed(销毁后)
在实例销毁之后调用。调用后，所有的时间监听器都会被溢出，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用
————————————————
版权声明：本文为CSDN博主「风中告退」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_42698576/article/details/109109555