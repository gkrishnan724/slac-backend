const localStrategy = require('passport-local').Strategy;
const express = require('express');
const dbConnection = require('./db');
const bcrypt = require('bcrypt');
const mode = process.env.mode || "development";
const dbURL = (process.env.DATABASE_URL ) || "postgres://postgres:root@localhost:5432/slac"
let Strategy = new localStrategy(function(username,password,done){
   
    let db = new dbConnection(dbURL);
    let result;
    if(validateEmail(username)){
        
        result = db.getUser(username,"user_email");
    }
    else{
        result = db.getUser(username);
    }
    result.then(function(data){
        if(data.length == 0){
            return done(null,false,{message:"User does not exist"});
        }
        bcrypt.compare(password,data[0].password,function(err,resp){
            if(err){
                
                return done(null,false,{message:"Auth failure"});
            }
            if(resp){
                
                return done(null,data[0]);
            }
            return done(null,false,{message:"Auth failure"});
        });
    },function(err){
        return done(null,false,{message:"Auth failure"});

    });
});

let serializer = function(user, done) {
    done(null, user.user_id);
}


let deserializer = function(user, done) {
    let db = new dbConnection(dbURL);
    let result = db.getUser(user)
    result.then(function(data){
        done(null,{id:data[0].user_id,type:data[0].user_type});
    });
}
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    Strategy:Strategy,
    Serializer:serializer,
    deSerializer:deserializer
};

