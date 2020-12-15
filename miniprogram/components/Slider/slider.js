// components/Slider/slider.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 列表
    list :{
      type : Array ,
      default(){
        return [
             {
               'image':'',
               'title': '标题'
             },
             {
               'image':'',
               'title': '标题'
             },
             {
               'image':'',
               'title': '标题'
             },
             {
               'image':'',
               'title': '标题'
             }
        ]
      }
    }
    // 修改宽度

  },

  /**
   * 组件的初始数据
   */
  data: {
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    //  if(data,moveX ){}
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
  }
})
