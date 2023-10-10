import { Router } from 'express' 
import { productsModel } from '../models/products.model.js'

const router = Router()

//Se agrega producto
router.post("/", async(req, res)=>{
    let{description, imagen, price, stock} = req.body
    
    if(!description|| !imagen || !price || !stock){
        res.send({status:"error", error: "Faltan datos"})
    }
    let result = await productsModel.create({description, imagen, price, stock})
    res.send({result: "sucess", payload: result})
})

//Traemos todos
router.get("/", async(req, res)=>{
    try{
        let products = await productsModel.find()
        res.send({result:"sucess", payload: products})
    }catch(error){
        console.log(error)
    }
})

//put
router.put("/:id_prod", async(req, res)=>{
    let{id_prod} = req.params;

    let productsToReplace= req.body
    if(!productsToReplace.description || !productsToReplace.imagen || productsToReplace.price || productsToReplace.stock){
        res.send({status: "error", error: "No hay datos en parametros"})
    }

    let result = await productsModel.updateOne({_id:id_prod}, productsToReplace)
    res.send({result:"sucess", payload: result})

})

//delete
router.delete("/:id_prod", async(req,res)=>{
    let{id_prod} = req.params
    let result = await productsModel.deleteOne({_id: id_prod})
    res.send({result:"sucess", payload: result})
})



export default router