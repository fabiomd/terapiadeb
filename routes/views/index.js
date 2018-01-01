var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		carrousel : [],
		home : {
			title : '',
			contentpart1 : '',
			contentpart2 : '',
			image : ''
		}
	}

	async.parallel({
        news: function(parallelCb) {
            keystone.list('News').model.find({featured : true}).exec(function(error, news){
              parallelCb(null, {err: error, item: news});
            });
        },
        post: function(parallelCb) {
            keystone.list('Post').model.find({featured : true}).exec(function(error, posts){
              parallelCb(null, {err: error, item: posts});
            });
        },
        home: function(parallelCb) {
            keystone.list('Home').model.findOne(function(error, home){
              parallelCb(null, {err: error, item: home});
            }); 
        }
	}, function(err, results) {
		if(!err){
			try{
				for(var i=0;i<results.news.item.length;i++){
					locals.data.carrousel.push({
						title : results.news.item[i].title,
						image : results.news.item[i].image,
						id : results.news.item[i].id,
						type : 'news'
					})
				}
				for(var i=0;i<results.post.item.length;i++){
					locals.data.carrousel.push({
						title : results.news.item[i].title,
						image : results.post.item[i].image,
						id : results.post.item[i],
						type : 'post'
					})
				}

				locals.data.home.title = results.home.item.title;
				locals.data.home.contentpart1 = results.home.item.contentpart1;
				locals.data.home.contentpart2 = results.home.item.contentpart2
				locals.data.home.image = results.home.item.image;
				// Render the view
			}catch(error){}
		}
		view.render('index');
	});
};
