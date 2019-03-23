/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 19:54:58
 */

// 用户动态
import Router from 'koa-router';
import { creatFeeds, getFeedsList, getFeedsDetail } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/feeds',
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
        title: body.title || '',
        video: body.video || '',
        video_pic: body.video_pic || '',
        type: body.type || 1
      };
      const res = await creatFeeds(data);
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
    console.log(error)
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
    console.log(query)
    if ( Number(query.private ) && uid) {
      query.uid = uid;
    }
    list = await getFeedsList(query);
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
    const res = await getFeedsDetail(id);
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
