var home = require("../script/home.js");
var footer = require("../script/footer.js");
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


