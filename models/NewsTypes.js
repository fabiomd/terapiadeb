var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var NewsTypes = new keystone.List('NewsTypes', {
	autokey: { from: 'name', path: 'key', unique: true },
	singular : 'tipo de evento',
    plural : 'tipos de eventos',
	label:'Tipos de eventos'
});

NewsTypes.add({
	name: { type: String, required: true },
});

NewsTypes.relationship({ ref: 'News', path: 'news', refPath: 'types' });

NewsTypes.register();
