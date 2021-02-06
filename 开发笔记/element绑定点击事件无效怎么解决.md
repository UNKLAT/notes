### element绑定点击事件无效怎么解决？

@click 这样写是无效的~
vue封装@click这些方法时阻止了原生的DOM事件，而native就是释放DOM原生事件
@click.native 这样写才可以~