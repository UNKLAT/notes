js向css传递参数

```html
<div id="app" :style="cssProps">

	<div>Hover text: <input type="text" v-model="hoverContent"></div>
		<div>Hover color: <input type="color" v-model="bgHoverColor"></div>

  <div class="test">Hover over me</div>
  
</div>

<script>
    new Vue({
      el: '#app',
      data: function() {
        return {
          baseFontSize: 1,
          bgHoverColor: "#00cc00",
                hoverContent: "Hovering!"
        }
      },
      computed: {
        cssProps() { return {
            '--hover-font-size': (this.baseFontSize * 2) + "em",
            '--bg-hover-color': this.bgHoverColor,
                  '--hover-content': JSON.stringify(this.hoverContent)
          }
        }
        }
    })
</script>
<style>
    div {
        margin: 1em;
    }
    div.test:hover {
      background-color: var(--bg-hover-color);
      font-size: var(--hover-font-size);
    }
    div.test:hover::after {
        margin-left: 1em;
        content: var(--hover-content);
    }
</style>

如上例子，通过div的style标签，传入一个在js中定义的cssProps的参数，cssProps返回一个json对象，其中的键符合css自定义变量的书写规则，则在css中该div选择器下使用var()即可引用js中的变量
```

