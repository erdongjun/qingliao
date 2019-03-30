/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-30 18:26:18
 */

// 用户分类
import Router from 'koa-router';
import { createCate, getCateList, getCateDetail } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/cate',
});

// 用户创建分类
routers.post('/add', async (ctx) => {
  const { codeStatus, body, uid } = routerInit(ctx);
  try {
    if (uid) {
      const data = {
        uid: Number(uid),
        name: body.name || '',
        des: body.des || '',
        icon: body.icon || '',
      };
      const res = await createCate(data);
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
    codeStatus.msg = '分类创建出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 分类分页请求
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
