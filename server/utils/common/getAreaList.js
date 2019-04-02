/*
 * @Author: chenweizhi 
 * @Date: 2019-04-01 19:42:02 
 * @Last Modified by: chenweizhi
 * @Last Modified time: 2019-04-02 11:20:17
 */

import areaCode from '../../libs/area'
// 返回地区三级列表
export default () => {
  const arr = getList(areaCode)
  return arr
};

function getList (codeObj) {
  const list = []
  const p_list = []
  const c_list = []
  const t_list = []
  const  codeArr =  Object.keys(codeObj)
  // 获取省份 城市 县区列表
  codeArr.forEach(item=>{
    if(!(item % 10000)){
      const p_code = Number(`${String(item).slice(0,2)}0000`)
      p_list.push({
        code: p_code,
        name: codeObj[p_code],
      })
    } else if(!(item % 100)) {
      const c_code = Number(`${String(item).slice(0,4)}00`)
      c_list.push({
        code: c_code,
        name: codeObj[c_code],
      })
    } else {
      t_list.push({
        code: item,
        name: codeObj[item],
      })
    }
  })
  p_list.forEach(item=>{
    item.list = []
    // 正常省份-城市
    c_list.forEach(c_item=>{
     if( Number(`${String(item.code).slice(0,2)}`) === Number(`${String(c_item.code).slice(0,2)}`)){
      c_item.list=[]
      t_list.forEach(t_item=>{
        if( Number(`${String(c_item.code).slice(0,4)}`) === Number(`${String(t_item.code).slice(0,4)}`)){
          c_item.list.push(t_item)
        } 
      })
      item.list.push(c_item)
     }
    })
    if( item.list.length === 0){
      //直辖市 特殊省份
      t_list.forEach(t_item=>{
        if( Number(`${String(item.code).slice(0,2)}`) === Number(`${String(t_item.code).slice(0,2)}`)){
          item.list.push(t_item)
        } 
      })
    }
    list.push(item)
  })







  return list 
}


// [
//   {
//     code:110000,
//     name:'北京市',
//     list: [
//       {
//         code: 110101,
//         name:'东城区'
//       }
//     ]
//   },
//   {
//     code:120000,
//     name:'河南省',
//     list: [
//       {
//         code: 120100,
//         name:'商丘市',
//         list: [
//           {
//             code: 120101,
//             name:'柘城县',
//           }
//         ]
//       }
//     ]
//   }
// ]
