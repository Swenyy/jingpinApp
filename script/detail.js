var mySwiper;
module.exports = {
	loadDetailHeader: function(type, title, conStr) {
		$("#header").load("html/detail.html #detailHeader", function() {
			//console.log("详情页头ok");
			$("#back").on("tap", function() {
				if(type == "special") {
					var special = require("./special");
					special.loadSpecialHeader();
					special.loadSpecialContent();
					var footer = require("./footer");
					footer.loadFooter("special");
					$("#footer").find("li").eq(1).css("color", "#fff").siblings().css("color", "#333");
				} else if(type == "home") { //返回到home页面
					var home = require("./home");
					home.loadHomeHeader();
					home.loadHomeContent();
					var footer = require("./footer");
					footer.loadFooter('home');
					$("#footer").find("li").eq(0).css("color", "#fff").siblings().css("color", "#333");
				} else if(type == "kind") { //返回到分类页面
					var kind = require("./kind");
					kind.loadKindHeader(title);
					kind.loadKindContent(conStr);
					var footer = require("./footer");
					footer.loadFooter("home");
					$("#footer").find("li").eq(0).css("color", "#fff").siblings().css("color", "#333");
				} else if(type == "theme") {
					var theme = require("./theme");
					theme.loadThemeHeader();
					theme.loadThemeContent();
					var footer = require("./footer");
					footer.loadFooter("theme");
				}
			})
		})
	},
	loadDetailContent: function(type, goodsId, eTime, sTime, title, img) {
		$("#content").load("html/detail.html #detailContent", function() {
			$.ajax({
				type: "get",
				url: "http://shop.juanpi.com/deal/getSku?callback=jQuery17105137869302324265_1481379161489",
				dataType: "jsonp",
				data: {
					"gid": goodsId,
					"t": sTime,
					"_": eTime
				},
				success: function(data) {
					console.log(data);
					var info = data.info;
					var cprice = info.si_cprice; //折后价
					var price = info.si_price; //原价
					var discount = info.good_rate; //折扣
					var color = info.sku_color; //是否有颜色分类
					var size = info.sku_size; //是否有尺码分类
					var zvalues_num = info.zvalues_num;
					var sku = data.sku;

					$("#proWrapper").html(""); //清空轮播图
					$("#proWrapper").append('<div class="swiper-slide" id="bigimg"><img src="' + img + '"></div>');

					mySwiper = new Swiper("#proSwiper", {
						resistanceRatio: 0,
						//loop:true,
						//preventLinksPropagation : false,
						pagination: '.swiper-pagination',

					});

					$(".introduce").html();
					$(".introduce").append('<p><span class="salePrice">￥' + cprice + '</span><span class="introName" title="' + title + '" goodsId="' + goodsId + '"> ' + title + '</span></p>' +
						'<p>市场价： <del> ￥ ' + price + '</del><span class="introdiscount">' + discount + '折</span>' +
						'<p class="color" id="color">' +
						'<i>规格:<br/></i>' +
						'</p>' +
						'<p class="cartbox"> ' +
						'<span class="save" id="save">' +
						'<i class="iconfont">&#xe605;</i>' +
						'<i>收藏</i>' +
						'</span>' +
						'<span class="cart" id="cart">' +
						'<i class="iconfont">&#xe607;</i>' +
						'<i>购物车</i>' +

						'</span>' +
						'<span class="addcart" id="addcart">加入购物车</span>' 
						
						);
					
						
					for(var i in sku) {
						if(size) {
							if(color) {
								$("#color").append('<span spanID='+sku[i].ss_id+'><img src="' + sku[i].ss_av_zpic + '"><i>' + sku[i].ss_av_fvalue + sku[i].ss_av_zvalue+'</i></span>');
							} else {
								$("#color").append('<span spanID='+sku[i].ss_id+'><i>' + sku[i].ss_av_fvalue+sku[i].ss_av_zvalue + '</i></span>');
							}

						} else {
							if(color) {
								$("#color").append('<span spanID='+sku[i].ss_id+'><img src="' + sku[i].ss_av_zpic + '"><i>'+sku[i].ss_av_zvalue+'</i></span>');
							} else {
								$("#color").hide();
							}

						};

					};
			
					var proSize;
					if($("#color span").length==0){
						proSize="均码";
						
					}else{
						
						$("#color span").eq(0).addClass("change").siblings().removeClass("change");
						proSize=$(".change i").html();
					}
					$("#color span").tap(function() {
						$(this).addClass("change").siblings().removeClass("change");
						proSize=$(".change i").html();
					
					});
					
					var jifen = info.jifen;
					var leixing = sku.ss_av_zvalue;
					$(".xq #leixing").html(leixing);
					$(".xq #jifen").html(jifen);
					$("#bigimg").doubleTap(function() {
						$("#mask").show();
						$("#mask").find("img").attr("src", $(this).find("img").attr("src"));
					});
					var name = $(".introName").attr("title");
					var isLogin = localStorage.getItem("isLogin");
					$("#addcart").on("tap", function() {
						var Toast = require("./toast");
						
							if(isLogin == "ok") {
								var proId=$(".change").attr("spanID");
								//console.log("proId",proId);
								var userID = localStorage.getItem("userID");
								//var proSize=$(".change i").html();
								var pro = {
									"proImg": img,
									"proSize":proSize,
									"number": 1,
									"proId": proId,
									"name": title,
									"cprice": cprice,
									"price": price
								};
								var proArr = [];
								var oldArr = JSON.parse(localStorage.getItem(userID));
								if(oldArr != null && oldArr != []) {
									proArr = oldArr;
									var flag = false;
									for(var i in proArr) {
										if(pro.proId == proArr[i].proId) {
											proArr[i].number += 1;
											flag = true;
										}
									}
									if(!flag) {
										proArr.push(pro);
									}
								} else {
									proArr.push(pro);
								}
								var proStr = JSON.stringify(proArr);
								localStorage.setItem(userID, proStr);
								Toast.MakeToast("加入购物车成功", 1000);
							} else {
								var login = require("./login");
								var login = require("./login");
								login.loadLoginHeader("home");
								login.loadLoginContent("cart");
								var footer = require("./footer");
								footer.loadFooter("cart");
							}
					
					});
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					$("#cart").on("tap", function() {
						var cart = require("./cart");
						cart.loadCartHeader();
						cart.loadCartContent();
						var footer = require("./footer");
						footer.loadFooter("cart");
					});
					mySwiper = new Swiper("#detailSwiper", {
						resistanceRatio: 0,
						onSlideChangeEnd: function(swiper) { //swiper可以随意更改，但是不建议更改
							var _index = swiper.activeIndex;
							$("#footer").find("li").eq(_index).addClass("active").siblings().removeClass("active");
						}
					})
					if(type == "theme") {
						$("#addcart").hide();
					} else {
						$("#addcart").show();
					}
				}
			});
		});

		$("#footer").load("html/detail.html #detailFooter", function() {
			$("#footer").find("li").on("tap", function() {
				var $index = $(this).index();
				mySwiper.slideTo($index, 300, false); //切换到第一个slide，速度为1秒
				$(this).addClass("active").siblings().removeClass("active");
			})

		})
	}
}