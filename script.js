let scanner = null;
let scanLocked = false;

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("startBtn").addEventListener("click", startScanner);

    const savedScanner = localStorage.getItem("scanner");

    if (savedScanner) {
        document.getElementById("scannerSelect").value = savedScanner;
    }

});

async function startScanner() {

    const scannerName = document.getElementById("scannerSelect").value;

    if (!scannerName) {
        alert("Please select a scanner.");
        return;
    }

    localStorage.setItem("scanner", scannerName);

    document.getElementById("message").innerHTML = "Opening camera...";

    try {

        const cameras = await Html5Qrcode.getCameras();

        if (cameras.length === 0) {
            document.getElementById("message").innerHTML = "No camera found";
            return;
        }

        if (scanner) {
            try {
                await scanner.stop();
                await scanner.clear();
            } catch (e) {}
        }

        scanner = new Html5Qrcode("reader");

        // Use the last camera (usually the rear camera)
       
