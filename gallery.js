 setTimeout(()=>{
    if(db){
        //videos retrival
        //images retrival

        let videoDBTransaction = db.transaction("video" ,"readonly");
        let videoStore = videoDBtransaction.objectStore("video" );
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess =(e) =>
        {
            let videoResult = videoRequest.result;
            videoResult.forEach((videoObj)=>{
let mediaElem =document.createElemrn("div");
mediaElem.setAtribute("class " , "media-cont");
mediaElem.setAttribute("id", videoObj.id);
 let url = URL.createObjectURL(videoObj.blobData);
  mediaElem.innerHTML=
  `<div class="media-cont">
  <div class="media">
      <video  autoplay src=./VID_19820509_075400_561.mp4"></video>
  </div>
  <div class="delete action-btn">DELETE</div>
  <div class="download action-btn">DOWNLOAD</div>
</div>`;
          
let deleteBtn =  mediaElem.querySelector(".delete");
deleteBtn.addEventListener("click",deleteListener);
let downloadBtn =mediaElem.querySelector("download");
deleteBtn.addEventListener("click", downloadListener);

gallarycont.appendChild(mediaElem);

})
        }


let imageDBTransaction = db.transaction("image" ,"readonly");
let imageStore = imageDBtransaction.objectStore("image" );
let imageRequest = imageStore.getAll();
imageRequest.onsuccess =(e) =>
{
    let imageResult = imageRequest.result;
    imageResult.forEach((imageObj)=>{
let mediaElem =document.createElemrn("div");
mediaElem.setAtribute("class " , "media-cont");
mediaElem.setAttribute("id", imageObj.id);
let url = URL.createObjectURL(imageObj.blobData);
mediaElem.innerHTML=

`<div class="media">
<video image src="${url}"></video>
</div>
<div class="delete action-btn">DELETE</div>
<div class="download action-btn">DOWNLOAD</div>
</div>`;
  

gallarycont.appendChild(mediaElem);
//Listener
let deleteBtn =  mediaElem.querySelector(".delete");
deleteBtn.addEventListener("click",deleteListener);
let downloadBtn =mediaElem.querySelector("download");
deleteBtn.addEventListener("click", downloadListener);


})
}    

    }
 },100);

//UI REMOVE , DB REMOVE

 function deleteListener(e)
{
   let id  =e.target.parentElement.getAttribute("id");
   let type= id.slice(0,3);
   if(type==="vid"){
    let videoDBTransaction = db.transaction("video" ,"readonly");
    let videoStore = videoDBtransaction.objectStore("video" );
    videoStore.delete(id);

   }
   else if(type==="img"){

    
let imageDBTransaction = db.transaction("image" ,"readonly");
let imageStore = imageDBtransaction.objectStore("image" );
imageStore.delete(id);

   }
   e.target.parentElement.remove();
 }




//  function downloadListener(e){

//     let id  =e.target.parentElement.getAttribute("id");
//     let type= id.slice(0,3);
//     if(type==="vid"){
//         let videoDBTransaction = db.transaction("video" ,"readonly");
//     let videoStore = videoDBtransaction.objectStore("video" );
//    let videoRequest =videoStore.grt(id);
//    videoRequest.onsuccess = (e) =>
//    {
//        let videoResult = videoReuuest.result;
//        let videoURL =URL.createObjectURL(videoRequest.blobData);
       

//      let a = document.createElement("a");
//      a.href = videoURL;
//     a.download = "stream.mp4";
//     a.click();
    
//    }}

//    else if(type===img){
  
//         let imageDBTransaction = db.transaction("video" ,"readonly");
//     let imagetore = imageDBtransaction.objectStore("video" );
//    let imageRequest =imageStore.grt(id);
//    imageRequest.onsuccess = (e) =>
//    {
//        let imageResult = imageReuuest.result;
       
       

//      let a = document.createElement("a");
//      a.href = imageResult.url;
//     a.download = "image.jpg";
//     a.click();
    
//    }
//    }
//     } 