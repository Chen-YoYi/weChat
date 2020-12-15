
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //  
      navData:[
        {
          img:"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_image/daily.png",
          title:"生活日记"
         
        },
        {
          img:"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_image/money.png",
          title:"账单日记"
        },
        {
          img:"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_image/plant.png",
          title:"植物日记"
        },
        {
          img:"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_image/shop.png",
          title:"购物日记"
        },
        {
          img:"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_image/food.png",
          title:"美食日记"
        }
      ],
   
      movingData:{
        startX:0,
        moveX :0,
        curX :0,
        bool : false
      },

      time:"",
      viewInfo:{
         w: wx.getSystemInfoSync().windowWidth *0.8,
         h: wx.getSystemInfoSync().windowHeight *0.8,
         hval : (wx.getSystemInfoSync().windowHeight *0.8)-100,
      },
      // 普通日记数据
      diaryData:{
        photoImg :"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_image/154852z2vdcz5kkkltppzt_06.png",
        weaterImg:"cloud://journal-5gemvejh319beda7.6a6f-journal-5gemvejh319beda7-1304343646/item_weather/冻雨.png",
        weatherText :"冻雨",
        content : "",
        time:"",
        type:"普通日记",
      },
      navWidth:0,
      // 日记类型的索引值
      index :0,

      // 天气列表
      weatherList:[],
      //
      isShowWeather :false
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getTime();
     this.getWidth();
     
     wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        console.log(userInfo);
      }
    })


  },

// 获取元素的宽度
  getWidth(){
    // 创建节点查询器
    const query = wx.createSelectorQuery();
    query.select("#navBox").boundingClientRect();
    query.exec(res=>{
      let width =   res[0].width;
      console.log('width=====>',width);
      this.setData({
        'navWidth' : width,
       })
    })

 
  },
  //滑动事件
  onBegin : function(e){
      let data = this.data.movingData; 
      data.startX = e.changedTouches[0].clientX;
      data.bool = true;
      this.setData({
       'movingData' : data,
      })
     
      
  },
  onMoving :function(e){
    if(this.data.movingData.bool){
      let data = this.data.movingData; 
      let startX = this.data.movingData.startX;
      let curX = this.data.movingData.curX;
      data.moveX = e.changedTouches[0].clientX - startX + curX;
      if( data.moveX > 30 ){
          data.moveX = 0;
     }
     if(data.moveX < -(this.data.navWidth - wx.getSystemInfoSync().windowWidth)){
        data.moveX = -(this.data.navWidth - wx.getSystemInfoSync().windowWidth);
     }
      this.setData({
       'movingData' : data,
      })
      console.log(this.data.movingData);
    }
  },
  onFinshed:function(){
 
    let data = this.data.movingData; 
    data.curX = this.data.movingData.moveX;
    data.bool = false;
    this.setData({
     'movingData' : data,
    })
  },

  //点击事件
   onSelect :function(e){
    console.log(e);
    let index = e.currentTarget.dataset.index;
    this.setData(
      {
        'index':index
      }
    )

   },

   // 日期获取
   getTime(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    month =  month<10 ? "0"+month : month;
    let day = date.getDate();
    day =  day<10 ? "0"+day : day;
   let time = `${year}-${month}-${day}` ;
    let data = this.data.diaryData;
    data.time = time;

   this.setData(
     {
       'diaryData':data
     }
   )

 },


  //显示头像选择按钮
 onSelectImage(){
    let that = this;
    console.log("头像");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        let diary = that.data.diaryData;
        diary.photoImg = tempFilePaths[0];
        that.setData({
          'diaryData' : diary
        })
      }
    })
 },

  //更换天气列表
  onSelectWeather(){

      // 显示天气列表
      this.setData({
         "isShowWeather" : true
      })

      // 云函数的调用
      wx.cloud.callFunction({
        name:"get_weather",
        success:res=>{
          // console.log(res);
          let weatherList = res.result.data[0].weather;
          console.log(weatherList);
          this.setData({
            "weatherList" : weatherList
          })
        },
        fail :err=>{
            console.log(err);
        }
      })
  },
  // 改变天气
  onChangeWeather(e){
      console.log(e);
       let index = e.currentTarget.dataset.index;
       let diary = this.data.diaryData;
        diary.weaterImg = this.data.weatherList[index].img;
        diary.weatherText = this.data.weatherList[index].title;
       this.setData({
           "diaryData" :diary
       })
  },
  // 关闭选择天气按钮
  onCloseWeather(){
     this.setData({
       "isShowWeather" :false
     })
  },
  // 获取用户输入信息
  getDiaryValue(e){
    // console.log(e);
     let val = e.detail.value;
    //  console.log(val);
      let diary =  this.data.diaryData;
      diary.content = val
      this.setData({
        "diaryData" : diary
      })
  },
 
  // 保存日记信息
  setDiaryInfo(e){
       console.log("日记上传")
      //  console.log(this.data.index)
      //  console.log(this.data.diaryData);
       //1.0 获取当前的日记类型

 

  },


  // 植物
  plantProsition(e){
    let x = 0 ;
    let y = 0 ;
    console.log(e);
    //  获取当前元素的坐标值
     x = e.detail.x ;
     y = e.detail.y ;
  },
  






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})