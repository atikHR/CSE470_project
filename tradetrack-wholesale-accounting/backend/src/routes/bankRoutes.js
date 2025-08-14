const router = require("express").Router();
const bankController = require("../controllers/bankController"); // Import the controller

router.post("/list", bankController.getBankList);
router.post("/add", bankController.addBank);
router.post("/delete", bankController.deleteBank);

router.post("/accountinfo", bankController.getBankAccountInfo);
router.post("/accountlist", bankController.getBankAccountList);
router.post("/account/add", bankController.addBankAccount);

router.post("/transactions/list", bankController.getBankTransactions);
router.post("/transactions/add", bankController.addBankTransaction);

module.exports = router;
