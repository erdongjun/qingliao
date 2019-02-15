/*
 * @Author: chenweizhi
 * @Date: 2019-01-27 14:22:20
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-15 13:12:12
 */
import moment from 'moment';
import userInfoModel from '../../../models/user_info';

// 获取用户信息
export default async (uid) => {
  // 获取单个用户信息
  const info = await userInfoModel.getUserInfo({
    uid,
    attributes: ['uid', 'avatar', 'sex', 'age', 'des', 'nick_name', 'type', 'sex_type'],
  })
    .then((res) => {
      const data = res;
      data.age = moment().diff(moment.unix(data.age), 'years');
      return data;
    });

  return info;
};
