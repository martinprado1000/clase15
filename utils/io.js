const { Server } = require("socket.io"); //  npm i socket.io  1-Requerimos socket.io, requerimos Server destructurado.

//** lo que hago con esta funcion es crear el server socket.io, desde app.js recivo como parametro el servidor httpServer de express, */
//** para poder usarlo aca y crear el server socket.io */
const { ProductManagerDb } = require("../dao/ProductManagerDb");
const { ChatManager } = require("../dao/chatManagerDb")

const ioFn = (httpServer) => {
  const io = new Server(httpServer);
  const productManager = new ProductManagerDb(io);
  const chatManager = new ChatManager(io);
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    //----------------PRODUCTS-------------------------------------- 
    socket.on("newProduct", async (data) => {
      productManager.addProduct(data);
    });

    socket.on("editProduct", async (data) => {
      //console.log(data)
      const product = JSON.parse(data);
      productManager.updateProduct(product.id, product);
    });

    socket.on("deleteProduct", async (data) => {
      productManager.deleteProduct(data);
    });

    socket.on("getProductById", async (data) => {
      const id = JSON.parse(data);
      const res = await productManager.getProductById(id);
      socket.emit("getProductById", JSON.stringify(res));
    });

    //-------------------CHAT---------------------------------------------
    socket.on("newUser", async (data) => {
      const newUser = JSON.parse(data)
      chatManager.postUserLogin(newUser);
      console.log(newUser)
      socket.broadcast.emit("joinUser",JSON.stringify(newUser))
      socket.emit("redirect",JSON.stringify(newUser))
    });

    socket.on("newMessage", async (data) => {
      const newMessage = JSON.parse(data)
      console.log(newMessage);
      chatManager.postUserLogin(newMessage);
      //socket.emit("newMessage",JSON.stringify(newMessage)) // Si lo hago desde aca no funciona para enviarlo a todos los sockets
    });
  });

  return io;
};

module.exports = ioFn;
