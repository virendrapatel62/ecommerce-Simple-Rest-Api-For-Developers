const express = require('express');
const router = express.Router();
const checkAuths = require('../middleware/check-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.signUp);

router.post('/login', UserController.logIn);

router.delete('/:userId', checkAuths.adminAuth, UserController.deleteUser)

router.get('/me', checkAuths.userAuth, UserController.getProfile)

module.exports = router;