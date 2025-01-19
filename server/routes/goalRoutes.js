const express = require("express");
const goalController = require("../controllers/goalController");
const router = express.Router();

router.post("/create", goalController.createGoal);
router.get("/allgoals/:userId", goalController.getGoalsByUser);
router.get("/:goalId", goalController.getGoalById);
router.put("/update/:goalId", goalController.updateGoal);
router.delete("/delete/:goalId", goalController.deleteGoal);

module.exports = router;
