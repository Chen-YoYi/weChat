// 云函数入口文件
const cloud = require('wx-server-sdk')
// 云函数初始化
cloud.init()
// 获取数据库引用
let db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("我的第一个云函数");
  console.log(event);
    try {
      return await db.collection('diary').add({
        data: event
      })  
    } catch(e) {
      console.error(e)
    }
  
}