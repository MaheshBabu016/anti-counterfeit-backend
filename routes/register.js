const express = require("express");
const router = express.Router();
const { contract } = require("../blockchain");
const { generateQR } = require("../qr");
const crypto = require("crypto");

router.post("/register", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Generate unique productId
    const productId = crypto.randomBytes(16).toString("hex");

    // Register product on blockchain
    const tx = await contract.registerProduct(productId);
    await tx.wait();

    // Prepare QR payload
    const qrPayload = { productId };

    // Generate QR Code (base64 image)
    const qrImage = await generateQR(qrPayload);

    return res.json({
      success: true,
      productId,
      qr: qrImage
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ error: "Registration failed", details: error.toString() });
  }
});

module.exports = router;
