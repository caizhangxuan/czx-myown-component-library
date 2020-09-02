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

const ipv4 = '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$'
const ipv4Mask = '^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/(\\d|[1-2]\\d|3[0-2]))?$'
const ipv6 = '^([\\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^::([\\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:):([\\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){2}:([\\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){3}:([\\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}$|^:((:[\\da-fA-F]{1,4}){1,6}|:)$|^[\\da-fA-F]{1,4}:((:[\\da-fA-F]{1,4}){1,5}|:)$|^([\\da-fA-F]{1,4}:){2}((:[\\da-fA-F]{1,4}){1,4}|:)$|^([\\da-fA-F]{1,4}:){3}((:[\\da-fA-F]{1,4}){1,3}|:)$|^([\\da-fA-F]{1,4}:){4}((:[\\da-fA-F]{1,4}){1,2}|:)$|^([\\da-fA-F]{1,4}:){5}:([\\da-fA-F]{1,4})?$|^([\\da-fA-F]{1,4}:){6}:$'
const ipv6Mask = '^([\\da-fA-F]{1,4}:){6}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^::([\\da-fA-F]{1,4}:){0,4}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:):([\\da-fA-F]{1,4}:){0,3}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){2}:([\\da-fA-F]{1,4}:){0,2}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){3}:([\\da-fA-F]{1,4}:){0,1}((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){4}:((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){7}[\\da-fA-F]{1,4}(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^:((:[\\da-fA-F]{1,4}){1,6}|:)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^[\\da-fA-F]{1,4}:((:[\\da-fA-F]{1,4}){1,5}|:)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){2}((:[\\da-fA-F]{1,4}){1,4}|:)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){3}((:[\\da-fA-F]{1,4}){1,3}|:)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){4}((:[\\da-fA-F]{1,4}){1,2}|:)(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){5}:([\\da-fA-F]{1,4})?(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$|^([\\da-fA-F]{1,4}:){6}:(\\/([1-9]?\\d|(1([0-1]\\d|2[0-8]))))?$'

export const tempArr = [ipv4,ipv4Mask,ipv6,ipv6Mask]
