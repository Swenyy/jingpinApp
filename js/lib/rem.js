
/*window.onload=window.onresize=function(){
	bodyScale();
}

function bodyScale(){
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}*/



(function (doc, win) { 
	var docEl = doc.documentElement, 
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', recalc = function () { var clientWidth = docEl.clientWidth;
	if (!clientWidth) return; 
	docEl.style.fontSize = 100 * (clientWidth / 640) + 'px'; };
	if (!doc.addEventListener) return; 
	win.addEventListener(resizeEvt, recalc, false); 
	doc.addEventListener('DOMContentLoaded', recalc, false); 
})(document, window);
