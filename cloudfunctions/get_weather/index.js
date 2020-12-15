// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//获取引用数据库
let  db  = cloud.database()
 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
   return await db.collection('weather').get();
}
  