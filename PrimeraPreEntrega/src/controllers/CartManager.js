import {promises as fs} from 'fs'
import {nanoid} from "nanoid"
import ProductManager from './ProductManager.js'

const productAll = new ProductManager()

class CartManager {
    constructor(){
        this.path = "./src/models/carts.json"
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }
    
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    }
    
    getCarts = async () => {
        return await this.readCarts()
    }
    
    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id:id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"
    }
    //Se obtiene carro por id
    getCartById = async (id) => {
        let cartById = await this.exist(id)
        if(!cartById) return "Carrito No Encontrado"
        return cartById
    }
    //Se agrega el producto en el carro
    addProductInCart = async (cartId, productId) => {
        let cartByIdd = await this.exist(cartId)
        if(!cartByIdd) return "Carrito No Encontrado"
        let productById = await productAll.exist(productId)
        if(!productById) return "Carrito No Encontrado"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)

        if(cartByIdd.products.some((prod) => prod.id === productId)){
            let moreProductInCart = cartByIdd.products.find((prod) => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [cartByIdd, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto Sumado al Carrito"
        }
        cartByIdd.products.push({id:productId.id, cantidad:1})
        let cartsConcat =[cartByIdd, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto Agregado al Carrito"
    }
}

export default CartManager