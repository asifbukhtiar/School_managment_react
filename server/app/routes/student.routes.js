const { Router, json } = require('express');
const router = Router();
    const students = require('../controllers/student.controllers.js');
    const middlware = require("../../config/user-auth-veification")
    // Create a new Student
    router.post('/create',middlware.varifyToken, students.create);

    // Retrieve all students
    router.get('/',middlware.varifyToken, students.findAll);

    // Retrieve a single Note with noteId
    router.get('/:stdId',middlware.varifyToken, students.findOne);

    // Update a Note with noteId
    router.put('/:stdId',middlware.varifyToken, students.update);

    // Delete a Note with noteId
    router.delete('/:stdId',middlware.varifyToken, students.delete);
module.exports = router