app.controller('MainCtrl', [
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
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('PostsCtrl', [
'$scope',
'posts',
'post',
'auth',
function($scope, posts, post, auth){
  $scope.posts = posts.posts;
  $scope.post = post;
  $scope.addComment = function(){
    if($scope.body === '') { return; }
    posts.addComment(post._id, {
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
function($scope, posts, auth){
  $scope.items = items.items;
  $scope.addItem = function(){
    if(!$scope.title || $scope.title === '') { return; }
    items.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
  };
  $scope.incrementUpvotes = function(comment){
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
  $scope.incrementUpvotes = function(comment){
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
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

}]);