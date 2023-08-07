const { Schema, model } = require("mongoose") // de mongoose solo requier Schemay model
// Schema: es para armar el esquema de como va a ser nuestra colleccion, se escribe en mayusculo porque es una clase.
// model: es lo que interactua nuestro esquema con la colleccion

//Los tipo de datos los obtenemos d la paguina de mongoose
const productSchema = new Schema ({
    title: String,
    description: String,
    price: {
        type: Number,
        default: 0
    },
    thumbnail: String,
    code: {
        type: String,
        unique: true
    },
    stock: Number,
    category: String
})

module.exports = model("products" , productSchema)  
// Si no existe la colleccion products crea la colleccion, pero lo muestra cuando ingresemos el primer documento
// Aca indicamos que el nombre de nuestro modelo es Products y esta basado en el Schema productSchema.
// Y lo exporto para usar en otro lado de la aplicacion
