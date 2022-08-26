vue3 + electron 创建兼容页面和exe程序的项目

1、首先使用vue3版本的vue-cli创建vue3项目

2、向vue项目中添加electron-builder插件

```javascript

vue add electron-builder
/**
 在这一步，如果node的版本过低，就会出错，所以要检查node的版本
 以此类推，其他依赖的版本也要相适配
*/

/**
 运行，会出现vue-dev-tool下载失败的错误，如果不使用该插件可以忽略；
 可以通过修改下载依赖的路径，或者自己下载在本地来解决
*/
npm run electron:serve

/**
 打包，同样会出现依赖下载失败的错误
 解决：在项目根目录创建 .npmrc 文件，在文件里面配置新的路径重新打包即可
 一般是以下两个配置
  electron_mirror='https://npm.taobao.org/mirrors/electron/'
  electron-builder-binaries_mirror='https://npm.taobao.org/mirrors/electron-builder-binaries/'
*/
npm run electron:build

```



