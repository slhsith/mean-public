app.factory('dietplans', function ($http, auth) {
  var o = {};

  o.get = function(diet_id) {
    return $http.get('/api/item/dietplan/' + diet_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  o.update = function(diet) {
    // diet._id
    return $http.put('/api/item/dietplan/' + diet.dietplan, diet, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };
  
  // o.updateDietplan = function(item, object) {
  //   var dietplan_id = item.dietplan;
  //   var current_days_set = item.days_set;

  //   var dietplanAPI = '/api/item/dietplan/' + dietplan_id + '/';

  //   // saving the whole day, 
  //   // basically a meal was added or changed
  //   if (object.order) {
  //     // this is a new day beyond those set before
  //     if (current_days_set < object.order) {
  //       object.days_set = current_days_set;
  //       return $http.post(dietplanAPI + 'days', object, {
  //         headers: {Authorization: 'Bearer '+auth.getToken()}
  //       });
  //     }
  //     // this is an update of a previously set day
  //     return $http.put(dietplanAPI + 'days', object, {
  //       headers: {Authorization: 'Bearer '+auth.getToken()}
  //     });
  //   }
  // };

  o.updateDay = function(diet, day) {
    var api_url = '/api/item/dietplan/' + diet.dietplan + '/day/' + day.order;
    return $http.put(api_url, day, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).then(function(res) {
      console.log('update day res', res);
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  o.searchRecipes = function(query) {
    return $http.get('/api/item/dietplan/recipes/' + query)
    .then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  o.searchIngredients = function(query) {
    return $http.get('/api/item/dietplan/ingredients/' + query)
    .then(function(res) {
      return res.data;
    }).catch(function(err) {
      return err;
    });
  };

  o.createRecipe = function(recipe) {
    console.log('creating recipe', recipe);
    return $http.post('/api/item/dietplan/recipes', recipe, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  o.createIngredient = function(ingredient) {
    return $http.post('/api/item/dietplan/ingredients', ingredient, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  return o;
});



app.factory('Diet', function() {

  var DietConstructor = function DietConstructor () {
    this.category     = null;
    this.hashtag      = null;
    this.description  = null;

    this.duration     = 1;
    this.gender       = null;
    this.age          = null;
    this.meals        = [];
    this.days         = [];
  };

  return DietConstructor;
});

app.factory('Day', function() {

  var DayConstructor = function DayConstructor (order) {
    this._id       = null;
    this.order     = order || 1;
    this.title     = null; // for dietplans, like 'carb load'
    this.meals     = [];
    this.exercises = [];

    this.mealOrder = 1;
  };

  return DayConstructor;

});

app.factory('Meal', function() {

  var MealConstructor = function MealConstructor () {
    this.name         = null;
    this.type         = null;
    this.description  = null;

    this.cost         = null;
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
    this.equipment   = null;
    this.steps       = [];
    this.ingredients = [];

    this.calories    = null;
    this.fats        = null;
    this.carbs       = null;
    this.proteins    = null;
  };

  return RecipeConstructor;
});


app.factory('CookingStep', function () {

  var CookingStepConstructor = function CookingStepConstructor (step) {
    this.order       = step || null;
    this.description = null;
    this.photo       = null;
  };

  return CookingStepConstructor;

});


app.factory('Ingredient', function() {

  var IngredientConstructor = function IngredientConstructor () {
    this.name        = null;
    this.category    = null;
    this.note        = null;
    this.photo       = null;

    this.amount      = { value: null, unit: null };
    this.preparation = null;
  };

  return IngredientConstructor;
});
