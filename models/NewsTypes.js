var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var NewsTypes = new keystone.List('NewsTypes', {
	autokey: { from: 'name', path: 'key', unique: true },
	singular : 'tipo de notícia',
    plural : 'tipos de notícias',
	label:'Tipos de notícias'
});

NewsTypes.add({
	name: { type: String, required: true },
});

NewsTypes.relationship({ ref: 'News', path: 'news', refPath: 'types' });

NewsTypes.register();
