/*  ------------------  *
    CONTROLLERS - USER
 *  ------------------  */

 app.controller('MainCtrl', function ($scope, auth) {
  
    $scope.user = auth.getUser();
    mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.people.set({
    //     "$name": $scope.user.firstname + ' ' + $scope.user.lastname,
        "$email": $scope.user.username,
    //     "$created": $scope.user.created,
    //     "gender" : $scope.user.gender,
    //     "age" : $scope.user.age,
    //     "type" : $scope.user.permissions,
        "$last_login": new Date()
    });
  $scope.isLoggedIn = auth.isLoggedIn;

});


app.controller('DashCtrl', function ($scope, posts, auth) {

  $scope.posts = posts.posts;
  $scope.addPost = function(){
    if(!$scope.title || $scope.title === '') { return; }
    posts.create({
      title: $scope.title,
      link: $scope.link,
    });
    $scope.title = '';
    $scope.link = '';
    mixpanel.identify($scope.user._id);
    mixpanel.track("User Dashboard: Add Post");
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
    mixpanel.identify($scope.user._id);
    mixpanel.track("User Dashboard: Upvoted Comment");
  };
  $scope.isLoggedIn = auth.isLoggedIn;

});


app.controller('PostsCtrl', function ($scope, $state, posts, comments, auth, postPromise) {
  $scope.post = postPromise;
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
});


app.controller('ShopCtrl', function ($scope, items, auth) {

  $scope.items = items.items;

  $scope.addItem = function() {
    items.create($scope.item).success(function(data){
      console.log('success');
      $scope.items = items.items;
      console.log(data);
   }).error(function(){
       console.log('failure');
   });
   mixpanel.identify($scope.user._id);
   mixpanel.track("Shop Page: Added Item");
 };

  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Shop Page: Upvoted Comment");
  };  

});


app.controller('ItemsCtrl', function ($scope, items, auth) {

  $scope.items = items.items;
  $scope.videos = items.videos;
  $scope.video = items.video;
  $scope.item = items.item;
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Items Page: Upvoted Comment");
  };

});


app.controller('NavCtrl', function ($scope, auth) {
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.home = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
});

app.controller('TransCtrl', function ($scope, items, auth, transactions) {
  $scope.startTrans = function () {
    console.log($scope.card);
    transactions.purchase($scope.card);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Checkout: Purchase Item");
    // mixpanel.people.track_charge(10,{  item: $scope.item.name, type: $scope.item.type, "$time": new Date() });
  };
});


app.controller('SettingsCtrl', function ($scope, languages, settings, userPromise) {
  $scope.user = angular.extend($scope.user, settings.settings);
  $scope.languages = languages.languages;
  $scope.addLanguage = function(){
    console.log($scope.language.name);
    languages.addLanguage($scope.language.name).success(function(data) {
    $scope.languages.push(data);
    });
  };
  $scope.updateSettings = function() {
    console.log($scope.user);
    settings.update($scope.user);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings: Update User");
  };
  $scope.user = userPromise.data;
  console.log(userPromise);
});

app.controller('GroupsCtrl',
function ($scope, groups, auth) {

  $scope.groups = groups.groups;
  $scope.addGroup = function(){
    groups.create($scope.group);
    console.log($scope.group);
  };
  $scope.group = '';
  $scope.isLoggedIn = auth.isLoggedIn;
});

app.controller('GHomeCtrl',
function ($scope, auth, groupsPromise, posts){
  // var gpost = gposts.gpost[$stateParams.id];
  $scope.group = groupsPromise.data;
  console.log(groupsPromise.data);
  $scope.currentUser = auth.currentUser();
  $scope.posts = posts.posts;
  $scope.addPost = function(){
    // if(!$scope.body || $scope.body === '') { return; }
    posts.create({
      body: $scope.post.body,
      author: $scope.currentUser
    });
    $scope.body = '';
    mixpanel.identify($scope.user._id);
    mixpanel.track("User Group: Add Post");
  };
  // $scope.addComment = function(){
  //   console.log($scope.post);
  //   // posts.addComment(posts.post._id, {
  //   //   body: $scope.post.comment,
  //   //   author: $scope.currentUser
  //   // }).success(function(comment) {
  //   //   $scope.post.comments.push(comment);
  //   // });
  //   // $scope.body = '';
  // };
  // $scope.incrementUpvotes = function(gpost){
  //   gposts.upvoteGroupPost(gpost);
  // };
  $scope.isLoggedIn = auth.isLoggedIn;
});

// app.controller('GpostCtrl', [
// '$scope',
// '$stateParams',
// 'gposts',
// 'gcomments',
// 'auth',
// function($scope, $stateParams, gposts, gcomments, auth){
//   var gpost = gposts.gpost[$stateParams.id];
//   $scope.get(gpost._id);
//   $scope.gpost = gposts.gpost;
//   $scope.gcomments = gcomments.gcomments;
//   $scope.addGroupComment = function(){
//     if(!scope.body || $scope.body === '') { return; }
//     gposts.addGroupComment(gposts.gpost._id, {
//       body: $scope.body,
//       author: 'user',
//     }).success(function(gcomment) {
//       $scope.gpost.gcomments.push(gcomment);
//     });
//     $scope.body = '';
//   };
//   $scope.incrementUpvotes = function(gcomment){
//     gposts.upvoteGroupComment(gpost, gcomment);
//   };
//   $scope.isLoggedIn = auth.isLoggedIn;
// }]);
