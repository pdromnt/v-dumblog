
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const settingsPath = path.join(projectRoot, 'public', 'assets', 'settings.json');
const distIndexPath = path.join(projectRoot, 'dist', 'index.html');

console.log('Updating index.html title...');

try {
    if (!fs.existsSync(settingsPath)) {
        console.error(`Error: settings.json not found at ${settingsPath}`);
        process.exit(1);
    }

    if (!fs.existsSync(distIndexPath)) {
        console.error(`Error: dist/index.html not found at ${distIndexPath}`);
        console.error('Make sure you have run the build before running this script.');
        process.exit(1);
    }

    const settingsRaw = fs.readFileSync(settingsPath, 'utf-8');
    const settings = JSON.parse(settingsRaw);
    const blogTitle = settings.blogTitle;

    if (!blogTitle) {
        console.warn('Warning: blogTitle not found in settings.json. Skipping title update.');
        process.exit(0);
    }

    let indexHtml = fs.readFileSync(distIndexPath, 'utf-8');

    // Regex to replace content inside <title> tags
    const titleRegex = /<title>(.*?)<\/title>/;

    if (titleRegex.test(indexHtml)) {
        indexHtml = indexHtml.replace(titleRegex, `<title>${blogTitle}</title>`);
        fs.writeFileSync(distIndexPath, indexHtml, 'utf-8');
        console.log(`Success: Updated index.html title to "${blogTitle}"`);
    } else {
        console.warn('Warning: <title> tag not found in index.html');
    }

} catch (error) {
    console.error('Error updating title:', error);
    process.exit(1);
}
