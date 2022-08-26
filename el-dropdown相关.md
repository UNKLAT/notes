###
在使用el-dropdown的时候，我们想要给浮层添加样式，一般是el-dropdown-menu标签，也即是
插槽 #template 下的内容，一般是通过 el-dropdown的popper-class属性新增一个自定义的class
记作 popperClass
如果这时，我们在项目中会使用less/sass， 然后把 popperClass 嵌套在 el-dropdown的class下
会不生效，同时，我们在style中添加了scoped属性，也可能会不生效

原因： 浮层不是在 el-dropdown的组件里面添加的，而是添加在body中的，而上面的绑定等于把popper绑定在局部作用域中 ，故而不生效

解决方案： 另外创建一个 style标签 设置 popperClass, 但是要注意css全局中的命名冲突