app.factory('Item', function() {

  var ItemConstructor = function ItemConstructor () {
    this.name         = null;
    this.creator      = { username: null, _id: null };

    this.price        = null;
    this.upvotes      = null;

    this.type         = null;
  };

  return ItemConstructor;

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



app.factory('dietplans', function ($http, auth) {
  var o = {};

  o.get = function(diet_id) {
    return $http.get('/api/item/dietplan/' + diet_id, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };
  o.update = function(diet) {
    // diet._id
    return $http.put('/api/item/dietplan/' + diet.dietplan, diet, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    });
  };

  o.createRecipe = function(recipe) {
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

