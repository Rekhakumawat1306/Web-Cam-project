let video = document.querySelector('video');
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let caputreBtn = document.querySelector(".caputre-btn");
let transparentColor= "transparet";
let recordFlag = false;
let recorder;
let chunks = [];

let constraints ={
    video:true,
    Audio:true
}

// navigator->global,browser info
navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>
{
video.srcObject = stream;

recorder = new MediaRecorder(stream);

recorder.addEventListener("start",(e) => {
    chunks = [];
})

recorder.addEventListener("dataavailable", (e) =>
{
    chunks.push(e.data);
})

recorder.addEventListener("stop",(e)=> {

    let blob = new Blob(chunks, { type : "video/mp4"});
    if(db){
        let videoID = shortid();
        let dbTransaction =db.transaction("video" ,"readwrite");
       let videoStore = dbTransaction.objectStore("video");
        let videoEntry = {
            id: `vid-${videoID}`,
            blobData: blob
        }  
    videoStore.add(videoEntry);
    }


    // let videoURL = window.URL.createObjectURL(blob);
//      let a = document.createElement("a");
//  a.href = videoURL;
//     a.download = "stream.mp4";
//     a.click();
    

})
});


recordBtnCont.addEventListener("click",(e) => {
    if(!recorder) return;

 recordFlag = !recordFlag;

 if(recordFlag)
 {
     recorder.start();
     recordBtn.classList.add("scale-record");
     startTimer();
 }
else{
    recorder.stop();
    recordBtn.classList.remove("scale-record");
    stopTimer();
    }

})

captureBtnCont.addEventListener("click",(e)=>
{
    

    let canvas = document.createElement("canvas");
    canvas.width= video.videoWidth;
    canvas.height = video.videoHeight;

    let tool= canvas.getContext("2d");

    tool.drawImage(video,0,0,canvas.width,canvas.height);
    tool.fillStyle =transparentColor;
    tool.fillRect(0,0, canvas.width, canvas.height);



let imageURL = canvas.toDataURL();


if(db){
    let imageID = shortid();
    let dbTransaction =db.transaction("image" ,"readwrite");
   let imageStore = dbTransaction.objectStore("image");
    let imageEntry = {
        id:  `img-${imageID}`,
        url: imageURL
    }  
imageStore.add(imageEntry);
}
// let a = document.createElement("a");
// a.href = imageURL;

// a.download ="image.jpg";
// a.click();

})




let timerID;
let counter = 1;
let timer = document.querySelector(".timer");


function startTimer(){

    timer.style.display = "block";
    function displayTimer()
    {
         let totalSeconds = counter;
        let hours =  Number.parseInt(totalSeconds / 3600);
        totalSeconds= totalSeconds % 3600;
        
        let minute = Number . parseInt(totalSeconds / 60);
        totalSeconds = totalSeconds % 60;
        
        let second = totalSeconds;

        hours = (hours <10 ) ? `0${hours}` : hours;
        minute = (minute<10 ) ? `0${minute}` : minute;
        second= (second <10 ) ? `0${second}` : second;
         
        timer.innerText = `${hours} : ${minute} :${second}` ;
        counter++;
    }
    
    timerID = setInterval(displayTimer, 1000);
}


function stopTimer()
{
    clearInterval(timerID);
    timer.innerText ="00:00:00";
    timer.style.display = "none";
}




let filterLayer =document.querySelector("filter-layer");
let allFilters = document.querySelectorAll(".filter");
allFilters.forEach((filterElement) =>
{
filterElement.addEventListener("cilick",(e) =>
{
    transparentColor =filterElement.style.backgroundColor;
    getComputerStyle(filterElement).getPropertyValue("background-color");

})
})
