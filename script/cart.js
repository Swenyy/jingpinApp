module.exports = {
	loadCartHeader:function(){
		$("#header").load("html/cart.html #cartHeader",function(){
			//console.log("购物车的头部加载成功");
			var userID=localStorage.getItem("userID");
			var data=JSON.parse(localStorage.getItem(userID));
			if(!data||!data[0]){
				$(".tobalance").hide();
			}else{
				$(".tobalance").show();
			}
			$(".tobalance").tap(function(){
				var addCart=require("./addCart");
				var balance=require("./balance");
				var userID=localStorage.getItem("userID");
				var data=JSON.parse(localStorage.getItem(userID));
				//localStorage.removeItem(userID);
				var data1=JSON.parse(localStorage.getItem(userID+"pay"));
				/*var numz=localStorage.getItem("numz");
				var pricez=localStorage.getItem("pricez");*/
				//var totalprice=localStorage.getItem("totalPrice");
	            //var totalnum=localStorage.getItem("totalNum");
				if(!data1){
					data1=[];
				}	
				var dalen=data.length;
				for(var i=0;i<dalen;i++){
					data1.push(data[i]);
				}
				/*if(!numz){
					numz=0;
				}
				numz+=totalnum*1;
				if(!pricez){
					pricez=0;
				}
				pricez+=totalprice*1;*/
				localStorage.setItem(userID+"pay",JSON.stringify(data1));
				/*localStorage.setItem("numz",numz);
				localStorage.setItem("pricez",pricez);*/
				balance.loadBalanceHeader("cart");
				balance.loadBalanceContent();
				var Toast = require("./toast");
				Toast.MakeToast("请准备好钱包，要花钱啦！", 1000);
			})
		});
	},
	loadCartContent:function(){
		$("#content").load("html/cart.html #cartContent",function(){
			console.log("购物车的内容区加载成功");
			/*var totalprice=localStorage.getItem("totalPrice");
	        var totalnum=localStorage.getItem("totalNum");
	        if(!totalprice){
	        	console.log("shixianle");
	        	 totalprice=0;
	        }else{
	        	totalprice=totalprice*1;
	        }
			if(!totalnum){
	        	 totalnum=0;
	        }else{
	        	totalnum=totalnum*1;
	        }*/
			
			
            var	totalprice=0;
	        var	totalnum=0;
			
			var userID=localStorage.getItem("userID");
			var data=JSON.parse(localStorage.getItem(userID));
	        //修改过
	        
	        
			if(!data||!data[0]){
				$(".topay").hide();
				$("#cartList").html("<div class='goto'>购物车空空如也,<p id='goShop' style='color:#f66'>去购物</p></div>");
				$("#goShop").tap(function(){
					var home = require("./home");
					home.loadHomeHeader();
			        home.loadHomeContent();
			        $("#footer").find("li").eq(0).addClass("active").siblings().removeClass("active");
			        
				});
			}else{
				$(".topay").show();
				$("#cartList").html("");
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
					totalnum+=number*1;
					totalprice+= number*cPrice;
					localStorage.setItem("totalNum",totalnum);
					localStorage.setItem("totalPrice",totalprice);
					$("#cartList").append('<li class="cartItem">'+
						'<div class="cartItemImg">'+
							'<img src="'+proImg+'"/>'+
						'</div>'+
						'<div class="cartItemBox">'+
							'<div class="cartName">'+
								'<h3>'+proName+'</h3>'+
								'<span class="cartPrice">￥'+cPrice+'</span>'+
							'</div>'+
							'<div class="cartMessage">'+
								'<span>规格:</span>'+
								'<span>'+proSize+'</span>'+
								'<del>￥'+proPrice+'</del>'+
							'</div>'+
							'<div class="cartAmend">'+
								'<span class="cartsubtract">-</span>'+
								'<span class="cartnum">'+number+'</span>'+
								'<span class="cartadd">+</span>'+
								'<span class="cartdel iconfont">&#xe61a;</span>'+
							'</div>'+
						'</div>'+
					'</li>'
					)
				    
				}
			}	
			var Toast = require("./toast");
			var addCart=require("./addCart");
			$(".cartsubtract").tap(function(){
				var addCart=require("./addCart");
				var father=$(this).parents(".cartItem");
				var index=father.index();
				//alert(index);
				var price=data[index].cprice;
				var num=father.find(".cartnum").html();
				if(num=="1"){
					Toast.MakeToast("至少留一个吧！", 1000);
				}else{
					num--;
					totalnum=totalnum*1-1;
					//totalnum--;
					totalprice-=price*1;
					localStorage.setItem("totalNum",totalnum);
					localStorage.setItem("totalPrice",totalprice);
					father.find(".cartnum").html(num);
					addCart.addCarts(userID,data[index].proId,num);
					
				}
			});
			$(".cartadd").tap(function(){
				var addCart=require("./addCart");
				var father=$(this).parents(".cartItem");
				var index=father.index();
				var price=data[index].cprice;
				var num=father.find(".cartnum").html();
				if(num=="100"||num==100){
					Toast.MakeToast("土豪真的没有货啦！", 1000);
				}else{
					num++;
					totalnum=Number(totalnum)+1;
					totalprice+=price*1;
					localStorage.setItem("totalNum",totalnum);
					localStorage.setItem("totalPrice",totalprice);
					father.find(".cartnum").html(num);
					addCart.addCarts(userID,data[index].proId,num);
					
				}
			});
			$(".cartdel").tap(function(){
				var addCart=require("./addCart");
				var index=$(this).parents(".cartItem").index();
				addCart.addCarts(userID,data[index].proId,0,"del");
				$(this).parents(".cartItem").remove();
				//修改过
				
				if(!$("#cartList li")[0]){
					$("#cartList").html("<div class='goto'>购物车空空如也,<p id='goShop' style='color:#f66'>去购物</p></div>");
					$(".topay").hide();
				}
			});
			var totalNum=localStorage.getItem("totalNum");
			var totalPrice=localStorage.getItem("totalPrice");
			if(!data||!data[0]){
				$(".total").hide();
			}else{
				$(".total").show();
				$("#totalprice").html("￥"+parseInt(totalPrice));
				$("#totalnum").html(totalNum);
			}
		});
	}
}








