const router = require("express").Router();
const supplierController = require("../controllers/supplierController");

router.post("/categorylist", supplierController.getProductCategory);
router.post("/addcategory", supplierController.addProductCategory);
router.post("/deletecategory", supplierController.deleteProductCategory);
router.post("/addproduct", supplierController.addProduct);
router.post("/productlist", supplierController.getProducts);

// router.post("/statement", supplierController.getStatementDesc);

module.exports = router;
