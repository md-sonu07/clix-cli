const express = require("express");
const router = express.Router();

const { __MODULE__Controller } = require("../controllers/__MODULE__.controller");

router.post("/__MODULE__", __MODULE__Controller);

module.exports = router;