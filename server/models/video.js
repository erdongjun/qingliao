/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-29 00:01:18
 */
// 用户动态表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const Model = Sequelize.define('video', {
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
        args: [1, 20000],
        msg: '内容太多啦',
      },
    },
  },
  title: {
    type: sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: '标题不能为空',
      },
      len: {
        args: [1, 22],
        msg: '标题超出了',
      },
    },
  },
  pic: {
    type: sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: '封面图片不能为空',
      },
    },
  },
  status: {
    type: sequelize.BIGINT,
  },
  rank: {
    type: sequelize.BIGINT,
  },
  comment: {
    type: sequelize.BIGINT,
  },
  zan: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});


const videoModel = {
  // 查询视频列表
  getVideoList: async data => Model.findAll(data),
  // 创建视频
  createVideo: async data => Model.create({
    uid: data.uid,
    content: data.content,
    title: data.title,
    pic: data.pic,
    create_time: moment().unix(),
    update_time: moment().unix(),
  }),
  // 状态更新
  updateUser: async () => Model.update({
    update_time: moment().unix(),
  }, {
    where: {
      id: 1050,
    },
  }),
  // 查询视频详情
  getVideo: async id => Model.findOne({
    where: {
      id,
    },
  })
  ,
};


export default videoModel;
