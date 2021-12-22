class Carts {
  constructor() {
    this.getCartGoods();
    // 获取全选按钮,且绑定事件
    this.allChec = document.querySelectorAll('.check-all');
    this.oneChec = document.querySelectorAll('.check-one');
    // 全选按钮,绑定事件
    this.allChec[0].addEventListener('click', this.allCCFn.bind(this, 1))
    this.allChec[1].addEventListener('click', this.allCCFn.bind(this, 0));

    this.oneFn();

    // 处理+和减
    this.$('tbody').addEventListener('click', this.tbodyFn.bind(this))
    this.$('#foot #deleteAll').addEventListener('click',this.deleteAllFn.bind(this,document.querySelector('tbody')))
  
  }
  deleteAllFn(tar){
  
    let that = this;
    // 弹出框,是否删除
    layer.confirm('是否删除选中？', {
      btn: ['确定', '取消'] //按钮
    }, function (index) {


      layer.close(index);

      

      // 当前商品选中,则更新数量
      // console.log((trObj.children)[0].firstElementChild.checked);
     Array.from(tar.children).forEach(gds=>{
      if ((gds.children)[0].firstElementChild.checked){
      let id = gds.getAttribute('goods-id');
      gds.remove();
       
        that.totalNP(document.querySelectorAll('.check-one'))
      
      // 更新local中的数据
      that.modLocal(id);
      }
     })

    });
  }
  // 点击+,增加数量
  tbodyFn(eve) {
    //  console.log(eve.target);

    // 判断点击的是哪个节点对象
    if (eve.target.className == 'add') {
      // console.log('add');
      this.addFn(eve.target);
    }
    if (eve.target.className == 'delete') {
      // console.log('delete');
      this.deleteFn(eve.target);
    }
    if (eve.target.className == 'reduce') {
      this.reduce(eve.target)
    }

  }
  // 减少按钮
  reduce(target) {
    let num = target.nextElementSibling.value;

    if (num > 1) {
      num = num - 0 - 1;
      target.nextElementSibling.value = num;
      let tdObj = target.parentNode;
      let price = tdObj.previousElementSibling.innerHTML;

      // console.log(price);
      // 计算小计
      tdObj.nextElementSibling.innerHTML = num * price;
      // 当前商品未选中,则不调用小计
      // console.log((tdObj.parentNode.children)[0].firstElementChild.checked);
      let trObj = tdObj.parentNode;
      // console.log(trObj);

      (trObj.children)[0].firstElementChild.checked && this.totalNP();

      // 获取id
      let goodsId = trObj.getAttribute('goods-id');
      this.modLocal(goodsId, num)

    }else{
      let trObj = target.parentNode.parentNode;
      let id = trObj.getAttribute('goods-id');
      // console.log(id);
      let that = this;
      // 弹出框,是否删除
      layer.confirm('是否从购物车中移除该商品？', {
        btn: ['确定', '取消'] //按钮
      }, function (index) {
  
  
        layer.close(index);
  
        // console.log(this); 
  
        // 当前商品选中,则更新数量
        // console.log((trObj.children)[0].firstElementChild.checked);
        trObj.remove();
        if ((trObj.children)[0].firstElementChild.checked) {
          that.totalNP(document.querySelectorAll('.check-one'))
        }
        // 更新local中的数据
        that.modLocal(id);
  
  
      });
  
    }
  }
  addFn(tar) {
    // console.log(tar);
    let numObj = tar.previousElementSibling;
    // 数量增加
    let num = numObj.value - 0 + 1;
    numObj.value = num;
    // 取出单价
    let tdObj = tar.parentNode;
    let price = tdObj.previousElementSibling.innerHTML;

    // console.log(price);
    // 计算小计
    tdObj.nextElementSibling.innerHTML = num * price;
    // 当前商品未选中,则不调用小计
    // console.log((tdObj.parentNode.children)[0].firstElementChild.checked);
    let trObj = tdObj.parentNode;
    // console.log(trObj);

    (trObj.children)[0].firstElementChild.checked && this.totalNP();

    // 获取id
    let goodsId = trObj.getAttribute('goods-id');
    this.modLocal(goodsId, num)

  }
  // 更新local数量
  modLocal(goodsId, num = 0) {
    //  console.log(goodsId, num);
    let gd = localStorage.getItem('cart');
    // 无数据则清空
    if (!gd) return;

    gd = JSON.parse(gd);


    gd.forEach((goods, index) => {
      if (goodsId == goods.id) {
        if (num) goods.num = num; // 修改数量
        else { // 删除当前商品
          gd.splice(index, 1)

        }
      }
    });
 
    localStorage.setItem('cart', JSON.stringify(gd))

  }


  
}

new Carts;