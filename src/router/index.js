import Vue from 'vue'
import Router from 'vue-router'       // 问题管理页面      // 关联管理页面
const Login = () => import('@/components/LiHun/houtai/login')
const Home = () => import('@/components/LiHun/Ad/Home') // 离婚协议书推广首页
const MyConsult = () => import('@/components/LiHun/Ad/MyConsult')  // 我的离婚协议书
const CustomAgreement = () => import('@/components/LiHun/Ad/CustomAgreement')  // 推广页定制我的离婚协议书
const CustomQueDing = () => import('@/components/LiHun/Ad/CustomQueDing')  // 推广页离婚协议书
const CustomBasic = () => import('@/components/LiHun/Ad/CustomBasic')  // 推广页离婚协议书信息填写页面
const CustomShengCheng = () => import('@/components/LiHun/Ad/CustomShengCheng')  // 推广页离婚协议书生成页面
const AgreementHelp = () => import('@/components/LiHun/Ad/AgreementHelp')  // 推广页定制我的离婚协议书帮助
const AgreementHelpCon = () => import('@/components/LiHun/Ad/AgreementHelpCon')  // 推广页定制我的离婚协议书帮助详情页

const AgreementUser = () => import('@/components/LiHun/Ad/AgreementUser')  // 推广页定制我的离婚协议书帮助
const AgreementModel = () => import('@/components/LiHun/Ad/AgreementModel')  // 协议范文
const UserAgreement = () => import('@/components/LiHun/Ad/UserAgreement')  // 推广页使用帮助
const Knowledge = () => import('@/components/LiHun/Ad/Knowledge') // 知识列表页面
const KnowledgeCon = () => import('@/components/LiHun/Ad/KnowledgeCon') // 知识详情页面
const Pay = () => import('@/components/LiHun/Ad/Pay') // 支付页面
const onPay = () => import('@/components/LiHun/Ad/onPay') // 正支付支付页面

const Article = () => import('@/components/LiHun/houtai/Article')         // 后台文章列表页面
const ArticleUpload = () => import('@/components/LiHun/houtai/ArticleUpload')         // 后台文章上传页面
const FenLeiOperate = () => import('@/components/LiHun/houtai/FenLeiOperate')  // 分类管理

const UserList = () => import('@/components/LiHun/houtai/UserList')  // 用户列表信息
const UserWenShu = () => import('@/components/LiHun/houtai/UserWenShu')  // 用户文书列表信息

const UserOperate = () => import('@/components/LiHun/houtai/UserOperate')  // 用户浏览操作页面

// 移动端页面
const mhome = () => import('@/components/LiHun/m/mhome') // 移动端首页mQueDing
// 移动端示例图页面
const mQueDing = () => import('@/components/LiHun/m/mQueDing') // 移动端确定
const mKnowledge = () => import('@/components/LiHun/m/mKnowledge') // 移动端离婚知识
const mKnowledgeMin = () => import('@/components/LiHun/m/mKnowledgeMin') // 移动端离婚知识详情页
const mAgreement = () => import('@/components/LiHun/m/mAgreement') // 移动端离婚协议书内容页
const mAgreementModel = () => import('@/components/LiHun/m/mAgreementModel') // 移动端离婚协议书模板页

/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  scrollBehavior (to, from, savedPosition) { // 新开页面回到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {path: '/', name: 'Home', component: Home},
	{path: '/login', name: 'login', component: Login},
    // 离婚协议书推广我的协议书
    {path: '/MyConsult', name: 'MyConsult', component: MyConsult},
    // 离婚协议书推广定制协议书
    {path: '/CustomAgreement', name: 'CustomAgreement', component: CustomAgreement},
    // 离婚协议书推广页面确定页面
    {path: '/CustomQueDing', name: 'CustomQueDing', component: CustomQueDing},
    // 离婚协议书推广页面问题填写页面
    {path: '/CustomBasic', name: 'CustomBasic', component: CustomBasic},
    // 离婚协议书推广页面生成协议页面
    {path: '/CustomShengCheng', name: 'CustomShengCheng', component: CustomShengCheng},

    // 离婚协议书推广定制协议书帮助页面
    {path: '/AgreementHelp', name: 'AgreementHelp', component: AgreementHelp},
    // 离婚协议书推广定制协议书帮助页面
    {path: '/AgreementHelpCon', name: 'AgreementHelpCon', component: AgreementHelpCon},
	
	// 离婚协议书推广定制协议书用户页面
    {path: '/AgreementUser', name: 'AgreementUser', component: AgreementUser},
	// 离婚协议书范文
	{path: '/AgreementModel', name: 'AgreementModel', component: AgreementModel},
    // 离婚协议书推广使用协议帮助
    {path: '/UserAgreement', name: 'UserAgreement', component: UserAgreement},
    // 离婚协议书推广知识列表页面
    {path: '/Knowledge', name: 'Knowledge', component: Knowledge},
    // 离婚协议书推广知识详情页面
    {path: '/KnowledgeCon/:id', name: 'KnowledgeCon', component: KnowledgeCon},
    // 支付页面
    {path: '/Pay', name: 'Pay', component: Pay},
	// 正支付页面
	{path: '/onPay', name: 'onPay', component: onPay},

    // 后台文章列表页面
    {path: '/Article', name: 'Article', component: Article},
    // 后台文章上传页面FenLeiOperate
    {path: '/ArticleUpload', name: 'ArticleUpload', component: ArticleUpload},
    // 分类管理
    {path: '/FenLeiOperate', name: 'FenLeiOperate', component: FenLeiOperate},
    // 后台用户列表页面
    {path: '/UserList', name: 'UserList', component: UserList},
    // 后台用户文书页面
    {path: '/UserWenShu', name: 'UserWenShu', component: UserWenShu},
    // 后台用户操作界面
    {path: '/UserOperate', name: 'UserOperate', component: UserOperate},
	
	// 移动端首页
	{path: '/m/mhome', name: 'mhome', component: mhome},
	// 移动端确定页
    {path: '/m/mQueDing', name: 'mQueDing', component: mQueDing},
	// 移动端离婚知识
	{path: '/m/mKnowledge', name: 'mKnowledge', component: mKnowledge},
	// 移动端离婚知识详情页
	{path: '/m/mKnowledgeMin', name: 'mKnowledgeMin', component: mKnowledgeMin},
	// 移动端离婚协议书页面
	{path: '/m/mAgreement', name: 'mAgreement', component: mAgreement},
	// 移动端离婚协议书模板页面
	{path: '/m/mAgreementModel', name: 'mAgreementModel', component: mAgreementModel},
  ]
})
