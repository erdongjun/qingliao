/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:22:36
 */
// 用户动态点赞表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize } from '../utils';

const Model = Sequelize.define('feed_zan', {
  id: {
    primaryKey: true,
    type: sequelize.BIGINT,
    autoIncrement: true
  },

  uid: {
    type: sequelize.BIGINT,
  },
  fid: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
});

// 用户点赞的动态
const feedZanModel = {
  // 用户点赞动态
  createFeedZan: async data => Model.findOrCreate({
    where: data,
    defaults:{
      create_time: moment().unix(),
    },
    raw: true,
  }),
  // 用户取消点赞动态
  deleteFeedZan: async data => Model.destroy({
    where: data
  }),
  // 查询指定用户点赞该动态详情
  getFeedZan: async data => Model.findOne(data),
  // 批量查询用户点赞列表
  getFeedZanList: async data => Model.findAll(data),
};


export default feedZanModel;
