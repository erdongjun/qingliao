/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:27:38
 */
import feedZanModel from '../../../models/feedZan';


// 获取指定动态是否存在点赞
export default async (data) => {
  // 获取点赞
  const result = await feedZanModel.getFeedZan(data)
  // 获取动态的点赞数
    console.log('result',result)
  
  return result && result.id  ? 1 : 0;
};
