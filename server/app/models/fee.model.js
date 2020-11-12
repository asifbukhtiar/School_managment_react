const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StudentFeeSchema = mongoose.Schema(
    {
        stdName: {
            type : String,
            required : true
        },
        admissionFee: {
            type : String,
            required : true
        },
        monthlyFee : {
            type : String,
            required : true
        },
        totalFee: {
            type : String,
            required : true
        },
        stdClass : {
            type : String,
            required : true
        },
        receivedAmount : {
            type : String
        },
        remainingFee : {
            type : String
        },
        receivedDate : {
            type : String
        },
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Fee', StudentFeeSchema);