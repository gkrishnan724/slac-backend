const express = require('express');
const dbconnection = require('../modules/db');
const mode = process.env.mode || "development"
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const dbURL = (process.env.DATABASE_URL )|| "postgres://postgres:root@localhost:5432/slac"
const authModule = require('../modules/loginStrategy');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY || 'lol';
var app = express.Router();




//Passport configurations

passport.use(authModule.Strategy);
passport.serializeUser(authModule.Serializer);
passport.deserializeUser(authModule.deSerializer);

//Public Routes
app.post('/login',passport.authenticate('local'),function(req,res){
    
    res.status(200).json({
        user:req.user.user_id
    });
});


app.post('/dash',ensureAuthenticated,function(req, res, next) {
    res.status(200).json({
        user:req.user
    })
});

app.post('/register',function(req,res,next){
    
    var missing = [];
    if(req.body){
        if(!req.body.username){
            missing.push("username");
        }
        if(!req.body.password){
            missing.push("password");
        }
        if(!req.body.specs || req.body.specs.length == 0){
            missing.push("specialisations");
        }
        if(!req.body.email || !validateEmail(req.body.email) ){
            missing.push("Email not valid");
        }
        if(!req.body.name){
            missing.push("name");
        }
        if(!req.body.institution){
            missing.push("institution");
        }

        if(missing.length > 0){
            return res.status(400).json({
                "message":missing.toString() + " fields are missing"
            });
        }
        else{
            let db = new dbconnection(dbURL);
            let result = db.getUser(req.body.username);
            result.then(function(data){
                if(data.length > 0){
                    return res.status(400).json({
                        'message':"User already exists"
                    });
                }
                bcrypt.hash(req.body.password,10,function(err,hash){
                    if(err){
                        next(err);
                    }
                    else{
                        req.body.password = hash;
                        let result = db.createUser(req.body);
                        return result.then(function(data){
                            db.conn.end();
                            return res.status(200).json({
                                'message':'Created new user!'
                            });
                        },function(err){
                            next(err);
                        });
                    }
                    
                });
            },function(err){
                next(err);
            });
        }
    }
});

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){ return next();}
    
    return res.status(401).json({
        message:"You are not authenticated!"
    }); 
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports = app;