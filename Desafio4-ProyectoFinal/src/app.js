import express from "express";
//import { ProductManager } from "../src/ProductManager.js"
import productRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/carts.routes.js";
import path from 'path'
import multer from "multer";
import { __dirname } from "./path.js";

const PORT = 8080;
const app = express();
//const path = "./products/products.json"
//const productManager = new ProductManager(path);


//=========CONFIG=============
const storage = multer.diskStorage({
    destination: (req, file, db) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, db) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})

//==========MIDLEWEARES==============
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const upload = multer({ storage: storage })


//routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)
app.use('/static', express.static(path.join(__dirname, '/public')))
app.post('/upload', upload.single('producto'), (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})