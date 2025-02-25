const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // To set correct Content-Type for files

const server = http.createServer((req, res) => {
  // Get the file path based on the request URL, default to the current directory
  const filePath = path.join(__dirname, req.url);

  // If the request is for a directory, list the files
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error');
      return;
    }

    // If it's a directory, list the files in the directory
    if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server Error');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Directory Listing</h1><ul>');
        
        files.forEach(file => {
          // Create links for each file/folder in the directory
          const fileUrl = path.join(req.url, file);
          res.write(`<li><a href="${fileUrl}">${file}</a></li>`);
        });
        
        res.end('</ul>');
      });
    } else {
      // If it's a file, serve the file
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Server Error');
        } else {
          // Set correct content type based on file extension
          const ext = path.extname(filePath);
          const mimeType = mime.lookup(ext) || 'application/octet-stream';

          res.writeHead(200, { 'Content-Type': mimeType });
          res.end(data);
        }
      });
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

