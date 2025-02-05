const express = require("express");
const { processPayment, generateQRCode } = require("../controllers/paymentController");

const router = express.Router();

router.post("/process", processPayment);
router.post("/generate-qr", generateQRCode);

module.exports = router;