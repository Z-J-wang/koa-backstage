const models = require('./model');

async function clearInvalidImage(data) {
  const imagesOfDatabase = await getImageOfDatebase();
  console.log(imagesOfDatabase);
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

module.exports = clearInvalidImage;
