// 在需要使用的js文件中，导入js  
const util = require('../../utils/util.js'); 
const app = getApp()
Page({
  data: {
    array: [],
    time: null,
    index: 0,
    userContent:[],
    showLoading: true
  },
  onLoad: function () {
    this.setData({
      array: app.globalData.homeworkTypeList,
      // 判断如果是20:00则进入下一天
      time: util.getTime(new Date()),
    });
  },
  // picker选择器
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value,
      showLoading: true
    });
    var that = this;
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/admin/selectStudyCondition.action',
      data: {
        submitTime: that.data.time,
        homeworkType: that.data.array[that.data.index],
      },
      success: function (res) {
        that.setData({
          userContent: res.data,
          showLoading: false
        });
      }
    });
  }, 
  onShow:function() {
    var that = this;
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/admin/selectStudyCondition.action',
      data: {
        submitTime: that.data.time,
        homeworkType: that.data.array[that.data.index],
      },
      success: function (res) {
        res.data.forEach(function (map) {
          // 时间的转换
          map['updateTime'] = util.datetimeFormat(map.updateTime)
        })
        that.setData({
          userContent: res.data,
          showLoading: false
        });
      }
    });
  }
})        