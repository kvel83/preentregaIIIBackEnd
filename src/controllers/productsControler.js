const getAllProducts = async(req, res, productManager) => {
    try {
        console.log("entre a gelAllProducts");
        const limit = req.query.limit;
        let defaultLimit, parsedLimit;
        console.log("limit: ", limit);
        if(!limit || isNaN(limit) ){
            console.log("limit no viene");
            defaultLimit = null
        }else{
            parsedLimit = parseInt(limit);
            console.log("limit si viene");
        }

        const productList = await productManager.getProducts(defaultLimit || parsedLimit);
        console.log("productlist: ", productList);
        return res.status(201).json(productList);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al obtener la lista de productos"});
    }
};

const getProductById = async(req, res, productManager) => {
    try {
        console.log("entre a getProductsById");
        const pid = req.params.id;
        console.log("PID: ",pid);
        const product = await productManager.getProductById(pid);
        console.log("productbyid: ", product);
        if (product){
            console.log("producto encontrado");
            return res.status(201).json(product);
        }else{
            console.log("producto no encontrado");
            return res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al obtener el producto'});
    }
};

module.exports={
    getAllProducts,
    getProductById
}