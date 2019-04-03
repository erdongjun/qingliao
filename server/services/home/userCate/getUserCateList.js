/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-02 20:34:35
 */
import userCateModel from '../../../models/userCate';

// 查询用户关注的分类
export default async (uid) => {
  const option = {
    where: {
      uid
    },
    raw: true,
  };
  
  const list = await userCateModel.getUserCateList(option);

  return list || [];
};
