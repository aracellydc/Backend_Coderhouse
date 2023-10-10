import { Router } from 'express' 
import { cartsModel } from '../models/carts.model.js'

const router = Router();


//Se agrega producto
router.post("/", async(req, res)=>{
    let{description, cantidad, total} = req.body
    
    if(!description|| !cantidad || !total){
        res.send({status:"error", error: "Faltan datos"})
    }
    let result = await cartsModel.create({description, cantidad, total})
    res.send({result: "sucess", payload: result})
})

//Traemos todos los carritos
router.get("/", async(req, res)=>{
    try{
        let carts = await cartsModel.find()
        res.send({result:"sucess", payload: carts})
    }catch(error){
        console.log(error)
    }
})

//put
router.put("/:id_cart", async(req, res)=>{
    let{id_cart} = req.params;

    let cartsToReplace= req.body
    if(!cartsToReplace.description || !cartsToReplace.cantidad || cartsToReplace.total){
        res.send({status: "error", error: "No hay datos en parametros"})
    }

    let result = await cartsModel.updateOne({_id:id_cart}, cartsToReplace)
    res.send({result:"sucess", payload: result})

})

//delete
router.delete("/:id_cart", async(req,res)=>{
    let{id_cart} = req.params
    let result = await cartsModel.deleteOne({_id: id_cart})
    res.send({result:"sucess", payload: result})
})

//module.exports = router

export default router