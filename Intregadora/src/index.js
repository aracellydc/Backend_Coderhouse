const express = require("express")
const {default: mongoose} = require("mongoose")
const app = express()
const port = 8080 

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})
