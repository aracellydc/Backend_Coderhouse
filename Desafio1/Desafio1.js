class ProductManager{
    constructor(){
        this.products = [];
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        for(let i = 0; i< this.products.length; i++){
            if(this.products[i].code === code){
                console.log(`El codigo ${code} esta repetido`);
                break;
            }
        }
        const newProduct = {title, description, price, thumbnail, code, stock}

        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({
                ...newProduct,
                id:ProductManager.id
            })
        }else{
            console.log("Todos los campos son requeridos")
        }
    }

    getProduct(){
        return this.products;
    }

    existe(id){
        return this.products.find((producto) => producto.id === id)
    }

    getProductById(id){
        !this.existe(id) ? console.log("No found") : console.log(this.existe(id))
    }
}

const productos = new ProductManager();


//Primera llamada = arreglo vacío
console.log(productos.getProduct())

//Agregamos Producto
productos.addProduct('titulo1', 'descripcion1', 200, 'img1', 'abc123', 25);
productos.addProduct('titulo2', 'descripcion2', 300, 'img', 'abc124');

//Segunda llamada = arreglo con producto
console.log(productos.getProduct())

//validacion con CODE repetido
productos.addProduct('titulo3', 'descripcion3', 100, 'imagen3', 'abc123', 7);

//Busqueda por ID
productos.getProductById(2)

//Busqueda por Id no encontrado
productos.getProductById(3)