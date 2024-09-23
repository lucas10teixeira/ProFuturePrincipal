const { Router } = require('express');
const router = Router();

const { storeTask, loginUser } = require('../controller/taskController');

router.post('/store/task', storeTask);
router.post('/login', loginUser);
router.get('get/user/profile')

module.exports = router;
