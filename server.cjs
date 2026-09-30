const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
};
http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
      res.writeHead(400);
      return res.end('Bad request');
    }
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep) || !Object.hasOwn(types, path.extname(file))) {
      res.writeHead(404);
      return res.end('Not found');
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Not found');
      }
      res.writeHead(200, {
        'Content-Type': (types[path.extname(file)] || 'text/plain') + '; charset=utf-8',
      });
      res.end(data);
    });
  })
  .listen(process.env.PORT || 3000, '0.0.0.0', () =>
    console.log(
      'Re:Pixel Studio is ready at http://localhost:' + (process.env.PORT || 3000),
    ),
  );
