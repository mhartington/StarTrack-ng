#!/usr/bin/env node

// based on https://github.com/StephenFluin/firebase-http2-push-config
fs = require('fs');

fs.readdir('www/', (err, files) => {
    if (!files) {
        console.log('No dist folder found to write to.');
        return;
    }
    const indexMatches = [
        '.gz',
        '.map',
        '3rdpartylicenses.txt',
        'ngsw-manifest.json',
        'ngsw.json',
        'worker-basic.min.js',
        'ngsw-worker.js',
        'favicon',
        'index.html',
    ];
    files = files.filter(file => {
        for (const path of indexMatches) {
            if (file.indexOf(path) != -1) {
                return false;
            }
        }
        if (fs.lstatSync(`dist/${file}`).isDirectory()) {
            return false;
        }
        if (file.indexOf('.bundle.') != -1 || file.indexOf('.chunk.')) {
            return true;
        } else {
            return false;
        }
    });
    let result = '';
    for (let file of files) {
        let type;
        if (file.substr(-3) == 'css') {
            type = 'style';
        } else {
            type = 'script';
        }
        result += `</${file}>;rel=preload;as=${type},`;
    }
    updateWith(result);
});

function updateWith(result) {
    fs.readFile('firebase.json', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        let re = /("headers":\s*\[\s*{\s*"key":\s*"Link",\s*"value":\s*")(.*)("\s*}\s*\])/gm;

        if (re.exec(data)) {
            let newConfig = data.replace(re, `$1${result}$3`);
            fs.writeFile('firebase.json', newConfig, 'utf8', function(err) {
                if (err) return console.log(err);
                console.log('firebase.json updated successfully.');
            });
        } else {
            console.log("Couldn't find a valid firebase config to update.");
            return;
        }
    });
}
