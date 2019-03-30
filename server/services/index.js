/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 11:40:05
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-03-30 18:16:43
 */

// 公共数据操作

// user用户相关
// 创建账号
export { default as createUser } from './home/user/createUser';
// 验证用户是否存在
export { default as validateUser } from './home/user/validateUser';
// 获取用户信息
export { default as getUser } from './home/user/getUser';

// feed动态

// 创建动态
export { default as creatFeed } from './home/feed/createFeed';
// 查询动态分页
export { default as getFeedList } from './home/feed/getFeedList';
// 查询动态详情
export { default as getFeedDetail } from './home/feed/getFeedDetail';

// cate分类

// 创建分类
export { default as createCate } from './home/cate/createCate';
// 查询分类分页
export { default as getCateList } from './home/cate/getCateList';
// 查询分类详情
export { default as getCateDetail } from './home/cate/getCateDetail';
