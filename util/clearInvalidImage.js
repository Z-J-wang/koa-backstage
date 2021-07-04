const fs = require('fs');
const path = require('path');
const models = require('./model');
const { readFileList } = require('./common');

const options = {
  flags: 'a',
  encoding: 'utf8', // utf8编码
  autoClose: true,
};
const stderr = fs.createWriteStream('./logs/clearInvalidImage.log', options);
const logger = new console.Console(stderr);
// 创建logger

async function clearInvalidImage() {
  if(!getLog()){
    return false;
  }
    const imagesOfDatabase = await getImageOfDatebase();

  const imagesFileList = readFileList(__dirname + '../../public/tmp-upload');
  imagesFileList.forEach((file) => {
    const fileName = path.basename(file);
    if (isInvalidImage(fileName, imagesOfDatabase)) {
      deleteImage(fileName);
    }
  });
}

/**
 * 删除 upload 目录的文件
 * @param {string} filename
 */
function deleteImage(filename) {
  return new Promise((resolve, reject) => {
    fs.unlink(`public\\tmp-upload\\${filename}`, function (err) {
      if (!err) {
        logger.log(`${filename} - ${new Date()}`); // 将删除成功的文件记录在日志中
        resolve(true);
      } else {
        console.log(err);
        reject(false);
      }
    });
  });
}

/**
 * 判断是否是无效图片文件
 * @param {*} filename 图片文件名
 * @param {*} validList 有效图片集合
 * @returns {Boolean}
 */
function isInvalidImage(filename, validList) {
  // 不在 validList 集合中，且不是 .gitignore，则为无效图片
  return filename !== '.gitignore' && validList.indexOf(filename) <= -1;
}

/**
 * 获取数据库中所有的图片
 * @returns {Array} isValidImages 图片列表
 */
async function getImageOfDatebase() {
  let isValidImages = []; // 有效图片队列
  let keys = Object.keys(models);
  for (const key of keys) {
    const data = await models[key].findAll({ raw: true });
    let isExistImages = filterImage(data);
    isValidImages = isValidImages.concat(isExistImages);
  }

  return isValidImages;
}

/**
 * 从数据表中筛选出图片名
 * @param {*} data 数据表的全部数据
 * @returns {Array} imgList 图片列表
 */
function filterImage(data) {
  // 表数据为空，直接跳过
  if (!data.length) {
    return [];
  }
  let imgList = [];
  const keys = Object.keys(data[0]); // 获取表字段
  data.forEach((item) => {
    keys.forEach((key) => {
      const value = item[key];
      if (typeof value === 'string') {
        let reg = /[a-z0-9]*.png/gi;
        const images = value.match(reg);
        if (images instanceof Array) {
          imgList = imgList.concat(images);
        }
      }
    });
  });

  return imgList;
}

function getLog() {
  const fullPath = path.join(__dirname + '../../logs/clearInvalidImage.log');
  const data = fs.readFileSync(fullPath, 'utf-8');
  if (!data) {
    return true;
  }
  const logs = data.split('\n');
  const lastLog = logs[logs.length - 2];
  const lastLogTime = new Date(lastLog.split(' - ')[1]);
  const interval = new Date() - lastLogTime;
  return interval / (60 * 60 * 1000) > 24;
}

module.exports = clearInvalidImage;
