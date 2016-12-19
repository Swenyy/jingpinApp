/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var home = __webpack_require__(1);
	var footer = __webpack_require__(6);
	/*var special = require("../script/special.js");
	var cart = require("../script/cart.js");
	var theme = require("../script/theme.js");
	var user = require("../script/user.js");*/
	/*
	home.loadHomeHeader();
	home.loadHomeContent();*/

	/*var special = require("../script/special.js");
	special.loadSpecialHeader();
	special.loadSpecialContent();*/

	/*var cart = require("../script/cart.js");
	cart.loadCartHeader();
	cart.loadCartContent();*/

	/*var theme = require("../script/theme.js");
	theme.loadThemeHeader();
	theme.loadThemeContent();*/

	/*var user = require("../script/user.js");
	user.loadUserHeader();
	user.loadUserContent();*/

	home.loadHomeHeader();
	home.loadHomeContent();
	footer.loadFooter();

	$("#mask").on("tap",function(){
		$(this).hide();
	});




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = {
		loadHomeHeader: function() {
			$("#header").load("html/home.html #homeHeader", function() {
				//console.log("首页的头部加载成功");
				$(".search").on("tap",function(){
					var search = __webpack_require__(2);
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
					var kind = __webpack_require__(3);
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
							var detail = __webpack_require__(4);
							detail.loadDetailHeader("home");
							detail.loadDetailContent("home",goodsID,startime,endtime,goodsTitle,goodsImgsrc);
						});
					}
				});
			});
		}
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadSearchHeader:function(){
			$("#footer").hide();
			$("#header").load("html/search.html #searchHeader",function(){
				//console.log("设置头部加载成功");
				$("#back").tap(function(){
					var home = __webpack_require__(1);
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadKindHeader:function(title){
			$("#header").load("html/kind.html #kindHeader",function(){
				//console.log("分类页的头部加载成功");
				$(".listName").html(title);
				$("#back").tap(function() {
					var home = __webpack_require__(1);
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
						var detail = __webpack_require__(4);
						detail.loadDetailHeader("kind",title,type);
						detail.loadDetailContent("kind",goodsID,startime,endtime,goodsTitle,goodsImgsrc);
					});
				})
			});
		}
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var mySwiper;
	module.exports = {
		loadDetailHeader: function(type, title, conStr) {
			$("#header").load("html/detail.html #detailHeader", function() {
				//console.log("详情页头ok");
				$("#back").on("tap", function() {
					if(type == "special") {
						var special = __webpack_require__(5);
						special.loadSpecialHeader();
						special.loadSpecialContent();
						var footer = __webpack_require__(6);
						footer.loadFooter("special");
						$("#footer").find("li").eq(1).css("color", "#fff").siblings().css("color", "#333");
					} else if(type == "home") { //返回到home页面
						var home = __webpack_require__(1);
						home.loadHomeHeader();
						home.loadHomeContent();
						var footer = __webpack_require__(6);
						footer.loadFooter('home');
						$("#footer").find("li").eq(0).css("color", "#fff").siblings().css("color", "#333");
					} else if(type == "kind") { //返回到分类页面
						var kind = __webpack_require__(3);
						kind.loadKindHeader(title);
						kind.loadKindContent(conStr);
						var footer = __webpack_require__(6);
						footer.loadFooter("home");
						$("#footer").find("li").eq(0).css("color", "#fff").siblings().css("color", "#333");
					} else if(type == "theme") {
						var theme = __webpack_require__(16);
						theme.loadThemeHeader();
						theme.loadThemeContent();
						var footer = __webpack_require__(6);
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
							var Toast = __webpack_require__(14);
							
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
									var login = __webpack_require__(12);
									var login = __webpack_require__(12);
									login.loadLoginHeader("home");
									login.loadLoginContent("cart");
									var footer = __webpack_require__(6);
									footer.loadFooter("cart");
								}
						
						});
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						$("#cart").on("tap", function() {
							var cart = __webpack_require__(7);
							cart.loadCartHeader();
							cart.loadCartContent();
							var footer = __webpack_require__(6);
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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
							var Detail = __webpack_require__(4);
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
						var Detail = __webpack_require__(4);
						
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
					var home = __webpack_require__(1);
					var special = __webpack_require__(5);
					var cart = __webpack_require__(7);
					var theme = __webpack_require__(16);
					var user = __webpack_require__(11);
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
					var addCart=__webpack_require__(8);
					var balance=__webpack_require__(9);
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
					var Toast = __webpack_require__(14);
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
						var home = __webpack_require__(1);
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
				var Toast = __webpack_require__(14);
				var addCart=__webpack_require__(8);
				$(".cartsubtract").tap(function(){
					var addCart=__webpack_require__(8);
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
					var addCart=__webpack_require__(8);
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
					var addCart=__webpack_require__(8);
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










/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports={
		addCarts:function(userID,goodsID,number,type){
		    if(userID){
		    	var user=JSON.parse(localStorage.getItem(userID));
		    	//console.log(user);
		    	for(var i in user){
		    		if(goodsID==user[i].proId){
		    			//alert(user[i].name);
		    			user[i].number=number;
		    			//console.log(type);
		    			if(type=="del"){
		    				user.splice(i,1);	
		    			}
		    		}
		    	}
		    	//console.log(user);
		    	localStorage.setItem(userID,JSON.stringify(user));
		    }
		}
	}




/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={
		loadBalanceHeader:function(type){
			$("#header").load("html/balance.html #balanceHeader",function(){
				console.log("结算的头部加载成功");
				var userID=localStorage.getItem("userID");
				var data=JSON.parse(localStorage.getItem(userID));
				
				$(".balanceBack").tap(function(){
					
						var Cart=__webpack_require__(7);
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
						var Pay=__webpack_require__(10);
						
						var Toast = __webpack_require__(14);
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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

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
						var Balance=__webpack_require__(9);
						Balance.loadBalanceHeader();
						Balance.loadBalanceContent();
					}else if(type=="user"){
						var user=__webpack_require__(11);
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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadUserHeader:function(){
			$("#header").load("html/user.html #userHeader",function(){
				//console.log("我的地盘头部加载成功");
			});
		},
		loadUserContent:function(){
			$("#content").load("html/user.html #userContent",function(){
				//console.log("我的地盘的内容区加载成功");
				if(localStorage.getItem("isLogin") != "ok"){
					//如果不是登录状态，登录注册按钮显示-------12.16
					$(".loginBtn").show();
					$(".registerBtn").show();
				}else{
					//如果是登录状态，登录注册按钮隐藏-------12.16
					$(".loginBtn").hide();
					$(".registerBtn").hide();
				}
				$(".loginBtn").tap(function(){
					var Login = __webpack_require__(12);
					Login.loadLoginHeader("user");
					Login.loadLoginContent("user");
				});
				$(".registerBtn").tap(function(){
					var Register = __webpack_require__(13);
					Register.loadRegisterHeader("user");
					Register.loadRegisterContent();
				});
				$(".userSet").tap(function(){
					var UserSet = __webpack_require__(15);
					UserSet.loadUserSetHeader();
					UserSet.loadUserSetContent();
				});
				$(".checkOrder").tap(function(){
					if(localStorage.getItem("isLogin") != "ok"){
						var Toast = __webpack_require__(14);
						Toast.MakeToast("未登录，2s后跳转登陆！",2000);
						setTimeout(function(){
							var Login = __webpack_require__(12);
							Login.loadLoginHeader("user");
							Login.loadLoginContent("user");
						},2000);
					}else{
						var pay = __webpack_require__(10);
						pay.loadPayHeader("user");
						pay.loadPayContent();
						var footer = __webpack_require__(6);
						footer.loadFooter("user");
					}
				});
				
				$(".goCart").tap(function(){
					//添加判断，如果没有登录，跳转到登录页面，
					if(localStorage.getItem("isLogin") != "ok"){
						var Toast = __webpack_require__(14);
						Toast.MakeToast("未登录，2s后跳转登陆！",2000);
						setTimeout(function(){
							var Login = __webpack_require__(12);
							Login.loadLoginHeader("user");
							Login.loadLoginContent("user");
						},2000);
					}else{
						var Cart = __webpack_require__(7);
						Cart.loadCartHeader("user");
						Cart.loadCartContent();
						$("#footer").find("li").eq(2).addClass("active").siblings().removeClass("active");
					}
					/*var Cart = require("./cart");
					Cart.loadCartHeader("user");
					Cart.loadCartContent();*/
					//页面跳转到购物车，底部的li颜色发生改变
					//$("#footer").find("li").eq(2).addClass("active").siblings().removeClass("active");
				})
				if(localStorage.getItem("isLogin") == "ok"){
					$(".name").html(localStorage.getItem("userID"));
				}else{
					$(".name").html('未知');
				}
			});
		}
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadLoginHeader:function(type){
			$("#footer").hide();
			$("#header").load("html/login.html #loginHeader",function(){
				//console.log("ok");
				$("#back").tap(function(){
					if(type =="home"){
						var Home = __webpack_require__(1);
						Home.loadHomeHeader();
						Home.loadHomeContent();
						$("#footer").show();
					}else if(type == "register"){
						var Register = __webpack_require__(13);
						Register.loadRegisterHeader();
						Register.loadRegisterContent();
					}else{
						var User = __webpack_require__(11);
						User.loadUserHeader();
						User.loadUserContent();
						$("#footer").show();
					}
				});
				$("#register").tap(function(){
					var Register = __webpack_require__(13);
					Register.loadRegisterHeader("login");
					Register.loadRegisterContent();
				});
			})
		},
		loadLoginContent:function(type){
			$("#footer").hide();
			var that = this;
			$("#content").load("html/login.html #loginContent",function(){
		
				
				$(".loginBtn").tap(function(){
					var Toast = __webpack_require__(14);
					var userID = $("#userID").val();
					var pwd = $("#pwd").val();
					var loginFlag = false;
					if(userID == '') {
						Toast.MakeToast("用户名不能为空！", 3000);
					}else {
						if(/^[1-3]\d{10}$/.test(userID)){
							if(localStorage.getItem("userInfo")){
								var userInfoStr = localStorage.getItem("userInfo");
								var userInfoArray = JSON.parse(userInfoStr);
								var len = userInfoArray.length;
								for(var i = 0;i < len;i++){
									if(userID == userInfoArray[i].userId){
										loginFlag = true;
										var tempPwd = userInfoArray[i].password;
									}
								}
								if(loginFlag){
									if(pwd == tempPwd){
										Toast.MakeToast("登录成功！",3000);
										localStorage.setItem("isLogin","ok");
										localStorage.setItem("userID",userID);
										$("#header .loginBtn").hide();
										$("#header .registerBtn").hide();
										if(type == "user"){
											var User = __webpack_require__(11);
											User.loadUserHeader();
											User.loadUserContent();
											$("#footer").show().find("li").eq(4).addClass("active").siblings().removeClass("active");
											
										}else if(type == "home"){
											var Home = __webpack_require__(1);
											Home.loadHomeHeader();
											Home.loadHomeContent();
											$("#footer").show();
										}else if(type == "cart"){
											var Cart = __webpack_require__(7);
											Cart.loadCartHeader();
											Cart.loadCartContent();
											$("#footer").show();
										}
									}else{
										Toast.MakeToast("密码输入错误！",3000);
									}
								}else{
									Toast.MakeToast("您还没有注册，请先注册！",3000);
								}
							}else{
								Toast.MakeToast("您还没有注册，请先注册！",3000);
							}
						}else{
							Toast.MakeToast("用户名格式有误！", 3000);
						}
					}				
				})
			});
		}
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadRegisterHeader: function(type) {
			$("#footer").hide();
			$("#header").load("html/register.html #registerHeader", function() {
				//console.log("ok");
				$("#back").tap(function() {
					if(type == "login") {
						var Login = __webpack_require__(12);
						Login.loadLoginHeader();
						Login.loadLoginContent();
						$("#footer").show();
					} else {
						var User = __webpack_require__(11);
						User.loadUserHeader();
						User.loadUserContent();
						$("#footer").show();
					}
				});
				$("#login").tap(function() {
					var Login = __webpack_require__(12);
					Login.loadLoginHeader("register");
					Login.loadLoginContent();
				})
			});
		},
		loadRegisterContent: function() {
			var that = this;
			$("#content").load("html/register.html #registerContent", function() {
				//console.log("ok");
				$(".registerBtn").tap(function() {
					var Toast = __webpack_require__(14);
					//Toast.MakeToast("ok",3000);
					var userID = $("#userID").val();
					var pwd = $("#pwd").val();
					var rePwd = $("#rePwd").val();
					var userFlag = false;
					//console.log(userID + "----"+pwd+"-------"+rePwd);
					
					if(userID == '') {
						Toast.MakeToast("用户名不能为空！", 3000);
					} else {
						if(/^[1-3]\d{10}$/.test(userID)){
							
							if(localStorage.getItem("userInfo")){
								var userInfoStr = localStorage.getItem("userInfo");
								var userInfoArray = JSON.parse(userInfoStr);
								var len = userInfoArray.length;
								for(var i = 0;i < len;i++){
	//								alert(userInfoArray[i].userId);
									if(userID == userInfoArray[i].userId){
										Toast.MakeToast("该用户已经注册，请登录！", 3000);
										userFlag = true;
									}								
								}
								if(!userFlag){
									
									
									if(pwd == '') {
										Toast.MakeToast("密码不能为空！", 3000);
									}else if(/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
										if(rePwd != pwd) {
											Toast.MakeToast("两次密码输入不一致！", 3000);
										}else{
											Toast.MakeToast("注册成功！2s后跳转登录",2000);
											var userObj = {
												"userId":userID,
												"password":pwd
											}
											userInfoArray.push(userObj);
											var tempStr = JSON.stringify(userInfoArray);
											//console.log(tempStr);
											//console.log(typeof tempStr);
											localStorage.setItem("userInfo",tempStr);
											setTimeout(function(){
												var login = __webpack_require__(12);
												login.loadLoginHeader();
												login.loadLoginContent("user");
											},2000);
											
										}
									}else{
										Toast.MakeToast("密码格式有误！", 3000);
									}
								
									
								}
								
								
							}else{
								if(pwd == '') {
									Toast.MakeToast("密码不能为空！", 3000);
								}else if(/^[a-zA-Z0-9]{6,10}$/.test(pwd)){
									if(rePwd != pwd) {
										Toast.MakeToast("两次密码输入不一致！", 3000);
									}else{
										Toast.MakeToast("注册成功！2s后跳转登录",2000);
										var tempArr = [];
										var userObj = {
											"userId":userID,
											"password":pwd
										}
										tempArr.push(userObj);
										var tempStr = JSON.stringify(tempArr);
										console.log(tempStr);
										console.log(typeof tempStr);
										localStorage.setItem("userInfo",tempStr);
										setTimeout(function(){
												var login = __webpack_require__(12);
												login.loadLoginHeader();
												login.loadLoginContent("user");
										},2000);
										
									}
								}else{
									Toast.MakeToast("密码格式有误！", 3000);
								}
							}
							
						}else{
							Toast.MakeToast("用户名不符合手机号格式！", 3000);
						}
					}
				})
			});
		}
	}

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = {
		MakeToast:function(str,time){
			$("#toast").show();
			$("#toast").html(str);
			setTimeout(function(){
				$("#toast").hide();
			},time);
		}
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		loadUserSetHeader:function(){
			$("#header").load("html/userSet.html #userSetHeader",function(){
				//console.log("设置头部加载成功");
				$("#back").tap(function(){
					
					var User = __webpack_require__(11);
					User.loadUserHeader();
					User.loadUserContent();
					
				});
			});
		},
		loadUserSetContent:function(){
			$("#content").load("html/userSet.html #userSetContent",function(){
				//console.log("设置的内容区加载成功");
				$("#out").tap(function(){
					localStorage.setItem("isLogin","error");
					localStorage.removeItem("userID");
					var User = __webpack_require__(11);
					User.loadUserHeader();
					User.loadUserContent();
				})
			});
		}
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

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
							var detail = __webpack_require__(4);
							detail.loadDetailHeader("theme");
							detail.loadDetailContent("theme",goodsID,startime,endtime,goodsTitle,goodsImgsrc);
						});
					}
				});
			});
		}
	}

/***/ }
/******/ ]);