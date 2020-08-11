vue项目分析(new-risk-manage项目)

我们执行vue项目的指令，通常是在package.json的srcipt属性中设定指令和对应执行的文件路径，当在文件根目录打开控制台，输入该指令的时候，就会读取script，根据指定的路径找到指定文件，然后执行文件脚本，一般是js

利用vue-cli自动生成，不做修改的package.json的srcipt属性如下

```javascript
{
    "script":{
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "test:unit": "vue-cli-service test:unit",
        "lint": "vue-cli-service lint"
    }
}
```

可以按照自己的意愿修改

```javascript
{
  "scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "analyz": "cross-env  NODE_ENV=production npm_config_report=true npm run build"
  },
}
```

一般意义命名，dev指令就是直接运行，用于开发，使用开发环境；build用来打包，使用生产环境

![image-20200721162429730](C:\Users\chen\AppData\Roaming\Typora\typora-user-images\image-20200721162429730.png)

根据路径，找到以上文件目录；webpack前缀即是打包配置，webpack.base.config是公共通用配置，根据开发和生产的需求不同从而还有webpack.dev.config开发环境配置和webpack.prod.config生产环境配置，具体配置涉及常用插件，需要参考webpack文档

正常开发情况下，一般build直接打包生成dist文件，然后部署到服务器上，暂时不用考虑；

在开发中，一般使用dev，直接启动本地服务器，运行项目

vue项目运行，首先进入main.js/main.ts，main中引入全局需要使用的库，将这些导入的库，作为参数，创建vue对象实例，挂载在id为app的dom元素()

<img src="C:\Users\chen\AppData\Roaming\Typora\typora-user-images\image-20200722202932336.png" alt="image-20200722202932336"  />



创建vue对象，引入了App.vue，在App.vue中使用组件<router-view>引入页面，在router目录中的index 创建路由对象，而且在main中引入router，可以实现路由跳转，从而达到无刷新跳转的单页应用，实际上跳转时候一般都会有提示页面跳转的提示，不是页面没有渲染，而是页面的请求的数据还没有返回，所有为了不出现没有数据的静态页面，一般做一个遮罩来做页面跳转的提示，一般而言，前后端分离项目，在开始请求页面的时候，已经将静态页面和静态资源返回，在跳转或者其他交互的时候，只是向后端获取数据。

通过路由，后续的项目运行就是按照；页面的交互规则进行页面的跳转。



在mian中我们看到使用new vue创建vue实例，在我看来，我们创建的vue文件实际就是创建了一个vue实例，即是当我们访问一个vue的组件（我们的页面也是一个组件），开始访问就通过vue的库按照规则创建vue的实例，我们在vue文件中写的script就是new vue（）需要传递的参数。

为什么data属性在开发中使用函数返回对象，而不是对象的

创建的vue文件实际就是创建了一个vue实例，对象是引用的，如果是对象，可能会出现在a组件中可以修改b组件的数据，而返回函数，是每次访问都执行一次，就可以把data重置？





