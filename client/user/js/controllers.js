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

});


app.controller('ItemsCtrl', function ($scope, items, auth) {

  $scope.items = items.items;
  $scope.videos = items.videos;
  $scope.video = items.video;
  $scope.item = items.item;
  $scope.incrementUpvotes = function(item){
    items.upvoteItem(item);
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Upvote Item",{"area":"shop", "page":"shop", "action":"upvote"});
    // mixpanel.track("Items Page: Upvoted Comment");
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
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Start Transaction",{"area":"shop", "page":"transactions", "action":"transaction"});
    // mixpanel.track("Checkout: Purchase Item");
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
});

app.controller('GHomeCtrl',
function ($scope, auth, groupsPromise, gposts, gpostsPromise){
  // var gpost = gposts.gpost[$stateParams.id];
  $scope.group = groupsPromise.data;
  console.log(groupsPromise.data);
  $scope.gpost = gpostsPromise.data;
  console.log(gpostsPromise.data);
  $scope.currentUser = auth.currentUser();
  $scope.gposts = gposts.gposts;
  $scope.addGpost = function(){
    // if(!$scope.body || $scope.body === '') { return; }
    gposts.create($scope.gpost);
    $scope.body = '';
    // mixpanel.alias($scope.user._id);
    mixpanel.identify($scope.user._id);
    mixpanel.track("Add Post", {"area":"group", "page":"groupHome", "action":"create"});
    // mixpanel.track("User Group: Add Post");
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





// ------ MESSENGER ---------- //
// $scope.conversation at the level of the controller is focused convo
// --> user initializes new blank conversation
// --> when a conversation is focused from list, defaults to [0]th one
// ---------------------------- //
app.controller('MessengerCtrl', function($scope, messenger, settings, users, usersPromise) {

  $scope.conversations = messenger.conversations;
  $scope.user = angular.extend($scope.user, settings.settings);
  $scope.users = usersPromise.data;
  $scope.conversation = $scope.conversations[0];

  $scope.createConversation = function() {
    $scope.conversation = { users: [] };
  };

  $scope.createMessage = function() {
    var message = $scope.conversation.message;
    message.user = $scope.user._id;
    message.handle = $scope.user.handle;
    message.conversation = $scope.conversation._id;
    messenger.createMessage($scope.conversation, $scope.conversation.message).success(function(data) {
      $scope.conversation.messages.push(data);
    });

  };

  $scope.searchUsers = function() {
    users.search($scope.conversation.userQuery).success(function(data) {
      $scope.conversation.userResult = data;
      console.log($scope.conversation);
    });
  };

  $scope.addToConversation = function(user) {
    $scope.conversation.users.push(user._id);
  };

});
