const express = require("express");
const router = express.Router();
const doordashController = require('../controllers/doordashController');

router.get("/search", doordashController.searchDoordash);

module.exports = router;