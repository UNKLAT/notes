输入框按enter键引起页面刷新问题
1、问题

      绑定键盘事件，在一个弹出窗中输入完密码按enter键直接提交，但是按完enter键会直接刷新页面，弹出窗无法保持
    
     分析：在绑定事件中分别试了keydown，keyup，
    
                keydown可以保持弹出窗口，但是第一次按键值获取不到，
    
                keyup可以获取到值，但是按完enter键会直接刷新页面，无法保持窗口
    
                最终通过分析绑定事件和页面，问题原因是form表单，from表单默认会提交刷新

2、解决

      方法1：去掉表单
    
      方法2：form表单中大于多于两个文本框（只有一个文本框的话，复制一个，display设置为none）
    
      方法3：form表单后面加上一个 onsubmit 事件，返回 false，来阻止 form 提交（onsubmit="return false;"）
————————————————
版权声明：本文为CSDN博主「郑先生的喵」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/pan_zzq/article/details/101281911