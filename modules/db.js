const pg = require('pg');


function Database(connectionURI){
    this.connectionURI = connectionURI;
}

Database.prototype.connect = async function(){
    var self = this;
    
    try{
        self.conn = new pg.Client(self.connectionURI);
        await self.conn.connect();
        
    }catch(err){
        throw Error(err);
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
        self.conn.end();
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
        self.conn.end();
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
        self.conn.end();
        return;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}


Database.prototype.getSpecs = async function(username){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `SELECT spec_name FROM user_spec where user_id = '${username}'`;
        var result = await self.conn.query(query);
        await self.conn.query('COMMIT');
        self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}



Database.prototype.getDiseases = async function(){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `SELECT * FROM diseases;`;
        var result = await self.conn.query(query);
        await self.conn.query('COMMIT');
        self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}

Database.prototype.getSymptoms = async function(){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `SELECT * FROM symptoms;`;
        var result = await self.conn.query(query);
        await self.conn.query('COMMIT');
        self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}

Database.prototype.createExp = async function(data){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `INSERT INTO experience (user_id,cure_desc) VALUES('${data.username}','${data.cure_desc}');`;
        var result = await self.conn.query(query);
        var query = `SELECT MAX(exp_id) from experience;`
        var result = await self.conn.query(query);
        var exp_id = result.rows[0].max;
        for(var i=0;i<data.symptoms.length;i++){
            var symp_id = data.symptoms[i];
            var query = `INSERT INTO exp_symptom (exp_id,symp_id) VALUES('${exp_id}','${symp_id}');`;
            var result = await self.conn.query(query);
        }
        for(var i=0;i<data.diseases.length;i++){
            var disease_id = data.diseases[i];
            var query = `INSERT INTO exp_disease (exp_id,disease_id) VALUES('${exp_id}','${disease_id}');`;
            var result = await self.conn.query(query);
        }
        await self.conn.query('COMMIT');
        self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}

Database.prototype.getExp = async function(username){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `SELECT symptom_name from symptoms where symp_id IN (SELECT symp_id from exp_symptom WHERE exp_id = (SELECT exp_id from experience where user_id= '${username}));`;
        var result = await self.conn.query(query);
        let resp = {}
        resp.symptoms = result.rows;
        var query = `SELECT disease_name from diseases where disease_id IN (SELECT disease_id from exp_disease WHERE exp_id = (SELECT exp_id from experience where user_id= '${username}));`;
        var result = await self.conn.query(query);
        resp.diseases = result.rows;
        var query = `SELECT cure_desc from experience where user_id = '${username}';`
        var result = await self.conn.query(query);
        resp.cure_desc = result.rows[0];
        await self.conn.query("COMMIT");
        await self.conn.end();
        return resp;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}

Database.prototype.getDisease =  async function(data){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        let resp = [];
        var query = `SELECT disease_name from diseases where disease_id='${data.code}'`
        var result = await self.conn.query(query);
        await self.conn.query("COMMIT");
        await self.conn.end();
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}

Database.prototype.getSymptom =  async function(disease){
    var self = this;
    try{
        self.connect();
        await self.conn.query('BEGIN');
        var query = `SELECT symp_name from disease_symp INNER JOIN symptoms where disease_symp.disease_id='${disease.code}'`
        await self.conn.query("COMMIT");
        return result.rows;
    }
    catch(err){
        await self.conn.query('ROLLBACK');
        throw Error(err);
    }
}


module.exports = Database;
