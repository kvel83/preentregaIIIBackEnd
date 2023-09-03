class Product{
    constructor(id, code, title, thumbnail, description, price, stock){
        this.id = id;
        this.code = code;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
        this.stock = stock
    };
};

module.exports = {Product}