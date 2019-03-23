/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 13:07:10
 */

// 用户动态
import Router from 'koa-router';
import { createArticle, getArticleList, getArticleDetail } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/article',
});

// 用户发布文章
routers.post('/add', async (ctx) => {
  const { codeStatus, body, uid } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        title: body.title,
        content: body.content,
      };
      const res = await createArticle(data);
      if (res.status) {
        codeStatus.msg = '发布成功';
      } else {
        codeStatus.code = 400;
        codeStatus.msg = res.msg;
      }
    } else {
      codeStatus.code = 400;
      codeStatus.msg = 'uid不存在';
    }
  } catch (error) {
    codeStatus.code = 500;
    codeStatus.msg = '文章发布出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 分页请求
routers.get('/list', async (ctx) => {
  const { codeStatus, query, uid } = routerInit(ctx);
  try {
    if (query.type === 'myarticle') {
      query.uid = uid;
      delete query.type;
    }
    const res = await getArticleList(query);
    codeStatus.data = res;
  } catch (error) {
    codeStatus.code = 500;
    codeStatus.msg = '文章分页出错了';
  } finally {
    ctx.body = codeStatus;
  }
});

// 文章详情
routers.get('/:id', async (ctx) => {
  const { codeStatus, query, uid } = routerInit(ctx);
  const { id } = ctx.params
  try {
    const res = await getArticleDetail(id);
    console.log(res)
    if(res){
      codeStatus.data = res;
    }else{
      codeStatus.code = 400;
      codeStatus.msg = '文章不存在';
    }
  } catch (error) {
    console.log(error)
    codeStatus.code = 500;
    codeStatus.msg = '文章详情出错了';
  } finally {
    ctx.body = codeStatus;
  }
});

export default routers;
