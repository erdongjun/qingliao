/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-02 20:08:21
 */
import userCateModel from '../../../models/userCate';

// 创建关注
export default async (data) => {
  const result = await userCateModel.createUserCate(data)
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
