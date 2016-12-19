module.exports = {
	loadSearchHeader:function(){
		$("#footer").hide();
		$("#header").load("html/search.html #searchHeader",function(){
			//console.log("设置头部加载成功");
			$("#back").tap(function(){
				var home = require("./home");
				home.loadHomeHeader();
				home.loadHomeContent();
				$("#footer").show();
			});
		});
	},
	loadSearchContent:function(){
		$("#content").load("html/search.html #searchContent",function(){
			//console.log("设置的内容区加载成功");
		});
	}
}