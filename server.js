const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

const BASE_URL = process.env.BASE_URL

//middleware to check http requests going in and out
app.use(express.json());
app.use(express.urlencoded({ extended: false }));``
app.use(cors());


mongoose.connect(process.env.DB)
    .catch((err) => console.log(err));

//DB SCHEMA AND MODEL
const postSchema =mongoose.Schema({
    title: String,
    description: String
})    

const Post = mongoose.model("Post", postSchema);

//api routes
app.get(`${BASE_URL}/`, (req, res) => {
    res.send("Express is here")
})

app.post("/create", (req, res)=>{
   // console.log(req.body);
   Post.create({
    title: req.body.title,
    description: req.body.description
   }).then(doc => console.log(doc))
   .catch(err => console.log(err))
});

app.get(`${BASE_URL}/posts`, (req, res) => {
    Post.find()
    .then((items)=> res.json(items))
    .catch((err) => console.log(err))
})

app.delete("/delete/:id", (req, res) => {
    Post.findByIdAndDelete({ _id: req.params.id })
    .then((doc)=> res.json(doc))
    .catch((err) => console.log(err))
})

app.put("/update/:id", (req, res)=>{
/*     console.log(req.params);
    console.log(req.body); */
    Post.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        description: req.body.description
    }).then((doc)=> res.json(doc))
    .catch((err) => console.log(err))
})

app.listen(3001, function () {
    console.log("Server is running")
});

