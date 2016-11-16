Template.layout1.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

Template.layout1.helpers({
	cartCount:function(){
		let cart=Session.get("Cart")||[];
		return cart.length;
	},
	isAdmin:function(){
		return (Meteor.user().profile.role==="admin");
	}

});