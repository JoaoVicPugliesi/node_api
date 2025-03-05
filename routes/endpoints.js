import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productControllers.js";

function routes(req, res) {
    if(req.method === 'GET') {
        if(req.url === '/api/products') {
            getProducts(req, res);
            return;
        }

        if(req.url.match(/\/api\/products\/[(0-9)+]/)) {
            getProduct(req, res);
            return;
        }
        res.writeHeader(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }

    if(req.method === 'POST') {
        if(req.url === '/api/products') {
            createProduct(req, res);
            return;
        }

        res.writeHeader(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }

    if(req.method === 'PUT') {
        if(req.url.match(/\/api\/products\/[(0-9)+]/)) {
            updateProduct(req, res);
            return;
        }

        res.writeHeader(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }

    if(req.method === 'DELETE') {
        if(req.url.match(/\/api\/products\/[(0-9)+]/)) {
            deleteProduct(req, res);
            return;
        }

        res.writeHeader(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
}

export default routes;