let scanner = null;

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

    document.getElementById("message").innerHTML = "Loading cameras...";

    try {

        const cameras = await Html5Qrcode.getCameras();

        if (!cameras || cameras.length === 0) {
            document.getElementById("message").innerHTML = "No camera found.";
            return;
        }

        console.log("Available cameras:");
        cameras.forEach((camera, index) => {
            console.log(index + ":", camera.label, camera.id);
        });

        // Stop previous scanner if running
        if (scanner) {
            try {
                await scanner.stop();
                await scanner.clear();
            } catch (e) {}
        }

        scanner = new Html5Qrcode("reader");

        // On most phones, the last camera is the rear camera
        const selectedCamera = cameras[cameras.length - 1];

        document.getElementById("message").innerHTML =
            "Using: " + (selectedCamera.label || "Rear Camera");

        await scanner.start(
            selectedCamera.id,
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250
                },
                aspectRatio: 1.0
            },
            onScanSuccess,
            () => {}
        );

    } catch (err) {
        console.error(err);
        document.getElementById("message").innerHTML = err;
        alert(err);
    }

}

let lastScan = "";

let lastScan = "";
let scanLocked = false;

async function onScanSuccess(decodedText) {

    if (scanLocked) return;

    scanLocked = true;

    const scannerName = document.getElementById("scannerSelect").value;

    document.getElementById("message").innerHTML =
        "Checking attendance...";

    const result = await recordAttendance(decodedText, scannerName);

    if (result.success) {

        document.getElementById("message").innerHTML =
            "✅ " + result.name;

    } else {

        document.getElementById("message").innerHTML =
            "❌ " + result.message;

    }

    setTimeout(() => {

        scanLocked = false;

        document.getElementById("message").innerHTML =
            "Ready for next attendee";

    }, 1500);

}
