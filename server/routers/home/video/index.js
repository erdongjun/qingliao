/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-28 21:43:17
 */

// 用户动态
import Router from 'koa-router';
import { createVideo, getVideoList } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/video',
});

// 用户发布视频
routers.post('/add', async (ctx) => {
  const { codeStatus, body, uid } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        title: body.title,
        content: body.content,
        pic: body.pic,
      };
      const res = await createVideo(data);
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
    console.log(error);
    codeStatus.code = 500;
    codeStatus.msg = '视频发布出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 分页请求
routers.get('/list', async (ctx) => {
  const { codeStatus, query } = routerInit(ctx);
  try {
    const res = await getVideoList(query);
    codeStatus.data = res;
  } catch (error) {
    codeStatus.code = 500;
    codeStatus.msg = '视频分页出错了';
  } finally {
    ctx.body = codeStatus;
  }
});

export default routers;
