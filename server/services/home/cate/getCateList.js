/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:06:42
 */
import cateModel from '../../../models/cate';
import {getUserCateList} from '../../index';
// 查询分类列表分页
export default async (data) => {
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

  // 获取该用户关注的列表
  const userCates =await getUserCateList(data.uid)
  console.log()

  let cates = await cateModel.getCateList(option);
  cates = cates.map(item=>{
    item.focus = 0
    userCates.forEach(sub=>{
      if(sub.cid == item.id){
        item.focus = 1
      }
    })
    return item
  })
  
  return cates || [];
};
