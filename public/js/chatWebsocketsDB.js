const socket = io();
console.log(socket);

socket.on("unido",(user)=>{
    console.log(`${user} se unio al chat`)
})
