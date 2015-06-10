var mongoose = require('mongoose');
var extend = require('util')._extend;
var config = require('./../../env.json')[process.env.NODE_ENV || 'development'];

var
  WorkoutPlan   = mongoose.model('WorkoutPlan'),
  Exercise      = mongoose.model('Exercise'),
  Step          = mongoose.model('Step');

exports.createExercise = function (req, res, next) {
 var exercise = new Exercise(req.body);
 item_id = req.params.item;
 exercise.save(function(err, exercise) {
    if (err) { return next(err); }
    Item.findByIdAndUpdate(item_id, { $push: { exercises: exercise._id } }).exec(function(err, item) {
      if(err){ return next(err); }
      res.json(item);
    });
  });
};

exports.newStep = function (req, res, next) {
 var step = new Step(req.body);
 exercise_id = req.body.exercise;
 step.save(function(err, step) {
    if (err) { return next(err); }
    Exercise.findByIdAndUpdate(exercise_id, { $push: { steps: step._id } }).exec(function(err, exercise) {
      if(err){ return next(err); }
      res.json(exercise);
    });
  });
};

exports.getExercise = function (req, res, next) {
 // if(err){ next(err); }
 var _id = req.params.exercise;
 Exercise.findById(_id, function(err, exercise, steps) {
  console.log(exercise);
  res.json(exercise);
 }).populate('steps');
};

exports.getExercises = function(req, res, next) {
  console.log(req.params._id);
  var _id = req.params._id;
  Exercise.findById(_id, function (err, exercise) {
    console.log(exercise);
    res.json(exercise);
  });
};


exports.getStep = function (req, res, next) {
 var _id = req.params.step;
 Step.findById(_id, function(err, step) {
  console.log(step);
  res.json(step);
 });
};

