const fs = require('fs').promises

class ProductManager{
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


const productos = new ProductManager()

// productos.addProduct('producto1', 'descripcion1', 200, 'img1', 'abc123', 25)
// productos.addProduct('producto2', 'descripcion2', 300, 'img2', 'abc128', 20)
// productos.addProduct('producto3', 'descripcion3', 500, 'img3', 'abc124', 40)

// productos.getProducts()

// productos.getProductsById(2)
// productos.getProductsById(5)

// productos.deleteProductsById(2)
// productos.deleteProductsById(4)


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