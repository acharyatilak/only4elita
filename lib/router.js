Router.configure({
  layoutTemplate: 'layout1'
});


Router.route('/', function () {
  this.render('home');
});

Router.route('/products', function () {
  this.render('products');
});

Router.route('/addIteams', function () {
  this.render('addIteams');
});

Router.route('/checkout',{
  name:'checkout',
  template: 'checkout'
  //,
 // onBeforeAction: function(){
 //       var currentUser = Meteor.userId();
 //       if(currentUser){
 //           this.next();
 //       } else {
 //       	Session.set('rerror',"Please register or login before checking out");
 //       	Session.set('lerror',"Please register or login before checking out");
 //       	Session.set('redirect','/checkout');
 //           this.render("register");
 //       }
 //   }
});

Router.route('/upload', function () {
  this.render('upload');
});


Router.route('/register',  {
 template:'register',
 name: 'register',
 onStop: ()=>{        
 	Session.set('rerror',"");
 }
});


Router.route('/login',  {
 template:'login',
 name: 'login',
 onStop : function(){        
 	Session.set('lerror',"");
 	}
});


Router.route('/mypage', {
    name: 'mypage',
    template: 'mypage',
    data: function(){        
        var currentUser = Meteor.userId();
        return Meteor.users.find({ _id:currentUser });
    }
});
