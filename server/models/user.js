/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-22 11:26:29
 */
// 用户信息表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const User = Sequelize.define('user', {
  name: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlphanumeric: true,
      notEmpty: true,
      len: [4, 20],
    },
  },
  nick_name: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 20],
    },
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    },
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});

// 创建账号
const userModel = {
  // 查询
  getUserlist: async () => User.findAll({
    limit: 5,
    raw: true,
  }),
  // 创建账号
  creatUser: async user => User.create({
    name: user.name,
    nick_name: user.nick_name,
    password: `${hash(user.password)}`,
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  updateUser: async () => User.update({
    nick_name: `nick${Math.floor(Math.random() * 1000)}`,
    update_time: moment().unix(),
  }, {
    where: {
      id: 1050,
    },
  }),
};


export default userModel;
