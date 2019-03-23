/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 18:53:37
 */
// 用户动态表
import sequelize from 'sequelize';

import moment from 'moment';
import { Sequelize, hash } from '../utils';

const Model = Sequelize.define('feeds', {
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
  type: {
    type: sequelize.BIGINT,
    validate: {
      notEmpty: {
        args: true,
        msg: '动态类型不能为空',
      },
    },
  },
  content: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [0, 60000],
        msg: '内容太多啦',
      },
    },
  },
  video: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [0, 6000],
        msg: '视频地址不合法',
      },
    },
  },
  video_pic: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [0, 6000],
        msg: '视频封面地址不合法',
      },
    },
  },
  title: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [0, 100],
        msg: '标题过长',
      },
    },
  },
  imgs: {
    type: sequelize.STRING,
    validate: {
      len: {
        args: [0, 6000],
        msg: '图片太多啦',
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


const feedsModel = {
  // 查询动态列表
  getFeedsList: async data => Model.findAll(data),
  // 创建动态
  createFeeds: async data => Model.create({
    uid: data.uid,
    // 处理换行问题
    content: data.content.replace(/\n|\r\n/g,"<br>"),
    type: data.type || 1,
    imgs: data.imgs,
    title: data.title || '',
    video: data.video || '',
    video_pic: data.video_pic || '',
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
  getFeeds: async option => Model.findOne(option),
  
};


export default feedsModel;
