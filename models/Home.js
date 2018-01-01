var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Home = new keystone.List('Home', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular : 'pagina principal',
	label:'Pagina principal'
});

Home.add({
	title: { type: String, required: true },
	image: { type: Types.CloudinaryImage },
	contentpart1: { type: Types.Textarea, wysiwyg: true, height: 650 },
	contentpart2: { type: Types.Textarea, wysiwyg: true, height: 650 }
});

Home.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Home.defaultColumns = 'title';
Home.register();
