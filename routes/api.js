const express = require('express');
const dbconnection = require('../modules/db');
const mode = process.env.mode || "development"
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const dbURL = (process.env.DATABASE_URL )|| "postgres://postgres:root@localhost:5432/slac"
const authModule = require('../modules/loginStrategy');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY || 'lol';
const jwt = require('jsonwebtoken');
const PythonShell =  require('python-shell').PythonShell;
var app = express.Router();




//Passport configurations

passport.use(authModule.Strategy);
passport.use(authModule.jwtStrategy);


//Public Routes
app.post('/login',passport.authenticate('local',{session:false}),function(req,res){
    const token = jwt.sign(req.user, secretKey);
    console.log(token);
    return res.status(200).json({accessToken: token});
    
});

// app.get('');

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

app.get('/profile/:user_id',function(req,res,next){
    try{
        let db = new dbconnection(dbURL);
        let result = db.getUser(req.params.user_id);
        let profile = {};
        result.then(function(data){
            if(data.length > 0){
                let r = db.getSpecs(data[0].user_id);
                r.then(function(specs){
                    profile.username = data[0].user_id;
                    profile.specs = specs;
                    profile.email = data[0].user_email;
                    profile.name = data[0].name;
                    profile.institution = data[0].institution;
                    let r1 = db.getExp(data[0].user_id);
                    r1.then(function(exp){
                        profile.experiences = exp;
                        return res.status(200).json(profile);
                    },function(err){
                        next(err);
                    })
                    
                },function(err){
                    next(err);
                });
            }
            else{
                next();
            }
        },function(err){
            next(err);
        });
    }catch(err){
        next(err);
    }
});

app.post('/experience',passport.authenticate('jwt',{session:false}),function(req,res,next){
    var missing = [];
    if(!req.body.symptoms || req.body.symptoms.length == 0){
        missing.push("symptoms");
    }
    if(!req.body.diseases || req.body.diseases.length == 0){
        missing.push("diseases");
    }
    if(!req.body.cure_desc || req.body.cure_desc.length == 0){
        missing.push("Cure length");
    }
    req.body.username = req.user.user_id
    try{
        let db = new dbconnection(dbURL);
        let result  = db.createExp(req.body);
        result.then(function(data){
            return res.status(200).json({
                message:"created experience"
            });
        },function(err){
            next(err);
        })
    }
    catch(err){
        next(err);
    }
    

});

app.get('/symptoms',passport.authenticate('jwt',{session:false}),function(req,res,next){
    try{
        let db = new dbconnection(dbURL);
        let result  = db.getSymptoms();
        result.then(function(data){
            return res.status(200).json({
                symptoms:data
            });
        },function(err){
            next(err);
        })
    }catch(err){
        next(err);
    }
});

app.get('/diseases',passport.authenticate('jwt',{session:false}),function(req,res,next){
    try{
        let db = new dbconnection(dbURL);
        let result  = db.getDiseases();
        result.then(function(data){
            return res.status(200).json({
                diseases:data
            });
        },function(err){
            next(err);
        })
    }catch(err){
        next(err);
    }
});



//Main query

app.post('/diagnosis',passport.authenticate('jwt',{session:false}),function(req,res,next){
    
    var diseases = [];
    PythonShell.run('./python_files/train.py',{args:[req.body.symptoms.toString()]},function(err,results){
        if(err){
            next(err);
        }
        else{
            
           results.forEach(function(result){
                result = result.replace(/'/g, '"'); 
                diseases.push(JSON.parse(result));
           });
            
           return res.status(200).json({
               data:diseases
           });

        }
    });

    
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


module.exports = app;