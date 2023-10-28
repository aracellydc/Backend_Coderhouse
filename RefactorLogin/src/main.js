import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import ProductManager from "./controllers/ProductManager.js";
import CartManager from "./controllers/CartManager.js";
import mongoose from "mongoose";
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"
import userRouter from "./router/user.routes.js";
import MongoStore from "connect-mongo"
import session from 'express-session'
import FileStore from "session-file-store"; 
import passport from "passport"
import initializePassword from "./config/passport.config.js"

const FileStorege = FileStore(session); 
const product = new ProductManager();
const cart = new CartManager();


const app = express()
const PORT = 8080
app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})

app.use(express.json() )
app.use(express.urlencoded({extended: true}));


//Mongoose
mongoose.connect("mongodb+srv://pruebaCoder:CHuV3YnIFOSmKCa7@pruebacoder.nw87acm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})

//MongoAtlas
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://pruebaCoder:CHuV3YnIFOSmKCa7@pruebacoder.nw87acm.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true}, ttl: 3600
    }),
    secret: "ClaveSecreta",
    resave: false,
    saveUninitialized: false,
}))

//Passport
initializePassword()
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/api/sessions", userRouter)


//Handlebars//
app.engine('hbs', engine({ allowProtoPropertiesByDefault: true }));


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"))
app.use("/", express.static(__dirname + "/public"));



app.get("/products", async (req, res) => {
    if(!req.session.emailUsuario){
        return res.redirect("/login")
    }
    let allProducts = await product.getProducts();
    const products = allProducts.map(product => product.toJSON());
    res.render("viewProducts", {
        title: "vista productos",
        products: products,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,

    });
});

//renderizado de productos en carrito

app.get("/carts/:cid", async (req, res) => {
    let id = req.params.cid
    let allCarts  = await cart.getCartWithProducts(id)
    res.render("viewCart", {
        title: "vista carro",
        carts : allCarts
    });
});

//la ruta http://localhost:8080/login
app.get("/login", async (req, res)=>{
    res.render("login",{
        title:"Vista Login",
    });
})
// ruta http://localhost:8080/register
app.get("/register", async (req, res)=>{
    res.render("register",{
        title:"Vista register",
    });
})
// ruta http://localhost:8080/profile
app.get("/profile", async (req, res)=>{
    if(!req.session.emailUsuario){
        return res.redirect("/login")
    }
    res.render("profile",{
        title:"Vista profile Admin",
        first_name:req.session.nomUsuario,
        last_name: req.session.apeUsuario,
        email: req.session.emailUsuario,
        rol: req.session.rolUsuario,
    });
})