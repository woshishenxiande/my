define(["commonlist","cHybridFacade","myctripCommon","cUtility"],function(e,r,t){return e.getInstance({pageid:"231046",hpageid:"231046",bizType:"Hotel",viewType:"hotelorderlist",bCustomizeHead:t.isTieYou()||!1,title:"酒店订单",onShow:function(e){var t=Lizard.P("flag");return"orders/search"==e.referrer&&"nocache"==t?!0:void r.register({tagname:r.METHOD_WEB_VEW_DID_APPEAR,callback:function(r){r="string"==typeof r&&r?JSON.parse(r):r,r&&r.callbackString&&(r=r.callbackString,r="string"==typeof r&&r?JSON.parse(r):r,r&&"hotel"==r.from&&"1"==r.refresh&&"myctrip"==r.to&&e.onShow())}})}})});