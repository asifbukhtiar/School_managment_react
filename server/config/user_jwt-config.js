let appConstants = require('./app-constant.js');
module.exports = {
  jwtSecret: 'developers',
  jwtUserSecret: "jwtUserSecret",
  jwtUserVerificationSecret: "jwtUserVerificationSecret",
  userVerificationURL: appConstants.SERVER_URL.concat('/user/verify?token='),
  userAccessTokenValidTime: '5d',
  userVerificationAccessTokenTime: "30m",
  // admin user 
  adminUser: {
    email : "asad@admin.com",
    password: "asad@student"
  },
  //see bellow
  emailAuth: {
    
  }
};
//please goto this url for use gmail and checked
//https://myaccount.google.com/lesssecureapps?pli=1