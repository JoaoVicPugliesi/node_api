import { readFile } from 'fs/promises';
import { writeDataToFile } from '../utils.js';
import { v4 } from 'uuid';

async function loadJSON () {
    const rawData = await readFile(new URL('../data/products.json', import.meta.url), 'utf-8');
    return JSON.parse(rawData);
}

export async function findAll() {
    const products = await loadJSON();
    return new Promise((resolve, reject) => {
        try {
            resolve(products);
        } catch (err) {
            reject(console.error(err));
        }
    });
}

export async function findOne(id) {
    const products = await loadJSON();
    return new Promise((resolve, reject) => {
        try {
            const product = products.find((p) => p.id === id);
            resolve(product);
        } catch (err) {
            reject(console.error(err));
        }
    });
}

export async function createOne(product) {
    let products = await loadJSON();
    return new Promise((resolve, reject) => {
        try {
            const newProduct = {id: v4(), ...product};
            products.push(newProduct);
            writeDataToFile('./data/products.json', products);
            resolve(newProduct);
        } catch (err) {
            reject(console.log(err));
        }
    });
}

export async function updateOne(id, product) {
    let products = await loadJSON();
    return new Promise((resolve, reject) => {
        try {
            const index = products.findIndex((p) => p.id === id);
            if (index === -1) {
                return reject(new Error('Product Not Found'));
            }
            products[index] = {id: id, ...product};
            writeDataToFile('./data/products.json', products);
            resolve(products[index]);
        } catch (err) {
            reject(console.log(err));
        }
    });
}

export async function deleteOne(id) {
    let products = await loadJSON();
    return new Promise((resolve, reject) => {
        try {
            products = products.filter((p) => p.id !== id);
            writeDataToFile('./data/products.json', products);
            resolve({ message: 'Product Deleted' });
        } catch (err) {
            reject(console.log(err));
        }
    });
}
