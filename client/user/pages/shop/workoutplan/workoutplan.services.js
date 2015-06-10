app.factory('workoutplans', function($http, auth) {
  var o = {};

  o.newPlan = function (plan, id) {
    return $http.post('/api/workoutPlans/' + id, plan, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, plan);
      o.items.push(extendedItem);
    });
  };
  
  o.newStep = function (step, id) {
    return $http.post('/api/item/exercise/' + id, step, {
      headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data) {
      // base item data comes back from API, extend it with
      // the item's original submitted descriptive parameters
      var extendedItem = angular.extend(data, step);
      o.items.push(extendedItem);
    });
  };
  o.getExercise = function(exercise) {
    console.log(exercise);
    return $http.get('/api/item/exercise/' + exercise).then(function(res){
      return res.data;
    });
  };
  o.getExercises = function(id) {
    return $http.get('/api/items/' + id + '/exercises').success(function(data){
      console.log(data);
      angular.copy(data, o.items);
    });
  };
  o.getStep = function(step) {
    console.log(step);
    return $http.get('/api/item/step/' + step).then(function(res){
      return res.data;
    });
  };

  return o;
});