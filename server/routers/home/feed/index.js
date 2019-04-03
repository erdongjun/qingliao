/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:28:11
 */

// 用户动态
import Router from 'koa-router';
import { creatFeed, getFeedList, getFeedDetail, createFeedZan, getFeedZan } from '../../../services';
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
        title: body.title || '',
        video: body.video || '',
        video_pic: body.video_pic || '',
        type: body.type || 1
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
    console.log(error)
    codeStatus.code = 500;
    codeStatus.msg = '动态发布出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 动态分页请求
routers.get('/list', async (ctx) => {
  const { codeStatus, query, uid } = routerInit(ctx);
  try {
    let list = [];
    if ( Number(query.private ) && uid) {
      query.uid = uid;
    }
    if ( Number(query.private ) && Number(query.tid) ) {
      query.uid = query.tid;
    }
    query.ttuid = uid
  
    list = await getFeedList(query);
    codeStatus.data = list;
  } catch (error) {
    console.log(error);
    codeStatus.code = 500;
    codeStatus.msg = '动态分页出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 查看动态详情
routers.get('/:id', async (ctx) => {
  const { codeStatus,uid } = routerInit(ctx);
  const { id } = ctx.params
  try {
    const res = await getFeedDetail(id);
    res.isZan = 0
    if(uid){
     const isZan = await getFeedZan({
       where:{
         uid,
         fid:res.id
       },
       raw: true
     })
    res.isZan = isZan
    }
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

// 用户点赞动态
routers.get('/zan/:fid', async (ctx) => {
  const { codeStatus, uid, params } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        fid: Number(params.fid),
      };
      const res = await createFeedZan(data);
      if (res) {
        codeStatus.msg = '点赞成功';
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
    codeStatus.msg = '点赞出错了';
  } finally {
    ctx.body = codeStatus;
  }
});



export default routers;
