const fs = require('node:fs/promises');
const path = require('node:path');

async function copDir() {
    const originalSource = path.join(__dirname, 'files');
    const duplicate = path.join(__dirname, 'files-copy');

    try {
        await fs.rm(duplicate, { force: true, recursive: true });
        await fs.mkdir(duplicate, { recursive: true });
        const files = await fs.readdir(originalSource);

        files.forEach((file) => {
            const pathOriginalSource = path.join(originalSource, file);
            const pathDuplicate = path.join(duplicate, file);
            fs.copyFile(pathOriginalSource, pathDuplicate);
        });
        console.log('Copying complete!');
    } catch (error) {
        console.error('Error during execution:', error);
    }
}

copDir();

