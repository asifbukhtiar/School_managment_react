let jwt = require('jsonwebtoken');
let Teacher = require("../models/teacher.model.js");
let config = require('../../config/user_jwt-config.js');
let sharedService = require('./shared.service.js');
let _ = require('lodash');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let createTeacher = async (data) => {
    try {
          let createdTeacher = await Teacher.create(data);
          return await sharedService.setSuccessAndDataInResponse({ createdTeacher }, 'teacher created successfully');
      
    } catch (error) {
      return await sharedService.setErrorInResponse('error during teacher created');
    }
  }
module.exports = {
  createTeacher
}