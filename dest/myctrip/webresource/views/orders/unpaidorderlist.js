define(["commonlist","cUtilCommon","cGuiderService"],function(e,i,n){return e.getInstance({pageid:"231014",hpageid:"231014",unionType:"AwaitPay",viewType:"unpaidorderlist",title:"待付款订单",bCustomizeHead:!0,onShow:function(e){e.isOnline||e.headerview.set({title:"待付款订单",back:!0,view:e,events:{returnHandler:function(){n.apply({callback:function(){e.jump("/webapp/myctrip")},hybridCallback:function(){n.backToLastPage()}})}}})}})});