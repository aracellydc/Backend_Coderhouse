import express from "express"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import {Server} from "socket.io"
import mongoose from "mongoose"
import cartsRouter from "./router/carts.routes.js"
import messagesRouter from "./router/messages.routes.js"
import productsRouter from "./router/product.routes.js"
import uploadRouter from "./router/upload.routes.js"

const app = express()
const PORT = 8080 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/", express.static(__dirname + "/public"))
//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))
//Rutas CRUD
app.use("/api/carts", cartsRouter)
app.use("/api/msg", messagesRouter)
app.use("/api/prod", productsRouter)


const httpServer = app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

//Mongoose
mongoose.connect("mongodb+srv://pruebaCoder:CHuV3YnIFOSmKCa7@pruebacoder.nw87acm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})

//Multer
app.use("/", uploadRouter)

//Handelbars View
app.get("/chat", async (req, res) => {
    res.render("chat", {
        title: "Chat con Mongoose",
    })
})

app.get("/multer", async (req, res) => {
    res.render("upload", {
        title: "Multer",
    })
})