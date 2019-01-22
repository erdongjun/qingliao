/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-21 21:32:37
 */

// 用户管理
import Router from 'koa-router';
import userModel from '../../../models/user';

const routers = new Router({
  prefix: '/admin/user',
});

// 用户登录页
routers.get('/login', async (ctx) => {
  // const res = await userModel.updateUser().then(r => r);
  // const list = await userModel.getUserlist().then(r => r);
  // const res = await userModel.creatUser();
  await ctx.render('admin/user/login');
});
// 登录请求
routers.post('/login', async (ctx) => {
  // const res = await userModel.updateUser().then(r => r);
  // const list = await userModel.getUserlist().then(r => r);
  const res = await userModel.creatUser(ctx.request.body)
    .then(r => r)
    .catch(e => e.message);
  ctx.body = {
    msg: res,
  };
});

export default routers;
