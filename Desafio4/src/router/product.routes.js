import { Router } from "express"
import ProductManager from "../controllers/ProductManager.js"

const productRouter = Router()
const product = new ProductManager()

//Actualizamos los productos 
productRouter.put("/:id", async (req,res) => {
    let id = req.params.id
    let updProd = req.body
    res.send(await product.updProducts(id, updProd))
})
//Traemos los productos
productRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProdById(id))
})
//Todos los productos
//socket.io
productRouter.get("/", async (req, res) => {
    let Tproducts = await product.getProducts()
    res.render("realTimeProducts", { title: "Socket",Tproducts })
})

//Eliminamos los productos
productRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.delProducts(id))
})
//Agregan productos
productRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
})

export default productRouter