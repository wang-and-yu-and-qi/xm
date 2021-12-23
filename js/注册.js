let userObj = document.getElementById('tel');
let passObj = document.getElementById('reg_password');
let pass2Obj = document.getElementById('reg_repassword');
let butn = document.getElementById("register");

// 1 设置三个状态,用于标识用户名,密码,重复密码是否验证成功
var x = false;
var y = false;
var z = false;
// 2 验证用户名,当失去焦点时触发事件
userObj.onblur = function () {
    // a 获取表单中的值
    var val = this.value;
    //console.log(val);
    // b 书写正则
    var reg = /^1[3578]{1}\d{9}/;
    if (reg.test(val)) {
        this.nextElementSibling.innerHTML = '';
        x = true;
    } else {
        this.nextElementSibling.innerHTML = '用户名不合法';
        x = false;
    }
}
// 3 验证密码
passObj.onblur = function () {
    var passVal = this.value;
    //a 验证密码的长度
    if (passVal.length >= 6 && passVal.length <= 20) {
        // b 验证密码输入的内容
        //记录密码的强度状态
        var a = 0,
            b = 0;
        c = 0;
        // 验证是否是有数字
        var reg = /\d+/;
        a = reg.test(passVal) ? 1 : 0;
        //console.log(a);
        // 验证是否有字母
        var reg1 = /[a-zA-Z]+/;
        b = reg1.test(passVal) ? 1 : 0;
        // 验证是否包含特殊字符
        var reg2 = /[^a-zA-Z\d]+/;
        c = reg2.test(passVal) ? 1 : 0;
        // 给出面强度判断
        var str = '';
        switch (a + b + c) {
            case 1:
                str = '弱';
                break;
            case 2:
                str = '中';
                break;
            case 3:
                str = '强';
                break;
        }
        // 将密码强度追加到密码框后
        this.nextElementSibling.innerHTML = str;
        // console.log(a+b+c);
        y = true;

    } else {
        this.nextElementSibling.innerHTML = '密码长度不够';
        y = false;
    }
}
// 4 验证重复密码
pass2Obj.onblur = function () {
    var pass2Val = this.value;
    var passVal = passObj.value;
    if (pass2Val != ' ' && pass2Val == passVal) {
        this.nextElementSibling.innerHTML = '';
        z = true;
    } else {
        this.nextElementSibling.innerHTML = '两次密码不一致';
        z = false;
    }
}
// 5 提交表单
butn.onclick = function () {
    let name = userObj.value;
    let password = passObj.value;
    if (x & y & z) {
        console.log(name);
        console.log(password);
        axios.get('lib/index.php', {
            fn: 'add',
            name,
            password

        }).then(data => {

            if (data == 1) location.reload();

        });
          
    }
}