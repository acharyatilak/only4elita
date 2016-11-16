Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        var phone= $('[name=phone]').val();
        var address= $('[name=address]').val();
        var firstName= $('[name=firstName]').val();
        var lastName= $('[name=lastName]').val();
        Session.set('rerror',"");
        Accounts.createUser({
    email: email,
    password: password,
    phone: phone,
    role: "user",
    address: address,
    firstName : firstName,
    lastName : lastName
}, function(error){
    if(error){
        console.log(error.reason);
        Session.set('rerror',error.reason);
    } else {
    	Session.set('rerror',"");
            Router.go("/");
    }

	});
 }});

Template.register.helpers({
registererror:function(){return Session.get('rerror');}
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Session.set('lerror',"");
        Meteor.loginWithPassword(email, password, function(error){
    if(error){
        console.log(error.reason);
        Session.set('lerror',error.reason);
    } else {
    	Session.set('lerror',"");
        Router.go("/");
    }
});
    }
});

Template.login.helpers({
	loginerror:function(){return Session.get('lerror');}
});