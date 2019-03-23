/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 20:07:22
 */
import moment from 'moment';
import feedsModel from '../../../models/feeds';

import userInfoModel from '../../../models/user_info';

// 查询文章详情
export default async (id) => {
  // 内容换行
  const reg = new RegExp('<br>', 'g');
  const option = {
    where: {
      id
    },
    attributes: ['id', 'uid', 'content', 'imgs', 'video_pic', 'video', 'rank', 'comment', 'zan', 'create_time'],
    raw: true,
  };
  
  const feedInfo = await feedsModel.getFeeds(option);
  if(!feedInfo){
    return false
  }
  const uid = Number(feedInfo.uid);
  const info = await userInfoModel.getUserInfo({
    uid,
    attributes: ['uid', 'nick_name', 'avatar', 'des'],
  });
  if(!info){
    return false
  }
  feedInfo.create_time = moment(Number(feedInfo.create_time) * 1000).format('MM-DD HH:mm');
  feedInfo.nick_name = info.nick_name;
  feedInfo.avatar = info.avatar;
  feedInfo.des = info.des;
  feedInfo.content = feedInfo.content.replace(reg, '\n');
  feedInfo.imgs = feedInfo.imgs ? info.imgs.split('|') : [];
  return feedInfo || false;
};
