/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:02:16
 */
import feedZanModel from '../../../models/feedZan';
import {updateFeedZan} from '../../index'


// 动态点赞
export default async (data) => {
  // 创建点赞
  const result = await feedZanModel.createFeedZan(data)
  // 更新动态的点赞数
  if(result[1]){
    console.log('result[1].id',data.fid)
   let c =  await updateFeedZan(data.fid)
  }
  
  return result[1] ? 1 : 0;
};
