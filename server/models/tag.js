/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-30 17:59:37
 */
// 标签表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const Model = Sequelize.define('tag', {
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
  name: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [1, 30],
        msg: '标签名称长度不符',
      },
    },
  },
  
  status: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});


const tagModel = {
  // 查询标签列表
  getTagList: async data => Model.findAll(data),
  // 创建标签
  createTag: async data => Model.create({
    uid: data.uid,
    name: data.name,
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  // 标签状态更新
  updateUser: async () => Model.update({
    update_time: moment().unix(),
  }, {
    where: {
      id: 1050,
    },
  }),
  // 查询标签详情
  getTag: async option => Model.findOne(option),
  
};


export default tagModel;
