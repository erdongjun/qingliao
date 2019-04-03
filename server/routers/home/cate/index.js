/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-02 21:12:21
 */

// 用户分类
import Router from 'koa-router';
import { createUserCate, deleteUserCate,getCateList, getCateDetail } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/cate',
});

// 用户关注分类
routers.get('/focus/:cid', async (ctx) => {
  const { codeStatus, uid, params } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        cid: Number(params.cid),
      };
      const res = await createUserCate(data);
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
    codeStatus.msg = '分类关注出错了';
  } finally {
    ctx.body = codeStatus;
  }
});

// 删除用户关注分类
routers.get('/delfocus/:cid', async (ctx) => {
  const { codeStatus, uid, params } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        cid: Number(params.cid),
      };
      const res = await deleteUserCate(data);
      if (res) {
        codeStatus.msg = '取消关注成功';
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
    codeStatus.msg = '取消关注出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 分类分页请求
routers.get('/list', async (ctx) => {
  const { codeStatus, query, uid } = routerInit(ctx);
  try {
    let list = [];
    query.uid = uid;
    list = await getCateList(query);
    codeStatus.data = list;
  } catch (error) {
    console.log(error);
    codeStatus.code = 500;
    codeStatus.msg = '分类分页出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 分类详情
routers.get('/:id', async (ctx) => {
  const { codeStatus } = routerInit(ctx);
  const { id } = ctx.params
  try {
    const res = await getCateDetail(id);
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
    codeStatus.msg = '分类详情出错了';
  } finally {
    ctx.body = codeStatus;
  }
});

export default routers;
