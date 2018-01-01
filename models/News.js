var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var News = new keystone.List('News', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular : 'notícia',
    plural : 'notícias',
	label:'Notícias'
});

News.add({
	title: { type: String, required: true },
	publishedDate: { type: Types.Date, index: true},
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	newsType: { type: Types.Relationship, ref: 'NewsTypes', many: true },
});

News.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

News.defaultColumns = 'title';
News.register();
