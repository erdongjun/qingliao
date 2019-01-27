/*
 * @Author: chenweizhi
 * @Date: 2018-10-27 12:14:43
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-01-27 13:24:09
 */

// import { Context } from 'koa'
// import { isPro } from '../../config'
// import { getLang, secureId, hashids, clientenv, constant, getDevice } from '../index'
/**
 * 通用初始化请求数据
 * @static
 * @memberof BaseController
 * @param {object} ctx  koa封装的变量ctx
 * @returns {object}
 *  - params      {object}          路由地址上携带的参数对象
 *  - query       {object}          路由地址上？后拼接的参数对象
 *  - body        {object}          post请求中body中的数据对象
 *  - tplpath     {string}          路由对应的views下的模版路径
 *  - lan         {string}          当前语言类型 国内项目默认使用 cn，通用以及国际项目默认返回 en
 *  - uid         {string}          获取客户端的uid
 *  - env         {string}          浏览器打开的环境 native Or website，判断端内端外
 *  - platform         {string}     访问的设备类型 ios or android
 *  - isoversea   {string}          客户端的版本 true：国际版  false：国内版
 *  - codeStatus  {object}          默认接口返回值
 *  - isTaiWan    {Boolean}         是否是台湾用户 1-是 0-不是
 *  - sharebar    {string}          非客户端打开出现的提示客户端打开的 底部横条提示
 *  - polyfill    {string}          解决在部分老旧机器上无法是用babel的bug
 *  - wxImportScript  {string}      微信分享配置
 *  - baiduStatistics  {string}      百度统计
 */

// 国际版支持的语言类型
// const languages = ['cn', 'en', 'es', 'fr', 'id', 'ja', 'ko', 'pt', 'th', 'tw', 'vi']
// 国内版本支持的语言类型
// const overseaLanguages = ['en', 'cn', 'tw']

export default (ctx) => {
  // 如果ctx不存在抛出错误
  if (!ctx) {
    throw new Error('{ctx} must be offered');
  }
  // 基础参数
  const { params, query, url } = ctx;
  const { body } = ctx.request;
  const uid = ctx.cookies.get('uid') || 0;
  // 根据url生成模版对应的路径 忽略query参数以及其他参数
  // 生成三级模版路径 eg：home/live/index
  // const tplpath = url.replace(/\W/g, '/').split('/').slice(1, 4).join('/')

  // 处理语言判断
  // 优先级处理 url上拼接的lan字段 > 请求体中获取的language-type > 是否是国内项目默认 cn > 其他项目默认 en
  // const al = ctx.headers['accept-language']
  // 获取
  // const queryLan = query.lan

  // 当前的客户端环境
  // const env = clientenv(ctx)

  // 是否是国内版本  如果链接中带有app=2||app=4的字样 或者域名包含 international 则说明是国际版本
  // const { app } = query

  // const isoversea = Number(app) === 2 || Number(app) === 4 || ctx.request.hostname.includes('international')

  // let lan = queryLan || getLang(al, isoversea)
  // const cityMap = cities || (isoversea ? overseaLanguages : languages)
  // 如果检测为不支持的语言，需要指定为英语
  // if (cityMap.indexOf(lan) === -1) {
  //   lan = isoversea ? 'en' : 'cn'
  // }

  // 获取uid 优先级pro环境下 只能从cookie中获取 其他环境下可以通过query 获取
  // let uid: any = ctx.cookies.get('uid')
  // uid = secureId.decrypt(uid)
  // 兼容非生产环境下uid获取
  // if (!isPro) {
  //   uid = query.uid || uid
  //   if (uid && /[a-zA-Z]/.test(uid)) {
  //     [uid] = hashids.decode(uid)
  //   }
  // }

  // 兼容uid不存在的情况下默认返回0
  // uid = Number(uid || 0)
  // const platform = getDevice(ctx.headers['user-agent'])
  // 是否是台湾用户
  // const isTaiWan = Number(constant.taiwanCodeReg.test(ctx.cookies.get('city_id')) && constant.taiwanLangReg.test(al))
  // 存放在handlebar模板中的值（微信分享插件以及 app打开提示条）备注：缺少微信分享相关配置

  // 公用的插件 appweb端访问展示提示下载的底部横条
  // const sharebar = '//web.bldimg.com/sharebar/3.6.9.min.js'

  // polyfill.js 解决在部分老旧机器上无法是用babel的bug
  // const polyfill = 'https://web.bldimg.com/web/static/msg/polyfill-6e7fe53f.js'

  // 百度统计 ? 国际 : 国内
  // const baiduStatisticsToken = isoversea
  // ? '6e367b210af3a7c754cf93e9758c0314'
  // : 'f65f22bd16b473724a8264627b84738d'

  // const baiduStatistics = `
  //   ; // 百度统计
  //   var _hmt = _hmt || [];
  //   (function() {
  //     var hm = document.createElement('script');
  //     hm.src = '//hm.baidu.com/hm.js?${baiduStatisticsToken}';
  //     hm.async = true;
  //     var s = document.getElementsByTagName("script")[0];
  //     s.parentNode.insertBefore(hm, s);
  //   })();
  // `

  // 默认返回值
  const codeStatus = {
    code: 200,
    msg: '成功',
    data: {},
    extra: {},
  };

  return {
    params,
    query,
    body,
    uid,
    // tplpath,
    // lan,
    // env,
    // uid,
    // platform,
    // isoversea,
    // sharebar,
    // polyfill,
    codeStatus,
    // isTaiWan,
    // baiduStatistics,
  };
};
