const API_URL = "https://script.google.com/macros/s/AKfycbwYxiDhIhw-t5bYSSrEP0nmDRHoTDKNbFVk_hlEqkwQUTYhdnl1Th_qhh3NkeQLtfrN/exec";

async function recordAttendance(qr, scanner) {

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            redirect: "follow",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify({
                qr: qr,
                scanner: scanner
            })
        });

        const text = await response.text();

        console.log(text);

        return JSON.parse(text);

    } catch (err) {

        console.error(err);

        return {
            success: false,
            message: err.message
        };

    }

}
