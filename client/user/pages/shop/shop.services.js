app.factory('Meal', function() {
  var Meal = function(meal) {
    var self = this;
    self.title        = meal.title || null;
    self.type         = meal.type || null;
    self.description  = meal.description || null;
    self.day          = meal.day || 1 || null;
    self.cooktime     = meal.cooktime || null;
    self.recipes      = meal.recipes || [];
  };

  return Meal;
});

app.factory('Diet', function() {

  var Diet = function(item) {
    var self = this;
    self.title = item.title || null;
    self.price = item.price;
    self.duration = 0;
  };

  return Diet;

});

app.factory('Recipe', function() {

  var Recipe = function (recipe) {
    this.title       = recipe.title || null;
    this.type        = recipe.type || null;
    this.description = recipe.description || null;

    this.yield       = recipe.yield || null;
    this.calories    = recipe.calories || null;
    this.fats        = recipe.fats || null;
    this.carbs       = recipe.carbs || null;
    this.proteins    = recipe.proteins || null;

    this.cost        = recipe.cost || null;
    this.preptime    = recipe.preptime || null;
    this.cooktime    = recipe.cooktime || null;

    this.equipment   = recipe.equipment || [];
    this.steps       = recipe.steps || [];

    this.video       = recipe.video || null;
    this.coverphoto  = recipe.coverphoto || null;
    this.photos      = recipe.photos || [];

  };

  return Recipe;

});

app.factory('CookingStep', function() {

  var CookingStep = function() {
    this.order       = null;
    this.description = null;
    this.photo       = null;
  };
  return CookingStep;

});

app.factory('Ingredient', function() {

  var Ingredient = function() {
    this.title       = null;
    this.description = null;
    this.photo       = null;
    this.measure     = null;
    this.unit        = null;
  };

  return Ingredient;

});

