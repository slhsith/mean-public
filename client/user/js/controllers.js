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
'$stateParams',
'posts',
'comments',
'auth',
function($scope, $stateParams, posts, comments, auth){
  var post = posts.post[$stateParams.id];
  $scope.post._id = $routeParams.postId;
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
function($scope, items, item, auth){
  $scope.items = items.items;
  $scope.item = item; 
  // $scope.createTrans = function(){
  //   if(!$scope.title || $scope.title === '') { return; }
  //   transactions.create({
  //     title: $scope.title,
  //     link: $scope.link,
  //   });
  //   $scope.title = '';
  //   $scope.link = '';
  // };

  $scope.isLoggedIn = auth.isLoggedIn;
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
    languages.test($scope.language.name);
    languages.addLang($scope.language.name);
  };
  $scope.updateSettings = function() {
    settings.update($scope.setting);
  };
}]);

app.controller('GroupsCtrl', [
'$scope',
'groups',
'auth',
function($scope, groups, auth){
  $scope.groups = groups.groups;
  $scope.addGroup = function(){
    if(!$scope.name || $scope.name === '') { return; }
    groups.create({
      name: $scope.name,
    });
    $scope.name = '';
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('GhomeCtrl', [
'$scope',
'$stateParams',
'gposts',
'auth',
function($scope, $stateParams, gposts, auth){
  var gpost = gposts.gpost[$stateParams.id];
  $scope.get(gpost._id);
  $scope.gpost = gposts.gpost;
  $scope.addGroupPost = function(){
    if(!scope.body || $scope.body === '') { return; }
    groups.addGpost(groups.group._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(gpost) {
      $scope.group.gpost.push(gpost);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(gpost){
    gposts.upvoteGroupPost(gpost);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);

app.controller('GpostCtrl', [
'$scope',
'$stateParams',
'gposts',
'gcomments',
'auth',
function($scope, $stateParams, gposts, gcomments, auth){
  var gpost = gposts.gpost[$stateParams.id];
  $scope.get(gpost._id);
  $scope.gpost = gposts.gpost;
  $scope.gcomments = gcomments.gcomments;
  $scope.addGroupComment = function(){
    if(!scope.body || $scope.body === '') { return; }
    gposts.addGroupComment(gposts.gpost._id, {
      body: $scope.body,
      author: 'user',
    }).success(function(gcomment) {
      $scope.gpost.gcomments.push(gcomment);
    });
    $scope.body = '';
  };
  $scope.incrementUpvotes = function(gcomment){
    gposts.upvoteGroupComment(gpost, gcomment);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
}]);
