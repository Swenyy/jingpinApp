module.exports = {
	loadKindHeader:function(title){
		$("#header").load("html/kind.html #kindHeader",function(){
			//console.log("分类页的头部加载成功");
			$(".listName").html(title);
			$("#back").tap(function() {
				var home = require("./home");
				home.loadHomeHeader();
				home.loadHomeContent();
			});
		});
	},
	loadKindContent:function(type,title){
		$("#content").load("html/kind.html #kindContent",function(){
			//console.log("分类页的内容区加载成功");
			var jsonUrl={
			"shuma":"http://shop.juanpi.com/gsort?key=shuma&type=1&machining=danpin&dtype=JSONP&page_url=%2Fshuma&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"nan":"http://shop.juanpi.com/gsort?key=nanzhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fnanzhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"nv":"http://shop.juanpi.com/gsort?key=nvzhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fnvzhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"jujia":"http://shop.juanpi.com/gsort?key=jujia&type=1&machining=danpin&dtype=JSONP&page_url=%2Fjujia&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"muying":"http://shop.juanpi.com/gsort?key=muying&type=1&machining=danpin&dtype=JSONP&page_url=%2Fmuying&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"bao":"http://shop.juanpi.com/gsort?key=xiangbao&type=1&machining=danpin&dtype=JSONP&page_url=%2Fxiangbao&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"peishi":"http://shop.juanpi.com/gsort?key=peishi&type=1&machining=danpin&dtype=JSONP&page_url=%2Fpeishi&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"face":"http://shop.juanpi.com/gsort?key=meizhuang&type=1&machining=danpin&dtype=JSONP&page_url=%2Fmeizhuang&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"food":"http://shop.juanpi.com/gsort?key=meishi&type=1&machining=danpin&dtype=JSONP&page_url=%2Fmeishi&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"other":"http://shop.juanpi.com/gsort?key=wenti&type=1&machining=danpin&dtype=JSONP&page_url=%2Fwenti&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"hot":"http://shop.juanpi.com/gsort?key=temai&type=1&machining=default&dtype=JSONP&page_url=%2F&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"daysale":"http://shop.juanpi.com/gsort?key=99you&type=1&machining=default&dtype=JSONP&page_url=%2F&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
			"yugao":"http://shop.juanpi.com/gsort?key=yugaoall&type=1&machining=yugao&dtype=JSONP&page_url=%2Fyugao&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=8&callback=gsort_callback"
			};
			var nowUrl ;
			for(var i in jsonUrl){
				if(type == i){
					nowUrl = jsonUrl[i];
				}
			}
			function getjson(url,callback){
				$.ajax({
					type:"get",
					url:url,
					dataType:"jsonp",
					success:function(data){
						callback(data);
					}
				});
			};
			getjson(nowUrl,function(data){
				//console.log("kind",data.list);
				var kindList = data.list;
				$("#kindContent").html("");
				for(var i = 0; i < 30; i++) {
					var goodsID = kindList[i].goods_id;
					var goodsImg = kindList[i].pic_url;
					var goodsTitle = kindList[i].title;
					var discount = kindList[i].good_rate;
					var oprice = kindList[i].oprice;
					var cprice = kindList[i].cprice;
					var startime = kindList[i].start_time;
					var endtime = kindList[i].end_time;
					$("#kindContent").append('<li from="hot" goodsID="'+goodsID+'" startime="'+startime+'" endtime="'+endtime+'" tit="'+goodsTitle+'" imgsrc="'+goodsImg+'">' +
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
				$("#kindContent").find("li").on("tap",function(){
					var goodsID = $(this).attr("goodsID");
					var goodsTitle = $(this).attr("tit");
					var startime = $(this).attr("statime");
					var endtime = $(this).attr("endtime");
					var goodsImgsrc = $(this).attr("imgsrc");					
					var detail = require("../script/detail.js");
					detail.loadDetailHeader("kind",title,type);
					detail.loadDetailContent("kind",goodsID,startime,endtime,goodsTitle,goodsImgsrc);
				});
			})
		});
	}
}