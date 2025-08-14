const router = require("express").Router();
const statementController = require("../controllers/statementController");
const { authenticateToken } = require("../middlewares/auth");

// Statement routes
router.post("/list", statementController.getStatements);
router.post("/add", statementController.addStatement);
router.post("/filter", statementController.getFilteredStatements);

// Transaction routes
router.post("/transactions/list", statementController.getTransactions);
router.post("/transactions/add", statementController.addTransaction);

module.exports = router;
