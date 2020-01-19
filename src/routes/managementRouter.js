const express = require("express");
const router = express.Router();
const management = require('../controllers/managementController');

router.get("/", management.test);

module.exports = router;