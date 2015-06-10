var mongoose = require('mongoose');
var extend = require('util')._extend;
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];

var
  DietPlan      = mongoose.model('DietPlan'),
  Day           = mongoose.model('Day'),
  Meal          = mongoose.model('Meal'),
  Recipe        = mongoose.model('Recipe'),
  CookingStep   = mongoose.model('CookingStep'),
  Ingredient    = mongoose.model('Ingredient');


// ARRAYS of DAYS are 0 based, day order is 1 based, as well as 'days_set' count

// we're going to get a day with ORDER <int> starting from 1
// if this order is higher than the current days_set+1
// we'll need to create Days for the filler days
// then either way we push this new day data on to the days array
exports.createDay = function(req, res, next) {
  var diet_id = req.params.id,
     days_set = req.body.days_set,
       newday = new Day({ order: req.body.order, title: req.body.title, meals: [] }),
   daysToPush = [],
       filler = newday.order - days_set - 1;

  req.body.meals.forEach(function(meal) {
    newday.meals.push(new Meal(meal));
  });

  if (filler > 0) {
    console.log('need to create '+ filler + 'filler days');
    while (filler > 0) {
      days_set++;
      daysToPush.push(new Day({order: days_set}));
      filler--;
    }
   }
  daysToPush.push(newday);

  DietPlan.findByIdAndUpdate(
    diet_id, 
    { $push: { days: { $each: daysToPush } },
      $inc: { days_set: daysToPush.length }
    },
    {new: true}, 
    function(err, dietplan) {
      console.log('dietplan', dietplan);
      res.json({days: dietplan.days, days_set: dietplan.days_set});
  });
};

exports.updateDay = function(req, res, next) {
  var diet_id = req.params.id,
    // day_index = req.body.order-1,
    day_index = req.params.order-1, // (day_index in 0 based array)
    updateday = new Day({ order: req.body.order, title: req.body.title, meals: [] });

  req.body.meals.forEach(function(meal, index) {
    updateday.meals.push(new Meal(meal));
  });

  var setModifier = { $set: {} };
  setModifier.$set['days.' + day_index] = updateday;

  DietPlan.findByIdAndUpdate(
    diet_id,
    setModifier,
    {new: true}, 
    function(err, dietplan) {
      console.log('-------dietplan days updated\n', dietplan.days);
      res.json({days: dietplan.days});
  });
};


// ------------------------ RECIPES ------------------------------------------//
exports.getRecipe = function(req, res, next) {
  Recipe.findById(req.params.id, function(err, recipe) {
    if (err) return next(err);
    res.json(recipe);
  });
};

exports.searchRecipes = function(req, res, next) {
  var regex = {$regex: new RegExp(req.params.query, 'i') };
  Recipe.find()
    .or( [ {name: regex}, {'ingredients.name': regex} ])
    .limit(25)
    .exec(function(err,recipes) {
      if (err) { return next(err); }
      console.log(recipes);
      return res.json(recipes); 
  });

};

exports.createRecipe = function (req, res, next) {
 var recipe = new Recipe(req.body);
 recipe.save(function(err, recipe) {
    if (err) { return next(err); }
    return res.json(recipe);
 });
};

exports.updateRecipe = function(req, res, next) {
    res.json({});
};

// ----------------------- INGREDIENTS ---------------------------------------//
exports.searchIngredients = function(req, res, next) {
  var re = new RegExp(req.params.query, 'i');
  Ingredient.find()
    .or( [{name: { $regex: re }}, {category: {$regex: re}}, {keywords: {$regex: re}}] )
    .limit(25)
    .exec(function(err,ingredients) {
      if (err) { return next(err); }
      console.log(ingredients);
      return res.json(ingredients); 
  });
};

exports.createIngredient = function(req, res, next) {
  var ingredient = new Ingredient(req.body);
  ingredient.save(function(err, ingredient) {
    if (err) { return next(err); }
    return res.json(ingredient);
 });
};

exports.updateIngredient = function(req, res, next) {
    res.json({});
};



