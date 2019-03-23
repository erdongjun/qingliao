/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 19:50:36
 */
import moment from 'moment';
import { Op } from 'sequelize';
import feedsModel from '../../../models/feeds';
import userInfoModel from '../../../models/user_info';


// 查询动态列表分页
export default async (data) => {
  // 内容换行
  const reg = new RegExp('<br>', 'g');
  const { pn = 1, limit = 20 } = data;
  const offset = (pn - 1) * limit;
  const option = {
    limit: Number(limit),
    offset,
    where: {
      type: data.type
    },
    order: [['id', 'DESC']],
    attributes: ['id', 'uid', 'content', 'imgs', 'video_pic', 'video', 'rank', 'comment', 'zan', 'create_time'],
    raw: true,
  };
  // 指定id查询
  if (data && data.uid) {
    option.where.uid = data.uid;
  }
  const feeds = await feedsModel.getFeedsList(option);
  const uidArr = [];
  feeds.forEach((item) => {
    const uid = Number(item.uid);
    if (!uidArr.includes(uid)) {
      uidArr.push(uid);
    }
  });
  const infoList = await userInfoModel.getUserList({
    where: {
      uid: {
        [Op.in]: uidArr,
      },
    },
    attributes: ['uid', 'nick_name', 'avatar', 'des'],
    raw: true,
  });
  const list = [];

  feeds.forEach((item) => {
    const info = item;
    infoList.forEach((sub) => {
      if (Number(item.uid) === Number(sub.uid)) {
        info.create_time = moment(Number(item.create_time) * 1000).format('MM-DD HH:mm');
        info.nick_name = sub.nick_name;
        info.avatar = sub.avatar;
        info.des = sub.des;
        info.content = info.content.replace(reg, '\n');
        // 处理图片
        info.imgs = info.imgs ? info.imgs.split('|') : [];
        list.push(info);
      }
    });
  });

  return list || [];
};
