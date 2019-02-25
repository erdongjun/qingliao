/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-23 17:41:51
 */
import userModel from '../../../models/user';
import userInfoModel from '../../../models/user_info';


// 创建账号以及初始化默认信息
export default async (data) => {
  // 创建账号
  const result = await userModel.createUser(data)
    .then(res => ({
      status: 1,
      data: res,
    }))
    .catch(err => ({
      status: 0,
      msg: err.errors[0].message,
    }));

  console.log(result);
  // 创建出错返回创建账号信息
  if (!result.status) {
    return result;
  }
  // 初始化用户基本信息
  const info = await userInfoModel.creatUserInfo({
    uid: Number(result.data.id),
    nick_name: data.nick_name,
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
