module.exports={
	loadBalanceHeader:function(type){
		$("#header").load("html/balance.html #balanceHeader",function(){
			console.log("结算的头部加载成功");
			var userID=localStorage.getItem("userID");
			var data=JSON.parse(localStorage.getItem(userID));
			
			$(".balanceBack").tap(function(){
				
					var Cart=require("./cart");
					Cart.loadCartHeader();
					Cart.loadCartContent();
				
			});
			if(!data||!data[0]){
				$(".topay").hide();
			}else{
				$(".topay").show();
				$(".topay").tap(function(){
					
					var userID=localStorage.getItem("userID");
					localStorage.removeItem(userID);
					var Pay=require("./pay");
					
					var Toast = require("./toast");
				    Toast.MakeToast("支付成功，3s后跳至订单页", 3000);
				    setTimeout(function(){
				    	Pay.loadPayHeader("balance");
					    Pay.loadPayContent();
				    },4000);
				})
			}
		});
	},
	loadBalanceContent:function(){
		$("#content").load("html/balance.html #balanceContent",function(){
			console.log("结算的内容区加载成功");
			var userID=localStorage.getItem("userID");
			var data=JSON.parse(localStorage.getItem(userID));
	        var totalprice=Number(localStorage.getItem("totalPrice"));
	        var totalnum=Number(localStorage.getItem("totalNum"));
			if(!data||!data[0]){
				
				$(".balanceList").html("没有买东西呢");
			}else{
			
				var datalen=data.length;
				for(var i=0;i<datalen;i++){
					var proName=data[i].name;
					var proPrice=data[i].price;
					var proImg=data[i].proImg;
					var number=data[i].number;
					var proSize=data[i].proSize;
					//console.log(number);
					var proId=data[i].proId;
					var cPrice=data[i].cprice;
					
					$("#balanceList").append('<li class="balanceItem">'+
						'<div class="balanceItemImg">'+
							'<img src="'+proImg+'"/>'+
						'</div>'+
						'<div class="balanceItemBox">'+
							'<div class="balanceName">'+
								'<h3>'+proName+'</h3>'+
								'<span class="balancePrice">￥'+cPrice+'</span>'+
							'</div>'+
							'<div class="balanceMessage">'+
								'<span>'+number+'</span>'+
								'<span>'+proSize+'</span>'+
								'<del>￥'+proPrice+'</del>'+
							'</div>'+
						'</div>'+
					'</li>'
					)
				    
				}
			}	
			var totalNum=localStorage.getItem("totalNum");
			var totalPrice=localStorage.getItem("totalPrice");
			if(!data||!data[0]){
				$(".total").hide();
			}else{
				$(".total").show();
				$("#totalprice").html("￥"+Number(totalPrice));
				$("#totalnum").html(totalNum);
			}
		
		});
	}
}