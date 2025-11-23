const QRCode = require("qrcode");

async function generateQR(data) {
  return await QRCode.toDataURL(JSON.stringify(data));
}

module.exports = { generateQR };
