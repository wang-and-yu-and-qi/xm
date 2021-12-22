let left=document.querySelector('.topnav .left');
let right=document.querySelector('.topnav .right');
let name=localStorage.getItem('name')

if(name){
    left.innerHTML='欢迎'+name;
    right.innerHTML='点击退出';

}else{
   left.innerHTML='请登录';
   
}
right.onclick=function(){
    localStorage.removeItem('name');
    location.reload();
}