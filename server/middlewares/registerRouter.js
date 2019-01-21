/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:05:59
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-19 18:56:52
 */
// 注册路由
/* eslint-disable*/
import Compose from 'koa-compose';
import Path from 'path';
import Glob from 'glob';

// 加载所有路由
export default () => {
  const Routers = [];
  Glob.sync(Path.resolve(__dirname, '../routers/*/*/*.js'))
    .forEach((router) => {
      Routers.push(require(router).default.routes());
      Routers.push(require(router).default.allowedMethods());
    });
  console.log('加载路由配置完毕',Routers.length)
  return Compose(Routers);
};
