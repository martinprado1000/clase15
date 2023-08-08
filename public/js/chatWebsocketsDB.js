const socket = io();
console.log(socket);

const submitUserForm = document.getElementById("formUser");
const btnSubmitUser = document.getElementById("submitUser");
const emailInput = document.getElementById("email");
const submitForm = document.getElementById("formMessage");
const btnSubmitMessages = document.getElementById("submitMessages");
const messageInput = document.getElementById("message");

// Obtengo los datos del formulario User Login
const getUser = () => {
  const email = emailInput.value;
  const user = {
    email,
  };
  return user;
};

// Obtengo los datos del formulario Messages
const getMessage = () => {
  const message = messageInput.value;
  // const messages = {
  //   message
  // };
  return message;
};

socket.on("joinUser", (newUser) => {
  const user = JSON.parse(newUser);
  Swal.fire({
    title: `${user.email} se unio al chat`,
    icon: "success", // succes , warning , info , question
    timer: 5000,
    timerProgressBar: true,
    toast: true,
    position: "top-end",
  });
  
  //   const table = document.getElementById("tableUsers");
  //   const newRow = table.insertRow();
  //   const user = newRow.insertCell();
  //   user.textContent = newUser;
});
socket.on("redirect", (newUser) => {
    window.location.href = "http://localhost:8080/chat.handlebars/messages";
});

socket.on("newMwssage", (newMessage) => {
  console.log(`${newMessage}`);
  const tableMessages = document.getElementById("tableMessages");
  const newRowMessages = tableMessages.insertRow();
  const messages = newRowMessages.insertCell();
  messages.textContent = newMessage;
});

btnSubmitUser.addEventListener("click", (e) => {
  e.preventDefault();
  const user = getUser();
  socket.emit("newUser", JSON.stringify(user));
});
// Envio nuevo producto al backend
btnSubmitMessages.addEventListener("click", (e) => {
  //submitForm.addEventListener("btnSubmitMessages", (e) => {
  e.preventDefault();
  const newMessage = getMessage();
  console.log(newMessage);
  socket.emit("newMessage", newMessage);
});
