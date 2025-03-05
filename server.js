import { createServer } from 'http';
import routes from './routes/endpoints.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const ORIGIN = process.env.ORIGIN;
const METHODS = process.env.METHODS;
const HEADERS = process.env.HEADERS;


const server = createServer((req, res) => {
    // Cors
    res.setHeader('Access-Control-Allow-Origin', ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', METHODS);
    res.setHeader('Access-Control-Allow-Headers', HEADERS); 

    if (req.method === 'OPTIONS') {
        res.writeHead(204); 
        res.end();
        return;
    }

    routes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server Is Running On http://${HOST}:${PORT}`);
});