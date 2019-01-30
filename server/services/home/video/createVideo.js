/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-28 21:18:39
 */
import videoModel from '../../../models/video';

// 创建视频
export default async (data) => {
  const result = await videoModel.createVideo(data)
    .then(res => ({
      status: 1,
      data: res,
    }))
    .catch(err => ({
      status: 0,
      msg: err && err.errors && err.errors[0] && err.errors[0].message,
    }));
  return result;
};
