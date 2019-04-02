/*
 * @Author: chenweizhi 
 * @Date: 2019-04-01 19:42:02 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-01 20:55:28
 */

import areaCode from '../../libs/area'

// 返回地区码对应的地区信息
// code  地区码
export default (code) => {
  const codeNum = Number(code)
  let str = ''
  const arr = []
  console.log(code)
  // 非正常code码
  if(!areaCode[codeNum]){
    str = '其他地区'
  } else {
    // 省份码
    const p_code = Number(`${String(code).slice(0,3)}000`)
    // 城市码
    const c_code = Number(`${String(code).slice(0,4)}00`)
    // 县区码
    const t_code = codeNum

    const codeArr = [p_code, c_code, t_code]

    codeArr.forEach((item,index)=> {
      const itemStr = areaCode[item]
      if((itemStr && index===0) || (index !== 0 && codeArr[index-1] !== codeArr[index] && itemStr)){
        arr.push(itemStr)
      }
    })
   str = arr.join(' ')
  }
  return str
};
