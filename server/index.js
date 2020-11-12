const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var http = require('http');
const path = require("path");
const fs = require("fs");
// mongoose.Promise = global.Promise;
const dbConfig = require('./config/database.config.js');
const userService = require('./app/services/user.service.js');
const routes = require("./app/routes");
const mysql = require('mysql');
// mongoose.Promise = global.Promise;
app.use(fileUpload({
    createParentPath: true
}));
// alert(dbConfig.url)
app.use("/",express.static('uploads'));
app.use(express.static("views"));

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use(express.json(true));

// const conn = mysql.createConnection({
//   host: 'localhost',
//   user: 'ahmadpub_ahmadjellani',
//   password: 'ahmadjellani*&)',
//   database: 'ahmadpub_ahmad_school'
// });
 
// //connect to database
// conn.connect((err) =>{
//   if(err) throw err;
//   console.log('Mysql Connected...');
// });

// const MongoClient = require('mongodb').MongoClient;


//  const client = new MongoClient(dbConfig.url, { useNewUrlParser: true,useUnifiedTopology: true });
//  client.connect(err => {
//      if(err){
//          console.log("mongodb error", err);
         
//      }else{
//          console.log("mongodb connected")
//           const collection = client.db("ahmad_school");
//           // perform actions on the collection object
//           client.close();
//      }

// });
// async function main(){
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
 
//     } catch (e) {
//         console.error("mongodb connection error",e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);

// async function connectDb () {
//     try {
//         await mongoose.connect(dbConfig.url,  {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

//         console.info(`Connected to database on Worker process: ${process.pid}`)
//     } catch (error) {
//         console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`)
//         process.exit(1)
//     }
// }
// connectDb()
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true,
//     // useUnifiedTopology: true
// }, function(err){
//     if(err){
//         console.log('Could not connect to the MongoDB database. Exiting now...', err);
//         process.exit();
//     } else {
//         console.log("Successfully connected to the MongoDB database");
//     }
// })
// mongoose.connection.on('connected',() => {
//     console.log("mongoose connected ")
// })
app.use("/",routes)

app.get("/",(req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, "views", "index.html"));
    // res.send(dbConfig.url);
})


http.createServer(app).listen(3001);