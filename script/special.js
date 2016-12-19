module.exports = {
	loadSpecialHeader:function(){
		$("#header").load("html/special.html #specialHeader",function(){
			//console.log("天天特价的头部加载成功");
			
		});
	},
	loadSpecialContent:function(){
		$("#content").load("html/special.html #specialContent",function(){
			//console.log("天天特价的内容区加载成功");
			$.ajax({
				type:"get",
				url:"http://shop.juanpi.com/gsort?key=99you&type=1&machining=default&dtype=JSONP&page_url=%2F&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
				dataType:"jsonp",
				
				success:function(data){
//					console.log("specialList-two",list);
				//console.log(data);
				//console.log("------"+data.list[0].hot_type);
//				console.log(listObj);
            
					for (var i =0;i<30;i++) {
						var startTime = data.list[i].start_time;
						var endTime = data.list[i].end_time;
						var goodsID = data.list[i].goods_id;		 
						var goodsListImg = data.list[i].pic_url;
						var title = data.list[i].title;		    
						var price = data.list[i].oprice;
						var discount = data.list[i].good_rate;
						var newPrice = data.list[i].cprice;//修改现在的价格，直接取data里面的数据------------12.17
						/*if(discount == "0"){
							newPrice = price;
							discount = "不打";
						}else{
							//.toFixed(1)取小数点后一位
							newPrice = (price*discount/10).toFixed(1);
						}	*/
						$("#specialList-two").append('<li class="specialItem-two" goodsID="'+goodsID+'" endTime="'+endTime+'" startTime="'+startTime+'" title="'+title+'" imgsrc="'+goodsListImg+'">'+
							'<div class="itemImg-two">'+
								'<img src="'+goodsListImg+'"/>'+
							'</div>'+
							'<div class="itemInfo-two">'+
								'<p>'+title+'</p>'+
								'<p><span>￥<b>'+newPrice+'</b></span> <del>￥'+price+'</del></p>'+
								'<p>'+discount+'折</p>'+
							'</div>'+
						'</li>');
					}
					$(".specialItem-two").on("tap",function() {
						var goodsId = $(this).attr("goodsID");
						var eTime = $(this).attr("endTime");
						var sTime = $(this).attr("startTime");
						var title = $(this).attr("title");		
						var img=$(this).attr("imgsrc");
//					console.log(goodsId);
						var Detail = require("./detail");
						Detail.loadDetailHeader("special",null,null);
						Detail.loadDetailContent("special",goodsId,eTime,sTime,title,img);
					})
				}
			});
			$.ajax({
				type:"get",
				url:"http://shop.juanpi.com/gsort?key=99you&type=1&machining=default&dtype=JSONP&page_url=%2F&page=1&zhouyi_ids=p1_c3_a1_l8_18_5_47_51&rows=240&callback=gsort_callback",
				dataType:"jsonp",
				beforeSend:function(){
					
				},
				success:function(data){
//					console.log("specialList-two",list);
				
				//console.log(data);
				//console.log("------"+data.list[0].goods_id);
//				console.log(listObj);
            
					for (var i =0;i<30;i++) {
						var startTime = data.list[i].start_time;
						var endTime = data.list[i].end_time;
						var goodsID = data.list[i].goods_id;		 
						var goodsListImg = data.list[i].pic_url;
						var title = data.list[i].title;		    
						var price = data.list[i].oprice;
						var discount = data.list[i].good_rate;
						var newPrice = data.list[i].cprice;//修改现在的价格，直接取data里面的数据------------12.17
						/*if(discount == "0"){
							newPrice = price;
							discount = "不打";
						}else{
							//.toFixed(1)取小数点后一位
							newPrice = (price*discount/10).toFixed(1);
						}	*/
						$("#specialList").append('<li class="specialItem" goodsID="'+goodsID+'" endTime="'+endTime+'" startTime="'+startTime+'" title="'+title+'" imgsrc="'+goodsListImg+'">'+
							'<div class="itemImg">'+
								'<img src="'+goodsListImg+'"/>'+
							'</div>'+
							'<div class="itemInfo">'+
								'<p>'+title+'</p>'+
								'<p><span>￥<b>'+newPrice+'</b></span> <del>￥'+price+'</del></p>'+
								'<p>'+discount+'<span>折</span></p>'+
							'</div>'+
						'</li>');
					}
					$(".specialItem").on("tap",function() {	
						
					var goodsId = $(this).attr("goodsID");
					var eTime = $(this).attr("endTime");
					var sTime = $(this).attr("startTime");
					var title = $(this).attr("title");		
					var img=$(this).attr("imgsrc");
					//console.log(img);
					var Detail = require("./detail");
					
					Detail.loadDetailHeader("special",null,null);
					Detail.loadDetailContent("special",goodsId,eTime,sTime,title,img);
					//Detail.loadDetailFooter("special");
			})
					
					
				
			
					
					
				}
			});
			
				$("#shuaxin").tap(function() {
				$("#specialList").css("display", "none");
				$("#specialList-two").show();
				$(".logo").hide();
				$(".pic").show();
			})
			$("#kapian").tap(function() {
				$("#specialList").show();
				$("#specialList-two").hide();
				$(".logo").show();
				$(".pic").hide();
			})
		});
	}
}