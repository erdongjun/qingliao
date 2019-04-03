/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 20:25:22
 */
import moment from 'moment';
import { Op } from 'sequelize';
import feedModel from '../../../models/feed';
import userInfoModel from '../../../models/userInfo';
import {getFeedZanList} from '../../index'

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
      status: 1,
    },
    order: [['id', 'DESC']],
    raw: true,
  };
  // 指定id查询
  if (data && data.uid) {
    option.where.uid = data.uid;
  }
  // 指定类型查询
  if (data && data.type) {
    option.where.type = data.type;
  }
  const feeds = await feedModel.getFeedList(option);
  const uidArr = [];
  const fidArr = []
  
  feeds.forEach((item) => {
    const uid = Number(item.uid);
    fidArr.push(Number(item.id))
    if (!uidArr.includes(uid)) {
      uidArr.push(uid);
    }
  });
  // 获取用户点赞对应动态的列表 

  let feedZanList = []
  console.log('data.uid',data.uid)
  if(data.ttuid){
    feedZanList = await getFeedZanList({
      uid:data.ttuid,
      fidArr,
    })
  }
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

  // 处理发布人相关信息
  feeds.forEach((item) => {
    const info = item;
    // 用户信息
    infoList.forEach((sub) => {
      if (Number(item.uid) === Number(sub.uid)) {
        info.create_time = moment(Number(item.create_time) * 1000).format('MM-DD HH:mm');
        info.nick_name = sub.nick_name;
        info.avatar = sub.avatar;
        info.des = sub.des;
        info.content = info.content.replace(reg, '\n');
        // 是否点赞 默认为0
        info.isZan = 0
        // 处理图片
        info.imgs = info.imgs ? info.imgs.split('|') : [];
      }
    });
    // 当前用户是否点赞
    feedZanList.forEach((sub) => {
      if (Number(item.id) === Number(sub.fid)) {
       info.isZan = 1
      }
    });
    list.push(info);
  });

  return list || [];
};
