const { Router } = require("express");

const viewCartsRoutesFn = ((io) => {
    
  const pagesFn = require("../controllers/cartsViewControllers");

  const { carts, cartId, cartAdd, cartAddPid, cartDelete } = pagesFn(io);

  const router = Router();

  router.get("/carts", carts);

  router.get("/carts/:pid", cartId);

  router.post("/carts", cartAdd);

  router.post("/carts/:cid/product/:pid", cartAddPid);

  //router.put("/carts/:pid", cartPut);

  router.delete("/carts/:pid", cartDelete);

  return router;
});

module.exports = viewCartsRoutesFn;
