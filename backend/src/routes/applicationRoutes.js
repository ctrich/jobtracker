const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { authenticate } = require('../middleware/auth');
const { applicationValidation, validate } = require('../middleware/validation');

// All routes require authentication
router.use(authenticate);

// Application routes
router.post('/', applicationValidation, validate, applicationController.create);
router.get('/', applicationController.getAll);
router.get('/stats', applicationController.getStats);
router.get('/:id', applicationController.getOne);
router.put('/:id', applicationController.update);
router.delete('/:id', applicationController.delete);

module.exports = router;
