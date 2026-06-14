const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8088;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Standardize URL path
    let urlPath = req.url;
    if (urlPath === '/') {
        urlPath = '/index.html';
    } else if (urlPath === '/study' || urlPath === '/study/') {
        urlPath = '/study.html';
    }
    let filePath = path.join(__dirname, urlPath);

    // Resolve directory traversal vulnerabilities
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Return index.html on missing assets for routing if needed, or simple 404
                fs.readFile(path.join(__dirname, 'index.html'), (err, indexContent) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(indexContent);
                    }
                });
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`Portfolio Local Server is active!`);
    console.log(`Preview your site: http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to terminate the server`);
    console.log(`==================================================\n`);
});
