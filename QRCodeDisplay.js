import React from "react";
import QRCode from "qrcode.react";

const QRCodeDisplay = ({ paymentLink }) => {
    return (
        <div>
            {paymentLink && (
                <>
                    <h3>Scan to Pay:</h3>
                    <QRCode value={paymentLink} size={256} />
                    <p><a href={paymentLink} target="_blank" rel="noopener noreferrer">Click here to pay</a></p>
                </>
            )}
        </div>
    );
};

export default QRCodeDisplay;