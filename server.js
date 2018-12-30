const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine","hbs");

hbs.registerHelper("getCurrentYear",() => {
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + "/public"));

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method}:${req.url}`;
    console.log(log);

    fs.appendFile("server.log",log + '\n',(err) => {
        if(error){
            console.log("Error while writing the server log");
        }
    });
    next();
});

app.use((req,res,next) => {
    res.render("maintenance.hbs",{
        pagetitle: "Maintenance page",
        welcomemessage: "The API is under maintainance."
    });
});

app.get('/',(req,res) => {
    // res.send("<h1>Hello Express</h1>");
    res.render("home.hbs",{
        pagetitle: "Home page",
        welcomemessage: "Hello Shekhar! How are you."
    });
});

app.get('/about',(req,res) => {
    res.render("about.hbs",{
        pagetitle: "About page",
    });
});

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: "Unable to process request"
    });
})

app.listen(3000,()=>{
    console.log("server started");
});