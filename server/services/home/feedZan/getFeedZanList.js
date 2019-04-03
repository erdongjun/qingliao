/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:12:36
 */
import feedZanModel from '../../../models/feedZan';
import {Op} from 'sequelize'
// 查询用户关注的分类
export default async (data) => {
  const option = {
    where: {
      uid: data.uid,
      fid: {
        [Op.or]:data.fidArr
      }
    },
    raw: true,
  };
  
  const list = await feedZanModel.getFeedZanList(option);

  return list || [];
};
