/**
 * 清除项目中的无效图片文件
 * 说明：系统每个24小时会自动清理系统中的无效的图片（系统内所有的图片都存放public/upload
 */
const fs = require('fs');
const path = require('path');
const models = require('./model');
const { readFileList } = require('./common');

function ClearInvalidImage() {
	if (this.isOver24Hours()) {
    this.entrance();
  }
}

ClearInvalidImage.prototype = {
	entrance: async function () {
		const imagesOfDatabase = await this.getImageOfDatebase(); // 数据库中的所有图片名队列
		const imagesFileList = readFileList(__dirname + '../../public/upload'); // public/upload 文件夹下的图片路径队列
		imagesFileList.forEach((file) => {
			const fileName = path.basename(file); // 提取图片名
			if (this.isInvalidImage(fileName, imagesOfDatabase)) {
				this.deleteImage(fileName); // 删除无效图片
			}
		});
	},

	/**
	 * 创建日志记录器
	 * @returns {Object}
	 */
	createLogger: function () {
		// 创建日志文件 clearInvalidImage.log，所有的参数操作都记录在其中
		const stderr = fs.createWriteStream('./logs/clearInvalidImage.log', {
			flags: 'a',
			encoding: 'utf8', // utf8编码
			autoClose: true
		});
		return new console.Console(stderr);
	},

	/**
	 * 删除 upload 目录的文件
	 * @param {string} filename
	 */
	deleteImage: function (filename) {
		const logger = this.createLogger();

		return new Promise((resolve, reject) => {
			fs.unlink(`public\\upload\\${filename}`, function (err) {
				if (!err) {
					logger.log(`${filename} - ${new Date()}`); // 将删除成功的文件记录在日志中
					resolve(true);
				} else {
					console.log(err);
					reject(false);
				}
			});
		});
	},

	/**
	 * 判断是否是无效图片文件
	 * @param {*} filename 图片文件名
	 * @param {*} validList 有效图片集合
	 * @returns {Boolean}
	 */
	isInvalidImage: function (filename, validList) {
		// 不在 validList 集合中，且不是 .gitignore，则为无效图片
		return filename !== '.gitignore' && validList.indexOf(filename) <= -1;
	},

	/**
	 * 获取数据库中所有的图片
	 * @returns {Array} isValidImages 图片列表
	 */
	getImageOfDatebase: async function () {
		let isValidImages = []; // 有效图片队列
		let keys = Object.keys(models);
		for (const key of keys) {
			const data = await models[key].findAll({ raw: true });
			let existImages = this.filterImage(data); // 存在数据表中的图片名
			isValidImages = isValidImages.concat(existImages); // 数组合并
		}
		console.log(isValidImages);
		return isValidImages;
	},

	/**
	 * 从数据表中筛选出图片名
	 * @param {*} data 数据表的全部数据
	 * @returns {Array} imgList 图片列表
	 */
	filterImage: function (data) {
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
					let reg = /[a-z0-9]*.(png|jpg|jpeg|gif|JPG|JPEG|PNG|GIF)/gi;
					const images = value.match(reg);
					if (images instanceof Array) {
						imgList = imgList.concat(images);
					}
				}
			});
		});

		return imgList;
	},

	/**
	 * 判断距离上一次清除操作是否超过24个小时
	 * @returns {Boolean} 超过或未查询到上一次的记录，返回 true
	 */
	isOver24Hours: function () {
		try {
			const fullPath = path.join(
				__dirname + '../../logs/clearInvalidImage.log'
			);
			const data = fs.readFileSync(fullPath, 'utf-8');
			if (!data) {
				// 日志文件为空，直接返回 true
				return true;
			}
			const logs = data.split('\n');
			const lastLog = logs[logs.length - 2];
			const lastLogTime = new Date(lastLog.split(' - ')[1]);
			const interval = new Date() - lastLogTime;
			return interval / (60 * 60 * 1000) > 24;
		} catch (error) {
			// 执行出错，直接返回 true(执行出错包括日志文件不存在)
			return true;
		}
	}
};

module.exports = ClearInvalidImage;
