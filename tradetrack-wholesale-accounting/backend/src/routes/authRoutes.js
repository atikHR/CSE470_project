const router = require("express").Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/auth");

// Public routes
router.post("/login", authController.login);
router.post("/register", authController.register);

// Protected routes
router.get("/profile", authenticateToken, authController.getProfile);
router.put("/profile", authenticateToken, authController.updateProfile);

module.exports = router;
