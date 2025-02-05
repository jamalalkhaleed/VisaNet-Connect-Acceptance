const axios = require("axios");
const QRCode = require("qrcode");

exports.processPayment = async (req, res) => {
    const { cardNumber, expiryDate, amount, preAuthCode } = req.body;
    const visaNetPayload = {
        msgIdentfctn: {
            clientId: process.env.VISA_API_KEY,
            correlatnId: "UniqueCorrelationId",
        },
        Body: {
            Tx: {
                TxAttr: ["INST"],
                TxDesc: "Transaction Description",
                TxId: { LclDtTm: new Date().toISOString() },
                TxAmts: { TxAmt: { Amt: amount, Ccy: "840" } },
            },
            Envt: { Card: { PAN: cardNumber, XpryDt: expiryDate } },
        },
    };

    try {
        const response = await axios.post(`${process.env.VISA_BASE_URL}/acs/v3/payments/authorizations`,
            visaNetPayload,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.VISA_API_KEY}:${process.env.VISA_API_SECRET}`
                    ).toString("base64")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(200).json({ message: response.data.PrcgRslt?.Rslt || "Success" });
    } catch (error) {
        res.status(500).json({ message: error.response?.data?.message || "Payment Failed" });
    }
};

exports.generateQRCode = async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentLink = `https://yourwebsite.com/pay?amount=${amount}`;
        const qrCode = await QRCode.toDataURL(paymentLink);
        res.status(200).json({ link: paymentLink, qrCode });
    } catch (error) {
        res.status(500).json({ message: "QR Code generation failed" });
    }
};