app.factory('Item', function() {

  var ItemConstructor = function ItemConstructor (type) {
    this.name         = null;
    this.creator      = { username: null, _id: null };

    this.price        = null;
    this.upvotes      = null;

    this.type         = type || null;
  };

  return ItemConstructor;

});
