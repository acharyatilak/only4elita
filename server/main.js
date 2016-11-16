import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {

	if( Meteor.users.find().count() === 0){
  Accounts.createUser({
  	email: "acharya.tilak@gmail.com",
    password: "112358",

     profile  :{
     firstName :"Tilak",
  	lastName :"Acharya",
    phone: " ",
    role: "admin",
    address: " "
}
  });
}

Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   user.profile.firstName = options.firstName;
   user.profile.lastName = options.lastName;
   user.profile.phone=options.phone;
   user.profile.address=options.address;
   user.profile.role=options.role;
   console.log(user);
   return user;
});

  
});

