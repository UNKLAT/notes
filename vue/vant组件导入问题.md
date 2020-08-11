[![log进击的巨人](https://www.it610.com/views/front/img/head.png)](javascript:void(0);)

[**log进击的巨人**](javascript:void(0);)

发布时间：2020-07-31 21:05

# vue引入vant入坑出坑

- [vue](https://www.it610.com/search/vue/1.htm)

最近在vue项目中引入vant的时候发现样式没有，参照官方文档走了一遍还是不行，经过尝试发现了问题，现将完整引入流程提供给大家参考：

### 方式一. 自动按需引入组件 (推荐)

babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式

```
# 安装插件
npm i babel-plugin-import -D
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```

以上是官网推荐的引入方式，一步一步走就行，重点在使用的时候有个问题

```html

红色部分的代码是正确的引入方式。[Button.name]: Button  
vant官网引入入口   
官网还有引入方式二、三，
方式二大家自己进官网查看就可以，
另外说的是方式一和方式三不可共存，即只能使用一种导入方式，否则会有错误提示

方式三. 导入所有组件   Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法   
import Vue from 'vue'; 
import Vant from 'vant'; 
import 'vant/lib/index.css'; 
Vue.use(Vant);
```