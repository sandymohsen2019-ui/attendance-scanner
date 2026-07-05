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

        if (!cameras || cameras.length === 0) {
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
        const selectedCamera = cameras[cameras.length - 1];

        await scanner.start(
            selectedCamera.id,
            {
                fps: 10,
                qrbox: 250
            },
            onScanSuccess,
            function (error) {
                // Ignore scan errors
            }
        );

        document.getElementById("message").innerHTML = "Ready to scan";

    } catch (err) {

        console.error(err);
        document.getElementById("message").innerHTML = err.message;

    }

}

async function onScanSuccess(decodedText) {

    if (scanLocked) return;

    scanLocked = true;

    const scannerName = document.getElementById("scannerSelect").value;

    document.getElementById("message").innerHTML = "Checking attendance...";

    try {

        const result = await recordAttendance(decodedText, scannerName);

        if (result.success) {

            document.getElementById("message").innerHTML =
                "✅ " + result.name;

        } else {

            document.getElementById("message").innerHTML =
                "❌ " + result.message;

        }

    } catch (err) {

        document.getElementById("message").innerHTML =
            "❌ " + err.message;

    }

    setTimeout(() => {

        scanLocked = false;

        document.getElementById("message").innerHTML = "Ready to scan";

    }, 1500);

}
