Template.checkout.onCreated(function(){
 
  this.msg = new ReactiveVar("empty");
});



Template.checkout.helpers({

	isLogedIn:function(){
		let currentUser = Meteor.userId();
       if(currentUser) return true;
       else return false;
	},

	isAdmin:function(){
		return (Meteor.user().profile.role==="admin");
	},

	isCartEmpty:function(){
		let cart=Session.get("Cart")||[];
		if(cart.length==0) return true;
		else return false;
	},

	showSuccessmsg:function(){
		if(Template.instance().msg.get()==="success") return true;
		else return false;

	},

	cartIteams:function(){
		return (Session.get("Cart")||[]);
	},

	//getIteam

	totalCost:function(){
		let cost=0;
		let cart=Session.get("Cart")||[];
		for(let i=0;i<cart.length;i++)
		{
			if(cart[i].type==="once") cost+= products.findOne({"_id":cart[i].productId}).costOnce*cart[i].count;
			else cost+= products.findOne({"_id":cart[i].productId}).costWeekly*cart[i].count;
		}

		return cost;
	}

});


Template.checkout.events({
	'click .checkout':function(event,template){
		let cost=0

		let cart=Session.get("Cart")||[];
		for(let i=0;i<cart.length;i++)
		{
			if(cart[i].type==="once") cost+= products.findOne({"_id":cart[i].productId}).costOnce*cart[i].count;
			else cost+= products.findOne({"_id":cart[i].productId}).costWeekly*cart[i].count;
		}

			let order={
			productList : Session.get("Cart"),
			totalCost: cost,
			userId : Meteor.userId()

		};


		Orders.insert(order);
		Session.set("Cart",[]);
		template.msg.set("success");
	}
	
});


Template.Iteam.helpers({
	productName:function(){
		return products.findOne({"_id":this.productId}).name;
	},
	cost:function(){
		if(this.type==="once") return products.findOne({"_id":this.productId}).costOnce*this.count;
				else return products.findOne({"_id":this.productId}).costWeekly*this.count;
	}

});

Template.Iteam.events({
	'click .add':function(){
		let cart=Session.get("Cart")||[];
		
		for(let i=0;i<cart.length;i++)
		{
			if (cart[i].productId===this.productId)
				cart[i].count++;
		}
		Session.set("Cart",cart);
	},
	'click .subtract':function(){
		let cart=Session.get("Cart")||[];
		
		for(let i=0;i<cart.length;i++)
		{
			if (cart[i].productId===this.productId)
			{				
				if(cart[i].count>1) cart[i].count--;
			}

		}
		Session.set("Cart",cart);
	},
	'click .remove':function(){
		let cart=Session.get("Cart")||[];
		pos = cart.map(function(e) { return e.productId; }).indexOf(this.productId);
		if(pos> -1) cart.splice(pos,1);
		Session.set("Cart",cart);
	}

});