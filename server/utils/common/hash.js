/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 21:39:47
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-22 11:26:11
 */
// 密码加密
import crypto from 'crypto';

export default (content) => {
  // 定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  const md5 = crypto.createHash('md5');
  md5.update(content);
  return md5.digest('hex');
};
