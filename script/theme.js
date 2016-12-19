module.exports = {
	loadThemeHeader: function() {
		$("#header").load("html/theme.html #themeHeader", function() {
			//console.log("主题的头部加载成功");
		});
	},
	loadThemeContent: function() {
		$("#content").load("html/theme.html #themeContent", function() {
			//console.log("主题的内容区加载成功");
			$.ajax({
				type: "get",
				url: "http://shop.juanpi.com/gsort?key=yugaoall&type=1&machining=yugao&dtype=JSONP&page_url=%2Fyugao&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=8&callback=gsort_callback",
				dataType: "jsonp",
				beforeSend: function() {

				},
				success: function(data) {
					//console.log("theme", data.list[0]);
					var themeList = data.list;
					var dataLen = themeList.length;
					//console.log(dataLen);
					$("#themeContent").html("");
					for(var i = 0; i < dataLen; i++) {
						var goodsID = themeList[i].goods_id;
						var goodsImg = themeList[i].pic_url;
						var goodsTit = themeList[i].title;
						var residue = themeList[i].residue;
						var oprice = themeList[i].oprice;
						var cprice = themeList[i].cprice;
						var startime = themeList[i].start_time;
						var endtime = themeList[i].end_time; 
						$("#themeContent").append('<li class="specialItem-two" goodsID="'+goodsID+'" startime="'+startime+'" endtime="'+endtime+'" tit="'+goodsTit+'" imgsrc="'+goodsImg+'">' +
							'<div class="itemImg-two">' +
							'<img src="'+goodsImg+'" alt="" />' +
							'</div>' +
							'<div class="itemInfo-two">' +
							'<p>'+goodsTit+'</p>' +
							'<p><span>￥<b>'+cprice+'</b></span> <del>原价:￥'+oprice+'</del></p>' +
							'<p>'+residue+'</p>' +
							'</div>' +
							'</li>');
					}
					$("#themeContent").find("li").on("tap",function(){
						var goodsID = $(this).attr("goodsID");
						var startime = $(this).attr("statime");
						var endtime = $(this).attr("endtime");
						var goodsTitle = $(this).attr("tit");
						var goodsImgsrc = $(this).attr("imgsrc");						
						var detail = require("../script/detail.js");
						detail.loadDetailHeader("theme");
						detail.loadDetailContent("theme",goodsID,startime,endtime,goodsTitle,goodsImgsrc);
					});
				}
			});
		});
	}
}