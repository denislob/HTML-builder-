const fs = require('node:fs/promises'); 
const path = require('node:path'); 
const stylesPath = path.join(__dirname, 'styles'); 
const finalFile = path.join(__dirname, 'project-dist', 'bundle.css'); 
 
async function mergeStyles() { 
    try {
        await fs.writeFile(finalFile, ''); 
        const files = await fs.readdir(stylesPath); 
        
        for (const file of files) { 
            const filePath = path.join(stylesPath, file); 
            const stat = await fs.stat(filePath); 
             
            if (stat.isFile() && path.extname(file) === '.css') { 
                const info = await fs.readFile(filePath, 'utf-8'); 
                await fs.appendFile(finalFile, info + '\n'); 
            } 
        }
        console.log('Style merging complete.');
    } catch (error) {
        console.error('Error during execution:', error);
    }
} 
 
mergeStyles();

