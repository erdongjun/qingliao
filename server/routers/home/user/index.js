/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-15 13:12:17
 */

// 用户管理
import Router from 'koa-router';
import { validateUser, createUser, getUser } from '../../../services';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/home/user',
});

// 用户注册请求
routers.post('/register', async (ctx) => {
  const { codeStatus, body } = routerInit(ctx);
  try {
    console.log(body);
    const res = await createUser(body);
    if (!res.status) {
      codeStatus.code = 400;
      codeStatus.msg = res.msg;
    } else {
      codeStatus.msg = '注册成功';
    }
  } catch (error) {
    codeStatus.code = 500;
    codeStatus.msg = '注册出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 登录请求
routers.post('/login', async (ctx) => {
  const { codeStatus, body, uid } = routerInit(ctx);
  try {
    if (uid) {
      codeStatus.code = 400;
      codeStatus.msg = '账号已登录';
    } else {
      const res = await validateUser(body);
      if (!res) {
        codeStatus.code = 400;
        codeStatus.msg = '账号密码错误';
      } else {
        // 查询用户的昵称
        // 返回用户名uid
        codeStatus.msg = '登录成功';
        codeStatus.data = {
          uid: res.data.uid,
          nick_name: res.data.nick_name,
        };
        // ctx.cookies.set('uid', res.data.uid, {
        //   maxAge: 30 * 24 * 60 * 605000, // cookie有效时长
        // });
        // ctx.cookies.set('name', res.data.nick_name, {
        //   maxAge: 30 * 24 * 60 * 605000, // cookie有效时长
        // });
      }
    }
  } catch (error) {
    codeStatus.code = 500;
    codeStatus.msg = '登录出错了';
  } finally {
    ctx.body = codeStatus;
  }
});
// 获取用户数据
routers.get('/data', async (ctx) => {
  const { codeStatus, uid } = routerInit(ctx);
  try {
    if (uid) {
      const res = await getUser(uid);
      if (!res) {
        codeStatus.code = 400;
        codeStatus.msg = '账号密码错误';
      } else {
        // 查询用户的昵称
        // 返回用户名uid
        codeStatus.data = res;
      }
    } else {
      codeStatus.code = 400;
      codeStatus.msg = 'uid不存在';
    }
  } catch (error) {
    codeStatus.code = 500;
    codeStatus.msg = '获取用户信息出错';
  } finally {
    ctx.body = codeStatus;
  }
});

export default routers;
