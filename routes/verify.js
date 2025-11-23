const express = require("express");
const router = express.Router();
const { contract } = require("../blockchain");

router.post("/", async (req, res) => {
  try {
    const { qrPayload } = req.body;
    if (!qrPayload) {
      return res.status(400).json({ error: "Missing qrPayload" });
    }

    const productId = qrPayload.productId;
    const details = await contract.products(productId);

    if (details.exists === false) {
      return res.json({
        valid: false,
        status: "FAKE",
        message: "Product not found on blockchain"
      });
    }

    return res.json({
      valid: true,
      status: "GENUINE",
      manufacturer: details.manufacturer,
      timestamp: Number(details.timestamp)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Verification error",
      details: err.toString()
    });
  }
});

module.exports = router;
