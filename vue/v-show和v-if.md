***v-show 隐藏 是display:'none'\***
 ***v-if 隐藏是      visibility:hidden;\***

#### 区别是

***display:none和visibility:hidden的区别是：\***

***1.display:none是彻底消失，不在文档流中占位，浏览器也不会解析该元素；visibility:hidden是视觉上消失了，可以理解为透明度为0的效果，在文档流中占位，浏览器会解析该元素；\***

***2.使用visibility:hidden比display:none性能上要好，display:none切换显示时visibility，页面产生回流（当页面中的一部分元素需要改变规模尺寸、布局、显示隐藏等，页面重新构建，此时就是回流。所有页面第一次加载时需要产生一次回流），而visibility切换是否显示时则不会引起回流。\***



```xml
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
  <div id='itany'>
      <p>{{msg}}</p>
      <h1 v-show="see">{{msg}}</h1>
      <h1 v-if="!see">{{msg}}</h1>
  </div>
   <script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script> 
   <script>
      new Vue({
          el:'#itany',
          data:{
              msg:'hello vue',
              see:true
          }
      })
    </script>
</body>
</html>
```