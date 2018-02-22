Page({
  data : {
    templateData : [
      // { id: '0', value: 'a', templateType: '回归极乐'},
      // { id: '1', value: 'b', templateType: '极乐归舟'},
      // { id: '2', value: 'c', templateType: '大经科注学习班' },
      { id: null, value: null, templateType: null },  
    ],
    templateDataNow : null,
    array: ['回归极乐', '极乐归舟', '大经科注学习班'],
    index : 0,
  },
  onLoad: function () {
    
    // wx.request({
    //   url : '',
    //   data : {
        
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (data) {

    //   }
    // })
  },
  // textarea内容的编写
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value);
    this.setData({
      templateDataNow : e.detail.value
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
    var id = e.currentTarget.id;
    var index;
    var templateDate;
    var templateType;
    this.data.templateData.forEach(function (map, i) {
      if (map.id == id) {
        templateDate = map.value;
        templateType = map.templateType;
        return;
      }
    });

    this.data.array.forEach(function (val, i) {
      if (templateType == val) {
        index = i;
      }
    });
    wx.navigateTo({
      url: '../homework/homework?templateDate=' + templateDate + '&id=' + id + '&index=' + index,
    });
  },
  // 点击编辑按钮
  getEdit: function (e) {
    var id = e.currentTarget.id;
    var dataPostion;
    var templateType;
    var index;
    this.data.templateData.forEach(function (map, i) {
      if (map.id == id) {
        dataPostion = i;
        templateType = map.templateType;
        return;
      }
    });

    this.data.array.forEach(function (val, i) {
      if (templateType == val) {
        index = i;
      }
    });

    this.setData({
      templateDataNow: this.data.templateData[dataPostion].value,
      index: index
    })
  }, 
  // 点击删除按钮
  getDel: function (e) {
    // 获取删除按钮相对性的id
    var id = e.currentTarget.id;
    var dataPostion;
    this.data.templateData.forEach(function(map, i) {
      if(map.id == id) {
        dataPostion = i;
        return;
      }
    });
    console.log(dataPostion);
    this.data.templateData.splice(dataPostion, 1);
    this.setData({
      'templateData': this.data.templateData
    });
  },
  // 点击提交按钮
  bindFormSubmit: function (e) {
    // 获取数组的长度 + 1
    var length = this.data.templateData.length - 1;
    console.log(length);
    // 获取数组的边界的id + 1
    var id = this.data.templateData[length].id + 1;
    var index = this.data.index;
    var temtemplateType = this.data.array[index];
    console.log(id);
    var newData = [{
      id: id,
      value: e.detail.value.textarea,
      templateType: temtemplateType,
    }];
    this.data.templateDataNow = null;
    this.setData({
      'templateData': this.data.templateData.concat(newData),
      'templateDataNow': this.data.templateDataNow
    });
  }
})