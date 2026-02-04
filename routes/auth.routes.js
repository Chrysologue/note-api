const authController = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();
const utilities = require('../utilities/index');

router.post(
  '/auth/register',
  utilities.handleAsyncError(authController.register),
);
router.post('/auth/login', utilities.handleAsyncError(authController.signIn));

module.exports = router;
