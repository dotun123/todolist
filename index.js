const express= require("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");

const app= express();



app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(bodyParser.json())

// import Todo from ./models/todo
const Todo= require("./models/todo")


const dburl="mongodb://0.0.0.0:27017/todoDB"
mongoose.connect(dburl,{useNewUrlParser:true,useUnifiedTopology: true})


// need to look  into this
app.get("/",function(req,res){
   Todo.find()
   .then(function(result){
    res.render("index",{data:result.reverse()})
    // console.log(result)
   })
})


app.post("/",function(req,res){
const todo1 =new Todo({
    //....how to request the input from the body 
    todo: req.body.todoValue   
})
todo1.save()
.then(function(result){
    res.redirect("/");
})
})

app.get("/delete/data/:_id", function(req,res){
    const{_id}=req.params;
    Todo.deleteOne({_id})
    .then(function(){
        console.log("Delete Todo Successfully");
        res.redirect("/");
    })
    .catch(function(){
        console.log(err);
    })
})

// app.post("/delete",function(req,res){
//     const Try = req.body.DELECT 

//     Todo.findByIdAndDelete({Try})
//         then(function(){
//                 console.log("Delete Todo Successfully");
//                      res.redirect("/");
//                  })
//                 .catch(function(err){
//                    console.log(err);
//     })
// })
// app.post('/delete/:id', (req, res) => {
//     let id = req.params.id;
//     // find the item in the database
//     let item = Todo.find( try)
//     // if item exists, delete it
//     .then (function(item) {
//       database.splice(database.indexOf(item), 1);
//       res.status(200).send('Item deleted');
//     }) .catch (function(){
//       res.status(404).send('Item not found');
//     })
//   });


app.listen(3000,function(req,res){
    console.log("currently running in 3000")
})