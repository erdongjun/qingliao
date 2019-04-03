/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 11:40:05
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-03 21:25:03
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
// 更新动态点赞
export { default as updateFeedZan } from './home/feed/updateFeedZan';



// 动态点赞
export { default as createFeedZan } from './home/feedZan/createFeedZan';
// 获取指定用户点赞动态列表
export { default as getFeedZanList } from './home/feedZan/getFeedZanList';
// 获取指定用户是否点赞动态
export { default as getFeedZan } from './home/feedZan/getFeedZan';



// cate分类

// 创建分类
export { default as createCate } from './home/cate/createCate';
// 查询分类分页
export { default as getCateList } from './home/cate/getCateList';
// 查询分类详情
export { default as getCateDetail } from './home/cate/getCateDetail';
// 创建用户关注分类
export { default as createUserCate } from './home/userCate/createUserCate';
// 获取指定用户关注的分类列表
export { default as getUserCateList } from './home/userCate/getUserCateList';
// 删除用户关注
export { default as deleteUserCate } from './home/userCate/deleteUserCate';




