/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-02 19:58:16
 */
import userModel from '../../../models/user';
import userInfoModel from '../../../models/userInfo';


// 验证用户登录信息是否正确
export default async (data) => {
  // 验证登录信息
  const result = await userModel.validateUser(data)
    .then(res => ({
      status: 1,
      data: res,
    }))
    .catch(err => ({
      status: 0,
      msg: err.errors[0].message,
    }));
  // 验证出错返回错误信息
  if (!result.status) {
    return result;
  }
  // 验证成功查询用户昵称
  const info = await userInfoModel.getUserInfo({
    uid: Number(result.data.id),
    attributes: ['uid', 'nick_name'],
  })
    .then(res => ({
      status: 1,
      data: res,
    }))
    .catch(err => ({
      status: 0,
      msg: err.errors[0].message,
    }));

  return info;
};
