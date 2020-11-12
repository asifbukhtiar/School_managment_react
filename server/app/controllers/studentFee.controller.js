const fs = require('fs');
var path = require('path');
const multer = require('multer');
const upload = multer();
const conn = require("../../connection");
let HTTP_STATUS_CODES = require('../../config/app-constant').HTTP_STATUS_CODES;
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../../uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// });

//will be using this for uplading
// const upload = multer({ storage: storage });
const StudentFeeModel = require('../models/fee.model');
const StudentModel = require('../models/sudent.model');
const sharedService = require('../services/shared.service.js');

// Create and Save a new Student
exports.create =  async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student fee content can not be empty"
        });
    }
    try{
          conn.query(`INSERT INTO  fee (stdName,admissionFee,monthlyFee,totalFee,stdClass,receivedAmount,remainingFee,receivedDate,std_id) VALUES("${req.body.stdName}","${req.body.admissionFee}","${req.body.monthlyFee}","${req.body.totalFee}","${req.body.stdClass}","${req.body.receivedAmount}","${req.body.remainingFee}","${req.body.receivedDate}",${req.body.stdId})`, (err,result) => {
            if(!err){
                res.send({success : 1, data:result, message : "Student fee created successfully"});
            }else{
                res.send({success : 0, data:"", message : "error in gettting  student fees"});
            }
        })        
    }catch(error){
        console.log(error)
    }



};

// Retrieve and return all student from the database.
exports.findAll = (req, res) => {
    conn.query("SELECT * from fee where std_id = " + req.query.stdId, (err,result) => {
        if(!err){
            res.send({success : 1, data :result && result.length == 0 ? null : result});
        }else{
            res.status(500).send({success : 0,
                message: err.message || "Some error occurred while retrieving students fee."
            });
        }
    })

};

// Find a single note with a studentId
exports.findOne = (req, res) => {
    StudentFeeModel.findById(req.params.id)
    .then(fee => {
        if(!fee) {
            return res.status(404).send({
                message: "fee not found with id " + req.params.id
            });            
        }
        res.send(fee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student fee not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving studen fee with id " + req.params.id
        });
    });

};

// Update a note identified by the studentId in the request
exports.update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student fee content can not be empty"
        });
    }
    try{
            StudentFeeModel.findByIdAndUpdate(req.params.id, {
              stdName: req.body.stdName,
              admissionFee: req.body.admissionFee,
              monthlyFee : req.body.monthlyFee,
              totalFee: req.body.totalFee,
              stdClass : req.body.stdClass,
              receivedAmount : req.body.receivedAmount,
              remainingFee : req.body.remainingFee,
              receivedDate : req.body.receivedDate,
              studentId: req.body.stdId
            }, {new: true})
            .then(fee => {
                if(!fee) {
                    return res.status(404).send({success : 0,
                        message: "Student fee not found with id " + req.params.id
                    });
                }
                res.send({data : fee, success : 1, message : "student update successfully"});
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Student fee not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating student fee with id " + req.params.id
                });
            });
        
        
    }catch(error){
        console.log(error)
    }
    // Find student and update it with the request body
    

};