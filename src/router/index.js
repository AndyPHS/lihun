import Vue from 'vue'
import maping from './mate.js'
import Router from 'vue-router'       // 问题管理页面      // 关联管理页面
const Login = () => import('@/components/LiHun/houtai/login')
const Home = () => import('@/components/LiHun/Ad/Home') // 离婚协议书推广首页
const MyConsult = () => import('@/components/LiHun/Ad/MyConsult')  // 我的离婚协议书
const CustomAgreement = () => import('@/components/LiHun/Ad/CustomAgreement')  // 推广页定制我的离婚协议书
const CustomQueDing = () => import('@/components/LiHun/Ad/CustomQueDing')  // 推广页离婚协议书
const CustomBasic = () => import('@/components/LiHun/Ad/CustomBasic')  // 推广页离婚协议书信息填写页面
const CustomShengCheng = () => import('@/components/LiHun/Ad/CustomShengCheng')  // 推广页离婚协议书生成页面
const AgreementHelp = () => import('@/components/LiHun/Ad/AgreementHelp')  // 推广页定制我的离婚协议书帮助
const AgreementHelpCon = () => import('@/components/LiHun/Ad/AgreementHelpCon') 
// 产品故事 
const AgreementHelpCongushi = () => import('@/components/LiHun/Ad/AgreementHelpCongushi') 
// 推广页定制我的离婚协议书帮助详情页

const AgreementUser = () => import('@/components/LiHun/Ad/AgreementUser')  // 推广页定制我的离婚协议书帮助
const AgreementModel = () => import('@/components/LiHun/Ad/AgreementModel')  // 协议范文
const UserAgreement = () => import('@/components/LiHun/Ad/UserAgreement')  // 推广页使用帮助
const Knowledge = () => import('@/components/LiHun/Ad/Knowledge') // 知识列表页面
const KnowledgeList = () => import('@/components/LiHun/Ad/KnowledgeList') // 知识模块页面
const KnowledgeCon = () => import('@/components/LiHun/Ad/KnowledgeCon') // 知识详情页面
const Pay = () => import('@/components/LiHun/Ad/Pay') // 支付页面
const onPay = () => import('@/components/LiHun/Ad/onPay') // 正支付支付页面

const Article = () => import('@/components/LiHun/houtai/Article')         // 后台文章列表页面
const ArticleUpload = () => import('@/components/LiHun/houtai/ArticleUpload')         // 后台文章上传页面
const FenLeiOperate = () => import('@/components/LiHun/houtai/FenLeiOperate')  // 分类管理

const UserList = () => import('@/components/LiHun/houtai/UserList')  // 用户列表信息
const UserWenShu = () => import('@/components/LiHun/houtai/UserWenShu')  // 用户文书列表信息

const UserOperate = () => import('@/components/LiHun/houtai/UserOperate')  // 用户浏览操作页面
const errorPc = () => import('@/components/LiHun/Ad/errorPc')  // 404pc页面


// 移动端页面
const mhome = () => import('@/components/LiHun/m/mhome') // 移动端首页mQueDing
// 移动端示例图页面
const mQueDing = () => import('@/components/LiHun/m/mQueDing') // 移动端确定
const mKnowledge = () => import('@/components/LiHun/m/mKnowledge') // 移动端离婚知识
const mKnowledgeMin = () => import('@/components/LiHun/m/mKnowledgeMin') // 移动端离婚知识详情页
const mAgreement = () => import('@/components/LiHun/m/mAgreement') // 移动端离婚协议书内容页
const mAgreementModel = () => import('@/components/LiHun/m/mAgreementModel') // 移动端离婚协议书模板页
const mMyconsult = () => import('@/components/LiHun/m/mMyconsult') // 移动端我的协议书模板页
const msearchPage = () => import('@/components/LiHun/m/msearchPage') // 移动端搜索页面
const mUser = () => import('@/components/LiHun/m/mUser') // 移动端个人中心
const mUpdatePassword = () => import('@/components/LiHun/m/mUpdatePassword') // 移动端修改密码
const mResetPassword = () => import('@/components/LiHun/m/mResetPassword') // 移动端重置密码
const mRegist = () => import('@/components/LiHun/m/mRegist') // 移动端注册页
const mLogin = () => import('@/components/LiHun/m/mLogin') // 移动端登录页
const mForgetPassword = () => import('@/components/LiHun/m/mForgetPassword') // 移动端忘记密码
const merror = () => import('@/components/LiHun/m/merror') // 移动端404

/**
 * 重写路由的push方法--->这个是vue-cli4.x以上的坑，不然的话，你是跳转不了的
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

const router = new Router({
  mode: 'history',  //去掉url中的#
  scrollBehavior (to, from, savedPosition) { // 新开页面回到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {path: '/', name: 'Home', component: Home, meta: maping.home,},
	{path: '/login', name: 'login', component: Login},
    // 离婚协议书推广我的协议书
    {path: '/dzlhxys', name: 'MyConsult', component: MyConsult,  meta: maping.MyConsult},
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
	{path: '/AgreementHelpCongushi', name: 'AgreementHelpCongushi', component: AgreementHelpCongushi},
	// 离婚协议书推广定制协议书用户页面
    {path: '/AgreementUser', name: 'AgreementUser', component: AgreementUser},
	// 离婚协议书范文
	{path: '/lhxys', name: 'AgreementModel', component: AgreementModel,meta: maping.AgreementModel},
    // 离婚协议书推广使用协议帮助
    {path: '/UserAgreement', name: 'UserAgreement', component: UserAgreement},
    // 离婚协议书推广知识列表页面
    {path: '/lhzs/', name: 'Knowledge', component: Knowledge, meta: maping.Knowledge},
	// 离婚协议书模块列表页面
	{path: '/lhzs/:route', name: 'KnowledgeList', component: KnowledgeList, meta: maping.KnowledgeList},
    // 离婚协议书推广知识详情页面
    {path: '/lhzs/:route/:id', name: 'KnowledgeCon', component: KnowledgeCon,  meta: maping.KnowledgeCon},
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
	// errorPc页面
	{path: '/404.html', name: 'errorPc', component: errorPc},
	
	// 移动端首页
	{path: '/m/mhome', name: 'mhome', component: mhome},
	// 移动端确定页
    {path: '/m/mQueDing', name: 'mQueDing', component: mQueDing},
	// 移动端离婚知识
	{path: '/m/mKnowledge', name: 'mKnowledge', component: mKnowledge},
	// 移动端离婚知识详情页
	{path: '/m/mKnowledgeMin/:id', name: 'mKnowledgeMin', component: mKnowledgeMin},
	// 移动端离婚协议书页面
	{path: '/m/mAgreement', name: 'mAgreement', component: mAgreement},
	// 移动端离婚协议书模板页面
	{path: '/m/mAgreementModel', name: 'mAgreementModel', component: mAgreementModel},
	// 移动端我的协议书
	{path: '/m/mMyconsult', name: 'mMyconsult', component: mMyconsult},
	// 移动端离婚知识搜索页面
	{path: '/m/msearchPage', name: 'msearchPage', component: msearchPage},
	// 移动端个人中心
	{path: '/m/mUser', name: 'mUser', component: mUser},
	// 移动端修改密码
	{path: '/m/mUpdatePassword', name: 'mUpdatePassword', component: mUpdatePassword},
	// 移动端重置
	{path: '/m/mResetPassword', name: 'mResetPassword', component: mResetPassword},
	// 移动端注册
	{path: '/m/mRegist', name: 'mRegist', component: mRegist},
	// 移动端登录
	{path: '/m/mLogin', name: 'mLogin', component: mLogin},
	// 移动端忘记密码
	{path: '/m/mForgetPassword', name: 'mForgetPassword', component: mForgetPassword},
	// 移动端404
	{path: '/m/merror', name: 'merror', component: merror},
	
	// {path: "*",redirect: "/404.html"}
  ]
})
router.beforeEach((to, from, next) => {
 
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
 
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
 
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
 
    // console.log(previousNearestWithMeta);
 
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
 
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
 
    if(!nearestWithMeta) return next();
 
    nearestWithMeta.meta.metaTags.map(tagDef => {
 
        const tag = document.createElement('meta');
    
        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });
 
        tag.setAttribute('data-vue-router-controlled', '');
 
        return tag;
    }).forEach(tag => document.head.appendChild(tag));
 
    next();
})

export default router