const { Server } = require("socket.io"); //  npm i socket.io  1-Requerimos socket.io, requerimos Server destructurado.

//** lo que hago con esta funcion es crear el server socket.io, desde app.js recivo como parametro el servidor httpServer de express, */
//** para poder usarlo aca y crear el server socket.io */
const { ProductManager } = require("../dao/productManagerDb");


const ioFn = (httpServer) => {
  const io = new Server(httpServer);
  const manager = new ProductManager(io);
  // io.on("connection")  Escucha si hay una nueva conexion. Se establecen la conexiones io con el servidor
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.on("newProduct", async (data) => {
      manager.addProduct(data)
    });

    socket.on("editProduct", async (data) => {
      //console.log(data)
      const product = JSON.parse(data)
      manager.updateProduct(product.id,product)
    })

    socket.on("deleteProduct", async (data) => {
      manager.deleteProduct(data)
    })

    socket.on("getProductById", async(data)=>{
      const id = JSON.parse(data)
      const res = await manager.getProductById(id)
      socket.emit("getProductById",JSON.stringify(res))
    })

  });

  return io;
};

module.exports = ioFn;
