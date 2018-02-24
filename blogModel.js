
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	author  :  {} ,
	createdDate		: {type:Date},
	title 		: {type:String,default:'',required:true},
	blogContent 	: {type:String,default:''}
	});

mongoose.model('BlogModel',blogSchema);