const fs = require('fs');
const multer = require('koa-multer');
const router = require('koa-router')();

//以下是配置
var storage = multer.diskStorage({
	//定义文件保存路径
	destination: function (req, file, cb) {
		cb(null, './public/tmp-upload/'); //路径根据具体而定
	}, //注意这里有个，
	//修改文件名
	filename: function (req, file, cb) {
		var fileFormat = file.originalname.split('.');
		cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
	}
});

var upload = multer({ storage: storage });

router.prefix('/api');

/**
 * 接收前端上传的图片
 */
router.post('/uploadImage', upload.single('file'), async function (ctx, next) {
	let filename = ctx.req.file.filename;
  console.log(filename)
	let res_data, res_code, res_msg;
	try {
		res_data = filename;
		res_code = 1000;
		res_msg = '图片上传成功';
	
	} catch (error) {
		// 上传失败，删除已存储的图片
		console.log(error);
		res_code = 5000;
		res_msg = '后台出错！';
		res_data = error;
	} finally {
		ctx.body = {
			code: res_code,
			msg: res_msg,
			url: res_data
		};
	}
});

/**
 * 删除图片
 */
router.post('/delUploadImage', async function (ctx, next) {
	const filename = ctx.request.body.filename;
	console.log(filename);
	let res_data, res_code, res_msg;
	try {
		let ret = await delUploadFile(filename);
		if (ret) {
			res_data = ret;
			res_code = 1000;
			res_msg = '图片删除成功';
		} else {
			res_code = 5000;
			res_msg = '图片删除失败';
		}
	} finally {
		ctx.body = {
			code: res_code,
			msg: res_msg,
			data: res_data
		};
	}
});

/**
 * 删除 upload 目录的文件
 * @param {string} filename
 */
function delUploadFile(filename) {
	return new Promise((resolve, reject) => {
		fs.unlink(`public\\upload\\${filename}`, function (err) {
			if (!err) {
				resolve(true);
			} else {
				reject(false);
			}
		});
	});
}

module.exports = router;
