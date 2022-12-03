const fs = require("fs/promises");
const path = require('path');

async function main() {

    const files = await fs.readdir('.tmp/icons');

    const result = {};

    for (const name of files) {
        const basename = name.replace(path.extname(name), "");
        const text = await fs.readFile(`.tmp/icons/${name}`);
        result[basename] = JSON.parse(text.toString());
    }

    const raw = JSON.stringify(result);
    await fs.writeFile("src/icons.json", raw);
}

main();