app.controller('MainCtrl', function($scope, auth){

  
    $scope.user = auth.getUser();
    mixpanel.identify($scope.user._id);
    mixpanel.people.set({
    //     "$name": $scope.user.firstname + ' ' + $scope.user.lastname,
        "$email": $scope.user.username,
    //     "$created": $scope.user.created,
    //     "gender" : $scope.user.gender,
    //     "age" : $scope.user.age,
        "$last_login": new Date()
    });
  $scope.isLoggedIn = auth.isLoggedIn;
});

app.controller('DashCtrl', [
'$scope',
'posts',
'auth',
function($scope, posts, auth){

  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
    mixpanel.identify($scope.user.id);
    mixpanel.track("User Dashboard: Upvoted Comment");
  };
  $scope.isLoggedIn = auth.isLoggedIn;

}]);

app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
'comments',
'auth',
function($scope, $stateParams, posts, comments, auth){
  var post = posts.post[$stateParams.id];
  $scope.getPost(post_id);
  $scope.post = posts.post;
  $scope.comments = comments.comments;
  $scope.addComment = function(){
    if(!scope.body || $scope.body === '') { return; }
    posts.addComment(posts.post._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(comment) {
      $scope.post.comments.push(comment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post, comment);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('ShopCtrl', [
'$scope',
'items', 
'auth',
function($scope, items, auth){
  $scope.items = items.items;
  $scope.addItem = function() {
    if($scope.name === '') { return; }
    items.create({
      name: $scope.name,
    });
    // $scope.items.push({ name: $scope.name });
    $scope.name = '';
    // $scope.item = item.$save();
  };
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
  };  
  $scope.isLoggedIn = auth.isLoggedIn;
}]);


app.controller('ItemsCtrl', [
'$scope',
'items',
'item',
'auth',
function($scope, items, item, auth){
  $scope.items = items.items;
  $scope.item = item;
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('NavCtrl', [
'$scope',
'auth',
'$location',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.home = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);

app.controller('TransCtrl', [
'$scope',
'items',
'item',
'auth',
'transactions',
function($scope, items, item, auth, transactions){
  $scope.startTrans = function () {
    console.log($scope.card);
    transactions.purchase($scope.card);
    // mixpanel.identify($scope.user.id);
    // mixpanel.track("Checkout: Purchase Item");
    // mixpanel.people.track_charge(10,{  item: $scope.item.name, type: $scope.item.type, "$time": new Date() });
  };
}]);


app.controller('SettingsCtrl', [
'$scope',
'languages',
'settings',
function($scope, languages, settings){
  $scope.myImage='';
  $scope.myCroppedImage='';
  var handleFileSelect=function(evt) {
    var file=evt.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function (evt) {
      $scope.$apply(function($scope){
        $scope.myImage=evt.target.result;
      });
    };
    reader.readAsDataURL(file);
  };
  angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  $scope.addLanguage = function(){
    console.log($scope.language.name);
    languages.addLanguage($scope.language.name);
  };
  $scope.updateSettings = function() {
    settings.update($scope.setting);
  };
}]);
