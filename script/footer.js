module.exports = {
	loadFooter:function(type){
		$("#footer").load("html/footer.html #foot",function(){
			//console.log("底部加载成功");
			//根据请求的页面，li显示对应的颜色
			if(type == "home"){
				$("#foot").find("li").eq(0).addClass("active").siblings().removeClass("active");
			}else if(type == "special"){
				$("#foot").find("li").eq(1).addClass("active").siblings().removeClass("active");
			}else if(type == "cart"){
				$("#foot").find("li").eq(2).addClass("active").siblings().removeClass("active");
			}else if(type == "theme"){
				$("#foot").find("li").eq(3).addClass("active").siblings().removeClass("active");
			}else if(type == "user"){
				$("#foot").find("li").eq(4).addClass("active").siblings().removeClass("active");
			}

			$("#footer").find("li").on("tap",function(){
				var $index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				var home = require("../script/home.js");
				var special = require("../script/special.js");
				var cart = require("../script/cart.js");
				var theme = require("../script/theme.js");
				var user = require("../script/user.js");
				switch ($index){
					case 0:
						home.loadHomeHeader();
						home.loadHomeContent();
						break;
					case 1:
						special.loadSpecialHeader();
						special.loadSpecialContent();
						break;
					case 2:
						cart.loadCartHeader();
						cart.loadCartContent();;
						break;
					case 3:
						theme.loadThemeHeader();
						theme.loadThemeContent();;
						break;
					case 4:
						user.loadUserHeader();
						user.loadUserContent();
						break;
					default:
						break;
				}
			})
		})
	}
}
