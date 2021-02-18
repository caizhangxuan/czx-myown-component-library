import {spaceKeyValid,EngNumValid,ChinEngValid,ContentValid,eMailValid,phoneValid,NUmValid,FloatValid,IntegerValid} from './index'

// 验证是否是传的空格
export const validSpace = (rule,value,callback,text) => {
  let returnText;
  returnText = text ? text : '内容不得为空';
  if(spaceKeyValid(value)){
    callback()
  }else{
    callback(new Error(returnText))
  }
};

// 验证图片是否已经上传
export const validImg = (rule, value, callback,imgList,text) => {
  let returnText;
  returnText = text ? text : '请选择要上传的图片';
  if (imgList.length > 0) {
    callback();
  } else {
    callback(new Error(returnText));
  }
};

// 验证纯数字的
export const validIDNum = (rule, value, callback,text) => {
  if (!NUmValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};

// 验证浮点型数字
export const validFloatNum = (rule, value, callback,text) => {
  if (!FloatValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};
// 验证大于0的数字
export const validInter = (rule, value, callback,text) => {
  if (!IntegerValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};


// 验证工号用的，验证的是英文和数字
export const validWorkID = (rule, value, callback,text) => {
  if (!EngNumValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};

// 验证名字，岗位等一系列以中英文为主的表单
export const validChinEng = (rule, value, callback,text) => {
  if (!ChinEngValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};

// 验证一些备注，说明，详细内容等表单
export const validContent = (rule, value, callback,text) => {
  if (ContentValid(value)) {
    callback();
  } else {
    callback(new Error(text));
  }
};

// 邮箱验证
export const validEmail = (rule, value, callback,text) => {
  if (eMailValid(value)) {
    callback();
  } else {
    callback(new Error(text));
  }
};

// 电话验证
export const validPhone = (rule, value, callback,text) => {
  if (phoneValid(value)) {
    callback();
  } else {
    callback(new Error(text));
  }
};
/**
 * IPV4验证
 * @param str
 * @return {boolean}
 */

export function isIPV4(str) {
    // 不带掩码
    let temp = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
    // 带掩码的
    let temp2 = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)[\/](3[0-2]|[1-2][0-9]|[1-9])$/;
    // if ()) {
    return temp2.test(str) || temp.test(str)
    // } else {
    //   return false
    // }
}

const ipv4 = '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$'
const ipv4Mask = '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)[\\/](3[0-2]|[1-2][0-9]|[1-9])$'
const ipv6 = '^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*$'
const ipv6Mask = '^\\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)(\\.(25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)){3}))|:)))(%.+)?\\s*[\\/](1[0-2][0-9]|[1-9][0-9]|[1-9])$'
const domain = '^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$'
// 上传图片的时候图片的格式
export const ImgHz = ['bmp','jpg','png','tif','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','WMF','webp','avif']

export const tempArr = [ipv4,ipv4Mask,ipv6,ipv6Mask]
export const tempIP4 = [ipv4,ipv4Mask]
export const tempIP6 = [ipv6,ipv6Mask]

export const IPReg = new RegExp(tempArr.join('|'))
export const IPReg4 = new RegExp(tempIP4.join('|'))
export const IPReg6 = new RegExp(tempIP6.join('|'))
export const domainReg = new RegExp(domain)
export const IPReg4NoMask = new RegExp(ipv4)
export const IPReg4Mask = new RegExp(ipv4Mask)
export const IPReg6NoMask = new RegExp(ipv6)
export const IPReg6Mask = new RegExp(ipv6Mask)

const imgTemp = ['BMP','JPG','JPEG','PNG','GIF','bmp','jpg','jpeg','png','gif']


