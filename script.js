document
.getElementById("startBtn")
.addEventListener("click",startScanner);

let scanner;

function startScanner(){

    const scannerName=document
    .getElementById("scannerSelect")
    .value;

    if(scannerName==""){

        alert("Please select a scanner.");

        return;

    }

    localStorage.setItem(
        "scanner",
        scannerName
    );

    document.getElementById("message")
    .innerHTML="Opening Camera...";

    scanner=new Html5Qrcode("reader");

    Html5Qrcode.getCameras()

    .then(cameras=>{

        if(cameras.length==0){

            alert("No Camera Found");

            return;

        }

        // Try to find the back camera
let backCamera = cameras.find(camera =>
    camera.label.toLowerCase().includes("back") ||
    camera.label.toLowerCase().includes("rear") ||
    camera.label.toLowerCase().includes("environment")
);

// If no back camera is found, use the last camera
if (!backCamera) {
    backCamera = cameras[cameras.length - 1];
}

scanner.start(

    backCamera.id,

    {
        fps: 10,
        qrbox: 250
    },

    onScanSuccess

);

    })

    .catch(err=>{

        alert(err);

    });

}

function onScanSuccess(decodedText){

    document.getElementById("message")
    .innerHTML=decodedText;

}
