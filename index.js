const express=require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const methodOverride = require('method-override')

const port=8080;
const path =require("path");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.set("view engine","ejs")

app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Manvith",
        content:"I wish to get an Internship soon"
    },
    {
        id:uuidv4(),
        username:"Lingaraj",
        content:"I wish to get an Job soon"
    },
    {
        id:uuidv4(),
        username:"Kishan",
        content:"I wish to get an Wife soon"
    },

];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");

    
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    
    res.render("show.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    res.redirect("/posts");    
    
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
})
app.listen(port,()=>{
    console.log("listening at port 8080")
});