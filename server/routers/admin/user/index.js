/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-19 19:12:29
 */

// 用户管理
import Router from 'koa-router';

const routers = new Router({
  prefix: '/admin/user',
});

routers.get('/index', async (ctx) => {
  await ctx.render('index');
});

export default routers;
