/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 11:40:05
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-23 20:13:19
 */

// 公共数据操作

// user用户相关
// 创建账号
export { default as createUser } from './home/user/createUser';
// 验证用户是否存在
export { default as validateUser } from './home/user/validateUser';
// 获取用户信息
export { default as getUser } from './home/user/getUser';

// feeds动态

// 创建动态
export { default as creatFeeds } from './home/feeds/createFeeds';
// 查询动态分页
export { default as getFeedsList } from './home/feeds/getFeedsList';
// 查询动态详情
export { default as getFeedsDetail } from './home/feeds/getFeedsDetail';
