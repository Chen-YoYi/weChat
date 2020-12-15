// components/Diary/diary.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      
  },

  /**
   * 组件的初始数据
   */
  data: {
      time : "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 日期获取
    getTime(){
       let date = new Date();
       let year = date.getFullYear;
       let month = date.getMonth+1;
      month =  month<10 ? "0"+month : month;
       let day = date.getDate;
       day =  day<10 ? "0"+day : day;

      let time = `${year}-${month}-${day}` 

      this.setData(
        {
          'time':time
        }
      )
    }

    // 改变天气


    // 改变头像
  }
})
