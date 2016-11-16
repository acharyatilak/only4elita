Template.products.onCreated(function(){
 
  this.filter = new ReactiveVar("all");
});


Template.products.helpers({

	allProducts:function(){
		let f=Template.instance().filter.get();
		if(f==="one")
			return products.find({"category":"one"});
		else if(f==="two")
			return products.find({"category":"two"});
		else if(f==="three")
			return products.find({"category":"three"});
		else
			return products.find();
	}
});

Template.products.events({

	'click .all':function(event,template){template.filter.set("all");},
	'click .one':function(event,template){template.filter.set("one");},
	'click .two':function(event,template){template.filter.set("two");},
	'click .three':function(event,template){template.filter.set("three");}

});