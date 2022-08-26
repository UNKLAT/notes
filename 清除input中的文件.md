### input中文件清除
在使用input标签 type=file的时候，即是使用input实现文件上传
往往会遇到在第一次上传成功，想将上一次文件覆盖重新上传，这时候，
如果上一次的文件名与这一次的文件名相同，则不会产生上传的回调，
这时候，要对input中的文件数据进行清除

```javascript

clearFile() {
  this.$refs.uploadInput.value = ''
  let dt = new DataTransfer()
  this.$refs.uploadInput.files = dt.files
}