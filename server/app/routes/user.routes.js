const { Router, json } = require('express');
const router = Router();
    const users = require('../controllers/user.controller.js');

    // login user
    router.post('/login', users.loginUser);
    router.post('/change-password', users.update);

module.exports = router