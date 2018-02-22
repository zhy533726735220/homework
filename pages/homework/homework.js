Page({
  data: {
    id:[],
    homework: [],
    array: ['回归极乐', '极乐归舟', '大经科注学习班'],
    index:0
  },
  onLoad: function(val) {
    this.setData({
      homework: val.templateDate,
      id: val.id,
      index: val.index
    })
  },
  getTemplate: function (e) {
    wx.navigateTo({
      url: '../template/template'
    })
  },
  // picker选择器
  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value,
    });
  }, 
  // 点击提交按钮
  bindFormSubmit: function (e) {

  }
})