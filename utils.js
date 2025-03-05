import fs from 'fs';

export function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) console.error(err);
    });
}

export async function getPostData(req, res) {
    return new Promise((resolve, reject) => {
        try {   
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (err) {
            reject(console.error(err));
        }
    });
}