/*
 * @Author: chenweizhi
 * @Date: 2019-01-19 18:10:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-28 01:57:45
 */

// 文件上传

import fs from 'fs';
import path from 'path';
import Router from 'koa-router';
import { routerInit } from '../../../utils';


const routers = new Router({
  prefix: '/common/file',
});
routers.post('/upload', async (ctx) => {
  const { codeStatus, body } = routerInit(ctx);
  try {
    const { file } = ctx.request.files; // 上传的文件在ctx.request.files.file
    const { index } = body; // 上传的文件在ctx.request.files.file
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 修改文件的名称
    const myDate = new Date();
    const newFilename = `${myDate.getTime()}${Math.floor(Math.random() * 100000)}.${file.name.split('.')[1]}`;
    const targetPath = `${path.join(__dirname, '../../../static/upload/')}/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(targetPath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    codeStatus.data = {
      index: Number(index),
      url: `http://${ctx.headers.host}/upload/${newFilename}`,
    };
    // 返回保存的路径
    ctx.body = { code: 200, data: { url: `http://${ctx.headers.host}/upload/${newFilename}` } };
  } catch (error) {
    console.log(error.message);
  } finally {
    ctx.body = codeStatus;
  }
});

export default routers;
