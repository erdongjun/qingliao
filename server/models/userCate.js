/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-04 13:35:19
 */
// 用户关注分类表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize } from '../utils';

const Model = Sequelize.define('user_cate', {
  id: {
    primaryKey: true,
    type: sequelize.BIGINT,
    autoIncrement: true,
  },

  uid: {
    type: sequelize.BIGINT,
  },
  cid: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
});

// 用户关注分类
const userCateModel = {
  // 创建用户关注
  createUserCate: async data => Model.findOrCreate({
    where:{
      uid: data.uid,
      cid: data.cid,
    },
    defaults:{
      create_time: moment().unix(),
    }
  }),
  deleteUserCate: async data => Model.destroy({
    where: data
  }),
  // 查询指定用户是否关注分类
  getUserCate: async data => Model.findOne({
    where: {
      uid: data.uid,
    },
  }),
  // 批量查询用户关注分类列表
  getUserCateList: async data => Model.findAll(data),
};


export default userCateModel;
