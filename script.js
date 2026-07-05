let html5QrCode = null;
let scanLocked = false;

document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", startScanner);

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

        if (html5QrCode) {

            try {
                await html5QrCode.stop();
            } catch(e){}

            try {
                await html5QrCode.clear();
            } catch(e){}
        }

        const cameras = await Html5Qrcode.getCameras();

        if (cameras.length === 0) {

            document.getElementById("message").innerHTML = "No camera found";
            return;

        }

        const rearCamera = cameras[cameras.length - 1];

        html5QrCode = new Html5Qrcode("reader");

        await html5QrCode.start(

            rearCamera.id,

            {
                fps:10,
                qrbox:{
                    width:250,
                    height:250
                }
            },

            onScanSuccess,

            function(){}

        );

        document.getElementById("message").innerHTML = "Ready to scan";

    }

    catch(err){

        console.error(err);

        document.getElementById("message").innerHTML = err.message;

    }

}

async function onScanSuccess(decodedText){

    if(scanLocked) return;

    scanLocked=true;

    document.getElementById("message").innerHTML=
    "QR Detected: "+decodedText;

    const scannerName=document.getElementById("scannerSelect").value;

    try{

        const result=await recordAttendance(decodedText,scannerName);

        if(result.success){

            document.getElementById("message").innerHTML=
            "✅ "+result.name;

        }else{

            document.getElementById("message").innerHTML=
            "❌ "+result.message;

        }

    }

    catch(err){

        console.error(err);

        document.getElementById("message").innerHTML=
        "❌ "+err;

    }

    setTimeout(function(){

        scanLocked=false;

        document.getElementById("message").innerHTML=
        "Ready to scan";

    },2000);

}
