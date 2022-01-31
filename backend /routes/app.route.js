// Third party libraries
const router = require("express").Router();

// Controllers
const { AppController } = require("../controllers");

router.post("/getBalance", AppController.balance);

module.exports = router;
