// 在需要使用的js文件中，导入js  
const util = require('../../utils/util.js'); 
const app = getApp()
Page({
  data: {
    // 报课的内容
    content: null,
    currentNavtab: "0",
    array: [],
    index: 0,
    templateType:null
  },
  onLoad: function() {  
    // todo 判断为管理员
    this.setData({
      array: app.globalData.homeworkTypeList, 
    });
  },
  onShow: function () {
    this.setData({
      content: app.globalData.homework.content,
      templateType: app.globalData.homework.templateType,
    })
    //  模板界面报课类型，返回index
    var index = util.itemPosition(this.data.array, this.data.templateType);
    this.setData({
      index: index
    })
  },
  // picker选择器
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value,
    });
  }, 
  bindFormSubmit: function (e) {  
    this.setData({
      'content': e.detail.value.textarea
    })
    var that = this;
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/homework/doCreateHomework.action',
      data: {
        openid: app.globalData.openid,
        homeworkType: that.data.array[that.data.index],
        content: that.data.content
      },
      success: function (res) {
        
      }
    });
  },
 
})