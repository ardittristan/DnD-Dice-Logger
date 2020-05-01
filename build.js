const { exec } = require('pkg');
const { join } = require('path');
const resourceHacker = require('@lorki97/node-resourcehacker');
const os = require('os');
const EasyZip = require('easy-zip2').EasyZip;
const { existsSync, copyFileSync, readdirSync, mkdirSync } = require('fs');
const cachePath = join(os.homedir(), '.pkg-cache/v2.6/fetched-v13.12.0-win-x64');
const icon = join(__dirname, 'iconset.ico');
const sqliteDir = join(__dirname, 'node_modules/sqlite3/lib/binding/');
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
            archiveLinux();
            archiveMacOS();
            archiveWindows();
        });
    } else {
        await generate();
        archiveLinux();
        archiveMacOS();
        archiveWindows();
    }
}




async function generate() {
    await exec(['.', '--targets', 'node13.12.0-win-x64,node13.12.0-macos-x64,node13.12.0-linux-x64', '--out-path', './build']);
    copyFileSync(join(sqliteDir, readdirSync(sqliteDir)[0], '/node_sqlite3.node'), './build/node_sqlite3.node');
    return;
}

async function archiveLinux() {
    var zip = new EasyZip();
    var files = [{
        source: './build/node_sqlite3.node',
        target: 'node_sqlite3.node'
    }, {
        source: './build/dicelog-linux',
        target: 'dicelog'
    }];
    zip.batchAdd(files, { ignore_missing: true }, function () {
        zip.writeToFile('./build/Linux.zip');
    });
}

async function archiveWindows() {
    var zip = new EasyZip();
    var files = [{
        source: './build/node_sqlite3.node',
        target: 'node_sqlite3.node'
    }, {
        source: './build/dicelog-win.exe',
        target: 'dicelog.exe'
    }];
    zip.batchAdd(files, { ignore_missing: true }, function () {
        zip.writeToFile('./build/Windows.zip');
    });
}

async function archiveMacOS() {
    var zip = new EasyZip();
    var files = [{
        source: './build/node_sqlite3.node',
        target: 'node_sqlite3.node'
    }, {
        source: './build/dicelog-macos',
        target: 'dicelog'
    }];
    zip.batchAdd(files, { ignore_missing: true }, function () {
        zip.writeToFile('./build/MacOS.zip');
    });
}
