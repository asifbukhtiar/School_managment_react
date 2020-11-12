const { Router } = require('express');
const router = Router();
const studentRoutes = require('./student.routes');
const userRoutes = require('./user.routes');
const teacherRoutes = require('./teacher.routes');
const feeRoutes = require('./studentFee.routes');

router.get('/', (req, res) => res.send('Welcome'))

router.use('/student', studentRoutes);

router.use('/user', userRoutes);
router.use('/teacher', teacherRoutes);
router.use('/fee', feeRoutes);


module.exports = router