import {apiUrl} from '@/common/js/api.js'
import axios from 'axios'
import qs from 'qs'

// 单独验证手机号
export const phoneCodeV = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.phoneCodeV,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改手机号
export const updatePhone = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePhone,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 移动端修改密码
export const remakePassword = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.remakePassword,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 修改用户名基本信息updateUserName
export const updateUserName = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updateUserName,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 发送手机验证码
export const phoneCode = params => {
	return axios({
	  method: 'post',
	  dataType: 'json',
	  url: apiUrl.phoneCode,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
	  data: params
	});
};
// 发送邮件验证码
export const sendEmail = params => {
	return axios({
	  method: 'post',
	  dataType: 'json',
	  url: apiUrl.sendEmail,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
	  data: params
	});
};
// 手机修改密码
export const updatePasswordPhone = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePasswordPhone,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 手机号修改密码
export const updatePasswordPhone2 = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePasswordPhone2,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增用户
export const addUser = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.addUser,
    data: params
  });
};
// 更新用户头像
export const uploadUserPhoto = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.uploadUserPhoto,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 手机号验证码登录
export const codeLoginPhone = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.codeLoginPhone,
    data: params
  });
};
// 登录
export const frontLogin = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.frontLogin,
    data: params
  });
};
// 修改邮件
export const updateUserEmail = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updateUserEmail,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 邮件修改密码
export const updatePasswordEmail = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.updatePasswordEmail,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 验证码接口
export const verifyCode = params => {
  return axios({
    method: "GET",
    dataType: 'json',
    url: apiUrl.loginCode,
    data: qs.stringify(params)
  });
};
// 登录
export const requestLogin = params => {
  return axios({
    method: 'post',
    dataType: 'json',
    url: apiUrl.login,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};

// 删除用户
export const deleteUser = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteUser + '/' + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 修改用户
export const updateUser = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateUser + '/' + localStorage.getItem('userId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询用户
export const selectUser = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUser+'?type=2&page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
export const selectUserBack = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUser+'?type=2&page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 通过手机查询用户
export const selectUserBackByPhone = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUser+'?type=2&phone='+params.phone+'&page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// usersSelect查找用户基本信息
export const usersSelect = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.usersSelect,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
export const usersSelectBack = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.usersSelect,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 查询问卷基本信息
export const returnQuestionnaireJson = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.returnQuestionnaireJson + params.qpid +'?quid='+localStorage.getItem('quid')+'&qid='+ localStorage.getItem('qid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 关键字查询文章
export const selectOsNews = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectOsNews + '?title=' + params.title,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 20篇热门文章
export const newsHot = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.newsHot,
    data: params
  });
};
// 查找用户问卷
export const selectUserQuestionnaire = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUserQuestionnaire + '?qid=' + params.qid + '&&status=' + params.status,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 获取用户问卷
export const pdfPdf = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.pdfPdf + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查找单独用户问卷
export const selectOnlyUserQuestionnaire = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUserQuestionnaire + '?uid=' + params.uid + '&&status=' + params.status,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增用户问卷时间
export const addQuestionnaireLog = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addQuestionnaireLog + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 结束用户问卷时间
export const stopQuestionnaireLog = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.stopQuestionnaireLog + localStorage.getItem('uqlId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增用户文章日志
export const addUserNewsLog = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addUserNewsLog,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 结束用户文章日志
export const stopUserNewsLog = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.stopUserNewsLog + localStorage.getItem('unlId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询用户日志selectUserNewsLog
export const selectUserNewsLog = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUserNewsLog + params.uid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 用户添加问卷的内容
export const userAddAnswer = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.userAddAnswer,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
 // 获取单独问题的值
export const getOnlyValue = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.getOnlyValue,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 重复问题+1 添加子女房产
export const userAddSelectAnswer = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.userAddSelectAnswer,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 重复问题-1  删除子女
export const userDeleteSelectAnswer = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.userDeleteSelectAnswer,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 验证单独word demo
export const demoYanZheng = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.demoYanZheng+ localStorage.getItem('quid') +'?qpid='+params.qpid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 生成数据

export const outPutWord = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.outPutWord + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 下载离婚协议书
export const getWord = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.getWord+ localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改用户问卷
export const userUpdateQuestionnaire = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.userUpdateQuestionnaire + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改问卷
export const updateQuestionnaire = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateQuestionnaire + localStorage.getItem('qid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增用户问卷
export const userAddQuestionnaire = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.userAddQuestionnaire + localStorage.getItem('qid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增副本
export const copyUserQuestionnaire = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.copyUserQuestionnaire + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};


// 后台文章类型
// 新增文章类型
export const addAction = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addAction,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 删除文章类型
export const deleteAction = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteAction + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改文章类型
export const updateAction = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateAction + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 查看文章类型
export const selectAction = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectAction + '1',
    headers: {Authorization:'bearer ' + localStorage.getItem('token'),"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'},
    data: params
  });
};
export const selectActionBack = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectAction + '1',
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack'),"Content-Type":'application/x-www-form-urlencoded; charset=UTF-8'},
    data: params
  });
};
// 新增文章
export const addNews = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addNews,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 删除文章
export const deleteNews = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteNews + params.id,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 恢复文章
export const recoveryNews = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.recoveryNews + params.id,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 修改文章
export const updateNews = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateNews + localStorage.getItem('articleId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 查询文章selectNews
export const selectNews = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNews + '?status=' + params.status + '&page=' + params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 问卷付费
export const newsPay = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.newsPay + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询文章内容selectNewsContent
export const selectNewsContent = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNewsContent + params.id,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询文章内容selectNewsContent
export const selectNewsContentBack = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNewsContent + params.id,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 筛选查找文章
export const selectFaIDNews = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNews + '?status=' + params.status + '&faId=' + params.faId + '&page=' + params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
export const selectFaIDNewsBack = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNews + '?status=' + params.status + '&faId=' + params.faId + '&page=' + params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('tokenBack')},
    data: params
  });
};
// 支付查询
export const verificationPay = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.verificationPay + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
