const { Router, json } = require('express');
const router = Router();
    const teacher = require('../controllers/teacher.controller.js');
    const middlware = require("../../config/user-auth-veification")
    // Create a new Student
    router.post('/create',middlware.varifyToken, teacher.create);

    // Retrieve all teacher
    router.get('/',middlware.varifyToken, teacher.findAll);

    // Retrieve a teacher with teacherId
    router.get('/:teacherId',middlware.varifyToken, teacher.findOne);

    // Update a teacher with teacherId
    router.put('/:teacherId',middlware.varifyToken, teacher.update);

    // Delete a teacher with teacherId
    // router.delete('/:stdId', teacher.delete);
module.exports = router