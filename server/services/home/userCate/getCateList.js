/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-30 18:19:35
 */
import cateModel from '../../../models/cate';
// 查询动态列表分页
export default async (data) => {
  // 内容换行
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
  const cates = await cateModel.getCateList(option);
  
  return cates || [];
};
