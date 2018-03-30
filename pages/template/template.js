const app = getApp()
Page({
  data : {
    templateData : [],
    templateDataNow : null,
    array: [],
    index : 0,
    showLoading : true
  },
  onLoad: function () {
    var that = this;
    // 更新用户的信息
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/user/updateUser.action',
      data: {
        openid: app.globalData.openid,
        wxName: app.globalData.userInfo.nickName,
        avatar: app.globalData.userInfo.avatarUrl,
      },
      success: function (res) {
        that.setData({
          templateData: res.data,
        });
      }
    });
    this.setData({
      // showLoading: app.globalData.showLoading,
      array: app.globalData.homeworkTypeList,  
    });
    var that = this;
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/template/selectTemplate.action',
      data: {
        openid: app.globalData.openid,
      },
      success: function (res) { 
        that.setData({
          templateData: res.data,
        });
      }
    });
  },  
  onShow: function() {
    this.setData({
      showLoading: app.globalData.showLoading,
    })
  },  
  // picker选择器
  listenerPickerSelected: function (e) {
    this.setData({
      index : e.detail.value,
    });
  }, 
  // 点击选择按钮
  getSelect: function(e) {
    this.data.templateData.forEach(function(map) {
      var that = this;
      if (map.id == e.currentTarget.id) {
        app.globalData.homework.templateType = map.templateType;
        app.globalData.homework.content = map.content;
      }
    })
    
    wx.switchTab({
      url: '../homework/homework',
    });
  },
  // 点击编辑按钮
  getEdit: function (e) {
    this.setData({
      templateDataNow: this.data.templateData[dataPostion].value,
      index: index
    })
  }, 
  // 点击删除按钮
  getDel: function (e) {
    // // 获取删除按钮相对性的id
    var id = e.currentTarget.id;
    var that = this;
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/template/deleteTemplate.action',
      data: {
        id: id,
      },
      success: function (res) {
        wx.request({
          url: 'https://www.petal.fun/homework/pages/back/template/selectTemplate.action',
          data: {
            openid: app.globalData.openid,
          },
          success: function (res) {
            that.setData({
              templateData: res.data,
            });
          }
        });
      }
    });
  },
  // 点击提交按钮
  bindFormSubmit: function (e) {
    this.setData({
      'templateDataNow': e.detail.value.textarea
    })
    var that = this;
    wx.request({
      url: 'https://www.petal.fun/homework/pages/back/template/doCreateTemplate.action',
      data: {
        openid: app.globalData.openid,
        templateType: that.data.array[that.data.index],
        content: that.data.templateDataNow
      },
      success: function (res) {
        wx.request({
          url: 'https://www.petal.fun/homework/pages/back/template/selectTemplate.action',
          data: {
            openid: app.globalData.openid,
          },
          success: function (res) {
            that.setData({
              templateData: res.data,
            });
          }
        });
      }
    });
  }
})