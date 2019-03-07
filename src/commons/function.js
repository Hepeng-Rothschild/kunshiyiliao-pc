import store from '@/store';
import cookie from '@/utils/cookie.js';
import aesUtils from '@/plugins/aes-utils.js';
//生成AddDayCount天之前/之后的年月日
export function GetDate(AddDayCount = 0) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期
  var d = dd.getDate();
  if (m >= 1 && m <= 9) {
    m = "0" + m;
  }
  if (d >= 0 && d <= 9) {
    d = "0" + d;
  }
  return y + "-" + m + "-" + d;
}
//上传接口返回值解密
export function uploadFileDecrypt(res) {
  let salt = store.state.salt;
  let iv = store.state.iv;
  let key = cookie.getCookie("randmId");
  if (res.code == 1 && res.encryption) {
    res.object = JSON.parse(aesUtils.decrypt(salt, iv, key, res.object));
  }
  return res;
}
//查询cha在str中第num个的位置,num从0开始
export function findStr(str, cha, num) {
  var x = str.indexOf(cha);
  for (var i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1);
  }
  return x;
}
// 添加序号0
export function addZeros(num) {
  num = num + 1;
  if (num < 10) {
    return "0" + num;
  }
  return num;
}
// 图片地址的兼容
export function analysisImages(json) {
  try {
    json = JSON.parse(json);
    return json.fileName;
  } catch (error) {
    return "";
  }
}

export let functionJS = {
  // params方式传值的跳转函数
  paramsNavgationTo(that, name, params) {
    that.$router.push({
      name,
      params
    });
  },
  // query方式传值的跳转函数
  queryNavgationTo(that, path, query) {
    that.$router.push({
      path,
      query
    });
  }
}