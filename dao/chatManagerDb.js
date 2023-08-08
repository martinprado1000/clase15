const fs = require("fs");
const messagesModel = require("../models/messagesModel");

class ChatManager {
  constructor(io) {
    this.io = io;
    // this.path = path;
    // const ex = async () => {
    //   try {
    //     await fs.promises.access(this.path);
    //   } catch (e) {
    //     console.log("El archivo Carts no existe");
    //     const arr = JSON.stringify([]);
    //     fs.promises.writeFile(path, arr);
    //     console.log("Archivo Carts creado correctamente");
    //   }
    // };
    // ex();
  }

  async getUsers() {
    try {
      const users = await messagesModel.find()
      console.log(users.email)
      return
      
      //return cartModel.find();
    } catch (e) {
      console.log("Error al leer el archivo Carts");
      return {
        status: 500,
        respuesta: "Error desconocido al leer el archivo Carts",
      };
    }
  }

  async getMessages() {
    try {
      //let carts = await fs.promises.readFile(this.path, "utf-8");
      //const cartsObj = await JSON.parse(carts);
      //return cartModel.find();
    } catch (e) {
      console.log("Error al leer el archivo Carts");
      return {
        status: 500,
        respuesta: "Error desconocido al leer el archivo Carts",
      };
    }
  }

  async postMessages(data) {
    try {
      console.log(data.email)
      //console.log(this.io)
      this.io.emit("unido",JSON.stringify(data.email))
      await messagesModel.create(data)
      //console.log("hola")
      return
    } catch (e) {
      console.log("Error al leer el archivo Carts");
      return {
        status: 500,
        respuesta: "Error desconocido al leer el archivo Carts",
      };
    }
  }

//   async getCartById(id) {
//     try {
//       if (!id) {
//         console.log("Debe enviar un ID valido");
//         return { status: 400, respuesta: "Debe enviar un ID valido" };
//       }
//       let cartId = await cartModel.findById(id);
//       console.log(cartId)
//       if (cartId)
//         return {
//           status: 200,
//           respuesta: cartId,
//         };
//       return {
//         status: 400,
//         respuesta: `El carrrito con id: ${id} no existe`,
//       };
//     } catch (e) {
//       console.log("Error desconocido");
//       return {
//         status: 500,
//         respuesta: "Error desconocido",
//       };
//     }
//   }

//   async deleteCart(id) {
//     try {
//       if (!id) {
//         console.log("Debe enviar un ID");
//         return { status: 400, respuesta: "Debe enviar un ID valido" };
//       }
//       const deletedCart = await cartModel.deleteOne({ _id: id });
//       // No funciona esto---------------------- no reconoce otro formato que no sea el de mongo**************
//       if (deletedCart.deletedCount != 1) {
//         console.log(`El carrito con id: ${id} no existe`);
//         return {
//           status: 400,
//           respuesta: `El carrrito con id: ${id} no existe`,
//         };
//       }
//       console.log(`El carrito con id: ${id} se elimino correctamente`);
//       return {
//         status: 200,
//         respuesta: `El carrito con id: ${id} se elimino correctamente`,
//       };
//     } catch (e) {
//       console.log("Erro desconocido al eliminar el carrito");
//       return {
//         status: 500,
//         respuesta: "Error desconocido al eliminar el carrito",
//       };
//     }
//   }

//   async addCart(data) {
//     const cartEmail = data.email; // Nombre del carrito a agregar
//     try {
//       const cartExist = await cartModel.findOne({ "email" : cartEmail });
//       if (cartExist != null) { // Si el newCart no existe
//         return {
//           status: 400,
//           respuesta: `El carrito ${cartEmail} ya existe`,
//         };
//       }

//       let productExist = await cartModel.find({},{products:1});
//       const productExistObj = productExist.map((p) => p.toObject());
//       console.log(productExistObj)
//       const aa = productExist.map((e)=>{ return e.products[0] })
//       console.log(aa)
//       const bb = aa.map((e)=>{ return e[0].productCode })
//       // const productExist2 = productExistObj.map((pro)=> {return pro.products[0] } )
//       // console.log(productExist2)
//       //console.log(productExist2[0].productCode)
//       //productExist2.map((prod)=>  console.log(prod.productCode) )
     
//       // Agrego el carrito a la db
//       const newCart = await cartModel.create(data);
//       //const newCartId = newCart._id.toHexString(); // paso _id a numero
//       if (newCart.products == "") {
//         return {
//           status: 200,
//           respuesta: `El carrito ${cartEmail} se agrego correctamente pero no ingreso ningún producto en el carrito`,
//         };
//       }

      


//       return {
//         status: 201,
//         respuesta: `Se agregó el carrito ${cartEmail} correctamente`,
//       };
//     } catch (e) {
//       console.log(e);
//       console.log("Error al agregar el carrito");
//       return {
//         status: 400,
//         respuesta: "Erro desconocido al agregar el carrito",
//       };
//     }
//   }

//   async addCartPid(cid, pid, products) {
//     const cidNumber = parseInt(cid); // cid
//     const pidNumber = parseInt(pid); // pid
//     const productId = products.productId; // pid
//     const quantity = products.quantity; // quantity
//     const carts = await this.getCarts(); // Carritos existente

//     try {
//       if (!productId || !quantity) {
//         return { status: 400, respuesta: "Campos incompletos" };
//       }

//       const existCart = await carts.find((cart) => cart.id === cidNumber); // Carrito

//       if (existCart === undefined) {
//         console.log(`El carrrito con id: ${cidNumber} no existe`);
//         return {
//           status: 400,
//           respuesta: `El carrrito con id: ${cidNumber} no existe`,
//         };
//       } else {
//         const productsCart = existCart.products;
//         //console.log(productsCart)
//         const productCart = productsCart.find(
//           (productCart) => productCart.productId == pid
//         );
//         if (productCart == undefined) {
//           productsCart.push(products);
//           await fs.promises.writeFile(
//             this.path,
//             JSON.stringify(carts, null, 2)
//           );
//           console.log(
//             `No existe el producto ${pid} en el carrito ${cid}, Se agrego el producto`
//           );
//           return {
//             status: 201,
//             respuesta: `No existe el producto ${pid} en el carrito ${cid}, Se agrego el producto`,
//           };
//         } else {
//           let quantitySumado = quantity + productCart.quantity;
//           const indiceProduto = await productsCart.findIndex(
//             (indice) => indice.productId == pid
//           ); //Indice del producto
//           productsCart[indiceProduto].quantity = quantitySumado; // Reemplazo el valor de quantity
//           await fs.promises.writeFile(
//             this.path,
//             JSON.stringify(carts, null, 2)
//           );
//           console.log(
//             `Ya existe el producto ${pid} en el carrito ${cid}, Se Sumo la cantidad al producto`
//           );
//           return {
//             status: 201,
//             respuesta: `Ya existe el producto ${pid} en el carrito ${cid}, Se Sumo la cantidad al producto`,
//           };
//         }
//       }
//     } catch (e) {
//       console.log("Error al agregar el carrito");
//       return {
//         status: 500,
//         respuesta: "Erro desconocido al agregar el carrito",
//       };
//     }
//   }
}

module.exports = {
  ChatManager,
};
