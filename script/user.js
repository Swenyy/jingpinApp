module.exports = {
	loadUserHeader:function(){
		$("#header").load("html/user.html #userHeader",function(){
			//console.log("我的地盘头部加载成功");
		});
	},
	loadUserContent:function(){
		$("#content").load("html/user.html #userContent",function(){
			//console.log("我的地盘的内容区加载成功");
			if(localStorage.getItem("isLogin") != "ok"){
				//如果不是登录状态，登录注册按钮显示-------12.16
				$(".loginBtn").show();
				$(".registerBtn").show();
			}else{
				//如果是登录状态，登录注册按钮隐藏-------12.16
				$(".loginBtn").hide();
				$(".registerBtn").hide();
			}
			$(".loginBtn").tap(function(){
				var Login = require("./login");
				Login.loadLoginHeader("user");
				Login.loadLoginContent("user");
			});
			$(".registerBtn").tap(function(){
				var Register = require("./register");
				Register.loadRegisterHeader("user");
				Register.loadRegisterContent();
			});
			$(".userSet").tap(function(){
				var UserSet = require("./userSet");
				UserSet.loadUserSetHeader();
				UserSet.loadUserSetContent();
			});
			$(".checkOrder").tap(function(){
				if(localStorage.getItem("isLogin") != "ok"){
					var Toast = require("./toast.js");
					Toast.MakeToast("未登录，2s后跳转登陆！",2000);
					setTimeout(function(){
						var Login = require("./login");
						Login.loadLoginHeader("user");
						Login.loadLoginContent("user");
					},2000);
				}else{
					var pay = require("./pay");
					pay.loadPayHeader("user");
					pay.loadPayContent();
					var footer = require("./footer");
					footer.loadFooter("user");
				}
			});
			
			$(".goCart").tap(function(){
				//添加判断，如果没有登录，跳转到登录页面，
				if(localStorage.getItem("isLogin") != "ok"){
					var Toast = require("./toast.js");
					Toast.MakeToast("未登录，2s后跳转登陆！",2000);
					setTimeout(function(){
						var Login = require("./login");
						Login.loadLoginHeader("user");
						Login.loadLoginContent("user");
					},2000);
				}else{
					var Cart = require("./cart");
					Cart.loadCartHeader("user");
					Cart.loadCartContent();
					$("#footer").find("li").eq(2).addClass("active").siblings().removeClass("active");
				}
				/*var Cart = require("./cart");
				Cart.loadCartHeader("user");
				Cart.loadCartContent();*/
				//页面跳转到购物车，底部的li颜色发生改变
				//$("#footer").find("li").eq(2).addClass("active").siblings().removeClass("active");
			})
			if(localStorage.getItem("isLogin") == "ok"){
				$(".name").html(localStorage.getItem("userID"));
			}else{
				$(".name").html('未知');
			}
		});
	}
}