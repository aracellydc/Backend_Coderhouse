import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import {engine} from "express-handlebars"
import __dirname from "./utils.js"
import * as path from "path"
import ProductManager from "./controllers/ProductManager.js"
import {Server} from "socket.io"


const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})
const socketServer = new Server(httpServer)
const product = new ProductManager()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//Static
app.use("/", express.static(__dirname + "/public"))

//Socket View
app.use("/", productRouter)

//Get
app.get("/", async(req, res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Handlebars",
        products: allProducts
    })
})

//WebSocket:
socketServer.on("connection", socket => {
    console.log("Nuevo cliente conectado")
    socket.on("message", data => {
        console.log(data)
    })

    socket.emit("evento_socketIndividual","Este mensaje solo lo debe recibir el socket")
    socket.broadcast.emit("evento_todos_menos_actual","Este evento lo veran todos los sockets conectaods menos el socket actual desde el que se envio el mensaje")
    socketServer.emit("evento_todos", "Este mensaje lo reciben todos los sockets conectados")
})



//Rutas productos y carritos:
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)


const products = [
    {nombre: "Ara", apellido:"Carm"},
    {nombre: "Gabriel", apellido:"Solari"},
    {nombre: "Gatito", apellido:"Solari Carmona"},
]





