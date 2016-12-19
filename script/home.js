
module.exports = {
	loadHomeHeader: function() {
		$("#header").load("html/home.html #homeHeader", function() {
			//console.log("首页的头部加载成功");
			$(".search").on("tap",function(){
				var search = require("./search");
				search.loadSearchHeader();
				search.loadSearchContent();
			})
		});
	},
	loadHomeContent: function() {
		$("#content").load("html/home.html #homeContent", function() {
			//console.log("首页的内容区加载成功");
			//home页面轮播图加载
			var mySwiper = new Swiper('.swiper-container', {
				loop: true,
				autoplay: 3000,
				autoplayDisableOnInteraction: false,
				// 如果需要分页器
				pagination: '.swiper-pagination',
			});
			//home页面点击分类信息，跳转到相应的列表页
			$(".homeKind").find("li").on("tap",function(){
				var from = $(this).attr("from");
				var str = $(this).find("span").html();
				var kind = require("../script/kind.js");
				kind.loadKindHeader(str);
				kind.loadKindContent(from,str);
			});
			//home页面加载热卖商品
			$.ajax({
				type: "get",
				url: "http://shop.juanpi.com/gsort?key=temai&type=1&machining=default&dtype=JSONP&page_url=%2F&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
				dataType: "jsonp",
				beforeSend: function() {

				},
				success: function(data) {
					var dataArr = data.list;
					//console.log("hot", dataArr[0]);
					$(".homeItem").html("");
					for(var i = 0; i < 30; i++) {
						var goodsID = dataArr[i].goods_id;
						var goodsImg = dataArr[i].pic_url;
						var goodsTitle = dataArr[i].title;
						var discount = dataArr[i].good_rate;
						var oprice = dataArr[i].oprice;
						var cprice = dataArr[i].cprice;
						var startime = dataArr[i].start_time;
						var endtime = dataArr[i].end_time;
						$(".homeItem").append('<li from="hot" goodsID="'+goodsID+'" startime="'+startime+'" endtime="'+endtime+'" tit="'+goodsTitle+'" imgsrc="'+goodsImg+'">' +
							'<div class="itemImg">' +
							'<img src="' + goodsImg + '" alt="" />' +
							'</div>' +
							'<div class="itemInfo">' +
							'<p><span>￥<b>' + cprice + '</b></span><del>￥' + oprice + '</del></p>' +
							'<p>' + discount + '折</p>' +
							'<p>' + goodsTitle + '</p>' +
							'</div>' +
							'</li>');
					}
					$(".homeItem").find("li").on("tap",function(){
						var goodsID = $(this).attr("goodsID");
						var startime = $(this).attr("statime");
						var endtime = $(this).attr("endtime");
						var goodsTitle = $(this).attr("tit");
						var goodsImgsrc = $(this).attr("imgsrc");						
						var detail = require("../script/detail.js");
						detail.loadDetailHeader("home");
						detail.loadDetailContent("home",goodsID,startime,endtime,goodsTitle,goodsImgsrc);
					});
				}
			});
		});
	}
}