import { findAll, findOne, createOne, updateOne, deleteOne } from "../models/productModels.js";
import { getPostData } from "../utils.js";

export async function getProducts(req, res) {
    const products = await findAll();

    if(!products) {
        res.writeHeader(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({ message: 'Not Found' }));
        return;
    }
    
    res.writeHeader(200, {'Content-Type' : 'application/json'});
    res.write(JSON.stringify(products));
    res.end();
}

export async function getProduct(req, res) {
    const id = req.url.split('/')[3];
    const product = await findOne(id);
    if(!product) {
        res.writeHeader(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({ message: 'Not Found' }));
        return;
    }

    res.writeHeader(200, {'Content-Type' : 'application/json'});
    res.write(JSON.stringify(product));
    res.end();
}

export async function createProduct(req, res) {
    const body = await getPostData(req);

    if(!body) {
        res.writeHeader(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({ message: 'Bad Request: No data received' }));
        return;
    }

    const { name, description, price, category, stock } = JSON.parse(body);

    const product = {
        name,
        description,
        price,
        category, 
        stock
    }

    const newProduct = await createOne(product);

    res.writeHeader(400, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(newProduct));
}

export async function updateProduct(req, res) {
    const id = req.url.split('/')[3];
    const product = await findOne(id);
    console.log(product);
    if(!product) {
        res.writeHeader(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({ message: 'Not Found' }));
        return;
    }

    const body = await getPostData(req);
    
    if(!body) {
        res.writeHeader(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({ message: 'Bad Request: No data received' }));
        return;
    }

    const { name, description, price, category, stock } = JSON.parse(body);

    const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        category: category || product.category, 
        stock: stock || product.stock
    }

    const updProduct = await updateOne(id, productData);

    res.writeHeader(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(updProduct));
}

export async function deleteProduct(req, res) {
    const id = req.url.split('/')[3];
    const product = await findOne(id);

    if(!product) {
        res.writeHeader(404, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({ message: 'Not Found' }));
        return;
    }

    const delProduct = await deleteOne(id);

    res.writeHeader(200, {'Content-Type' : 'application/json'});
    res.end(JSON.stringify(delProduct));
}