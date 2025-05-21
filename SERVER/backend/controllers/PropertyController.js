// controllers/propertyController.js
const Property = require('../models/Property'); // Fixed import path

// POST: Create a new property
exports.createProperty = async (req, res) => {
  console.log('POST /api/properties received:', req.body); // Debug log
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json({ message: 'Property created successfully', property });
  } catch (error) {
    console.error('Error in createProperty:', error); // Debug log
    res.status(400).json({ message: 'Error creating property', error: error.message });
  }
};

// GET: Get all properties
exports.getAllProperties = async (req, res) => {
  console.log('GET /api/properties received'); // Debug log
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error('Error in getAllProperties:', error); // Debug log
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// GET: Get property by ID
exports.getPropertyById = async (req, res) => {
  console.log(`GET /api/properties/${req.params.itemId} received`); // Debug log
  try {
    const property = await Property.findById(req.params.itemId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error('Error in getPropertyById:', error); // Debug log
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

// PATCH: Edit property by ID
exports.editPropertyById = async (req, res) => {
  console.log(`PATCH /api/properties/${req.params.itemId} received`); // Debug log
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.itemId,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    console.error('Error in editPropertyById:', error); // Debug log
    res.status(400).json({ message: 'Error updating property', error: error.message });
  }
};

// DELETE: Delete property by ID
exports.deletePropertyById = async (req, res) => {
  console.log(`DELETE /api/properties/${req.params.itemId} received`); // Debug log
  try {
    const property = await Property.findByIdAndDelete(req.params.itemId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error in deletePropertyById:', error); // Debug log
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};