import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import ProductManager from "./controllers/ProductManager.js"
import CartManager from "./controllers/CartManager.js"
import mongoose from "mongoose"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"


const app = express()
const PORT = 8080
const product = new ProductManager()
const cart = new CartManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Se simplifica middleware
app.use("/api/products",productRouter )
app.use("/api/carts", cartRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})


mongoose.connect("mongodb+srv://pruebaCoder:CHuV3YnIFOSmKCa7@pruebacoder.nw87acm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})


app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
app.use("/", express.static(__dirname + "/public"))

app.get("/products", async (req, res) => {
    let allProducts  = await product.getProducts()
    allProducts = allProducts.map(product => product.toJSON());
    res.render("viewProducts", {
        title: "Vista Productos",
        products : allProducts
    });
})
app.get("/carts/:cid", async (req, res) => {
    let id = req.params.cid
    let allCarts  = await cart.getCartWithProducts(id)
    res.render("viewCart", {
        title: "Vista Carro",
        carts : allCarts
    });
})