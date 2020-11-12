let jwt = require('jsonwebtoken');
let User = require("../models/user.model.js");
let config = require('../../config/user_jwt-config.js');
let sharedService = require('./shared.service.js');
let _ = require('lodash');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const conn = require("../../connection");
let HTTP_STATUS_CODES = require('../../config/app-constant').HTTP_STATUS_CODES;
let login = async (email, password) => {
  try {
    if (!email || !password) {
      return await sharedService.setErrorInResponse('Not exist email/password');
    }
    let test = await conn.query(`SELECT * from user where email='${email}'`);
    console.log(test)
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * from user where email='${email}'`, async (err,result) => {
              if (!err && result.length > 0) {
                if (await bcrypt.compare(password, result[0].password)) {
                  let token = jwt.sign(_.pick( result[0], ['email', 'id']),
                    config.jwtUserSecret,
                    {
                      expiresIn: config.userAccessTokenValidTime// expires in 24 hours
                    }
                  );
                  resolve({statusCode : HTTP_STATUS_CODES.SUCCESS, clientResponse : {isSuccess: true,data : {access_token: token}, message : "login successfully"}})
                  // return await sharedService.setSuccessAndDataInResponse({ access_token: token }, 'login successfully');
                } else {
                  resolve({statusCode : HTTP_STATUS_CODES.SUCCESS, clientResponse : {isSuccess: false,data : "", message : "password is not valid please check your password"}})
                  // return await sharedService.setErrorInResponse("password is not valid please check your password");
                }
              } 
              else if(!err && result.length == 0){
                resolve({statusCode : HTTP_STATUS_CODES.SUCCESS, clientResponse : {isSuccess: false,data : "", message : "user not found"}})

              }
              else {
                // return await sharedService.setErrorInResponse('unable to find user with provided credentials');
                reject({statusCode : HTTP_STATUS_CODES.FORBIDDEN, clientResponse : {isSuccess: false,data : "", message : "unable to find user with provided credentials"}})

              }
            });
    })
     
  } catch (error) {
    return await sharedService.setErrorInResponse('error during login process');
  }
  }
  let changePassword = async (password, confirmPassword) => {
    try {
      if (!password || !confirmPassword) {
        return await sharedService.setErrorInResponse('password or confirm password missing');
      }
      var newPassword =  await bcrypt.hash(password, saltRounds);
      var email =  config.adminUser.email
     
      return new Promise((resolve, reject) => {
          conn.query(`UPDATE user set password = '${newPassword}' where email='${email}'`, async (err,result) => {
            console.log("change password service", result)   
            if (!err && result.changedRows ==  1) {

                    resolve({statusCode : HTTP_STATUS_CODES.SUCCESS, clientResponse : {isSuccess: true,data : {}, message : "Password changed successfully"}})
                    // return await sharedService.setSuccessAndDataInResponse({ access_token: token }, 'login successfully');
                  
                } 
                else if(!err && result.changedRows == 0){
                  resolve({statusCode : HTTP_STATUS_CODES.SUCCESS, clientResponse : {isSuccess: false,data : "", message : "user not found"}})
  
                }
                else {
                  // return await sharedService.setErrorInResponse('unable to find user with provided credentials');
                  reject({statusCode : HTTP_STATUS_CODES.FORBIDDEN, clientResponse : {isSuccess: false,data : "", message : "unable to find user with provided credentials"}})
  
                }
              });
      })
       
    } catch (error) {
      return await sharedService.setErrorInResponse('error during change password Api');
    }
    }
  let checkUserEmailAlreadyExistOrNot = async (email) => {
    try {
      let findUserWithEmail =  conn.query("SELECT * from user");
      if (findUserWithEmail && findUserWithEmail.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return true;
    }
  }
  
let createAdminUser = async () => {
    try {
      let adminUserData = {
        email: config.adminUser.email,
        password: await bcrypt.hash(config.adminUser.password, saltRounds),
      }
      // if (!await checkUserEmailAlreadyExistOrNot(adminUserData.email)) {
        await conn.query(`INSERT INTO user (email, password) VALUES ('test','test')` );
      // }
    } catch (error) {
      console.log('unable to create admin user', error);
    }
  }
module.exports = {
  login,
  checkUserEmailAlreadyExistOrNot,
  createAdminUser,
  changePassword
}