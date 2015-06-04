app.factory('Item', function() {

  var ItemConstructor = function ItemConstructor () {
    this.name         = null;
    this.type         = null;
    this.author       = null;
    this.price        = null;
    this.upvotes      = null;
  };

  return ItemConstructor;

});


app.factory('Diet', function() {

  var DietConstructor = function DietConstructor () {
    this.type         = null;
    this.hashtag      = null;
    this.description  = null;

    this.duration     = 1;
    this.gender       = null;
    this.age          = null;
    this.meals        = [];
  };

  return DietConstructor;
});


app.factory('Meal', function() {

  var MealConstructor = function MealConstructor () {
    this.name         = null;
    this.type         = null;
    this.description  = null;

    this.day          = null;
    this.cooktime     = null;
    this.preptime     = null;
    this.recipes      = [];
  };

  return MealConstructor;

});


app.factory('Recipe', function() {

  var RecipeConstructor = function RecipeConstructor () {
    this.name        = null;
    this.type        = null;
    this.description = null;

    this.video       = null;
    this.coverphoto  = null;
    this.photos      = [];

    this.yield       = null;
    this.cost        = null;
    this.preptime    = null;
    this.cooktime    = null;
    this.equipment   = [];
    this.steps       = [];

    this.calories    = null;
    this.fats        = null;
    this.carbs       = null;
    this.proteins    = null;
  };

  return RecipeConstructor;
});


app.factory('CookingStep', function () {

  var CookingStepConstructor = function CookingStepConstructor () {
    this.order       = null;
    this.description = null;
    this.photo       = null;
  };

  return CookingStepConstructor;

});


app.factory('Ingredient', function() {

  var IngredientConstructor = function IngredientConstructor () {
    this.name        = null;
    this.category    = null;
    this.description = null;
    this.photo       = null;

    this.value       = null;
    this.unit        = null;
    this.preparation = null;
  };

  return IngredientConstructor;
});



app.factory('dietPlans', function ($http, auth, items) {
  var o = {};

  o.create = function(diet) {
    return items.create(diet).success(function(data) {
      console.log('itemcreatedata', data);
      return $http.post('/api/dietPlans/' + data._id, diet );
    });
  };

  return o;
});



//   o.newPlan = function (plan, id) {
//     return $http.post('/api/workoutPlans/' + id, plan, {
//       headers: {Authorization: 'Bearer '+auth.getToken()}
//     }).success(function(data) {
//       // base item data comes back from API, extend it with
//       // the item's original submitted descriptive parameters
//       var extendedItem = angular.extend(data, plan);
//       o.items.push(extendedItem);
//     });
//   };
//   o.newStep = function (step, id) {
//     return $http.post('/api/item/exercise/' + id, step, {
//       headers: {Authorization: 'Bearer '+auth.getToken()}
//     }).success(function(data) {
//       // base item data comes back from API, extend it with
//       // the item's original submitted descriptive parameters
//       var extendedItem = angular.extend(data, step);
//       o.items.push(extendedItem);
//     });
//   };

//   o.addTransaction = function(id, transaction) {
//     return $http.post('/api/items/' + id + '/transactions', transaction, {
//       headers: {Authorization: 'Bearer '+transactions.getToken()}
//     }).success(function(data){
//       transactions.push(data);
//     });
//   };
//   return o;
  

// });
