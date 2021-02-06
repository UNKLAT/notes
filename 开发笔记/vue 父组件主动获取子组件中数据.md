vue 父组件主动获取子组件中数据

> 1.父组件主动获取子组件中的数据和方法
>
> 在父组件里面通过:
>
> ```javascript
> this.$refs.childMethod.属性
> this.$refs.childMethod.方法
> ```
>
> 在父组件中：(调用子组件的时候，定义一个ref)
>
> ```html
> <child-list ref="childMethod" :parentListClick="parent"></child-list>
> <Button type="primary" @click="prentClick">点击调用子组件方法</Button>
> export default {
> 		data() {
> 			return {
> 				parent: '我是父组件中的属性 !'
> 			}
> 		},
> 		methods: {
> 			prentClick() {
> 				this.$refs.childMethod.haizi();
> 				console.log(this.$refs.childMethod.child);
> 			},
> 			parentList(){
> 				console.log('我是父组件中的方法 !');
> 			}
> 		},
> 		created() {
> 
> 		}
> 	}
> ```
>
>  

>  2.子组件主动获取父组件中的数据和方法
>
> 在子组件里面通过:
>
> ```javascript
> this.$parent.属性
> this.$parent.方法
> ```
>
> 在子组件中：
>
> ```html
> <Button type="primary" @click="childClick">点击调用父组件方法</Button>
> export default {
> 		props: ['parentListClick'],
> 		data(){
> 			return {
> 				child: '我是子组件中的属性 !'
> 			}
> 		},
> 		methods: {
> 			haizi(){
> 				console.log('我是子组件中的方法 !');
> 			},
> 			childClick(){
> 				this.$parent.parentList();
> 				console.log(this.$parent.parent);
> 				console.log('------',this.parentListClick);
> 			}
> 		},
> 		created(){
> 			
> 		}
> 	}
> ```