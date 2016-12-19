module.exports = {
	loadLoginHeader:function(type){
		$("#footer").hide();
		$("#header").load("html/login.html #loginHeader",function(){
			//console.log("ok");
			$("#back").tap(function(){
				if(type =="home"){
					var Home = require("./home");
					Home.loadHomeHeader();
					Home.loadHomeContent();
					$("#footer").show();
				}else if(type == "register"){
					var Register = require("./register");
					Register.loadRegisterHeader();
					Register.loadRegisterContent();
				}else{
					var User = require("./user");
					User.loadUserHeader();
					User.loadUserContent();
					$("#footer").show();
				}
			});
			$("#register").tap(function(){
				var Register = require("./register");
				Register.loadRegisterHeader("login");
				Register.loadRegisterContent();
			});
		})
	},
	loadLoginContent:function(type){
		$("#footer").hide();
		var that = this;
		$("#content").load("html/login.html #loginContent",function(){
	
			
			$(".loginBtn").tap(function(){
				var Toast = require("./toast");
				var userID = $("#userID").val();
				var pwd = $("#pwd").val();
				var loginFlag = false;
				if(userID == '') {
					Toast.MakeToast("用户名不能为空！", 3000);
				}else {
					if(/^[1-3]\d{10}$/.test(userID)){
						if(localStorage.getItem("userInfo")){
							var userInfoStr = localStorage.getItem("userInfo");
							var userInfoArray = JSON.parse(userInfoStr);
							var len = userInfoArray.length;
							for(var i = 0;i < len;i++){
								if(userID == userInfoArray[i].userId){
									loginFlag = true;
									var tempPwd = userInfoArray[i].password;
								}
							}
							if(loginFlag){
								if(pwd == tempPwd){
									Toast.MakeToast("登录成功！",3000);
									localStorage.setItem("isLogin","ok");
									localStorage.setItem("userID",userID);
									$("#header .loginBtn").hide();
									$("#header .registerBtn").hide();
									if(type == "user"){
										var User = require("./user");
										User.loadUserHeader();
										User.loadUserContent();
										$("#footer").show().find("li").eq(4).addClass("active").siblings().removeClass("active");
										
									}else if(type == "home"){
										var Home = require("./home");
										Home.loadHomeHeader();
										Home.loadHomeContent();
										$("#footer").show();
									}else if(type == "cart"){
										var Cart = require("./cart");
										Cart.loadCartHeader();
										Cart.loadCartContent();
										$("#footer").show();
									}
								}else{
									Toast.MakeToast("密码输入错误！",3000);
								}
							}else{
								Toast.MakeToast("您还没有注册，请先注册！",3000);
							}
						}else{
							Toast.MakeToast("您还没有注册，请先注册！",3000);
						}
					}else{
						Toast.MakeToast("用户名格式有误！", 3000);
					}
				}				
			})
		});
	}
}
