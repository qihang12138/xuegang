const http = require('./http')
let ApiUrl = 'https://xuegang.dd371.com/api/';
// let ApiUrl = 'http://192.168.101.205/api/';
const api = {
    ApiWechat: ApiUrl + 'login/wechat',
    ApiIndex: ApiUrl + 'index/index',
    ApiSearchGoods: ApiUrl + 'index/search_goods',
    ApiUploadFile: ApiUrl + 'index/upload_file',
    ApiGetSerchData: ApiUrl + 'index/get_serch_data',
    ApiGetNearSite: ApiUrl + 'index/get_near_site',
    ApiGetUserView: ApiUrl + 'common/get_user_view',
    ApiCouponList: ApiUrl + 'index/coupon_list',
    // 用户
    ApiApply: ApiUrl + 'user/apply',
    ApiGetApply: ApiUrl + 'user/get_apply',
    ApiGetUserData: ApiUrl + 'user/get_user_data',
    ApiUsercollect: ApiUrl + 'user/collect',
    ApiGuiZe: ApiUrl + 'user/ji_fen_gui_ze',
    ApiGetSiteRecord: ApiUrl + 'user/get_site_record',
    ApiSign: ApiUrl + 'user/sign',
    // 地址
    ApiSaveAddr: ApiUrl + 'user/save_addr',
    ApiAddrLister: ApiUrl + 'user/addr_lister',
    ApiUpdateAddr: ApiUrl + 'user/update_addr',
    ApiDeleteAddr: ApiUrl + 'user/delete_addr',
    // 商品
    ApiGetBrandGoods: ApiUrl + 'goods/get_brand_goods',
    ApiGoodsDetail: ApiUrl + 'goods/goods_detail',
    ApiGetMoreComment: ApiUrl + 'goods/get_more_comment',
    ApiCollect: ApiUrl + 'goods/collect',
    ApiRetail: ApiUrl + 'goods/retail',
    ApiQuerenToo: ApiUrl + 'goods/queren_too',
    ApiGetCoupon: ApiUrl + 'goods/get_coupon',
    // 订单
    ApiSubmitOrder: ApiUrl + 'goods/submit_order',
    ApiSubmitOrderToo: ApiUrl + 'goods/submit_order_too',
    ApiGetUserOrder: ApiUrl + 'order/get_user_order',
    ApiCancelOrder: ApiUrl + 'order/cancel_order',
    ApiTuiView: ApiUrl + 'order/tui_view',
    ApiTui: ApiUrl + 'order/tui',
    ApiOrderDetail: ApiUrl + 'order/order_detail',
    ApiSaveComment: ApiUrl + 'order/save_comment',
    ApiQueren: ApiUrl + 'goods/queren',
    ApiReciving: ApiUrl + 'order/reciving',
    ApiCommentView: ApiUrl + 'order/comment_view',
    //支付
    ApiPay: ApiUrl + 'pay/pay',
    ApiVipPay: ApiUrl + 'pay/vip_pay',
    ApiYearVipPay: ApiUrl + 'pay/year_vip_pay',
    //购物车
    ApiSaveCar: ApiUrl + 'car/save_car',
    ApiCarLister: ApiUrl + 'car/car_lister',
    ApiIncreaseReduce: ApiUrl + 'car/increase_reduce',
    ApiCancel: ApiUrl + 'car/cancel',
    ApiDeleteCar: ApiUrl + 'car/delete_car',
    ApiCarQuerenToo: ApiUrl + 'car/queren_too',
    ApiSubmitCarToo: ApiUrl + 'car/submit_car_too',
    ApiSubmitCar: ApiUrl + 'car/submit_car',
    ApiCarQueren: ApiUrl + 'car/queren',
    // 团长
    ApiSiteIndex: ApiUrl + 'site/site_index',
    ApiCompete: ApiUrl + 'site/compete',
    ApiGetChildUser: ApiUrl + 'site/get_child_user',
    ApiSiteGetUserOrder: ApiUrl + 'site/get_user_order',
    ApiPublish: ApiUrl + 'site/publish',
    ApiTask: ApiUrl + 'site/task',
    ApiShortcut: ApiUrl + 'site/shortcut',
    ApiColonel: ApiUrl + 'site/colonel',
    ApiWithdraw: params => http({ url: ApiUrl + 'site/withdraw_deposit', data: params }),
    ApiRecharge: params => http({ url: ApiUrl + 'site/price_recharge', data: params }),
    ApiReject: params => http({ url: ApiUrl + 'site/reject', data: params }),
    ApiTixianRecord: params => http({ url: ApiUrl + 'site/tixian_record', data: params }),
    ApiDiscountsList: params => http({ url: ApiUrl + 'site/discounts_list', data: params }),
    ApiTurnDown: params => http({ url: ApiUrl + 'site/turn_down', data: params }),
    ApiPass: params => http({ url: ApiUrl + 'site/pass', data: params }),

    // vip
    ApiVipTest: params => http({ url: ApiUrl + 'user/vip', data: params }),
    ApiProblem: params => http({ url: ApiUrl + 'user/problem', data: params }),
    ApiWallet: params => http({ url: ApiUrl + 'user/wallet', data: params }),
    ApiAddVipOrder: params => http({ url: ApiUrl + 'user/add_vip_order', data: params, method: 'POST' }),
    ApiPriceRecord: params => http({ url: ApiUrl + 'user/price_record', data: params })




}
module.exports = api;