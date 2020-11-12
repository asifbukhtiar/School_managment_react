const { Router, json } = require('express');
const router = Router();
    const studentFee = require('../controllers/studentFee.controller.js');
    const middlware = require("../../config/user-auth-veification")
    // Create a new Student
    router.post('/create',middlware.varifyToken, studentFee.create);

    // Retrieve all students
    router.get('/',middlware.varifyToken, studentFee.findAll);

    // Retrieve a single Note with noteId
    router.get('/:id',middlware.varifyToken, studentFee.findOne);

    // Update a Note with noteId
    router.put('/:id',middlware.varifyToken, studentFee.update);

module.exports = router