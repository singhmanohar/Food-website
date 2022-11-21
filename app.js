const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/foodwebsite", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connect");
}).catch((err)=>{
   console.log(err);
})


const app = express();
const port = 80;

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    bio: String,
    date:{
        type: Date,
        date: Date.now
    }
});

const User = new mongoose.model("User", contactSchema);

app.use(express.static("static"));
app.use(express.urlencoded());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.status(201).render("home");
})

app.post("/contact", (req, res) => {
    let data = new User(req.body);
    data.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
})

app.listen(port, () => {
    console.log(`this website will run on port no ${port}`);
})