//const { CartManager } = require("../dao/cartManager");
const { CartManager } = require("../dao/cartManagerDb");
const { ProductManagerDb } = require("../dao/ProductManagerDb");

const pagesFn = (io) => {
  //instacio el Cartmanager
  //const manager = new CartManager("db/carts.json");
  
  const products = (async() => {
    const managerProduct = new ProductManagerDb(io);
    const products = await managerProduct.getProducts();
    //console.log(products);
  });
  products();

  const manager = new CartManager(io,products);

  //get Carts
  const carts = async (req, res) => {
    try {
      console.log("hola");
      const limitInt = parseInt(req.query.limit);
      console.log(limitInt);
      const data = await manager.getCarts();
      console.log(data);
      if (!limitInt) {
        console.log("respondemos sin limite");
        //console.log(data)
        res.setHeader("Content-Type", "application/json");
        res.json({ data });
      } else {
        //const dataLimit = data.slice(0, limitInt);
        const dataLimit = await manager.getCartsLimit(limitInt);
        res.json(dataLimit);
      }
      return;
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  //get ProductById
  const cartId = async (req, res) => {
    try {
      const pid = req.params.pid;
      const data = await manager.getCartById(pid);
      res.status(data.status).json(data.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  //post Product
  const cartAdd = async (req, res) => {
    try {
      const data = req.body;
      const result = await manager.addCart(data);
      res.status(result.status).send(result.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  //post Product pid
  const cartAddPid = async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      const data = req.body;
      const result = await manager.addCartPid(cid, pid, data);
      res.status(result.status).send(result.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  //put Product
  // const cartPut = async (req, res) => {
  //   try{
  //     const pid = req.params.pid;
  //     const cart = req.body;
  //     const data = await manager.updateCart(pid,cart);
  //     res.status(data.status).send(data.respuesta);
  //   } catch(e) {
  //     console.log(e);
  //     return { "Error" : "Algo salio mal con la consulta"}
  //   }
  // }

  //delete Product
  const cartDelete = async (req, res) => {
    try {
      const cart = req.params.pid;
      const data = await manager.deleteCart(cart);
      res.status(data.status).send(data.respuesta);
    } catch (e) {
      console.log(e);
      return { Error: "Algo salio mal con la consulta" };
    }
  };

  return {
    carts,
    cartId,
    cartAdd,
    cartAddPid,
    cartDelete,
  };
};

module.exports = pagesFn;
