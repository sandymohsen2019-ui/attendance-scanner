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

        scanner.start(

            cameras[0].id,

            {
                fps:10,
                qrbox:250
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
