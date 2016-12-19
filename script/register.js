module.exports = {
	loadRegisterHeader: function(type) {
		$("#footer").hide();
		$("#header").load("html/register.html #registerHeader", function() {
			//console.log("ok");
			$("#back").tap(function() {
				if(type == "login") {
					var Login = require("./login");
					Login.loadLoginHeader();
					Login.loadLoginContent();
					$("#footer").show();
				} else {
					var User = require("./user");
					User.loadUserHeader();
					User.loadUserContent();
					$("#footer").show();
				}
			});
			$("#login").tap(function() {
				var Login = require("./login");
				Login.loadLoginHeader("register");
				Login.loadLoginContent();
			})
		});
	},
	loadRegisterContent: function() {
		var that = this;
		$("#content").load("html/register.html #registerContent", function() {
			//console.log("ok");
			$(".registerBtn").tap(function() {
				var Toast = require("./toast");
				//Toast.MakeToast("ok",3000);
				var userID = $("#userID").val();
				var pwd = $("#pwd").val();
				var rePwd = $("#rePwd").val();
				var userFlag = false;
				//console.log(userID + "----"+pwd+"-------"+rePwd);
				
				if(userID == '') {
					Toast.MakeToast("用户名不能为空！", 3000);
				} else {
					if(/^[1-3]\d{10}$/.test(userID)){
						
						if(localStorage.getItem("userInfo")){
							var userInfoStr = localStorage.getItem("userInfo");
							var userInfoArray = JSON.parse(userInfoStr);
							var len = userInfoArray.length;
							for(var i = 0;i < len;i++){
//								alert(userInfoArray[i].userId);
								if(userID == userInfoArray[i].userId){
									Toast.MakeToast("该用户已经注册，请登录！", 3000);
									userFlag = true;
								}								
							}
							if(!userFlag){
								
								
								if(pwd == '') {
									Toast.MakeToast("密码不能为空！", 3000);
								}else if(/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
									if(rePwd != pwd) {
										Toast.MakeToast("两次密码输入不一致！", 3000);
									}else{
										Toast.MakeToast("注册成功！2s后跳转登录",2000);
										var userObj = {
											"userId":userID,
											"password":pwd
										}
										userInfoArray.push(userObj);
										var tempStr = JSON.stringify(userInfoArray);
										//console.log(tempStr);
										//console.log(typeof tempStr);
										localStorage.setItem("userInfo",tempStr);
										setTimeout(function(){
											var login = require("./login");
											login.loadLoginHeader();
											login.loadLoginContent("user");
										},2000);
										
									}
								}else{
									Toast.MakeToast("密码格式有误！", 3000);
								}
							
								
							}
							
							
						}else{
							if(pwd == '') {
								Toast.MakeToast("密码不能为空！", 3000);
							}else if(/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
								if(rePwd != pwd) {
									Toast.MakeToast("两次密码输入不一致！", 3000);
								}else{
									Toast.MakeToast("注册成功！2s后跳转登录",2000);
									var tempArr = [];
									var userObj = {
										"userId":userID,
										"password":pwd
									}
									tempArr.push(userObj);
									var tempStr = JSON.stringify(tempArr);
									console.log(tempStr);
									console.log(typeof tempStr);
									localStorage.setItem("userInfo",tempStr);
									setTimeout(function(){
											var login = require("./login");
											login.loadLoginHeader();
											login.loadLoginContent("user");
									},2000);
									
								}
							}else{
								Toast.MakeToast("密码格式有误！", 3000);
							}
						}
						
					}else{
						Toast.MakeToast("用户名不符合手机号格式！", 3000);
					}
				}
			})
		});
	}
}