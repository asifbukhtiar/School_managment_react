const mysql = require('mysql');
const userService = require("./app/services/user.service.js")
let config = require('./config/user_jwt-config.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const conn = mysql.createConnection({
    host: 'localhost',
    // user: 'ahmadpub_ahmadjellani',
    // password: 'ahmadjellani*&)',
    // database: 'ahmadpub_ahmad_school',
    user: 'root',
    password: '',
    database: 'ahmad_school',
    multipleStatements: true
  });
   
  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
    
    creatAdminUser();
  });
  let creatAdminUser = async () => {
    conn.query(`SELECT * from user where email='${config.adminUser.email}'`,async (err,result) => {
       if(!err && result.length == 0){
        let password = await bcrypt.hash(config.adminUser.password, saltRounds)
        conn.query(`INSERT INTO user (email, password) VALUES ("${config.adminUser.email}", "${password}")`,(err,result)=>{
            console.log(err)
        } );
       }else{
           console.log(err)
       }

   });

  }
  module.exports = conn