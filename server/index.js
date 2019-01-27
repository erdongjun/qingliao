/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 17:47:56
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-28 00:20:16
 */

// 项目入口文件
import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import Static from 'koa-static';
import Views from 'koa-views';
import KoaBody from 'koa-body';

// 配置
import Config from './config';
import './utils/database/sequelize';


// 中间件
import registerRouter from './middlewares/registerRouter';


// 实例koa
const app = new Koa();

// 解析参数
app.use(KoaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
  },
}));
app.use(bodyParser());

// 加载模板引擎
app.use(Views(path.join(__dirname, './views'), {
  extension: 'hbs',
  map: { hbs: 'handlebars' },
}));
// 加载静态资源
app.use(Static(
  path.join(__dirname, './static'),
));
// 注册路由
app.use(registerRouter());
// 初始化数据库
// initModel();
// 启动服务
app.listen(Config.port, () => {
  console.log(`Server run as http://127.0.0.1:${Config.port}`);
});
// 监控进程异常
process.on('uncaughtException', console.error);
