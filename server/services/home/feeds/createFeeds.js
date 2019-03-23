/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 19:07:34
 */
import feedsModel from '../../../models/feeds';

// 创建动态
export default async (data) => {
  const result = await feedsModel.createFeeds(data)
    .then(res => ({
      status: 1,
      data: res,
    }))
    .catch(err => {
      console.log(err)
      return {
        status: 0,
        msg: err.errors[0].message,
      }
    });
  return result;
};
