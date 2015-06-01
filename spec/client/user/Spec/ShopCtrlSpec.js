//Stub Functions
Client = {
	user: {
		events: function(){return; },
		fireEvent: function(){ return; }
	    getItemById: function(req, res, next) {
		 var _id = user._id;
		 User.findById(req.params._id, function(err, user) {

		  if(err) { return next(err); }
		  return res.json(user);
		  });
		},
	},
	shop: {
		events: function(){return; },
		fireEvent: function(){ return; }
	},
	items: {
		events: function(){return; },
		getItemById: function(req, res, next) {
		 var _id = item._id;
		 Item.findById(req.params._id, function(err, item) {

		  if(err) { return next(err); }
		  return res.json(item);
		  });
		},
		fireEvent: function(){ return; }
	}
};

Items = {};