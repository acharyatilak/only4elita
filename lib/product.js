products=new Mongo.Collection("products"); 

products.attachSchema(new SimpleSchema({

	
   name: {
      type: String,
      label: "Product name"
   
},

   description: {
      type: String,
      max: 1000,
      autoform: {
         rows: 5
      }
   
},

   category: {
      type: String,
      allowedValues: [
         "one",
         "two",
         "three"
      ],
      optional: true,
      label: "Choose a category"
   
},

   baseUnit: {
      type: String
   },

   costOnce: {
      type: Number,
      min: 1,
      decimal: true,
      autoform: {
         step: "0.01"
      }
   },

   costWeekly: {
      type: Number,
      min: 1,
      decimal: true,
      autoform: {
         step: "0.01"
      }
   },


   imageUrl: {
      type: String,
      label: "Image URL",
      autoform: {
         type: "url"
      }
   },

   



	}));