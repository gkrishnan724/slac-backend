const pg = require('pg');


function Database(connectionURI){
    this.connectionURI = connectionURI;
}

Database.prototype.connect = async function(){
    var self = this;
    
    if(!self.conn){
        try{
            self.conn = new pg.Client(self.connectionURI);
            await self.conn.connect();
            
        }catch(err){
            throw Error(err);
        }
    }
}

//Define DB functions.


Database.prototype.getAllUsers = async function(){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = "SELECT * from users";
        var result = await self.conn.query(query);
        await self.conn.query('COMMIT');
        return result.rows;
    }catch(err){
        await self.conn.query('ROLLBACK');
        throw Error (err)
    }
}


Database.prototype.getUser = async function(username,type){
    type = type?type:"user_id"
    
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `SELECT * from users WHERE ${type} = '${username}'`
        var result = await self.conn.query(query);
        console.log(result.rows);
        await self.conn.query('COMMIT');
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}

Database.prototype.createUser = async function(data){
    var self = this;
    
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `INSERT INTO users (user_id,user_email,password,name,institution) VALUES ('${data.username}','${data.email}','${data.password}','${data.name}','${data.institution}')`;
        var result = await self.conn.query(query);
        for(var i=0;i<data.specs.length;i++){
            var spec = data.specs[i];
            var query = `INSERT INTO user_spec (user_id,spec_name) VALUES('${data.username}','${spec}');`
            var result = await self.conn.query(query);
        }
        await self.conn.query('COMMIT');
        return;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}






module.exports = Database;
