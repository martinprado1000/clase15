const express = require("express");
const app = express();
require("./connection");
const handlebars = require("express-handlebars");
const ioFn = require("./utils/io.js")

const viewCartsRoutesFn = require ("./routes/viewCartsRoutes.js")
const viewProductsRoutesFn = require ("./routes/viewProductsRoutes.js")
const viewChatRoutesFn = require ("./routes/viewChatRoutes.js")

app.engine("handlebars", handlebars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json()); 
app.use(express.urlencoded({extended: false})) 
app.use(express.static("public"));

// *** Todo esto ponerla ANTES DE LAS RUTAS **************************************************************
const PORT = 8080;
const httpServer = app.listen(PORT, () => console.log(`Servidor express corriendo en el puerto ${PORT}`)); // Al server de express lo guardamos en una variable

const io = ioFn(httpServer) // Ejecuto la funcion que crea el server socket.io y le passamos el server httpServer como parametro.
//io.on("newProduct",((data)=>console.log(data)))
const viewProductsRoutes = viewProductsRoutesFn(io)
const viewChatRoutes = viewChatRoutesFn(io)
const viewCartsRoutes = viewCartsRoutesFn(io)

//app.use("/",productsRoutes);
app.use("/",viewProductsRoutes);
app.use("/",viewChatRoutes);
app.use("/",viewCartsRoutes);


//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ "Error" : "La ruta deseada no existe" });
});