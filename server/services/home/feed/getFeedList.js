/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-29 00:50:13
 */
import moment from 'moment';
import { Op } from 'sequelize';
import feedModel from '../../../models/feed';
import userInfoModel from '../../../models/user_info';


// 查询动态列表分页
export default async (data) => {
  const { pn = 1, limit = 20 } = data;
  const offset = (pn - 1) * limit;
  const feeds = await feedModel.getFeedList({
    limit: Number(limit),
    offset,
    order: [['id', 'DESC']],
    attributes: ['id', 'uid', 'content', 'imgs', 'rank', 'comment', 'zan', 'create_time'],
    raw: true,
  });
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
        info.create_time = moment(Number(item.create_time) * 1000).format('YYYY-MM-DD HH:mm:ss');
        info.nick_name = sub.nick_name;
        info.avatar = sub.avatar;
        info.des = sub.des;
        // 处理图片
        info.imgs = info.imgs ? info.imgs.split('|') : [];
        list.push(info);
      }
    });
  });

  return list || [];
};
