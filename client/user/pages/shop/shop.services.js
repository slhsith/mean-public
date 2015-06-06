app.factory('Item', function() {

  var ItemConstructor = function ItemConstructor () {
    this.name         = null;
    this.creator      = { username: null, _id: null };

    this.price        = null;
    this.upvotes      = null;

    this.type         = null;
  };

  return ItemConstructor;

});
