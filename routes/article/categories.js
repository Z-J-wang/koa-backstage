const router = require('koa-router')();
const CategoriesBll = require('../../util/service').categoriesBll;

const categoriesService = new CategoriesBll();

router.prefix('/api/category');

/**
 * 查询
 */
router.get('/getCategories', async function (ctx, next) {
  const query = ctx.request.query; // 条件
  const res = {}; // response 数据对象
  try {
    res.data = await categoriesService.find(query);
    if (res.data) {
      res.code = 1000;
      res.msg = '数据获取成功';
    } else {
      res.code = 5000;
      res.msg = '数据获取失败';
    }
  } catch (error) {
    console.log(error);
    ctx.body = '数据库出错';
  } finally {
    ctx.body = {
      code: res.code,
      msg: res.msg,
      data: res.data,
    };
  }
});

/**
 * 分页查询
 */
 router.get('/getCategoriesByPage', async function (ctx, next) {
    const query = ctx.request.query; // 条件
    const res = {}; // response 数据对象
    try {
      res.data = await categoriesService.findByPage(query);
      if (res.data) {
        res.code = 1000;
        res.msg = '数据获取成功';
      } else {
        res.code = 5000;
        res.msg = '数据获取失败';
      }
    } catch (error) {
      console.log(error);
      ctx.body = '数据库出错';
    } finally {
      ctx.body = {
        code: res.code,
        msg: res.msg,
        data: res.data,
      };
    }
  });

/**
 * 新增
 */
router.post('/createCategory', async function (ctx, next) {
  const newObj = ctx.request.body;
  const res = {}; // response 数据对象
  try {
    res.data = await categoriesService.createNewObj(newObj);
    if (res.data) {
      res.code = 1000;
      res.msg = '添加成功';
    } else {
      res.code = 5000;
      res.msg = '添加失败';
    }
  } catch (error) {
    console.log(error);
    ctx.body = '数据库出错';
  } finally {
    ctx.body = {
      code: res.code,
      msg: res.msg,
      data: res.data,
    };
  }
});

/**
 * 修改
 */
router.post('/updateCategory', async function (ctx, next) {
  const changedObj = ctx.request.body;
  const res = {}; // response 数据对象
  try {
    let ret = await categoriesService.updated(changedObj);
    if (ret) {
      res.data = await categoriesService.find(0, 10, { id: ret });
      res.code = 1000;
      res.msg = '更新成功';
    } else {
      res.code = 5000;
      res.msg = '更新失败';
    }
  } catch (error) {
    console.log(error);
    ctx.body = '数据库出错';
  } finally {
    ctx.body = {
      code: res.code,
      msg: res.msg,
      data: res.data,
    };
  }
});

/**
 * 删除
 */
router.post('/deleteCategory', async function (ctx, next) {
  const params = ctx.request.body;
  const res = {}; // response 数据对象
  try {
    let ret = await categoriesService.delete(params);
    if (ret) {
      res.code = 1000;
      res.msg = '删除成功';
    } else {
      res.code = 5000;
      res.msg = '删除失败';
    }
  } catch (error) {
    console.log(error);
    ctx.body = '数据库出错';
  } finally {
    ctx.body = {
      code: res.code,
      msg: res.msg,
      data: res.data,
    };
  }
});

module.exports = router;