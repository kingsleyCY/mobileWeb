import { Message } from 'element-ui'

class commonBase {
  timestampToTime(timestamp) {
    var date = new Date(Number(timestamp));//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours();
    Number(h) < 10 ? h = ('0' + h) : h = h
    // var m = date.getMinutes() + ':';
    var m = date.getMinutes();
    Number(m) < 10 ? m = ('0' + m) : m = m
    var s = date.getSeconds();
    // return Y + M + D + h + m + s;
    return Y + M + D + h + ':' + m;
  }
  createRandom() {
    const en_arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'e', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'w', 'v', 'u', 'x', 'y', 'z']
    let num1 = Math.floor(Math.random() * 26 + 1);
    let num2 = Math.floor(Math.random() * 26 + 1);
    return (Math.random() * 10000000).toString(16).substr(0, 5) + (en_arr[num1] ? en_arr[num1] : '-') + (new Date()).getTime().toString().substr(0, 10) + (en_arr[num2] ? en_arr[num2] : '-') + Math.random().toString().substr(2, 7);
  }
  shoeMessege(type, mess) {
    Message({
      message: mess,
      type: type,
    })
  }
}

export default commonBase
