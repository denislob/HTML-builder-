const fs = require('node:fs');
const path = require('node:path');

const projectDistPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');

async function createProjectFolder() {
    await fs.promises.mkdir(projectDistPath, { recursive: true });
}

async function readTemplate() {
    return await fs.promises.readFile(templatePath, 'utf-8');
}

function searchTags(temp) {
    const regex = /{{(\w+)}}/g;
    const tagsArr = [];
    let match;
    while ((match = regex.exec(temp)) !== null) {
        tagsArr.push(match[1]);
    }
    return tagsArr;
}

async function changeTags(temp) {
    const tags = searchTags(temp);
    let result = temp;

    for (const tag of tags) {
        const componentFile = path.join(componentsPath, `${tag}.html`);
        const tagContent = await fs.promises.readFile(componentFile, 'utf-8');
        result = result.replace(`{{${tag}}}`, tagContent.trim());
    }       

    return result;
}

async function writeIndexHtml(contentHtml) {
    await fs.promises.writeFile(path.join(projectDistPath, 'index.html'), contentHtml);
}

async function mergeStyles() {
    const files = await fs.promises.readdir(stylesPath);
    const css = files.filter(file => file.endsWith('.css'));    
    let finalContentCss = '';

    for (const file of css) {
        const filePath = path.join(stylesPath, file);
        const chunkCss = await fs.promises.readFile(filePath, 'utf-8');
        finalContentCss += chunkCss + '\n';
    }

    await fs.promises.writeFile(path.join(projectDistPath, 'style.css'), finalContentCss);
}

async function duplicateAssets() {
    const copyDir = async (from, to) => {
        await fs.promises.mkdir(to, { recursive: true });
        const items = await fs.promises.readdir(from, { withFileTypes: true });
        
        for (const item of items) {
            const fromPath = path.join(from, item.name);
            const toPath = path.join(to, item.name);

            if (item.isDirectory()) {
                await copyDir(fromPath, toPath);
            } else {
                await fs.promises.copyFile(fromPath, toPath);
            }
        }
    };
    await copyDir(assetsPath, path.join(projectDistPath, 'assets'));
}

async function createProject() {
    try {
        await createProjectFolder();
        const tempContent = await readTemplate();
        const contHtml = await changeTags(tempContent);
        await writeIndexHtml(contHtml);
        await mergeStyles();
        await duplicateAssets();
        
        console.log('The project was created in the project-dist folder.');
    } catch (error) {
        console.error('Error during execution:', error);
    }
}

createProject();

