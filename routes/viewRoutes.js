const { Router } = require ("express")

const viewRoutesFn = ((io)=>{
    
    const pagesFn = require("../controllers/viewControllers")

    const {home, homeById, realTimeProducts, realTimeProductById, postRealTimeProducts, updateRealTimeProducts, deleteRealTimeProducts } = pagesFn(io)
    
    const router = Router();
    
    router.get("/home", home);

    router.get("/home/:pid", homeById);
    
    router.get("/realTimeProducts", realTimeProducts);

    router.get("/realTimeProducts/:pid", realTimeProductById);
    
    router.post("/realTimeProducts", postRealTimeProducts);

    router.put("/realTimeProducts/:pid", updateRealTimeProducts);

    router.delete("/realTimeProducts/:pid", deleteRealTimeProducts);

    return router;
    
})


module.exports = viewRoutesFn ;

