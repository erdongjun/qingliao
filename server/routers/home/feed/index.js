/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 16:27:25
 */

// 用户动态
import Router from 'koa-router';
import { creatFeed, getFeedList, getFeedDetail } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/feed',
});

// 用户发布动态
routers.post('/add', async (ctx) => {
  const { codeStatus, body, uid } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        imgs: body.imgs || '',
        content: body.content || '',
      };
      const res = await creatFeed(data);
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
    codeStatus.msg = '动态发布出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 分页请求
routers.get('/list', async (ctx) => {
  const { codeStatus, query, uid } = routerInit(ctx);
  try {
    let list = [];
    if (query.type === 'myfeed') {
      if (uid) {
        query.uid = uid;
        delete query.type;
        list = await getFeedList(query);
      }
    } else {
      list = await getFeedList(query);
    }
    codeStatus.data = list;
  } catch (error) {
    console.log(error);
    codeStatus.code = 500;
    codeStatus.msg = '动态分页出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 动态详情
routers.get('/:id', async (ctx) => {
  const { codeStatus, query, uid } = routerInit(ctx);
  const { id } = ctx.params
  try {
    const res = await getFeedDetail(id);
    console.log(res)
    if(res){
      codeStatus.data = res;
    }else{
      codeStatus.code = 400;
      codeStatus.msg = '动态不存在';
    }
  } catch (error) {
    console.log(error)
    codeStatus.code = 500;
    codeStatus.msg = '动态详情出错了';
  } finally {
    ctx.body = codeStatus;
  }
});

export default routers;
