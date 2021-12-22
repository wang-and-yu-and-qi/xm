let buy = document.querySelector(".centerbox .buy");
let lisobj1 = document.querySelectorAll(".shoes .tm-clear li")
let lisobj2=document.querySelectorAll(".style .tm-clear li ")
let src='';
let size ;
let style='';
let index1 = 0 // 当前图片的下标，默认为0
let lastIndex1 = 0 // 上一张图片的下标，默认为0
let index2 = 0 // 当前图片的下标，默认为0
let lastIndex2 = 0 // 上一张图片的下标，默认为0
lisobj1.forEach((v,i) => {
  v.onclick = function () {
    size = v.innerText;
    lastIndex1 = index1
    index1 = i
  chages1()
  }
})
lisobj2.forEach((v,i) => {
  v.onclick = function () {
    src=v.firstElementChild.firstElementChild.getAttribute('src')
    style=v.firstElementChild.firstElementChild.getAttribute('title')
    lastIndex2 = index2;
    index2 = i;
  chages2()
  }
})
function chages1(){
  lisobj1[lastIndex1].classList.remove('ac')
  lisobj1[index1].classList.add('ac')
}
function chages2(){
  lisobj2[lastIndex2].classList.remove('ac')
  lisobj2[index2].classList.add('ac')
}
buy.onclick = function () {
  let price = document.querySelector(".centerbox .price samp").innerHTML;
  let id = document.querySelector(".centerbox .kefu samp").innerHTML;
  let name = document.querySelector(".centerbox .imgname").innerHTML;
  let num = 1;
  if(size&&style){
    addCart(id, name, price, num, src, size,style)
    alert('添加成功')
  }else{
    alert('请重新选择尺码颜色')
  }
}

function addCart(id, name, price, num, src, size,style) {
  //1 获取购物车数据
  let cartGoods = localStorage.getItem('cart')
  
  // 2 判断购物车是否为空
  if (cartGoods) { // 3 不为空
    cartGoods = JSON.parse(cartGoods);
    // console.log(cartGoods);
    // 3-1 判断商品是否存在
    let exists = false;
    cartGoods.forEach(v => {
      // console.log(v);
      if (v.id == id && v.size == size&&style==v.style) {
        // 存在则增加数量
        // num += v.num;
        v.num = v.num - 0 + (num - 0)
        exists = true;
      }
    })

    if (!exists) {
      cartGoods.push({
        id,
        name,
        price,
        num,
        src,
        size,
        style
      })
    }

    // 5 存入local
    localStorage.setItem('cart', JSON.stringify(cartGoods))




  } else {
    let tmpGoods = {
      id,
      name,
      price,
      num,
      src,
      size,
      style
    };
    let goodsArr = [tmpGoods];


    localStorage.setItem('cart', JSON.stringify(goodsArr))

  }



}