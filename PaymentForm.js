import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
    const [formData, setFormData] = useState({ cardNumber: "", expiryDate: "", amount: "", preAuthCode: "" });
    const [paymentLink, setPaymentLink] = useState("");
    const [qrCode, setQrCode] = useState("");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://yourserver.com/api/payment/process", formData);
            const { data } = await axios.post("http://yourserver.com/api/payment/generate-qr", { amount: formData.amount });
            setPaymentLink(data.link);
            setQrCode(data.qrCode);
        } catch (error) {
            alert("Payment Failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} required />
            <input type="text" name="expiryDate" placeholder="MM/YY" onChange={handleChange} required />
            <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
            <input type="text" name="preAuthCode" placeholder="6-digit/4-digit Pre-Auth Code" onChange={handleChange} required />
            <button type="submit">Submit Payment</button>
            {paymentLink && <a href={paymentLink} target="_blank">Pay Here</a>}
            {qrCode && <img src={qrCode} alt="QR Code" />}
        </form>
    );
};

export default PaymentForm;