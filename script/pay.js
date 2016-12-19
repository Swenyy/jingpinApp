module.exports={
	loadPayHeader:function(type){
		$("#header").load("html/pay.html #payHeader",function(){
			//console.log("支付的头部加载成功");
			$(".payBack").tap(function(){
				/*if(type=="cart"){
					var Cart=require("./cart");
					Cart.loadCartHeader();
					Cart.loadCartContent();
				}*/
				//改  上面注释，下面添加
				if(type=="balance"){
					var Balance=require("./balance");
					Balance.loadBalanceHeader();
					Balance.loadBalanceContent();
				}else if(type=="user"){
					var user=require("./user");
					user.loadUserHeader();
					user.loadUserContent();
				}
			})
		});
	},
	loadPayContent:function(){
		$("#content").load("html/pay.html #payContent",function(){
			//console.log("支付的内容区加载成功");
			
			var userID=localStorage.getItem("userID");
			var data=JSON.parse(localStorage.getItem(userID+"pay"));
	        var totalprice=Number(localStorage.getItem("totalPrice"));
	        var totalnum=Number(localStorage.getItem("totalNum"));
			if(!data||!data[0]){
				
				$(".payList").html("没有订单啊");
	
			}else{
				/*$("#totalprice").html("￥"+(totalprice).toFixed(1));
				$("#totalnum").html(totalnum);*/
				//改
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
					
					$("#payList").append('<li class="payItem">'+
						'<div class="payItemImg">'+
							'<img src="'+proImg+'"/>'+
						'</div>'+
						'<div class="payItemBox">'+
							'<div class="payName">'+
								'<h3>'+proName+'</h3>'+
								'<span class="payPrice">￥'+cPrice+'</span>'+
							'</div>'+
							'<div class="payMessage">'+
								'<span>'+number+'</span>'+
								'<span>'+proSize+'</span>'+
								'<del>￥'+proPrice+'</del>'+
							'</div>'+
						'</div>'+
					'</li>'
					)
				    
				}
			}	
		
		});
	}
}
