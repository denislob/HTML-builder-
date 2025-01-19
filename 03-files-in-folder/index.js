const fs = require('node:fs');
const path = require('node:path');
const pathDir = path.join(__dirname, 'secret-folder');

fs.readdir(pathDir, 
    { withFileTypes: true },
    (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {        
        if (file.isFile()) {
            const pathFile = path.join(__dirname, 'secret-folder', `${file.name}`);            
            fs.stat(pathFile, (err, stats) => {
                if (err) return console.error(err);
                let info = file.name.split('.');               
                console.log(`${info[0]} - ${info[1]} - ${(stats.size / 1024).toFixed(2)}kb`);
            });
        }
      });
    }
);


