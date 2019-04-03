/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 12:52:46
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 20:50:06
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
  tag_id: {
    type: sequelize.BIGINT ,
  },
  cid: {
    type: sequelize.BIGINT,
  },
  create_time: sequelize.BIGINT,
  update_time: sequelize.BIGINT,
});


const feedModel = {
  // 查询动态列表
  getFeedList: async data => Model.findAll(data),
  // 创建动态
  createFeed: async data => Model.create({
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
  
  // 动态状态更新点赞
  updateFeedZan: async (fid) => Model.update({
    zan: sequelize.literal('`zan` +1'),
    update_time: moment().unix()
  },{
    where:{
      id:fid
    }
  }),
  // 查询动态详情
  getFeed: async option => Model.findOne(option),
  
};


export default feedModel;
