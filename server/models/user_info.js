/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-27 16:15:01
 */
// 用户基本信息表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize } from '../utils';

const Model = Sequelize.define('user_info', {
  uid: {
    primaryKey: true,
    type: sequelize.BIGINT,
    unique: {
      args: true,
      msg: '用户uid已存在',
    },
  },
  nick_name: {
    type: sequelize.STRING,
    unique: {
      args: true,
      msg: '昵称已被使用',
    },
    validate: {
      notEmpty: {
        args: true,
        msg: '昵称不能为空',
      },
      len: {
        args: [2, 20],
        msg: '昵称长度6-20位',
      },
    },
  },
  avatar: {
    type: sequelize.STRING,
  },
  sex: {
    type: sequelize.BIGINT,
  },
  age: {
    type: sequelize.BIGINT,
  },
  des: {
    type: sequelize.STRING,
  },
  area: {
    type: sequelize.BIGINT,
  },
  type: {
    type: sequelize.BIGINT,
  },
  sex_type: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});

// 创建账号
const userInfoModel = {
  // 创建用户基本信息
  creatUserInfo: async data => Model.create({
    uid: data.uid,
    nick_name: data.nick_name,
    age: moment('2000-01-01').unix(),
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  // 查询用户信息
  getUserInfo: async data => Model.findOne({
    where: {
      uid: data.uid,
    },
    attributes: data.attributes,
  }),
};


export default userInfoModel;
