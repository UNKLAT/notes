在vue中导入多个全局组件。导入的时候，对于一个文件为一个组件，目前已知正确的做法是使用import 导入, 可以将组件组合成数组然后批量注册

```javascript
import a1 from 'path'
import a2 from 'path'
import a3 from 'path'
import a4 from 'path'
import a5 from 'path'

const components = [ a1, a2, a3, a4, a5 ]

components.forEach( component => {
    Vue.components(component.name, component)
})

```

