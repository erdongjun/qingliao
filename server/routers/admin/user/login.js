/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-21 21:49:19
 */

// 用户管理
import Router from 'koa-router';
import userModel from '../../../models/user';

const routers = new Router({
  prefix: '/admin/user',
});
routers.get('/index', async (ctx) => {
  // const res = await userModel.updateUser().then(r => r);
  const list = await userModel.getUserlist().then(r => r);
  // const res = await userModel.creatUser();

  await ctx.render('index', {
    list,
    title: '标题',
  });
});

export default routers;
