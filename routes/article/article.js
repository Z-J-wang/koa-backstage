const router = require('koa-router')();
const ArticleBll = require('../../util/service').articleBll;

const articleService = new ArticleBll();

router.prefix('/api/article');

/**
 * 查询
 */
router.get('/getArticles', async function (ctx, next) {
  const query = ctx.request.query; // 条件
  const res = {}; // response 数据对象
  try {
    res.data = await articleService.find(query);
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
 router.get('/getArticlesByPage', async function (ctx, next) {
    const query = ctx.request.query; // 条件
    const res = {}; // response 数据对象
    try {
      res.data = await articleService.findByPage(query);
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
router.post('/createArticle', async function (ctx, next) {
  const newObj = ctx.request.body;
  const res = {}; // response 数据对象
  try {
    res.data = await articleService.createNewObj(newObj);
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
router.post('/updateArticle', async function (ctx, next) {
  const changedObj = ctx.request.body;
  const res = {}; // response 数据对象
  try {
    let ret = await articleService.updated(changedObj);
    if (ret) {
      res.data = await articleService.find(0, 10, { id: ret });
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
router.post('/deleteArticle', async function (ctx, next) {
  const params = ctx.request.body;
  const res = {}; // response 数据对象
  try {
    let ret = await articleService.delete(params);
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
