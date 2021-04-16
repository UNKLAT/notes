对于报错vue.esm.js?efeb:628 [Vue warn]: Computed property "linkData" was assigned to but it has no setter.

这是因为在组件中，设置的computed属性，在使用的时候存在设置其值的操作，所以对应在computed属性中要设置setter函数，如果没有使用设置操作，可以不写setter函数