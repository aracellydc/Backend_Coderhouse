import mongoose from "mongoose";

const productsCollection = "productos"
const productsSchema = new mongoose.Schema({
    description: {type: String, max:100, required: true},
    imagen: {type: String, max:100, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
})

export const productsModel = mongoose.model(productsCollection,productsSchema);