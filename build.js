const { exec } = require('pkg');
const { join } = require('path');
const resourceHacker = require('@lorki97/node-resourcehacker');
const os = require('os');
const archive = require('simple-archiver').archive;
const { existsSync, mkdirSync } = require('fs');
const cachePath = join(os.homedir(), '.pkg-cache/v2.6/fetched-v13.12.0-win-x64');
const icon = join(__dirname, 'iconset.ico');
if (!existsSync("./build")) { mkdirSync("./build"); }

process.env['SOURCE_RESOURCE_HACKER'] = 'http://www.angusj.com/resourcehacker/resource_hacker.zip';

main();

async function main() {
    if (os.platform === "win32") {
        if (!existsSync(cachePath)) {
            await generate();
        }
        resourceHacker({
            operation: 'addoverwrite',
            input: cachePath,
            output: cachePath,
            resource: icon,
            resourceType: 'ICONGROUP',
            resourceName: '1'
        }, async function () {
            await generate();
            zipFiles();
        });
    } else {
        await generate();
        zipFiles();
    }
}




async function generate() {
    await exec(['.', '--targets', 'node13.12.0-win-x64,node13.12.0-macos-x64,node13.12.0-linux-x64', '--out-path', './build']);

    return;
}

async function zipFiles() {
    archive([{ data: './build/dicelog-win.exe', type: 'file', name: 'dicelog.exe' }], { output: './build/Windows.zip' });
    archive([{ data: './build/dicelog-linux', type: 'file', name: 'dicelog' }], { output: './build/Linux.zip' });
    archive([{ data: './build/dicelog-macos', type: 'file', name: 'dicelog' }], { output: './build/MacOS.zip' });
}
