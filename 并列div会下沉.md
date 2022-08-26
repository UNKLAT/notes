当div设置为display：inline-block，多个并列，有其中一个有元素是文字的时候，那该div会下沉

原因：display：inline-block的元素默认会设置 vertical-align: baseline，所有文字会向下对齐，促使div也向下对齐

解决方案：1.在div中设置display：inline-block时候同时设置vertical-align: top，则所有div的内容都向上对齐，div也就不会下沉