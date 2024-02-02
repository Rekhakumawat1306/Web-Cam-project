//OPEN DATABASE
//CREATE OBJECT STOR
//MAKE TRANSECTION

let db;
let openRequest = indexedDB.open("my DataBases");

openRequest.addEventListener("sucess", (e)=>{
    console.log("DB sucess");
})

openRequest.addEventListener("error",(e)=>{
console.log("DB error");
})
openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("DB upgraded  And aLSo for initial creation");
    db= openRequest.result;
    console.log(db);
    db.createObjectStore("video" , {keyPath:  "id"});
    db.createObjectStore("images",{keyPath:"id"});


})