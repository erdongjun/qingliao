/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-27 18:06:28
 */
// 用户动态表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const Model = Sequelize.define('feed', {
  id: {
    primaryKey: true,
    type: sequelize.BIGINT,
  },
  uid: {
    type: sequelize.BIGINT,
    validate: {
      notEmpty: {
        args: true,
        msg: 'uid不存在',
      },
    },

  },
  content: {
    type: sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: '内容不能为空',
      },
      len: {
        args: [1, 300],
        msg: '内容太多啦',
      },
    },
  },
  imgs: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [1, 6000],
        msg: '图片太多啦',
      },
    },
  },
  status: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});


const userModel = {
  // 查询列表
  getUserlist: async () => Model.findAll({
    limit: 5,
    raw: true,
  }),
  // 创建动态
  creatUser: async data => Model.create({
    uid: data.uid,
    content: data.content,
    imgs: data.imgs,
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  // 动态状态更新
  updateUser: async () => Model.update({
    update_time: moment().unix(),
  }, {
    where: {
      id: 1050,
    },
  }),
  // 查询动态详情
  getfeed: async id => Model.findOne({
    where: {
      id,
    },
  })
  ,
};


export default userModel;
