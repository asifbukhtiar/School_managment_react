const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
let constant = require('../../config/app-constant');
let HTTP_STATUS_CODES = require('../../config/app-constant').HTTP_STATUS_CODES;
let setErrorInResponse = async (message) => {
    return {
        clientResponse: {
            isSuccess: false,
            message: message
        },
        statusCode: HTTP_STATUS_CODES.FORBIDDEN
    }
}
let setSuccessAndDataInResponse = async (data, message) => {
    return {
        clientResponse: {
            isSuccess: true,
            message: message,
            data: data
        },
        statusCode: HTTP_STATUS_CODES.SUCCESS
    }
}
let uploadImage = async (file)=>{
    app.use(fileUpload({
        createParentPath: true
    }));
    let avatar = file;
    let fileName = Date.now() + avatar.name;
    uploadPath = './uploads/' + fileName;
    var res = await avatar.mv(uploadPath)
    if(res){
        return {success : 0, message : "error in uploading image please try later"}
    }else{
       return {success : 1, url : "/" + fileName}
    }

    
}
module.exports = {
    setErrorInResponse,
    setSuccessAndDataInResponse,
    uploadImage
}