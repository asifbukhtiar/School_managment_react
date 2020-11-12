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
const StudentModel = require('../models/sudent.model.js');
const sharedService = require('../services/shared.service.js');

// Create and Save a new Student
exports.create =  async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }
    try{
        if(req.files){
            
            let response = await sharedService.uploadImage(req.files.image_url);

            if(response  && response.success == 1){
                conn.query(`INSERT INTO  student (registration,name,fatherName,fatherCnic,fatherMobile,dob,bForm,class,isWithdraw,drop_out_date,image_url,address,admissionDate) VALUES("${req.body.registration}","${req.body.name}","${req.body.fatherName}","${req.body.fatherCnic}","${req.body.fatherPh}","${req.body.dob}","${req.body.bForm}","${req.body.className}","${req.body.isWithdraw}","${req.body.drop_out_date}","${response.url}","${req.body.address}","${admissionDate}")`, (err,result) => {
                    if(!err){
                        res.send({success : 1, data:result, message : "Student created successfully"});
                    }else{
                        res.send({success : 0, data:"", message : "error in creating student"});
                    }
                })
            }
        }else{
            conn.query(`INSERT INTO  student (registration,name,fatherName,fatherCnic,fatherMobile,dob,bForm,class,isWithdraw,drop_out_date,image_url,address,admissionDate) VALUES("${req.body.registration}","${req.body.name}","${req.body.fatherName}","${req.body.fatherCnic}","${req.body.fatherPh}","${req.body.dob}","${req.body.bForm}","${req.body.className}","${req.body.isWithdraw}","${req.body.drop_out_date}","","${req.body.address}","${req.body.admissionDate}")`, (err,result) => {
                if(!err){
                    res.send({success : 1, data:result, message : "Student created successfully"});
                }else{
                    res.send({success : 0, data:"", message : "error in creating student"});
                }
            })
        }
        
    }catch(error){
        console.log(error)
    }



};

// Retrieve and return all student from the database.
exports.findAll = (req, res) => {
    conn.query("SELECT * from student where isWithdraw=" + req.query.isServed , (err,result) => {
        if(!err){
            res.send({success : 1, data :result && result.length == 0 ? null : result});
        }else{
            res.status(500).send({success : 0,
                message: err || "Some error occurred while retrieving students."
            });
        }
    })

};

// Find a single note with a studentId
exports.findOne = (req, res) => {
    StudentModel.findById(req.params.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.studentId
            });            
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.studentId
        });
    });

};

// Update a note identified by the studentId in the request
exports.update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }
    try{
        if(req.files){
            
            let response = await sharedService.uploadImage(req.files.image_url);

            if(response  && response.success == 1){
                conn.query(`UPDATE student set registration = "${req.body.registration}",name = "${req.body.name}",fatherName = "${req.body.fatherName}",fatherCnic = "${req.body.fatherCnic}",fatherMobile = "${req.body.fatherPh}",dob = "${req.body.dob}",bForm = "${req.body.bForm}",class = "${req.body.className}",isWithdraw = "${req.body.isWithdraw}",drop_out_date = "${req.body.drop_out_date}",image_url = "${response.url}",address = "${req.body.address}",admissionDate = "${req.body.admissionDate}"  WHERE id= ${Number(req.params.stdId)}`, (err,result) => {
                    if(!err){
                        res.send({success : 1, data:result, message : "Student update successfully"});
                    }else{
                        res.send({success : 0, data:"", message : "error in updating student"});
                    }
                })
            }
        }else{
            conn.query(`UPDATE student set registration = "${req.body.registration}",name = "${req.body.name}",fatherName = "${req.body.fatherName}",fatherCnic = "${req.body.fatherCnic}",fatherMobile = "${req.body.fatherPh}",dob = "${req.body.dob}",bForm = "${req.body.bForm}",class = "${req.body.className}",isWithdraw = "${req.body.isWithdraw}",drop_out_date = "${req.body.drop_out_date}",image_url = "${req.body.image_url}",address = "${req.body.address}", admissionDate="${req.body.admissionDate}"  WHERE id= ${Number(req.params.stdId)}`, (err,result) => {
                if(!err){
                    res.send({success : 1, data:result, message : "Student update successfully"});
                }else{
                    res.send({success : 0, data:"", message : "error in updating student"});
                }
            })

        }
        
    }catch(error){
        console.log(error)
    }
    // Find student and update it with the request body
    

};

// Delete a note with the specified studentId in the request
exports.delete = (req, res) => {
    StudentModel.findByIdAndRemove(req.params.noteId)
    .then(student => {
        if(!student) {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });
        }
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.studentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete student with id " + req.params.studentId
        });
    });

};