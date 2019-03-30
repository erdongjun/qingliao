/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-30 17:58:10
 */
// 分类分类表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const Model = Sequelize.define('cate', {
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
        msg: '分类名称长度不符',
      },
    },
  },
  des: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [1, 200],
        msg: '分类描述长度不符',
      },
    },
  },
  icon: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [1, 600],
        msg: '分类名称长度不符',
      },
    },
  },
  status: {
    type: sequelize.BIGINT,
  },
  rank: {
    type: sequelize.BIGINT,
  },
  count: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});


const catesModel = {
  // 查询分类列表
  getCateList: async data => Model.findAll(data),
  // 创建分类
  createCate: async data => Model.create({
    uid: data.uid,
    // 处理换行问题
    name: data.name,
    des: data.des,
    icon: data.icon,
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  // 分类状态更新
  updateUser: async () => Model.update({
    update_time: moment().unix(),
  }, {
    where: {
      id: 1050,
    },
  }),
  // 查询分类详情
  getCate: async option => Model.findOne(option),
  
};


export default catesModel;
