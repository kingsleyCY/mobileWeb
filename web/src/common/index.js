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
}
export default commonBase
