import mongoose from "mongoose";

const collection = "customer"

const schema = new mongoose.Schema({
    name: String,
    email: String
})

const customerModel = mongoose.model(collection, schema)

export default customerModel