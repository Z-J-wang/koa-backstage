const multer = require('@koa/multer');

function uploads(filePath) {
  if (!filePath) {
    throw new Error('上传文件的存放路径未设置！');
  }
  //以下是配置
  const storage = multer.diskStorage({
    //定义文件保存路径
    destination: function (req, file, cb) {
      cb(null, filePath); //路径根据具体而定
    }, //注意这里有个，
    //修改文件名，文件名为日期字符串
    filename: function (req, file, cb) {
      var fileFormat = file.originalname.split('.')[1];
      cb(null, `${Date.now()}.${fileFormat}`);
    },
  });

  const limits = {
    fields: 10, //非文件字段的数量
    fileSize: 10 * 1024, //文件大小 单位 b
    files: 1, //文件数量
  };
  return multer({ storage: storage, limits: limits });
}

module.exports = uploads;
