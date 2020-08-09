const fs = require('fs')
const multer = require('koa-multer');
const router = require('koa-router')()
const ProductBll = require('../../service').productBll

//以下是配置
var storage = multer.diskStorage({
    //定义文件保存路径
    destination: function (req, file, cb) {
        cb(null, './public/upload/');//路径根据具体而定。如果不存在的话会自动创建一个路径
    },                       //注意这里有个，
    //修改文件名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({ storage: storage });

const productBll = new ProductBll();

router.prefix('/api/bmyx')

/**
 * 获取产品数据
 */
router.get('/getData', async function (ctx, next) {
    const query = ctx.request.query;
    const params = {
        start: query.start,
        pageSize: query.pageSize
    }

    let res_data,
        res_code,
        res_msg;

    try {
        res_code = 1000;
        res_msg = "查询成功！";
        res_data = await productBll.find(params);
    } catch (error) {
        res_code = 5000;
        console.log(error)
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

/**
 * 获取产品数据
 */
router.post('/getProductsByCond', async function (ctx, next) {
    const query = ctx.request.body;
    console.log(query)
    let res_data,
        res_code,
        res_msg;

    try {
        res_code = 1000;
        res_msg = "查询成功！";
        res_data = await productBll.find(query);
    } catch (error) {
        res_code = 5000;
        console.log(error)
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

/**
 * 搜索模糊查询
 */
router.post('/findBySearch', async function (ctx, next) {
    const query = ctx.request.body;
    console.log(query)
    let res_data,
        res_code,
        res_msg;

    try {
        res_code = 1000;
        res_msg = "查询成功！";
        res_data = await productBll.findBySearch(query);
    } catch (error) {
        res_code = 5000;
        console.log(error)
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

/**
 * 新增一条产品记录
 */
router.post('/createProduct', async function (ctx, next) {
    const newData = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await productBll.find({
            name: newData.name
        })
        if (ret && ret.length > 0) {
            res_code = 5000;
            res_msg = "该产品已经存在！"
        } else {
            res_code = 1000;
            res_msg = "新增成功";
            res_data = await productBll.createOne(newData);
        }

    } catch (error) {
        console.log(error)
        res_code = 5000;
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

/**
 * 修改产品信息
 */
router.post('/updateProduct', async function (ctx, next) {
    const changeData = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await productBll.updated(changeData);
        if (ret) {

            res_data = await productBll.find(0, 10, { id: ret });
            res_code = 1000;
            res_msg = "更新成功"
        } else {
            res_code = 5000;
            res_msg = "更新失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }

})

/**
 * 删除一条产品数据
 */
router.post('/delProduct', async function (ctx, next) {
    const cond = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await productBll.delete(cond);
        if (ret) {
            res_data = ret;
            res_code = 1000;
            res_msg = "删除成功"
        } else {
            res_code = 5000;
            res_msg = "删除失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})


/**
 * 接收前端上传的图片
 */
router.post('/uploadImage', upload.single('file'), async function (ctx, next) {
    let filename = ctx.req.file.filename;
    let oldFilename = ctx.req.body.oldImgSrc;
    console.log(oldFilename)
    let res_data,
        res_code,
        res_msg;
    try {
        res_data = filename;
        res_code = 1000;
        res_msg = "图片上传成功";
        if (oldFilename) {
            delUploadFile(oldFilename)
        }
    } catch (error) {
        // 上传失败，删除已存储的图片
        await delUploadFile(oldFilename)

        console.log(error)
        res_code = 5000;
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

/**
 * 删除图片
 */
router.post('/delUploadImage', async function (ctx, next) {
    const filename = ctx.request.body.filename;
    console.log(filename)
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await delUploadFile(filename);
        if (ret) {
            res_data = ret;
            res_code = 1000;
            res_msg = "图片删除成功"
        } else {
            res_code = 5000;
            res_msg = "图片删除失败";
        }
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

/**
 * 删除 upload 目录的文件
 * @param {string} filename 
 */
function delUploadFile(filename) {
    return new Promise((resolve, reject) => {
        fs.unlink(`public\\upload\\${filename}`, function (err) {
            if (!err) {

                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

module.exports = router