const express = require('express');
const router = express.Router();
const taskControllers = require('../controllers/taskController')

router.post('/task', taskControllers.task);
router.get('/items', taskControllers.items);
router.delete('/delete/:id', taskControllers.deleteTask);
router.put('/iscomplete/:id', taskControllers.isComplete);
router.put('/update/:id',taskControllers.updateTask);



module.exports = router;