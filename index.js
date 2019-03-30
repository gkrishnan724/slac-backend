//Node modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');


//ENV variables
//Secret and mode
//Error handlers
const mode = process.env.mode || "development";
const secretKey = process.env.SECRET_KEY || 'lol';
const PORT = process.env.PORT || 5000;
const dbURL = (process.env.DATABASE_URL )|| "postgres://postgres:root@localhost:5432/slac"


var app = express();
app.set('view engine','ejs');

//Routes
const api = require('./routes/api');

// Middlewares
app.use(session({   //Express session
    secret: secretKey,
    saveUninitialized: true,
    resave: true
})); 
app.use(cookieParser())
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());  
                            
app.use(passport.initialize());   // passport initialize middleware
app.use(passport.session()); 

  



//Routes

app.use('/api',api);




//Handle 404
app.use(function(req,res){
    return res.status(404).json({
        message:"Page not found"
    });
})

//Error handler for development mode.
if(mode == "development"){
    app.use(function(err,req,res,next){
        res.status(err.status || 500);
        res.render('error',{
            message:err.message,
            error:err
        });
    });
}

//Error handler in production mode.
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: "Internal server Error",
        error: {}
    });
});


app.listen(PORT,function(){
    console.log("Server started at Port: " + PORT);
});
