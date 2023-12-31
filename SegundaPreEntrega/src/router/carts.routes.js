import { Router } from "express"
import CartManager from "../controllers/CartManager.js"

const cartRouter = Router()
const carts = new CartManager()

//Se agrega producto
cartRouter.post("/", async (req,res) =>{
    let newCart = req.body
    res.send(await carts.addCart(newCart))
})
//Traemos todos los carritos
cartRouter.get("/", async (req,res)=>{
    res.send(await carts.getCarts())
})
//Traemos el carro por id
cartRouter.get("/:id", async (req,res)=>{
    res.send(await carts.getCartById(req.params.id))
})

//Ingresamos el producto al carrito
cartRouter.post("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await carts.addProductInCart(cartId, prodId))
})

//Eliminar el producto al carrito
cartRouter.delete("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    res.send(await carts.removeProductFromCart(cartId, prodId))
})

//Actualizar el carro con varios productos
cartRouter.put("/:cid", async (req,res) => {
    let cartId = req.params.cid
    let newProducts = req.body
    res.send(await carts.updateProductsInCart(cartId, newProducts))
})

//Actualizar el carro con varios productos
cartRouter.put("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let prodId = req.params.pid
    let newProduct = req.body
    res.send(await carts.updateProductInCart(cartId, prodId, newProduct))
})
//Eliminar todos los productos del carrito
cartRouter.delete("/:cid", async (req,res) => {
    let cartId = req.params.cid
    res.send(await carts.removeAllProductsFromCart(cartId))
})
//Population
//Traemos todos los carritos
cartRouter.get("/population/:cid", async (req,res)=>{
    let cartId = req.params.cid
    res.send(await carts.getCartWithProducts(cartId))
})

export default cartRouter