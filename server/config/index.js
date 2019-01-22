/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 17:48:13
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-22 13:42:27
 */

// 当前环境
const Env = process.env.NODE_ENV;

// 环境判断
const isPro = Env === 'production';
const isDev = Env === 'development';
const isLocal = Env === 'local';

const dbConfig = {
  production: {
    host: 'localhost',
    database: 'koa_demo',
    user: 'root',
    password: 'root',
    port: '3306',
  },
  development: {
    host: 'localhost',
    database: 'koa_demo',
    user: 'root',
    password: 'root',
    port: '3306',
  },
  local: {
    host: 'localhost',
    database: 'koa_demo',
    user: 'root',
    password: 'root',
    port: '3306',
  },
};

// 项目配置
const config = {
  // 服务器端口号
  port: 3000,
  dbConfig: dbConfig[Env],
  isPro,
  isDev,
  isLocal,
};

module.exports = config;
