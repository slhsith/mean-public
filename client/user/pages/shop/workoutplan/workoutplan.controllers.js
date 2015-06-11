app.controller('ExerciseCtrl', function ($scope, items, exercisePromise, $stateParams) {
  $scope.exercise = exercisePromise;
  
  $scope.addStep = function() {
    items.newStep($scope.step, $stateParams.exercise).then(function(res){
      console.log('success');
      $scope.step = null;
      $scope.exercise.steps.push(res.data);
   }).error(function(){
       console.log('failure');
   });
  };

  $scope.createDay = function(){
    items.newDay($stateParams.id, $scope.day.day).success(function(day) {
      $scope.item.days.push(day);
    });
  };
  
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Items Page: Upvoted Comment");
  };

  $scope.addPlan = function() {
    items.newPlan($scope.workoutPlan, $stateParams.id).success(function(data){
      console.log('success');
      $scope.item.exercises.push(data);
   }).error(function(){
       console.log('failure');
   });
  };

});

app.controller('StepCtrl', function ($scope, items, stepPromise, $stateParams) {
  $scope.step = stepPromise;
});

