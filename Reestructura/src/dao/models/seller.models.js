import mongoose from "mongoose";

const collection = "seller"

const schema = new mongoose.Schema({
    name: String,
    store: String
})

const sellerModel = mongoose.model(collection, schema)

export default sellerModel