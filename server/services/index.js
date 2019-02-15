/*
 * @Author: chenweizhi
 * @Date: 2019-01-21 11:40:05
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-02-15 13:00:07
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

// article文章

// 创建文章
export { default as createArticle } from './home/article/createArticle';
// 查询文章分页
export { default as getArticleList } from './home/article/getArticleList';

// video视频

// 创建文章
export { default as createVideo } from './home/video/createVideo';
// 查询文章分页
export { default as getVideoList } from './home/video/getVideoList';
