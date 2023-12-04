import mongoose from "mongoose";

const collection = "sale"

const schema = new mongoose.Schema({
    name: String,
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "customer"
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "seller"
    },
    products: [],
})

const saleModel = mongoose.model(collection, schema)

export default saleModel