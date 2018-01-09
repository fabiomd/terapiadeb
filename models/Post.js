var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular : 'postagem',
    plural : 'postagens',
	label:'Postagens'
});

Post.add({
	title: { type: String, required: true ,initial : true, label:"Titulo"},
	featured :{type : Boolean, index :true , default : false,initial : true, label:"Destaque"},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true,initial : true , state:"Estado"},
	author: { type: Types.Relationship, ref: 'User', index: true ,initial : true, label : "Autor"},
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } ,initial : true, label:"Data de publicação"},
	image: { type: Types.CloudinaryImage ,initial : true,label:"Imagem"},
	content: {
		brief: { type: Types.Textarea, wysiwyg: true, height: 150 ,label:"Texto resumido"},
		extended: { type: Types.Textarea, wysiwyg: true, height: 400 , label:"Texto completo"},
	},
	link : {type :Types.Url, initial : true, label : "Link"},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true ,initial : true, label:"Categoria"},
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
