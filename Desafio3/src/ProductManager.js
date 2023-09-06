import { promises as fs } from "fs"

export default class ProductManager{
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0

    async addProduct(title, description, price, thumbnail, code, stock) {

        ProductManager.id++
        let newProduct = {
            title, description, price, thumbnail, code, stock, id:ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    async readProducts() {
        let respuestaRP = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuestaRP)
    }

    async getProducts() {
        let respuestaGP = await this.readProducts()
        return await console.log(respuestaGP)
    }

    async getProductsById(id) {
        let respuestaGPId = await this.readProducts()
        let filter = respuestaGPId.find(product => product.id === id)
        if(!filter){
            console.log("Producto no encontrado")
        }else{
            console.log(filter)
        }
    }


    async deleteProductsById(id) {
        let respuestaGPId = await this.readProducts()
        let productFilter = respuestaGPId.filter(product => product.id != id)
        if(productFilter.length === respuestaGPId.length){
            console.log("No se encontro el producto con el Id: " + id)
        }else{
            await fs.writeFile(this.patch, JSON.stringify(productFilter))
            console.log(`Producto con id: ${id} eliminado`)
        }
    }

    async updateProducts({id, ...producto}) {
        await this.deleteProductsById(id)
        let respuestaGPId = await this.readProducts()
        let productUpdate = [{...producto, id}, ...respuestaGPId]
        await fs.writeFile(this.patch, JSON.stringify(productUpdate))
    }
}


//const productos = new ProductManager()
/*
productos.addProduct('producto1', 'descripcion1', 200, 'img1', 'abc123', 25)
productos.addProduct('producto2', 'descripcion2', 300, 'img2', 'abc122', 20)
productos.addProduct('producto3', 'descripcion3', 400, 'img3', 'abc121', 40)
productos.addProduct('producto4', 'descripcion4', 200, 'img4', 'abc124', 25)
productos.addProduct('producto5', 'descripcion5', 500, 'img5', 'abc125', 60)
productos.addProduct('producto6', 'descripcion6', 300, 'img6', 'abc126', 30)
productos.addProduct('producto7', 'descripcion7', 400, 'img7', 'abc127', 15)
productos.addProduct('producto8', 'descripcion8', 100, 'img8', 'abc128', 10)
productos.addProduct('producto9', 'descripcion9', 300, 'img9', 'abc129', 20)
productos.addProduct('producto10', 'descripcion10', 200, 'img10', 'abc110', 5)
*/
//productos.getProducts()

// productos.getProductsById(2)

// productos.deleteProductsById(2)

// productos.updateProducts(
//     {
//         title: 'producto1',
//         description: 'descripcion1',
//         price: 1200,
//         thumbnail: 'img1',
//         code: 'abc123',
//         stock: 25,
//         id: 1
//     }
// )