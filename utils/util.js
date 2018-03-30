const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const getTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  var day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(hour >= 20) {
    day = day + 1;
  }
  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var itemPosition = function (arr, item){
  for (var i in arr) {
    if (arr[i] == item) {
      return i;
    }
  }
  return -1;
}

// long类型转换Date
var datetimeFormat = function (longTypeDate) {
  var datetimeType = "";
  var date = new Date();
  date.setTime(longTypeDate);
  // datetimeType += date.getFullYear();   //年  
  // datetimeType += "-" + getMonth(date); //月   
  // datetimeType += "-" + getDay(date);   //日  
  // datetimeType += "&nbsp;&nbsp;" + getHours(date);   //时  
  // datetimeType += ":" + getMinutes(date);      //分
  // datetimeType += ":" + getSeconds(date);      //分
  datetimeType += getMonth(date);//月   
  datetimeType += "-" + getDay(date);   //日  
  datetimeType += " " + getHours(date);   //时  
  datetimeType += ":" + getMinutes(date);      //分

  return datetimeType;
}
//返回 01-12 的月份值   
function getMonth(date) {
  var month = "";
  month = date.getMonth() + 1; //getMonth()得到的月份是0-11  
  if (month < 10) {
    month = "0" + month;
  }
  return month;
}
//返回01-30的日期  
function getDay(date) {
  var day = "";
  day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return day;
}
//返回小时
function getHours(date) {
  var hours = "";
  hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  return hours;
}
//返回分
function getMinutes(date) {
  var minute = "";
  minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  return minute;
}
//返回秒
function getSeconds(date) {
  var second = "";
  second = date.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }
  return second;
}

module.exports = {
  formatTime: formatTime,
  getTime : getTime,
  itemPosition: itemPosition,
  datetimeFormat: datetimeFormat
}
