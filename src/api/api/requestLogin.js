import {apiUrl} from '@/common/js/api.js'
import axios from 'axios'
import qs from 'qs'

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
    data: params
  });
};
// 新增用户
export const addUsers = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addUsers,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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
    url: apiUrl.selectUser+'?page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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
// 查询用户角色
export const selectUserRoles = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUserRoles + '/' + localStorage.getItem('userId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增角色
export const addUsersRole = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addUsersRole,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除角色
export const deleteUserRole = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteUserRole + '/' + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 修改角色
export const updateUserRole = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateUserRole + '/' + localStorage.getItem('roleId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询角色
export const selectUserRole = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUserRole,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询角色权限
export const selectRolePermission = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectRolePermission + '/' + localStorage.getItem('roleId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增权限
export const addPermission = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addPermission,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除权限
export const deletePermission = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deletePermission + '/' + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 修改权限
export const updatePermission = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updatePermission + '/' + localStorage.getItem('permissionId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询权限
export const selectPermission = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectPermission,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增案件信息
export const creatCase = params => {
  return axios({
    method: 'POST',
    dataType: 'json',
    async: false,
    url: apiUrl.creatCase,
    headers: { Authorization: 'bearer ' + localStorage.getItem('token'), 'Content-Type': 'multipart/form-data:charset=UTF-8' },
    data: params
  })
};

// 修改案件基本信息
export const updateCaseData = params => {
  return axios({
    method: 'put',
    dataType: 'json',
    url: apiUrl.updateCase + '/' + localStorage.getItem('id'),
    headers: {Authorization: 'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询案件
export const selectCaseData = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCase + "/" + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询案件列表s
export const selectCaseList = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseList+'/?'+params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 文件上传列表接口
export const fileList = params => {
  return axios({
    method: "GET",
    dataType: 'json',
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    url: apiUrl.selectCaseLlist+'?page='+params.page,
    data:params
  });
};

// 新增案由
export const addCaseAction = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.addCaseAction + "/" + localStorage.getItem('id'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询案由
export const selectCaseAction = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseAction,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};

// 新增法院信息
export const creatCaseCourtMsg = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.creatCaseCourtMsg,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 提交法院信息
export const addCaseCourtMsg = params => {
  return axios({
    method: "POST",
    dataType: 'json',
    url: apiUrl.addCaseCourtMsg,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改法院信息
export const updateCaseCourtMsg = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCaseCourtMsg+params.cpid,
    data: qs.stringify(params)
  });
};

// 删除法院信息
export const deleteCaseCourtMsg = params => {
  console.log(params)
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteCaseCourtMsg + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询法庭信息
export const getCaseCourtMsg = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.getCaseCourtMsg+'/?name='+params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询法庭信息（信息列表页面）
export const getCaseCourtMsgList = params => {
  // console.log(params)
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.getCaseCourtMsg+'?page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询标签
export const selectCaseLable = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseLable,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
//查询法院人员
export const getCourtPersonnels = params => {

  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseCourtPersonnel+params.courtId,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')}
  });
};


//新增法院人员
export const addCourtPersonnels = params => {

  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addCaseCourtPersonnel,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};


//修改法院人员
export const updateCourtPersonnels = params => {

  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCaseCourtPersonnel+params.cpid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};


//删除法院人员
export const delCourtPersonnels = params => {

  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteCaseCourtPersonnel+params.cpid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')}
  });
};


// 查询律所信息
export const getCourtData = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseLawyerOffice,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};

// 查询律师
export const getLawyerData = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectCaseLawyer+params.loid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 新增律所
export const addLawyerOffice = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addCaseLawyerOffice,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data:params
  });
};
// 修改律所
export const updateLawyerOffice = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateCaseLawyerOffice+params.loid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data:params
  });
};
// 新增律师
export const addLawyer = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addCaseLawyer,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data:params
  });
};
// 离婚页面配置
// 查询问题
export const selectQuestion = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectQuestion+'?page='+params.page,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询问题列表s按标题查找
export const selectQuestionList = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectQuestionList+'/?'+params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增问题
export const addQuestion = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addQuestion,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除问题
export const deleteQuestion = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteQuestion + '/' + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 修改问题
export const updateQuestion = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.updateQuestion + localStorage.getItem('pid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 问题数组
export const QuestionArr = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.QuestionArr,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 添加选项
export const addAnswer = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addAnswer + localStorage.getItem('pid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除选项deleteAnswer
export const deleteAnswer = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteAnswer + localStorage.getItem('paid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询关系树
export const selectTree = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectTree + localStorage.getItem('qid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 模糊查询关联
export const selectVague = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectVague+'/?'+params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增关联
export const ProblemQAdd = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.ProblemQAdd,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 修改关联
export const updateProblemQ = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateProblemQ + localStorage.getItem('qpid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改层级 父类
export const updateOrder = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateOrder,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增关联条件
export const addQpWhere  = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addQpWhere + localStorage.getItem('qpid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询关联条件selectQpWhere
export const selectQpWhere  = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectQpWhere + localStorage.getItem('qpid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 删除关联条件
export const deleteQpWhere  = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteQpWhere + localStorage.getItem('qpWhereId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除关联
export const deleteProblemQ = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteProblemQ + params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: qs.stringify(params)
  });
};
// 查询单独问题
export const selectOnlyQuestion = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectOnlyQuestion + localStorage.getItem('pid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 新增组合规则
export const addWord = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addWord,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改组合规则
export const updateWord = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateWord + localStorage.getItem('fWordId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询单独组合规则
export const wordSelect = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.wordSelect + localStorage.getItem('fWordId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询组合规则

export const wordSelectWord = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.wordSelectWord+'/?'+params,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除组合规则
export const deleteWord = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteWord + localStorage.getItem('fWordId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 查询组合规则tree结构
export const wordSelectTree = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.wordSelectTree + localStorage.getItem('wid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};

// 新增word的json部分
export const addWordJson = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addWordJson + localStorage.getItem('fWordId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改word的json部分
export const updateWordJson = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateWordJson + localStorage.getItem('wordJsonId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除word的json部分
export const deleteWordJson = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteWordJson + localStorage.getItem('wordJsonId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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

// 验证单独word
export const verificationWord = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.verificationWord + localStorage.getItem('wid'),
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
// 问卷数组
export const questionnaire = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.questionnaire,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 通过类型查询问卷
export const questionnaireSelect = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.questionnaireSelect + '?type=' + params.type,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 通过类型查询问卷
export const questionnaireSelectAll = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.questionnaireSelect,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增问卷
export const addQuestionnaire = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addQuestionnaire,
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
// 删除问卷
export const deleteQuestionnaire = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteQuestionnaire + localStorage.getItem('qid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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
// 查找用户问卷
export const selectUserDeleteQuestionnaire = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUserDeleteQuestionnaire + '?status=' + params.status,
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
// 置顶
export const userUpdateOrderId = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.userUpdateOrderId + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 获取文本内容
export const selectUqContent = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectUqContent + localStorage.getItem('quid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 获取标签
export const selectLabel = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectLabel + localStorage.getItem('qid')+'?status='+params.status,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 获取关键词
export const selectKeyWord = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectLabel + localStorage.getItem('qid')+'?status='+params.status+'&&flId='+params.flId,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询标签
export const selectLabelChoose = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectLabel + localStorage.getItem('qid') + '?title=' + params.title +'&&status=' + params.status + '&&flId=' + params.flId,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询标签内容
export const selectLabelContent = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectLabelContent + params.qlid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增标签内容
export const AddLabelContent = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.AddLabelContent + localStorage.getItem('qlid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除标签
export const deleteLabel = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteLabel + localStorage.getItem('qlid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除关键词
export const deleteKeyWord = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteKeyWord + localStorage.getItem('qlid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 新增标签
export const addLabel = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addLabel,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除标签内容
export const deleteLabelContent = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteLabelContent + params.qldid,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改标签
export const updateLabel = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateLabel + localStorage.getItem('qlid'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 添加示例图
export const demoAddImg = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.demoAddImg,
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
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
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
// 新增文章
export const addNews = params => {
  return axios({
    method: "post",
    dataType: 'json',
    url: apiUrl.addNews,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 删除文章
export const deleteNews = params => {
  return axios({
    method: "delete",
    dataType: 'json',
    url: apiUrl.deleteNews + params.id,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 恢复文章
export const recoveryNews = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.recoveryNews + params.id,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 修改文章
export const updateNews = params => {
  return axios({
    method: "put",
    dataType: 'json',
    url: apiUrl.updateNews + localStorage.getItem('articleId'),
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
// 查询文章selectNews
export const selectNews = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNews + '?status=' + params.status,
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
// 筛选查找文章
export const selectFaIDNews = params => {
  return axios({
    method: "get",
    dataType: 'json',
    url: apiUrl.selectNews + '?status=' + params.status + '&faID=' + params.faID,
    headers: {Authorization:'bearer ' + localStorage.getItem('token')},
    data: params
  });
};
