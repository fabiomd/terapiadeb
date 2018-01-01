var keystone = require('keystone'),
	mongoose = require('mongoose'),
	DefaultFiles = keystone.list('DefaultFiles'),
    async = require('async');

exports.newslist = function(req, res){
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'ZUP News';
	locals.filters = {
		newstype: req.params.newstype,
	};
	locals.data = {
		news: [],
		newstypes: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('NewsTypes').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.newstypes = results;

			// Load the counts for each category
			async.each(locals.data.newstypes, function (newstype, next) {

				keystone.list('News').model.count().where('newsType').in([newstype.id]).exec(function (err, count) {
					newstype.newsCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current newstypes filter
	view.on('init', function (next) {

		if (req.params.newstype) {
			keystone.list('NewsTypes').model.findOne({ key: locals.filters.newstype }).exec(function (err, result) {
				locals.data.newstype = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the news
	view.on('init', function (next) {
        var q;

        if (locals.data.newstype) {
			q = keystone.list('News').paginate({
				page: req.query.page || 1,
				perPage: 2,
				maxPages: 30,
				filters: {
					newsType : locals.data.newstype
				}});
		}else{
			q = keystone.list('News').paginate({
				page: req.query.page || 1,
				perPage: 2,
				maxPages: 30
			});
		}

		// var q = keystone.list('News').paginate({
		// 	page: req.query.page || 1,
		// 	perPage: 2,
		// 	maxPages: 30
			// ,
			// filters: {
			// 	state: 'author',
			// },
		// });

		if (locals.data.newstype) {
			q.where('newsType').in([locals.data.newstype]);
		}

		q.exec(function (err, results) {
			DefaultFiles.model.findOne(function(defaultError, defaultFiles){
				if(defaultError)
					return next(err);
				if(defaultFiles && results.results){
					for(var i=0;i<results.results.length;i++){
						if(results.results[i]['image'] && (!results.results[i]['image']['mimetype'] || !results.results[i]['image']['url'])){
							if(defaultFiles.newsimage && defaultFiles.newsimage.url && defaultFiles.newsimage.mimetype){
								results.results[i]['image'] = {
									mimeType : defaultFiles.newsimage.mimetype,
									url : defaultFiles.newsimage.url
								}
							}else{
								if(defaultFiles.defaultimage && defaultFiles.defaultimage.url && defaultFiles.defaultimage.mimetype){
									results.results[i]['image'] = {
										mimeType : defaultFiles.defaultimage.mimetype,
										url : defaultFiles.defaultimage.url
									}
								}else{
									break;
								}
							}
						}
					};
				}
				locals.data.news = results;
				next(err);

			});
			// locals.data.news = results;
			// next(err);
		});
	});

	// Render the template
	view.render('news');
}

exports.newsDetails = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'news';
	locals.filters = {
		id: req.params.id,
	};
	locals.data = {
		news: [],
	};
    
	// Load the current news
	view.on('init', function (next) {

        var q = null;
		if(mongoose.Types.ObjectId.isValid(req.params.id)){
		    q = keystone.list('News').model.findById(locals.filters.id).exec(function (err, result) {
		    	DefaultFiles.model.findOne(function(defaultError, defaultFiles){
					if(defaultError)
						return next(err);
					if(defaultFiles && result && result['image'] && (!result['image']['mimetype'] || !result['image']['url'])){
						if(defaultFiles.newsimage && defaultFiles.newsimage.url && defaultFiles.newsimage.mimetype){
							result['image'] = {
								mimeType : defaultFiles.newsimage.mimetype,
								url : defaultFiles.newsimage.url
							}
						}else{
							if(defaultFiles.defaultimage && defaultFiles.defaultimage.url && defaultFiles.defaultimage.mimetype){
								result[i]['image'] = {
									mimeType : defaultFiles.defaultimage.mimetype,
									url : defaultFiles.defaultimage.url
								}
							}
						}
					}
					locals.data.news = result;
					next(err);
				});
				// locals.data.news = result;
				// next(err);
			}); 
		}
	});

	// Render the view
	view.render('newsdetails');
};