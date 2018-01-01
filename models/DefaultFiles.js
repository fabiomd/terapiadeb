var keystone = require('keystone'),
    types = keystone.Field.Types;

var DefaultFiles = new keystone.List('DefaultFiles',{
	// autokey: {path: 'slug', from: 'title', unique:true },
 //    map: {name : 'title'},
	track: true
    // nocreate : true,
    // nodelete : true,
});

DefaultFiles.add({
    defaultimage:{type: types.CloudinaryImage, initial:true, label:'Imagem default geral',allowedTypes: ['png','jpg']},
	profileimage:{type: types.CloudinaryImage, initial:true, label:'Imagem default de perfil',allowedTypes: ['png','jpg']},
    newsimage:{type: types.CloudinaryImage, initial:true, label:'Imagem default da notícia',allowedTypes: ['png','jpg']}
});

DefaultFiles.defaultSort = '-createdAt';
DefaultFiles.schema.set('toJSON', {
     transform: function (doc, ret, options) {
         ret.id = ret._id;
         delete ret.key;
         delete ret._id;
         delete ret.__v;
         delete ret.updatedBy;
         delete ret.updatedAt;
         delete ret.createdBy;
         delete ret.createdAt;
         delete ret.slug;
         delete ret.featured;
         delete ret.oldDefaultFile;
         delete ret.oldProfileFile;
         delete ret.oldNewsFile;
         delete ret.oldProductsFile;
         if(ret.defaultimage){
             delete ret.defaultimage.size;
             delete ret.defaultimage.bucket;
             delete ret.defaultimage.etag;
             delete ret.defaultimage.path;
             delete ret.defaultimage.filename;
         }else{
            ret.defaultimage = {
                "mimetype" : "",
                "url" : ""
            };
         };
         if(ret.profileimage){
             delete ret.profileimage.size;
             delete ret.profileimage.bucket;
             delete ret.profileimage.etag;
             delete ret.profileimage.path;
             delete ret.profileimage.filename;
         }else{
            ret.profileimage = {
                "mimetype" : "",
                "url" : ""
            };
         };
         if(ret.newsimage){
             delete ret.newsimage.size;
             delete ret.newsimage.bucket;
             delete ret.newsimage.etag;
             delete ret.newsimage.path;
             delete ret.newsimage.filename;
         }else{
            ret.newsimage = {
                "mimetype" : "",
                "url" : ""
            };
         };
         if(ret.productimage){
             delete ret.productimage.size;
             delete ret.productimage.bucket;
             delete ret.productimage.etag;
             delete ret.productimage.path;
             delete ret.productimage.filename;
         }else{
            ret.productimage = {
                "mimetype" : "",
                "url" : ""
            };
         }
     }
});


// Default.defaultColumns = 'title, subtitle, author , newsType';

DefaultFiles.register();