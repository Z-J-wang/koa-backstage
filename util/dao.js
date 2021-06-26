const path = require('path')
const { readFileList } = require('./common');
console.log(__dirname)
let files = readFileList(__dirname + '../../Daos');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    // 用文件名做key
    let name =  path.basename(f).split('.')[0];
    console.log(`import Dao from file ${name}...`);

    module.exports[name] = require(f);
}