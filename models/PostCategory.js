var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var PostCategory = new keystone.List('PostCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	singular : 'categoria',
    plural : 'categorias',
	label:'Categorias'
});

PostCategory.add({
	name: { type: String, required: true },
});

PostCategory.relationship({ ref: 'Post', path: 'posts', refPath: 'categories' });

PostCategory.register();
