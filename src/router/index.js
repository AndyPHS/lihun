import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('../components/login')
const QuestionManagement = () => import('@/components/LiHun/QuestionManagement')         // 问题管理页面
const GuanLianManagement = () => import('@/components/LiHun/GuanLianManagement')         // 关联管理页面
const Home = () => import('@/components/LiHun/Ad/Home') // 离婚协议书推广首页
const MyConsult = () => import('@/components/LiHun/Ad/MyConsult')  // 我的离婚协议书
const CustomAgreement = () => import('@/components/LiHun/Ad/CustomAgreement')  // 推广页定制我的离婚协议书
const CustomQueDing = () => import('@/components/LiHun/Ad/CustomQueDing')  // 推广页离婚协议书
const CustomBasic = () => import('@/components/LiHun/Ad/CustomBasic')  // 推广页离婚协议书信息填写页面
const CustomShengCheng = () => import('@/components/LiHun/Ad/CustomShengCheng')  // 推广页离婚协议书生成页面
const AgreementHelp = () => import('@/components/LiHun/Ad/AgreementHelp')  // 推广页定制我的离婚协议书帮助
const AgreementUser = () => import('@/components/LiHun/Ad/AgreementUser')  // 推广页定制我的离婚协议书帮助
const UserAgreement = () => import('@/components/LiHun/Ad/UserAgreement')  // 推广页使用帮助
const Knowledge = () => import('@/components/LiHun/Ad/Knowledge') // 知识列表页面
const KnowledgeCon = () => import('@/components/LiHun/Ad/KnowledgeCon') // 知识详情页面
const Pay = () => import('@/components/LiHun/Ad/Pay') // 支付页面

const ZuHeManagement = () => import('@/components/LiHun/ZuHeManagement')         // 组合管理页面
const LabelManagement = () => import('@/components/LiHun/LabelManagement')         // 标签管理页面
const DisplayRule = () => import('@/components/LiHun/DisplayRule')        // 显示规则修改页面

const WenJuan = () => import('@/components/LiHun/WenJuan')         // 添加问卷页面
const UserSystem = () => import('@/components/LiHun/UserSystem')         // 添加用户系统页面
const WenJuan1 = () => import('@/components/LiHun/WenJuan1')         // 添加问卷测试页面
const ChuShi = () => import('@/components/LiHun/ChuShi')         // 小问卷初始页面
const QueDing = () => import('@/components/LiHun/QueDing')         // 确定初始页面
const BasicInformation = () => import('@/components/LiHun/BasicInformation')         // 基本信息填写页面
const Article = () => import('@/components/LiHun/houtai/Article')         // 后台文章列表页面
const ArticleUpload = () => import('@/components/LiHun/houtai/ArticleUpload')         // 后台文章上传页面
const FenLeiOperate = () => import('@/components/LiHun/houtai/FenLeiOperate')  // 分类管理

const UserList = () => import('@/components/LiHun/houtai/UserList')  // 用户列表信息
const UserWenShu = () => import('@/components/LiHun/houtai/UserWenShu')  // 用户文书列表信息

const UserOperate = () => import('@/components/LiHun/houtai/UserOperate')  // 用户浏览操作页面
const ShengChengXieYi = () => import('@/components/LiHun/ShengChengXieYi')         // 添加离婚协议书债务页面
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Home', component: Home},
    // 问题管理页面
    {path: '/QuestionManagement', name: 'QuestionManagement', component: QuestionManagement},
    // 关联管理
    {path: '/GuanLianManagement', name: 'GuanLianManagement', component: GuanLianManagement},
    // 组合管理
    {path: '/ZuHeManagement', name: 'ZuHeManagement', component: ZuHeManagement},
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
    // 离婚协议书推广定制协议书用户页面
    {path: '/AgreementUser', name: 'AgreementUser', component: AgreementUser},
    // 离婚协议书推广使用协议帮助
    {path: '/UserAgreement', name: 'UserAgreement', component: UserAgreement},
    // 离婚协议书推广知识列表页面
    {path: '/Knowledge', name: 'Knowledge', component: Knowledge},
    // 离婚协议书推广知识详情页面
    {path: '/KnowledgeCon', name: 'KnowledgeCon', component: KnowledgeCon},
    // 支付页面
    {path: '/Pay', name: 'Pay', component: Pay},

    // 标签管理
    {path: '/LabelManagement', name: 'LabelManagement', component: LabelManagement},
    // 显示规则页面
    {path: '/DisplayRule', name: 'DisplayRule', component: DisplayRule},
    // 问卷页面
    {path: '/WenJuan', name: 'WenJuan', component: WenJuan},
    // 用户系统
    {path: '/UserSystem', name: 'UserSystem', component: UserSystem},
    // 问卷测试页面
    {path: '/WenJuan1', name: 'WenJuan1', component: WenJuan1},
    // 小问卷 初始页面
    {path: '/ChuShi', name: 'ChuShi', component: ChuShi},
    // 确定初始页面
    {path: '/QueDing', name: 'QueDing', component: QueDing},
	  // 基本信息填写页面
	  {path: '/BasicInformation', name: 'BasicInformation', component: BasicInformation},
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
    // 生成离婚协议书页面
    {path: '/ShengChengXieYi', name: 'ShengChengXieYi', component: ShengChengXieYi}
    
  ]
})
