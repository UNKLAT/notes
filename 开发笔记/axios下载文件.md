axios下载文件

```javascript
    downloadFile(url, fileName){
        return service({
            url: url ,
            method: "get",
            headers: {
                "Content-Type": "application/vnd.ms-excel",
            },
            responseType: 'blob',
        }).then((result)=>{
            console.log(result, 'result')
            if(result.status === 200){
              let url = window.URL.createObjectURL(new Blob([result.data]));
              let link = document.createElement("a");
              link.style.display = "none";
              link.href = url;
              link.setAttribute("download",  fileName + ".xlsx");
              document.body.appendChild(link);
            //   console.log(result);
  
              link.click();
              link.remove();//下载后移除
              window.URL.revokeObjectURL(link.href); //用完之后使用URL.revokeObjectURL()释放；
            }
        }).catch((error)=>{
            console.clear()
            console.dir(error)
            if(error.response.data.status === 400){
                Message({type:'error', message:'下载失败,' + error.response.data.message})
            }
        })
    }
```

