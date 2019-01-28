/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 11:40:05
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-28 21:40:32
 */

// 公共数据操作

// user用户相关
// 创建账号
export { default as createUser } from './home/user/createUser';
// 验证用户是否存在
export { default as validateUser } from './home/user/validateUser';


// feed动态

// 创建动态
export { default as creatFeed } from './home/feed/creatFeed';
// 查询动态分页
export { default as getFeedList } from './home/feed/getFeedList';
