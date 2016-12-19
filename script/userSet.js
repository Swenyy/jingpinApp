module.exports = {
	loadUserSetHeader:function(){
		$("#header").load("html/userSet.html #userSetHeader",function(){
			//console.log("设置头部加载成功");
			$("#back").tap(function(){
				
				var User = require("./user");
				User.loadUserHeader();
				User.loadUserContent();
				
			});
		});
	},
	loadUserSetContent:function(){
		$("#content").load("html/userSet.html #userSetContent",function(){
			//console.log("设置的内容区加载成功");
			$("#out").tap(function(){
				localStorage.setItem("isLogin","error");
				localStorage.removeItem("userID");
				var User = require("./user");
				User.loadUserHeader();
				User.loadUserContent();
			})
		});
	}
}