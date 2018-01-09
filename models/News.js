var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var News = new keystone.List('News', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	track : true,
	singular : 'evento',
    plural : 'eventos',
	label:'Eventos'
});

News.add({
	title: { type: String, required: true, initial : true ,label : "Titulo"},
	featured :{type : Boolean, index :true, default : false, initial : true,label : "Destaque"},
	publishedDate: { type: Types.Date, index: true, initial : true,label : "Data de publicação"},
	image: { type: Types.CloudinaryImage , initial : true,label : "Imagem"},
	content: {
		brief: { type: Types.Textarea, wysiwyg: true, height: 150 , label : "Texto resumido"},
		extended: { type: Types.Textarea, wysiwyg: true, height: 400 , label : "Texto completo"},
	},
	link : {type :Types.Url, initial : true, label : "Link"},
	newsType: { type: Types.Relationship, ref: 'NewsTypes', many: true , initial : true,label : "Tipo do evento"},
});

News.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

News.defaultColumns = 'title';
News.register();
