const EasyZip = require('easy-zip2').EasyZip;

linux()
windows()
macOS()

async function linux() {
    var zip = new EasyZip();
    var files = [{
        source: './build/node_sqlite3.node',
        target: 'node_sqlite3.node'
    }, {
        source: './build/dicelog-linux',
        target: 'dicelog'
    }]
    zip.batchAdd(files, {ignore_missing: true}, function() {
        zip.writeToFile('./build/Linux.zip')
    })
}

async function windows() {
    var zip = new EasyZip();
    var files = [{
        source: './build/node_sqlite3.node',
        target: 'node_sqlite3.node'
    }, {
        source: './build/dicelog-win.exe',
        target: 'dicelog.exe'
    }]
    zip.batchAdd(files, {ignore_missing: true}, function() {
        zip.writeToFile('./build/Windows.zip')
    })
}

async function macOS() {
    var zip = new EasyZip();
    var files = [{
        source: './build/node_sqlite3.node',
        target: 'node_sqlite3.node'
    }, {
        source: './build/dicelog-macos',
        target: 'dicelog'
    }]
    zip.batchAdd(files, {ignore_missing: true}, function() {
        zip.writeToFile('./build/MacOS.zip')
    })
}
