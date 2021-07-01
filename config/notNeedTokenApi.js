// notNeedTokenApi 数组，罗列不需要进行 token 验证的 api
const notNeedTokenApi = [
  '/api/account/login',
  '/api/bmyx/findBySearch',
  '/api/bmyx/getProductsByCond',
  '/api/bmyx/getData',
  '/api/bmyx/getSort',
  '/api/bmyx/getNotice',
  '/api/bmyx/wx_login',
  '/api/verification-code/getCode',
  '/api/person/getBasicinfo',
  '/api/person/getExperiences',
  '/api/person/getExperiences',
  '/api/person/getBlogs',
  '/api/person/createMsg',
  '/api/article/getArticles',
  '/api/article/getArticlesByID',
  '/api/article/getArticlesByPage',
  '/api/article/pageViewAutoIncre',
  '/api/category/getCategories',
  '/api/category/getCategoriesByPage',
  '/api/tags/getTags',
  '/api/tags/getTagsByPage',
];

module.exports = notNeedTokenApi;
