import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import { engine } from "express-handlebars"
import __dirname from "./utils.js"
import * as path from "path"
import ProductManager from "./controllers/ProductManager.js"
import {Server} from "socket.io"


const app = express()
const PORT = 8080

const product = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

const products = [
    {nombre: "Ara", apellido:"Carm"},
    {nombre: "Gabriel", apellido:"Solari"},
    {nombre: "Gatito", apellido:"Solari Carmona"},
]



app.get("/", async(req, res) => {
    let allProducts = await products.getProducts()
    res.render("home", {
        title: "Handlebars",
        products: allProducts
    })
})


app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})