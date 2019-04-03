/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-02 21:12:02
 */
import userCateModel from '../../../models/userCate';

// 删除用户关注关系
export default async (data) => {
  const info = await userCateModel.deleteUserCate(data);
  return Number(info);
};
