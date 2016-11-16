Template.product.onCreated(function(){
 
  this.type = new ReactiveVar("once");
});



Template.product.helpers({

	isAdmin:function(){
		return (Meteor.user().profile.role==="admin");
	},
	isInCart:function(){
		let cart=Session.get("Cart")||[];
		let result = false;
		
		for(let i=0;i<cart.length;i++)
		{
			
			if (cart[i].productId==this._id)
				result=true;
		}
		
		return result;
	},
	cost:function(){
		let cost=0;
		let cart=Session.get("Cart")||[];
		for(let i=0;i<cart.length;i++)
		{
			if (cart[i].productId===this._id)
			{
				if(cart[i].type==="once") return this.costOnce*cart[i].count;
				else return this.costWeekly*cart[i].count;
			}

		}
		if(Template.instance().type.get()==="once")
		return this.costOnce;
		else return this.costWeekly;

	},
	count:function(){
		let cart=Session.get("Cart")||[];
		
		if (cart.length==0) return 0;
		for(let i=0;i<cart.length;i++)
		{
			if (cart[i].productId===this._id)
				return cart[i].count;
		}

		return 0;
	},
	stateOnce:function(){
		let cart=Session.get("Cart")||[];
		
		for(let i=0;i<cart.length;i++)
		{
			
			if (cart[i].productId==this._id)
				if(cart[i].type==="once") return "checked";
		}
		
		if(Template.instance().type.get()==="once") return "checked";
		else return null;
	},
	stateWeekly:function(){
		let cart=Session.get("Cart")||[];
		
		for(let i=0;i<cart.length;i++)
		{
			
			if (cart[i].productId==this._id)
				if(cart[i].type==="weekly") return "checked";
		}
		
		if(Template.instance().type.get()==="weekly") return "checked";
		else return null;
		
	}
});


Template.product.events({

	'click .delete':function(){
		products.remove(this._id);
	},
	'click .addToCart':function(){
		let cart=Session.get("Cart")||[];
		cart.push({
			productId:this._id,
			count:1,
			type: "once"
		});
		
		Session.set("Cart",cart);

	},

	'click .remove':function(){
		let cart=Session.get("Cart")||[];
		pos = cart.map(function(e) { return e.productId; }).indexOf(this._id);
		if(pos> -1) cart.splice(pos,1);
		Session.set("Cart",cart);
	},

	'click .add':function(){
		let cart=Session.get("Cart")||[];
		
		for(let i=0;i<cart.length;i++)
		{
			if (cart[i].productId===this._id)
				cart[i].count++;
		}
		Session.set("Cart",cart);
	},
	'click .subtract':function(){
		let cart=Session.get("Cart")||[];
		
		for(let i=0;i<cart.length;i++)
		{
			if (cart[i].productId===this._id)
			{				
				if(cart[i].count>1) cart[i].count--;
			}

		}
		Session.set("Cart",cart);
	},

	'click #once':function(event,template){
		event.preventDefault();
		let cart=Session.get("Cart")||[];
		let result = null;
		
		for(let i=0;i<cart.length;i++)
		{
			
			if (cart[i].productId==this._id)
				cart[i].type="once";
		}
		Session.set("Cart",cart);
		template.type.set("once");
	},
	'click #weekly':function(event,template){
		event.preventDefault();
		let cart=Session.get("Cart")||[];
		let result = null;
		
		for(let i=0;i<cart.length;i++)
		{
			
			if (cart[i].productId==this._id)
				cart[i].type = "weekly";
		}
		Session.set("Cart",cart);
		template.type.set("weekly");
		
	}
});