/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 20:50:41
 */
import feedModel from '../../../models/feed';


// 更新动态点赞
export default async (fid) => {
  const result = await feedModel.updateFeedZan(fid)
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
