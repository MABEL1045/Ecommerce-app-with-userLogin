const products = require('../models/products');

const getProduct = (req, res) =>{
    res.json(products)
};

const postProduct =  (req, res) =>{
    id = products.length + 1;
    const newProduct = {id, ...req.body};
    products.push(newProduct);
    res.json(products);
};

const putProduct = (req, res) =>{
    const productID = Number(req.params.id);
    const product = products.find((product) => product.id === productID);
    const index = products.indexOf(product);
    
    if (!product) {
        res.status(500).send("product not found");
    }else {
        const updatedProduct = {...product, ...req.body}
        products[index] = updatedProduct;
        res.json(products)
    };
    };

    const deleteProduct =  (req, res) => {
        const remProduct = products.find((product) => product.id === Number(req.params.id));
    
        if(!remProduct) {
            return res.status(404).json({ success: false, msg: `No product with id ${req.params.id}`})
        };
        const newProduct = products.filter((product) => product.id !== Number(req.params.id));
        return res.status(200).json({success: true, data: newProduct});
    };

   module.exports = { getProduct, postProduct, putProduct, deleteProduct}; 
    