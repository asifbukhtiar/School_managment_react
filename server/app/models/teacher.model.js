const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },
        fatherName : {
            type : String,
            required : true
        },
        cnic: {
            type : String,
            required : true
        },
        isWithDraw : {
            type : Boolean,
            default : false,
            required : true
        },
        phone : {
            type : String,
            required : true
        },
        dob : {
            type : String,
            required : true
        },
        joiningDate : {
            type : String,
            required : true
        },
        qualification : {
            type : String,
            required : true
        },
        address : {
            type : String,
            required : true
        },
        image_url : {
            type : String
        },
        resign_data : {
            type : String
        },
        salary: {
            type : String,
            required : true,
            default : false
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Teacher', TeacherSchema);