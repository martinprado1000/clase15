const { Schema, model } = require("mongoose") // de mongoose solo requier Schemay model
// Schema: es para armar el esquema de como va a ser nuestra colleccion, se escribe en mayusculo porque es una clase.
// model: es lo que interactua nuestro esquema con la colleccion

//Los tipo de datos los obtenemos d la paguina de mongoose
const cartSchema = new Schema ({
    email: String,
    products:[
        {
        productCode : String,
        quantity : Number
        }
    ]
})

module.exports = model("carts" , cartSchema)  
// Si no existe crea el nombre de la colleccion cuando ingresemos el primer producto
// Aca indicamos que el nombre de nuestro modelo es Product y esta basado en el Schema productSchema.
// Y lo exporto para usar en otro lado de la aplicacion
