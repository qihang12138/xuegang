let ApiUrl = 'http://xuegang.dd371.com/api/';
// let ApiUrl = 'http://192.168.101.205/api/';
const api = {
    // 用户登录
    ApiWechat: ApiUrl + 'login/wechat',
    ApiIndex: ApiUrl + 'index/index',
    ApiSearchGoods: ApiUrl + 'index/search_goods',
    ApiGetSerchData: ApiUrl + 'index/get_serch_data',
    ApiGetNearSite: ApiUrl + 'index/get_near_site',
    ApiApply: ApiUrl + 'user/apply',
    ApiGetApply: ApiUrl + 'user/get_apply',
    ApiGetUserData: ApiUrl + 'user/get_user_data',
    ApiGetUserView: ApiUrl + 'common/get_user_view',
    ApiUsercollect: ApiUrl + 'user/collect',
    ApiCouponList: ApiUrl + 'index/coupon_list',
    ApiGetSiteRecord: ApiUrl + 'user/get_site_record',
    ApiGuiZe: ApiUrl + 'user/ji_fen_gui_ze',
    ApiAddrLister: ApiUrl + 'user/addr_lister',
    ApiSaveAddr: ApiUrl + 'user/save_addr',
    ApiUpdateAddr: ApiUrl + 'user/update_addr',
    ApiDeleteAddr: ApiUrl + 'user/delete_addr',
    ApiGetUserOrder: ApiUrl + 'order/get_user_order',
    // 商品
    ApiGetBrandGoods: ApiUrl + 'goods/get_brand_goods',
    ApiGoodsDetail: ApiUrl + 'goods/goods_detail',
    ApiGetMoreComment: ApiUrl + 'goods/get_more_comment',
    ApiCollect: ApiUrl + 'goods/collect',
    ApiSubmitOrder: ApiUrl + 'goods/submit_order',
    ApiRetail: ApiUrl + 'goods/retail',
    ApiUploadFile: ApiUrl + 'index/upload_file',
    ApiSubmitOrderToo: ApiUrl + 'goods/submit_order_too',
    ApiQuerenToo: ApiUrl + 'goods/queren_too',


}
module.exports = api;