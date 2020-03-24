import {spaceKeyValid,EngNumValid,ChinEngValid,ContentValid,eMailValid,phoneValid,NUmValid,FloatValid,IntegerValid} from './index'

// 验证是否是传的空格
const validSpace = (rule,value,callback,text) => {
  let returnText;
  returnText = text ? text : '内容不得为空';
  if(!!spaceKeyValid(value)){
    callback()
  }else{
    callback(new Error(returnText))
  }
};

// 验证图片是否已经上传
const validImg = (rule, value, callback,imgList,text) => {
  let returnText;
  returnText = text ? text : '请选择要上传的图片';
  if (imgList.length > 0) {
    callback();
  } else {
    callback(new Error(returnText));
  }
};

// 验证纯数字的
const validIDNum = (rule, value, callback,text) => {
  if (!NUmValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};

// 验证浮点型数字
const validFloatNum = (rule, value, callback,text) => {
  if (!FloatValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};
// 验证大于0的数字
const validInter = (rule, value, callback,text) => {
  if (!IntegerValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};


// 验证工号用的，验证的是英文和数字
const validWorkID = (rule, value, callback,text) => {
  if (!EngNumValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};

// 验证名字，岗位等一系列以中英文为主的表单
const validChinEng = (rule, value, callback,text) => {
  if (!ChinEngValid(value)) {
    callback(new Error(text));
  } else {
    callback();
  }
};

// 验证一些备注，说明，详细内容等表单
const validContent = (rule, value, callback,text) => {
  if (!!ContentValid(value)) {
    callback();
  } else {
    callback(new Error(text));
  }
};

// 邮箱验证
const validEmail = (rule, value, callback,text) => {
  if (!!eMailValid(value)) {
    callback();
  } else {
    callback(new Error(text));
  }
};

// 电话验证
const validPhone = (rule, value, callback,text) => {
  if (!!phoneValid(value)) {
    callback();
  } else {
    callback(new Error(text));
  }
};

export {validSpace,validImg,validWorkID,validChinEng,validContent,validEmail,validPhone,validIDNum,validFloatNum,validInter}
