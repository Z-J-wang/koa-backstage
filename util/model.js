const path = require('path')
const { readFileList } = require('./common')

let files = readFileList(__dirname + '../../models');

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    // 用文件名做key
    let name =  path.basename(f).split('.')[0];
    console.log(`import model from file ${name}...`);
    
    module.exports[name] = require(f);
}