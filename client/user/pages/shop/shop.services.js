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
    self.duration = 1;
  };

  return Diet;

});

app.factory('Recipe', function() {

  var Recipe = function (recipe) {
    var self         = this;
    self.title       = recipe.title || null;
    self.type        = recipe.type || null;
    self.description = recipe.description || null;

    self.yield       = recipe.yield || null;
    self.calories    = recipe.calories || null;
    self.fats        = recipe.fats || null;
    self.carbs       = recipe.carbs || null;
    self.proteins    = recipe.proteins || null;

    self.cost        = recipe.cost || null;
    self.preptime    = recipe.preptime || null;
    self.cooktime    = recipe.cooktime || null;

    self.equipment   = recipe.equipment || [];
    self.steps       = recipe.steps || [];

    self.video       = recipe.video || null;
    self.coverphoto  = recipe.coverphoto || null;
    self.photos      = recipe.photos || [];

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

