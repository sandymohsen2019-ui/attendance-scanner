const API_URL = "https://script.google.com/macros/s/AKfycbwYxiDhIhw-t5bYSSrEP0nmDRHoTDKNbFVk_hlEqkwQUTYhdnl1Th_qhh3NkeQLtfrN/exec";

async function recordAttendance(qr, scanner) {

    const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            qr: qr,
            scanner: scanner
        })
    });

    return await response.json();

}
