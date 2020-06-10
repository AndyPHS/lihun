import axios from 'axios'
import {
  apiUrl
} from './api'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//请求拦截器
axios.interceptors.request.use( onFulfilled: function (config) {
  return config
},onRejected:function(error){
  return Promise.reject(error)
})
//相应拦截
axios.interceptors.response.use( onFulfilled: function (response){
 return response
}, onRejected: function (error){
  return Promise.reject(error)
})

function getPostParams (url, subbody) {
  subbody = subbody || {}
  const requesetType = url.substr(from: url.lastIndexOf('/') + 1)
  var loginUserId = ''
  if (sessionStorage.getItem( key: 'userId')){
    loginUserId = sessionStorage.getItem( key: 'userId')
  }
  subbody.loginUserId = loninUserId
  const postParams = {
    jsonParams: {
      header: {
        requesetType: requesetType,
        loginUserId:loginUserId,

      },
      body:subbody
    }
  }
  postParams.jsonParams = JSON.stringify(postParams.jsonParams)
  //postParams.jsonParams = Encrypt(JSON.stringify(postParams.jsonParams));
  postParams.sign = sign(postParams.jsonParams)
  //postParams.sign = "1";
  postParams.requestSource = '1'
  return postParams
}
function setLoginUserInfo (res){
  sessionStorage.setItem('userInfo', JSON.stringify( value:{
    id:res.id,
    username:res.username
  }))
}

function creatCaseCourtMsg(){

}
