/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-23 17:50:27
 */
// 用户账号表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const Model = Sequelize.define('user', {
  id: {
    primaryKey: true,
    type: sequelize.BIGINT,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    unique: {
      args: true,
      msg: '用户名已被使用',
    },
    validate: {
      isAlphanumeric: {
        args: true,
        msg: '用户名只允许使用字母和数字',
      },
      notEmpty: {
        args: true,
        msg: '用户名不能为空',
      },
      len: {
        args: [6, 20],
        msg: '用户名长度6-20位',
      },
    },
  },
  password: {
    type: sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: '密码不能为空',
      },
      isAlphanumeric: {
        args: true,
        msg: '密码只允许使用字母和数字',
      },
    },
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});

// 用户表
const userModel = {
  // 查询列表
  getUserlist: async () => Model.findAll({
    limit: 5,
    raw: true,
  }),
  // 创建账号
  createUser: async user => Model.create({
    name: user.name,
    password: `${hash(user.password)}`,
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  // 账号更新
  updateUser: async () => Model.update({
    update_time: moment().unix(),
  }, {
    where: {
      id: 1050,
    },
  }),
  // 验证用户账号密码
  validateUser: async user => Model.findOne({
    where: {
      name: user.name,
      password: `${hash(user.password)}`,
    },
  })
  ,
};


export default userModel;
