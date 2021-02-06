const drag = {
  bing: function(el, binding, vnode){

  },

  inserted: function(el, binding, vnode){

    el.style.cursor = binding.value && binding.value.cursor ? binding.value.cursor : 'default'

    // 如果拖动元素非元素本身（el），传入id
    var moveEl = binding.value && binding.value.moveElId ? document.getElementById(binding.value.moveElId) : el
    // 为拖动元素添加绝对定位
    moveEl.style.position = 'absolute'

    // 如果容器为设置position属性，默认为 position = 'relative'
    if (getComputedStyle(moveEl.parentNode, null).position === 'static') {
      moveEl.parentNode.style.position = 'relative'
    }

    var mouseDownFn = function (e) {
      console.log('drag ,down')

      //.shaow---------- 复制节点，并且插入容器中原来位置
      if (binding.modifiers.shaow) {
        var newNode = moveEl.cloneNode(true)
        moveEl.style.opacity = '0.5'
        moveEl.parentNode.appendChild(newNode)
      }
      //----------


      var disX, disY
      if (!binding.modifiers.dragY) disX = e.clientX - moveEl.offsetLeft
      if (!binding.modifiers.dragX) disY = e.clientY - moveEl.offsetTop
      var mouseMoveFn = function (e) {
        e.preventDefault()
        var left = e.clientX - disX
        var top = e.clientY - disY

        // 可以拖出去的元素的剩余宽度
        // dragOutX
        var limitWidth = binding.value && binding.value.dragOutX ? moveEl.offsetWidth - binding.value.dragOutX : 0
        // dragOutY
        if (binding.value && binding.value.dragOutY) {
          var limitHeigth = moveEl.offsetHeight - binding.value.dragOutY
          // 防止可拖拽区域被拖出容器区域
          // 拖拽元素在顶部
          var limitHeigthTop = el.offsetHeight - binding.value.dragOutY
        } else {
          var limitHeigth = 0
          var limitHeigthTop = 0
        }


        if (left < 0 - limitWidth) {
          left = 0 - limitWidth
        }
        else if (left > moveEl.parentNode.clientWidth - moveEl.offsetWidth + limitWidth) {
          left = moveEl.parentNode.clientWidth - moveEl.offsetWidth + limitWidth
        }

        if (top < 0 - limitHeigthTop) {
          top = 0 - limitHeigthTop
        }
        else if (top > moveEl.parentNode.clientHeight - moveEl.offsetHeight + limitHeigth) {
          top = moveEl.parentNode.clientHeight - moveEl.offsetHeight + limitHeigth;
        }
        moveEl.style.left = left + 'px'
        moveEl.style.top = top + 'px'

        // 拖拽事件
        if (binding.value && binding.value.ondrag) {
          if (typeof binding.value.ondrag != 'function') throw 'ondrag: should be a function'
          binding.value.ondrag(e, { left: left, top: top })
        }

      }
      // mousemove
      document.addEventListener('mousemove', mouseMoveFn)

      var mouseUpFn = function () {

        // 移除临时shaow节点
        if (newNode) {
          moveEl.style.opacity = '1'
          newNode.parentNode.removeChild(newNode)
        }
        document.removeEventListener('mousemove', mouseMoveFn)
        document.removeEventListener('mouseup', mouseUpFn)
      }
      //  mouseup
      document.addEventListener('mouseup', mouseUpFn)
    }

    // mousedown
    el.addEventListener('mousedown', mouseDownFn)
  }
}


const dialogDrag = {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    //dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'
  
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function() {
        if (window.document.currentStyle) {
            return (dom, attr) => dom.currentStyle[attr];
        } else{
            return (dom, attr) => getComputedStyle(dom, false)[attr];
        }
    })()    
     
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
       
      const screenWidth = document.body.clientWidth; // body当前宽度
        const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取) 
         
        const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
        const dragDomheight = dragDom.offsetHeight; // 对话框高度
         
        const minDragDomLeft = dragDom.offsetLeft;
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
         
        const minDragDomTop = dragDom.offsetTop;
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;
  
       
      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left');
      let styT = sty(dragDom, 'top');
  
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if(styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100);
      }else {
        styL = +styL.replace(/\px/g, '');
        styT = +styT.replace(/\px/g, '');
      };
       
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                 
                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -(minDragDomLeft);
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft;
                }
                 
                if (-(top) > minDragDomTop) {
                    top = -(minDragDomTop);
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop;
                }
  
        // 移动当前元素 
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };
  
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    } 
  }
}



export {
  drag,
  dialogDrag,
}