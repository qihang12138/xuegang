let ApiUrl = 'http://xuegang.dd371.com/api/';

const api = {
    // 用户登录
    ApiWechat: ApiUrl +  'login/wechat',
    ApiIndex: ApiUrl + 'index/index',
    ApiSearchGoods: ApiUrl + 'index/search_goods',
    ApiGetSerchData: ApiUrl + 'index/get_serch_data',
    ApiGetNearSite: ApiUrl + 'index/get_near_site',
    ApiApply: ApiUrl + 'user/apply',
    // 商品
    ApiGetBrandGoods: ApiUrl + 'goods/get_brand_goods',
    ApiGoodsDetail: ApiUrl +'goods/goods_detail',
}
module.exports = api;