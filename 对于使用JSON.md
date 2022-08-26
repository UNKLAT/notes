对于使用JSON.stringy()和JSON.parse()进行深拷贝，得到的结果与原对象的一样，但是各自的子对象使用indexOf不一定可以寻找到结果，即使两个对象不严格相等（!==）

````
let aindex = JSON.parse(JSON.stringify(this.$refs.table.tableData)).indexOf(row)
let bindex = this.$refs.table.tableData.indexOf(row)

bindex值不为-1时候，aindex可能为-1
````

