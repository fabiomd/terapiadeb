var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.data = {
		galleries : []
	}

	// Set locals
	locals.section = 'gallery';

	// Load the galleries by sortOrder
	// keystone.list('Gallery').model.find().sort('sortOrder').exec(function(err,galleries){
	// 	locals.data.galleries = galleries;
	// 	for(var i=0;i<locals.data.galleries.length;i++){
	// 		if(locals.data.galleries[i].publishedDate)
	// 			locals.data.galleries[i].publishedDate = locals.data.galleries[i].publishedDate.getMonth();;
	// 	}
	// 	view.render('gallery');
	// })
	view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

	// Render the view
	view.render('gallery');

};
