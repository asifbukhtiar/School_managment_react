let userService = require('../services/user.service.js');
let sharedService = require('../services/shared.service.js');
let HTTP_STATUS_CODES = require('../../config/app-constant').HTTP_STATUS_CODES;
let loginUser = async (req, res) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let loginResponse = await userService.login(email, password);
      return res.status(loginResponse.statusCode).send(loginResponse.clientResponse);
    } catch (error) {
      let errorResponse = await sharedService.setErrorInResponse('We are unable to process request');
      return res.status(errorResponse.statusCode).send(errorResponse.clientResponse);
    }
  }
  let update = async (req, res) => {
    try {
      let confirmPassword = req.body.confirmPassword;
      let password = req.body.password;
      let loginResponse = await userService.changePassword(password, confirmPassword);
      return res.status(loginResponse.statusCode).send(loginResponse.clientResponse);
    } catch (error) {
      let errorResponse = await sharedService.setErrorInResponse('We are unable to process request');
      return res.status(errorResponse.statusCode).send(errorResponse.clientResponse);
    }
  }
  module.exports = {
      loginUser,
      update
  }