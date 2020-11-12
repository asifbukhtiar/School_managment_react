const TeacherModel = require('../models/teacher.model.js');
const sharedService = require('../services/shared.service.js');
const conn = require("../../connection");
let HTTP_STATUS_CODES = require('../../config/app-constant').HTTP_STATUS_CODES;
// Create and Save a new Teacher
exports.create = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Teacher content can not be empty"
        });
    }

    // Create a teacher
    try{
        if(req.files){
            
            let response = await sharedService.uploadImage(req.files.image_url);

            if(response  && response.success == 1){
                conn.query(`INSERT INTO  teacher (name,address,fatherName,cnic,phone,dob,joiningDate,qualification,salary,isWithDraw,image_url,resign_data) VALUES("${req.body.name}","${req.body.address}","${req.body.fatherName}","${req.body.cnic}","${req.body.phone}","${req.body.dob}","${req.body.joiningDate}","${req.body.qualification}","${req.body.salary}","${req.body.isWithdraw}","${response.url}","${req.body.resign_data}")`, (err,result) => {
                    if(!err){
                        res.send({success : 1, data:result, message : "Teacher created successfully"});
                    }else{
                        res.send({success : 0, data:"", message : "error in creating teacher"});
                    }
                })
            }
        }else{
            conn.query(`INSERT INTO  teacher (name,address,fatherName,cnic,phone,dob,joiningDate,qualification,salary,isWithDraw,image_url,resign_data) VALUES("${req.body.name}","${req.body.address}","${req.body.fatherName}","${req.body.cnic}","${req.body.phone}","${req.body.dob}","${req.body.joiningDate}","${req.body.qualification}","${req.body.salary}","${req.body.isWithdraw}","","${req.body.resign_data}")`, (err,result) => {
                if(!err){
                    res.send({success : 1, data:result, message : "Teacher created successfully"});
                }else{
                    res.send({success : 0, data:"", message : "error in creating teacher"});
                }
            })
        }
        
    }catch(error){
        console.log(error)
    }
    

};

// Retrieve and return all teacher from the database.
exports.findAll = (req, res) => {
    conn.query("SELECT * from teacher where isWithdraw=" + req.query.isServed, (err,result) => {
        if(!err){
            res.send({success : 1, data :result && result.length == 0 ? null : result});
        }else{
            res.status(500).send({success : 0,
                message: err || "Some error occurred while retrieving teachers."
            });
        }
    })

};

// Find a single teacher with a teacherId
exports.findOne = (req, res) => {
    TeacherModel.findById(req.params.teacherId)
    .then(teacher => {
        if(!teacher) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teacherId
            });            
        }
        res.send(teacher);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teacherId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving teacher with id " + req.params.teacherId
        });
    });

};

// Update a note identified by the teacherId in the request
exports.update = async (req, res) => {
    
    if(!req.body) {
        return res.status(400).send({
            message: "Teacher content can not be empty"
        });
    }
    try{
        if(req.files){
            
            let response = await sharedService.uploadImage(req.files.image_url);

            if(response  && response.success == 1){
                conn.query(`UPDATE teacher set name = "${req.body.name}",fatherName = "${req.body.fatherName}",cnic = "${req.body.cnic}",phone = "${req.body.phone}",qualification = "${req.body.qualification}",address = "${req.body.address}",joiningDate = "${req.body.joiningDate}",dob = "${req.body.dob}",isWithdraw = "${req.body.isWithdraw}",salary = "${req.body.salary}",image_url = "${response.url}",resign_data = "${req.body.resign_data}"  WHERE id= ${Number(req.params.teacherId)}`, (err,result) => {
                    if(!err){
                        res.send({success : 1, data:result, message : "teacher update successfully"});
                    }else{
                        res.send({success : 0, data:"", message : "error in updating teacher"});
                    }
                })
            }
        }else{
            conn.query(`UPDATE teacher set name = "${req.body.name}",fatherName = "${req.body.fatherName}",cnic = "${req.body.cnic}",phone = "${req.body.phone}",qualification = "${req.body.qualification}",address = "${req.body.address}",joiningDate = "${req.body.joiningDate}",dob = "${req.body.dob}",isWithdraw = "${req.body.isWithdraw}",salary = "${req.body.salary}",image_url = "",resign_data = "${req.body.resign_data}"  WHERE id= ${Number(req.params.teacherId)}`, (err,result) => {
                if(!err){
                    res.send({success : 1, data:result, message : "teacher update successfully"});
                }else{
                    res.send({success : 0, data:"", message : "error in updating teacher"});
                }
            })
        }
        
    }catch(error){
        console.log(error)
    }
    // Find teacher and update it with the request body
    
    

};

// Delete a note with the specified teacherId in the request
exports.delete = (req, res) => {
    TeacherModel.findByIdAndRemove(req.params.noteId)
    .then(teacher => {
        if(!teacher) {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teacherId
            });
        }
        res.send({message: "Teacher deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Teacher not found with id " + req.params.teacherId
            });                
        }
        return res.status(500).send({
            message: "Could not delete teacher with id " + req.params.teacherId
        });
    });

};