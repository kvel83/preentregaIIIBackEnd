const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
const productsRoutes = require("./routes/productRoutes");
const {ProductManager} = require('./models/ProductManager');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => res.send(`Bienvenidos a mi servidor de express`));

//creacion de instancia de ProductManager
const productManager = new ProductManager();

//Disponibilizar rutas
//const productsRouter = productsRoutes(productManager);
//app.use("/products", productsRoutes);
app.use("/products", productsRoutes(productManager));

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}!`)
);

module.exports = {
  app
};
