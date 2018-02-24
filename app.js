var express= require('express');
var app = express();

bodyParser= require('body-parser');
cookieParser= require('cookie-parser');
mongoose=require('mongoose');

app.use(bodyParser.json({limit:'10mb'}));

app.get('/',function(req,res){
	res.send("App-is-starting")
});

app.set('view engine','pug')

app.get('/creatPug', function(req,res){
	res.render('LoginBlog' , {
		title:'Assignment2-Create a blog' ,
		message:'Hello you are in PUG app..',
	})
});

app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

var dbPath= "mongodb://localhost/blogdbcon";
dbconnect=mongoose.connect(dbPath);

mongoose.connection.once('connected', function() {
	console.log("Connected to database");
});

var BlogJs = require('./blogModel.js');
var blogModel = mongoose.model('BlogModel');

//For creating blogs
app.post('/allBlogs/createBlogs',function(req, res) {

		console.log("creating-blog-here")
		var newBlog = new blogModel({
			title 		: req.body.title,
			blogContent 	: req.body.blogContent
		}); 

		var createdDate = Date.now();
		newBlog.created = createdDate;
		var allTags = (req.body.allTags!=undefined && req.body.allTags!=null)?req.body.allTags.split(','):''
		newBlog.tags = allTags;
		var author = {fullName: req.body.authorFullName};
		newBlog.author = author;

		newBlog.save(function(error){
			if(error){
				console.log(error);
				res.send(error);
			}
			else{
				console.log(newBlog);
				res.send(newBlog);
			}

		}); 
	  
	});

//for editing blogs based on particular id
app.get('/allBlogs/:id', function(req,res){
	console.log("blogModel--"+blogModel);
	blogModel.findById({'_id':req.params.id}, function(err,result){
		res.send(result);
	})
})

app.get('/allBlogs/:id/UpdateBlog', function(req,res){
		
res.render('UpdateBlog' , {
	    id:""+req.params.id ,
		title:'Assignment2-Update a blog' ,
		message:'Hello you are Updating post..',
	})
console.log("come-to-update-pug");
});



app.post('/allBlogs/:id/UpdateBlog',function(req, res) {
	
		console.log("com")
		var update = req.body;
	blogModel.findByIdAndUpdate({'_id':req.params.id}, update , function(err, result){
		if(err){
			console.log("error-"+req.params.id)
			res.send(err)
		}else{
			console.log(result)
			res.send(result)
		}

	})
  });

// For show all blogs 
app.get('/allBlogs', function(req,res){
	console.log("showing-all-blogs-here");
	blogModel.find(function(err,result){
		if(err){
			res.send(err)
		}else{
			res.send(result)
		}
	})
})

//for delting blogs based on particular Id 


app.get('/allBlogs/:id/deleteBlog', function(req,res){
		
res.render('deleteBlog' , {
	    id:""+req.params.id ,
		title:'Assignment2-Delete a blog' ,
		message:'Hello you are delting post..',
	})
console.log("come-to-delete-pug");
});

app.post('/allBlogs/:id/deleteBlog',function(req, res) {

	blogModel.remove({'_id':req.params.id},function(err,result){

			console.log("delete-error"+req.params.id);
		if(err){
			res.send(err)
		}
		else{
			console.log(result)
			res.send("Delted!!"+result)
		}

	}); 
  
});

app.listen(3000,function(){
 console.log("App-listening-port-3000")
});	