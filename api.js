const API_URL = "https://script.google.com/macros/library/d/1l9pEUSeb561NiHpDjFk8ocyiPZ5Q8p9vuPfWKoOihdXwkJ7wiiPuwn1Z/7";

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
