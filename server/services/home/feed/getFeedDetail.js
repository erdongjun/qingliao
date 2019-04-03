/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:18:25
 */
import moment from 'moment';
import feedModel from '../../../models/feed';

import userInfoModel from '../../../models/userInfo';

// 查询动态详情
export default async (id) => {
  // 内容换行
  const reg = new RegExp('<br>', 'g');
  const option = {
    where: {
      id
    },
    raw: true,
  };
  
  const feedInfo = await feedModel.getFeed(option);
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
  feedInfo.imgs = feedInfo.imgs  ? feedInfo.imgs.split('|') : [];
  feedInfo.isZan = 0 

  return feedInfo || false;
};
