// routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/PropertyController'); // Fixed case sensitivity

console.log('Property routes loaded'); // Debug log
router.post('/', propertyController.createProperty);
router.get('/', propertyController.getAllProperties);
router.get('/:itemId', propertyController.getPropertyById);
router.patch('/:itemId', propertyController.editPropertyById);
router.delete('/:itemId', propertyController.deletePropertyById);
router.put('/:itemId', propertyController.editPropertyById);

module.exports = router;