import Vue from 'vue'
import Router from 'vue-router'
// const Login = () => import('../components/login')
// import Login from '@/components/login'
const LoginSuccess = () => import('@/components/loginSuccess')
const CaseCourt = () => import('@/components/CaseCourt')
const CaseUpload = () => import('@/components/CaseUpload')   // 案例上传页面
const FileList = () => import('@/components/FileList')   // 案例展示列表页面
const CaseCompleted = () => import('@/components/CaseCompleted')  // 案件信息填写页面
const CaseCompletedView = () => import('@/components/CaseCompletedView')  // 搜索案件信息填写页面
const HeadMenu = () => import('@/components/HeadMenu')  // 添加头部导航按钮
const UpdateCase = () => import('@/components/UpdateCase') // 修改案件基本信息
const ArrangementCase = () => import('@/components/ArrangementCase')  // 整理案件样式页面
const Users = () => import('@/components/users/Users')  // 用户页面
const UsersPermission = () => import('@/components/users/UsersPermission')  // 用户权限页面
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
const UsersRole = () => import('@/components/users/UsersRole')  // 用户角色页面
const SearchCase = () => import('@/components/SearchCase')   // 案例搜索
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
const QiSuComplate = () => import('@/components/QiSuZhuang/QiSuComplate')    // 起诉状生成页
const QiSuBasicInformation = () => import('@/components/QiSuZhuang/QiSuBasicInformation')    // 起诉状基本信息填写
const DiaoChaQuZhengStart = () => import('@/components/DiaoChaQuZhengRequest/DiaoChaQuZhengStart')    // 调查取证申请书初始化页面
const DiaoChaQuZhengBasic = () => import('@/components/DiaoChaQuZhengRequest/DiaoChaQuZhengBasic')   // 调查取证申请书信息填写页
const DiaoChaQuZhengPersonalize = () => import('@/components/DiaoChaQuZhengRequest/DiaoChaQuZhengPersonalize')  // 调查取证申请书个性化页面
const HunQianStart = () => import('@/components/HunQianXieYi/HunQianStart') // 婚前协议小问卷
const HunQianBasic = () => import('@/components/HunQianXieYi/HunQianBasic') // 婚前协议基本信息
const HunNeiStart = () => import('@/components/HunNeiXieYi/HunNeiStart') // 婚内协议小问卷
const HunNeiBasic = () => import('@/components/HunNeiXieYi/HunNeiBasic') // 婚内协议基本信息
const BaoQuanStart = () => import('@/components/BaoQuanRequest/BaoQuanStart')    // 保全申请书初始化页面
const BaoQuanBasic = () => import('@/components/BaoQuanRequest/BaoQuanBasic')  // 保全申请书信息填写页
const BaoQuanPersonalize = () => import('@/components/BaoQuanRequest/BaoQuanPersonalize')  // 保全申请书个性化页面
const FuYangQuanBasic = () => import('@/components/FuYangQuanQiSuZhuang/FuYangQuanBasic')   // 抚养权起诉状信息填写页
const FuYangQuanPersonalize = () => import('@/components/FuYangQuanQiSuZhuang/FuYangQuanPersonalize')  // 抚养权起诉状个性化页面
const FuYangFeiBasic = () => import('@/components/FuYangFeiQiSuZhuang/FuYangFeiBasic')   // 抚养费起诉状信息填写页
const FuYangFeiPersonalize = () => import('@/components/FuYangFeiQiSuZhuang/FuYangFeiPersonalize')  // 抚养费起诉状个性化页面
const FenJiaXiChanStart = () => import('@/components/FenJiaXiChanQiSuZhuang/FenJiaXiChanStart')   // 分家析产纠纷起诉状小问卷
const FenJiaXiChanBasic = () => import('@/components/FenJiaXiChanQiSuZhuang/FenJiaXiChanBasic')   // 分家析产纠纷起诉状信息填写页
const FenJiaXiChanPersonalize = () => import('@/components/FenJiaXiChanQiSuZhuang/FenJiaXiChanPersonalize')  // 分家析产纠纷起诉状个性化页面
const MinJianJieDaiBasic = () => import('@/components/MinJianJieDaiQiSuZhuang/MinJianJieDaiBasic')   // 民间借贷起诉状信息填写页
const MinJianJieDaiPersonalize = () => import('@/components/MinJianJieDaiQiSuZhuang/MinJianJieDaiPersonalize')  // 民间借贷起诉状个性化页面
const ZhengRenChuTingBasic = () => import('@/components/ZhengRenChuTingRequest/ZhengRenChuTingBasic')   // 证人出庭作证申请书信息填写页
const ZhengRenChuTingPersonalize = () => import('@/components/ZhengRenChuTingRequest/ZhengRenChuTingPersonalize')  // 证人出庭作证申请书个性化页面
const PingGuStart = () => import('@/components/PingGuRequest/PingGuStart')    // 评估请书初始化页面
const PingGuBasic = () => import('@/components/PingGuRequest/PingGuBasic')   // 评估请书信息填写页
const PingGuPersonalize = () => import('@/components/PingGuRequest/PingGuPersonalize')  // 评估请书个性化页面
const JiChengJiuFenStart = () => import('@/components/JiChengJiuFenQiSuZhuang/JiChengJiuFenStart')   // 继承纠纷起诉状小问卷
const JiChengJiuFenBasic = () => import('@/components/JiChengJiuFenQiSuZhuang/JiChengJiuFenBasic')   // 继承纠纷起诉状信息填写页
const JiChengJiuFenPersonalize = () => import('@/components/JiChengJiuFenQiSuZhuang/JiChengJiuFenPersonalize')  // 继承纠纷起诉状个性化页面
const HunHouCaiChanStart = () => import('@/components/HunHouCaiChanQiSuZhuang/HunHouCaiChanStart')   // 婚后财产纠纷起诉状小问卷
const HunHouCaiChanBasic = () => import('@/components/HunHouCaiChanQiSuZhuang/HunHouCaiChanBasic')   // 婚后财产纠纷起诉状信息填写页
const HunHouCaiChanPersonalize = () => import('@/components/HunHouCaiChanQiSuZhuang/HunHouCaiChanPersonalize')  // 婚后财产纠纷起诉状个性化页面
const BiJiJianDingBasic = () => import('@/components/BiJiJianDingRequest/BiJiJianDingBasic')   // 笔迹鉴定申请书信息填写页
const BiJiJianDingPersonalize = () => import('@/components/BiJiJianDingRequest/BiJiJianDingPersonalize')  // 笔迹鉴定申请书个性化页面
const JingShenZhuangTaiBasic = () => import('@/components/JingShenZhuangTaiRequest/JingShenZhuangTaiBasic')  // 精神状态鉴定申请书信息填写页
const JingShenZhuangTaiPersonalize = () => import('@/components/JingShenZhuangTaiRequest/JingShenZhuangTaiPersonalize')  // 精神状态鉴定申请书个性化页面

const NewWenJuan = () => import('@/components/NewWenJuan') // 新增问卷测试
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login', component: Login},
    {path: '/loginSuccess', name: 'loginSuccess', component: LoginSuccess},
    {path: '/CaseCourt', name: 'CaseCourt', component: CaseCourt},
    // 案件上传路由
    {path: '/CaseUpload', name: 'CaseUpload', component: CaseUpload},
    // 案件展示路由
    {path: '/FileList', name: 'FileList', component: FileList},
    // 修改案件基本信息
    {path: '/UpdateCase', name: 'UpdateCase', component: UpdateCase},
    // 完成页面
    {path: '/CaseCompleted', name: 'CaseCompleted', component: CaseCompleted},
    // 搜索查看完成页面
    {path: '/CaseCompletedView', name: 'CaseCompletedView', component: CaseCompletedView},
    // 导航列表
    {path: '/HeadMenu', name: 'HeadMenu', component: HeadMenu},
    // 整理案件样式页面
    {path: '/ArrangementCase', name: 'ArrangementCase', component: ArrangementCase},
    // 用户列表
    {path: '/Users', name: 'Users', component: Users},
    // 用户权限列表
    {path: '/UsersPermission', name: 'UsersPermission', component: UsersPermission},
    // 用户角色列表
    {path: '/UsersRole', name: 'UsersRole', component: UsersRole},
    // 问题管理页面
    {path: '/QuestionManagement', name: 'QuestionManagement', component: QuestionManagement},
    // 关联管理
    {path: '/GuanLianManagement', name: 'GuanLianManagement', component: GuanLianManagement},
    // 组合管理
    {path: '/ZuHeManagement', name: 'ZuHeManagement', component: ZuHeManagement},
    // 离婚协议书推广首页
    {path: '/Home', name: 'Home', component: Home,meta: {title: '登录',type: 'login'}},
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
    // 搜索页面
    {path: '/SearchCase', name: 'SearchCase', component: SearchCase},
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
    {path: '/ShengChengXieYi', name: 'ShengChengXieYi', component: ShengChengXieYi},
    // 起诉状生成页
    {path: '/QiSuComplate', name: 'QiSuComplate', component: QiSuComplate},
    // 起诉状基本信息
    {path: '/QiSuBasicInformation', name: 'QiSuBasicInformation', component: QiSuBasicInformation},
    // 调查取证申请书初始化页面
    {path: '/DiaoChaQuZhengStart', name: 'DiaoChaQuZhengStart', component: DiaoChaQuZhengStart},
    // 调查取证申请书基本信息页面
    {path: '/DiaoChaQuZhengBasic', name: 'DiaoChaQuZhengBasic', component: DiaoChaQuZhengBasic},
    // 调查取证申请书个性化页面
    {path: '/DiaoChaQuZhengPersonalize', name: 'DiaoChaQuZhengPersonalize', component: DiaoChaQuZhengPersonalize},
    // 婚前协议小问卷
    {path: '/HunQianStart', name: 'HunQianStart', component: HunQianStart},
    // 婚前协议基本信息
    {path: '/HunQianBasic', name: 'HunQianBasic', component: HunQianBasic},
    // 婚内协议小问卷
    {path: '/HunNeiStart', name: 'HunNeiStart', component: HunNeiStart},
    // 婚内协议基本信息
    {path: '/HunNeiBasic', name: 'HunNeiBasic', component: HunNeiBasic},
    // 保全申请书初始化页面
    {path: '/BaoQuanStart', name: 'BaoQuanStart', component: BaoQuanStart},
    // 保全申请书基本信息页面
    {path: '/BaoQuanBasic', name: 'BaoQuanBasic', component: BaoQuanBasic},
    // 保全申请书个性化页面
    {path: '/BaoQuanPersonalize', name: 'BaoQuanPersonalize', component: BaoQuanPersonalize},
    // 抚养权基本信息页面
    {path: '/FuYangQuanBasic', name: 'FuYangQuanBasic', component: FuYangQuanBasic},
    // 抚养权个性化页面
    {path: '/FuYangQuanPersonalize', name: 'FuYangQuanPersonalize', component: FuYangQuanPersonalize},
    // 抚养费基本信息页面
    {path: '/FuYangFeiBasic', name: 'FuYangFeiBasic', component: FuYangFeiBasic},
    // 抚养费个性化页面
    {path: '/FuYangFeiPersonalize', name: 'FuYangFeiPersonalize', component: FuYangFeiPersonalize},
    // 分家析产基本信息页面
    {path: '/FenJiaXiChanStart', name: 'FenJiaXiChanStart', component: FenJiaXiChanStart},
    // 分家析产基本信息页面
    {path: '/FenJiaXiChanBasic', name: 'FenJiaXiChanBasic', component: FenJiaXiChanBasic},
    // 分家析产个性化页面
    {path: '/FenJiaXiChanPersonalize', name: 'FenJiaXiChanPersonalize', component: FenJiaXiChanPersonalize},
    // 民间借贷基本信息页面
    {path: '/MinJianJieDaiBasic', name: 'MinJianJieDaiBasic', component: MinJianJieDaiBasic},
    // 民间借贷个性化页面
    {path: '/MinJianJieDaiPersonalize', name: 'MinJianJieDaiPersonalize', component: MinJianJieDaiPersonalize},
    // 证人出庭作证基本信息页面
    {path: '/ZhengRenChuTingBasic', name: 'ZhengRenChuTingBasic', component: ZhengRenChuTingBasic},
    // 证人出庭作证个性化页面
    {path: '/ZhengRenChuTingPersonalize', name: 'ZhengRenChuTingPersonalize', component: ZhengRenChuTingPersonalize},
    // 评估请书初始化页面
    {path: '/PingGuStart', name: 'PingGuStart', component: PingGuStart},
    // 评估基本信息页面
    {path: '/PingGuBasic', name: 'PingGuBasic', component: PingGuBasic},
    // 评估个性化页面
    {path: '/PingGuPersonalize', name: 'PingGuPersonalize', component: PingGuPersonalize},
    // 继承纠纷起诉状
    {path: '/JiChengJiuFenStart', name: 'JiChengJiuFenStart', component: JiChengJiuFenStart},
    // 继承纠纷基本信息页面
    {path: '/JiChengJiuFenBasic', name: 'JiChengJiuFenBasic', component: JiChengJiuFenBasic},
    // 继承纠纷个性化页面
    {path: '/JiChengJiuFenPersonalize', name: 'JiChengJiuFenPersonalize', component: JiChengJiuFenPersonalize},
    // 婚后财产纠纷起诉状
    {path: '/HunHouCaiChanStart', name: 'HunHouCaiChanStart', component: HunHouCaiChanStart},
    // 婚后财产纠纷基本信息页面
    {path: '/HunHouCaiChanBasic', name: 'HunHouCaiChanBasic', component: HunHouCaiChanBasic},
    // 婚后财产纠纷个性化页面
    {path: '/HunHouCaiChanPersonalize', name: 'HunHouCaiChanPersonalize', component: HunHouCaiChanPersonalize},
    // 笔迹鉴定申请书基本信息页面
    {path: '/BiJiJianDingBasic', name: 'BiJiJianDingBasic', component: BiJiJianDingBasic},
    // 笔迹鉴定申请书个性化页面
    {path: '/BiJiJianDingPersonalize', name: 'BiJiJianDingPersonalize', component: BiJiJianDingPersonalize},
    // 精神状态鉴定申请书基本信息页面
    {path: '/JingShenZhuangTaiBasic', name: 'JingShenZhuangTaiBasic', component: JingShenZhuangTaiBasic},
    // 精神状态鉴定申请书个性化页面
    {path: '/JingShenZhuangTaiPersonalize', name: 'JingShenZhuangTaiPersonalize', component: JingShenZhuangTaiPersonalize},
	{path: '/NewWenJuan', name: 'NewWenJuan', component: NewWenJuan}
  ]
})
