const fs = require ('fs');
const Product = require('./Product')

class ProductManager{
    constructor(){
        this.path = "./src/data/products.json";
        try {
            fs.accessSync(this.path, fs.constants.F_OK);
        } catch (error) {
            fs.writeFileSync(this.path, "[]");
            console.log('Se creó el archivo products.json');
        }
    };

    addProduct = async (code, title, thumbnail, description, price, stock) => {
        if (!code || !title || !thumbnail || !description || !price || !stock) {
            return 'Debe proporcionar los datos solicitados';
        } else {
            fs.access(this.path,fs.constants.F_OK, (err) => {
                if (err){
                    const newProduct = new Product(1,code, title, thumbnail, description, price, stock);
                    fs.writeFileSync('products.json', `[${JSON.stringify(newProduct)}]`);
                    console.log("Producto agregado correctamente");
                }else{
                    let contenidoJson = fs.readFileSync(this.path, 'utf-8');
                    let objetoJson = JSON.parse(contenidoJson);
                    let newId = objetoJson.length;
                    const newProduct = new Product(newId, code, title, thumbnail, description, price, stock);
                    const codeExist = objetoJson.find(product => product.code === code);
                    if(!codeExist){
                        objetoJson.push(newProduct);
                        contenidoJson = JSON.stringify(objetoJson);
                        fs.writeFileSync(this.path, contenidoJson);
                        console.log("Producto agregado correctamente");
                    }else{
                        console.log("El codigo del producto ya existe")
                        return
                    };
                }
            } );
        };
    }

    getProducts = (limit) => {
        return new Promise((resolve, reject) => {
            fs.access(this.path,fs.constants.F_OK, (err) => {
                if (err)resolve([]);
                try{
                    let contenido = fs.readFileSync(this.path, 'utf-8');
                    let productList = JSON.parse(contenido);
                    if (!limit){
                        resolve(productList)
                    }else if (typeof limit === 'number' && limit >= 0){
                        const productListSlice = productList.slice(0, limit);
                        resolve(productListSlice);
                    }else{
                        reject(new Error('El valor de "limit" no es válido'));
                    }
                }catch(error){
                    reject(error);
                }
            })
        })
    };

    showProducts = async() => {
        try{
            let objetoJson = await this.getProducts();
            if (!objetoJson || !objetoJson.length){
                console.log(`\nNO HAY PRODUCTOS`)
            }else{
                let texto = `***** PRODUCTOS *****`
                console.log(texto);
                objetoJson.forEach((objeto, index) => {
                    let producto = `${objeto.id} -- ${objeto.code} -- ${objeto.title} -- ${objeto.thumbnail} -- ${objeto.description} -- ${objeto.price} -- ${objeto.stock}`;
                    console.log(producto);
                });
            }
        }catch (error){console.log(error)};
    }

    getProductById = (id) => {
        return new Promise((resolve, reject) => {
            fs.access(this.path,fs.constants.F_OK, (err) => {
                if (err)resolve([]);
                try{
                    console.log("id en modelo: ", id);
                    let contenido = fs.readFileSync(this.path, 'utf-8');
                    let contenidoJson = JSON.parse(contenido);
                    console.log(contenidoJson);
                    const objectSearched = contenidoJson.find(product => product.id === parseInt(id));
                    console.log(`el producto con el ID ${id} es :`,objectSearched);
                    resolve(objectSearched);
                }catch(error){
                    reject(error);
                }
            })
        });
    };

    updateProduct = ({ id, code, title, thumbnail, description, price, stock }) => {
        return new Promise((resolve, reject) => {
            fs.access(this.path, fs.constants.F_OK, (err) => {
                if (err) {
                    reject("El archivo no existe");
                    return;
                }
                try {
                    let contenido = fs.readFileSync(this.path, 'utf-8');
                    let contenidoJson = JSON.parse(contenido);

                    const indexToUpdate = contenidoJson.findIndex(product => product.id === id);
                    if (indexToUpdate !== -1) {
                        if (code || title || thumbnail || description || price || stock) {
                            const updatedProduct = {
                                ...contenidoJson[indexToUpdate],
                                code: code || contenidoJson[indexToUpdate].code,
                                title: title || contenidoJson[indexToUpdate].title,
                                thumbnail: thumbnail || contenidoJson[indexToUpdate].thumbnail,
                                description: description || contenidoJson[indexToUpdate].description,
                                price: price || contenidoJson[indexToUpdate].price,
                                stock: stock || contenidoJson[indexToUpdate].stock
                            };
                            contenidoJson[indexToUpdate] = updatedProduct;

                            let updateProducts = JSON.stringify(contenidoJson);
                            fs.writeFileSync(this.path, updateProducts);
                            console.log("Producto actualizado correctamente");
                        } else {
                            console.log("Ningún campo proporcionado para actualizar");
                        }
                    } else {
                        console.log("El producto que desea actualizar no existe");
                    }
                } catch (error) {
                    reject(error);
                }
            });
        });
    };


    deleteProduct = (id) =>{
        return  new Promise ((resolve ,reject)=>{
            fs.access(this.path, fs.constants.F_OK, (err) => {
                if (err)resolve([]);
                try{
                    let contenido = fs.readFileSync(this.path, 'utf-8');
                    let contenidoJson = JSON.parse(contenido);
                    const indexToDelete = contenidoJson.findIndex(product => product.id === id);
                    if (indexToDelete !== -1){
                        contenidoJson.splice(indexToDelete, 1);
                        fs.writeFileSync(this.path,JSON.stringify(contenidoJson));
                        console.log('Producto eliminado exitosamente');
                    }else{
                        console.log('El producto que desea eliminar no existe');
                    }
                }catch(error){
                    reject(error);
                }
            })
        });
    }
};

module.exports = {ProductManager}