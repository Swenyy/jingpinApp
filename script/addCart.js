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


