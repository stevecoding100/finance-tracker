const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.post("/create", transactionController.createTransaction);
router.get("/all/:userId", transactionController.getTransactions);
router.get("/:transactionId", transactionController.getTransactionById);
router.put("/update/:transactionId", transactionController.updateTransaction);
router.delete(
    "/delete/:transactionId",
    transactionController.deleteTransaction
);

module.exports = router;
