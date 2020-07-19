const fs = require('fs');

let files = fs.readdirSync(__dirname + '/Daos');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import Dao from file ${f}...`);
    // 用文件名做key
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/Daos/' + f);
}