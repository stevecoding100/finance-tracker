const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get("/user/profile", authController.getUserProfile);
router.put("/user/updateuser/:userId", authController.updateUser);

module.exports = router;
