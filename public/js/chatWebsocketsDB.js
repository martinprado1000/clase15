const socket = io();
console.log(socket);

socket.on("unido",(newUser)=>{
    console.log(`${newUser} se a unido al chat`)
    Swal.fire({
        title: `${newUser} se unio al chat`,
        icon: "success", // succes , warning , info , question
        timer: 5000,
        timerProgressBar: true,
        toast: true,
        position: "top-end"
      });
  const table = document.getElementById("tableUsers");
  const newRow = table.insertRow();
  const user = newRow.insertCell();
  user.textContent = newUser;
})
