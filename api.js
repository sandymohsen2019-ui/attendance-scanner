const API_URL = "https://script.google.com/macros/s/AKfycbwYxiDhIhw-t5bYSSrEP0nmDRHoTDKNbFVk_hlEqkwQUTYhdnl1Th_qhh3NkeQLtfrN/exec";

async function recordAttendance(qrValue, scannerName) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            redirect: "follow",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify({
                qr: qrValue,
                scanner: scannerName
            })

        });

        const result = await response.json();

        return result;

    }
    catch (err) {

        return {

            success: false,
            message: err.message

        };

    }

}
