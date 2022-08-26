# vue项目网页访问时，用localhost能访问，但是用本机ip就不能访问



将config文件的dev.host重新定义为：0.0.0.0即可, 然后重启服务，发现localhost、127.0.0.1、本地IP均能正常访问，这样就可以用手机来预览效果啦

```javascript
host: '0.0.0.0'
```

