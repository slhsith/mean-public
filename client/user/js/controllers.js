/*  ------------------  *
    CONTROLLERS - USER
 *  ------------------  */

 app.controller('MainCtrl', function ($scope, auth, messageSocket) {
  
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
  $scope.isUser = auth.isUser;
  $scope.isAdmin = auth.isAdmin;
  $scope.logOut = auth.logOut;
  $scope.isThisUser = auth.isThisUser;


  $scope.$on('socket:tokenrequest', function(event, data) {
    console.log('socket:tokenrequest', event.name, data);
    console.log(data.message);
    messageSocket.emit('authenticate', { token: auth.getToken() });
  });

  $scope.$on('socket:broadcast', function(event, data) {
    console.log('broadcast to socket', event.name, data);
  });
  
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
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Post",{"area":"group", "page":"groupHome", "action":"create"});
    // mixpanel.track("User Dashboard: Add Post");
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Post",{"area":"group", "page":"groupHome", "action":"upvote"});
    // mixpanel.track("User Dashboard: Upvoted Comment");
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;

});


app.controller('PostCtrl', function ($scope, auth, posts, postPromise) {

  $scope.post = postPromise.data;
  $scope.comment = { 
    post: $scope.post._id, 
    body: null, 
    author: $scope.user.username 
  };

  $scope.addComment = function() {
    if (!$scope.comment.body || $scope.comment.body === '') { return; }
    posts.addComment($scope.post, $scope.comment).success(function(comment) {
      $scope.post.comments.push(comment);
      $scope.comment.body = null;
    });
    $scope.body = '';
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Comment",{"area":"group", "page":"groupHome", "action":"comment"});
  };
  $scope.incrementUpvotes = function(comment){
    posts.upvoteComment(post, comment);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Comment",{"area":"group", "page":"groupHome", "action":"upvote"});
  };
  $scope.incrementUpvotes = function(comment) {
    posts.upvoteComment($scope.post, comment);
  };
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
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
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Item",{"area":"shop", "page":"shop", "action":"create"});
   // mixpanel.track("Shop Page: Added Item");
 };

  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Shop Page: Upvoted Comment");
  };  
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});


app.controller('ItemsCtrl', function ($scope, items, auth, itemPromise) {

  $scope.items = items.items;
  $scope.item = itemPromise;
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Items Page: Upvoted Comment");
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
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
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Start Transaction",{"area":"shop", "page":"transactions", "action":"transaction"});
    // mixpanel.track("Checkout: Purchase Item");
    // mixpanel.people.track_charge(10,{  item: $scope.item.name, type: $scope.item.type, "$time": new Date() });
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});


app.controller('SettingsCtrl', function ($scope, languages, settings, userPromise, auth) {
  $scope.user = angular.extend($scope.user, settings.settings);
  $scope.languages = languages.languages;
  $scope.addLanguage = function(){
    console.log($scope.language.name);
    languages.addLanguage($scope.language.name).success(function(data) {
    $scope.languages.push(data);
    });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Languange",{"area":"settings", "page":"settings", "action":"add"});
  };
  $scope.updateSettings = function() {
    console.log($scope.user);
    settings.update($scope.user);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Settings update",{"area":"settings", "page":"settings", "action":"update"});
    // mixpanel.track("Settings: Update User");
  };
  $scope.user = userPromise.data;
  console.log(userPromise);
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
  $scope.isThisUser = auth.isThisUser;
});

app.controller('GroupsCtrl',
function ($scope, groups, auth) {

  $scope.groups = groups.groups;
  $scope.addGroup = function(){
    groups.create($scope.group);
    console.log($scope.group);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Group", {"area":"group", "page":"groups", "action":"create"});
  };
  $scope.group = '';
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
});

app.controller('GHomeCtrl',
function ($scope, auth, groups, gposts, gcomments, groupsPromise, $stateParams){
  var group = groups.group[$stateParams.id];
  var gpost = gposts.gpost[$stateParams.id];
  // var gpost = gposts.gpost[$stateParams.id];
  $scope.group = groupsPromise.data;
  console.log(groupsPromise.data);
  // $scope.gpost = gpostsPromise.data;
  // console.log(gpostsPromise.data);

  $scope.currentUser = auth.currentUser();
  $scope.groups = groups.groups;
  $scope.gposts = gposts.gposts;
  $scope.gcomments = gcomments.gcomments;
  $scope.addGpost = function(){
    // if(!$scope.body || $scope.body === '') { return; }
    groups.createGpost($scope.group, $scope.gpost).success(function(gpost) {
      $scope.group.gposts.push(gpost);
      $scope.gpost.body = null;
    });
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Post", {"area":"group", "page":"groupHome", "action":"create"});
  };
  $scope.addGcomment = function (gpost) {
    // groups.createGcomment($scope.gpost, $scope.gcomment)
    console.log(gpost);
    console.log($scope.gcomment);
  };
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
  
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
  $scope.addGcomment = function(){
    if(!scope.body || $scope.body === '') { return; }
    gposts.addGcomment(gposts.gpost._id, {
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
  $scope.isAdmin = auth.isAdmin;
  $scope.isUser = auth.isUser;
}]);

