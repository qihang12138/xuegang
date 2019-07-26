let ApiUrl = 'http://xuegang.dd371.com/api/';
// let ApiUrl = 'http://192.168.101.205/api/';
const api = {
    // 用户登录
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
    ApiSubmitOrder: ApiUrl + 'goods/submit_order',
    ApiRetail: ApiUrl + 'goods/retail',
    ApiSubmitOrderToo: ApiUrl + 'goods/submit_order_too',
    ApiQuerenToo: ApiUrl + 'goods/queren_too',
    // 订单
    ApiGetUserOrder: ApiUrl + 'order/get_user_order',
    ApiCancelOrder: ApiUrl + 'order/cancel_order',
    //购物车


}
module.exports = api;