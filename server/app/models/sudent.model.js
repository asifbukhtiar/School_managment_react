const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentSchema = mongoose.Schema(
    {
        registration: {
            type : String,
            required : true,
            unique: true,
        },
        name: {
            type : String,
            required : true
        },
        fatherName : {
            type : String,
            required : true
        },
        fatherCnic: {
            type : String,
            required : true
        },
        fatherMobile : {
            type : String,
            required : true
        },
        dob : {
            type : String,
            required : true
        },
        bForm : {
            type : String
        },
        class : {
            type : String,
            required : true
        },
        image_url : {
            type : String
        },
        drop_out_date : {
            type : String
        },
        isWithdraw: {
            type : String,
            required : true,
            default : false
        },
        fees: [{
            type: Schema.Types.ObjectId,
            ref: 'Fee'
        }]
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Student', StudentSchema);