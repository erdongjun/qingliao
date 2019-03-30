/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-30 18:18:33
 */
import cateModel from '../../../models/cate';

// 查询分类详情
export default async (id) => {
  const option = {
    where: {
      id
    },
    raw: true,
  };
  
  const feedInfo = await cateModel.getCate(option);

  return feedInfo || false;
};
