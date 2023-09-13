import { Router } from "express"
import CartManager from "../controllers/CartManager.js"

const cartRouter = Router()
const carts = new CartManager()

//Se agrega producto
cartRouter.post("/", async (req,res) =>{
    res.send(await carts.addCarts())
})

//Traemos todos los carritos
cartRouter.get("/", async (req,res)=>{
    res.send(await carts.readCarts())
})

//Traemos el carro por id
cartRouter.get("/:id", async (req,res)=>{
    res.send(await carts.getCartById(req.params.id))
})

//Ingresamos el producto al carrito
cartRouter.post("/:cid/products/:pid", async (req,res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(cartId, productId))
})

export default cartRouter