define(["cPageView","MyCtripStore","cGuiderService","myctripCommon","cMemberService","indexCommon","cUtilCryptBase64"],function(e,t,r,i,a,o,n){var s=t.GetMessageListStore.getInstance(),l=e.extend({isAggregated:!0,viewType:"home",isInApp:Lizard.isHybrid,frompageurl:"from="+encodeURIComponent("/webapp/myctrip/index"),fullfrom:"from="+encodeURIComponent((location.protocol||"http:")+"//"+location.host+location.pathname),onCreate:function(){this.renderTpl()},renderTpl:function(){var e=Lizard.T("hybrid_index");1!=i.checkLogin()?e=Lizard.T("unlogin"):cPublic.ctripMenu({show:!0,buName:"home"}),this.$el.html(e),this.elsBox={msgCentre:this.$el.find("#message_centre"),tabCan:this.$el.find("#ordertab"),orderCan:this.$el.find("#orderlist"),favoriteCan:this.$el.find("#favoritelist"),progressBar:this.$el.find("#progress"),currentLvl:this.$el.find("#startlvl"),nextLvl:this.$el.find("#endlvl"),orderMore:this.$el.find("#viewMore"),userName:this.$el.find("#username"),memberbox:this.$el.find("#memberbox")}},onShow:function(){var e,t=window.location.hash,r=!1,a=[{old:"#more/index",news:"/webapp/myctrip/more/index"},{old:"#more",news:"/webapp/myctrip/more/index"}];if($.each(a,function(i,a){var o;return(e=t.match(a.old+"(.*)"))?(o=a.news+(e[1]||""),r=!0,a.out?Lizard.jump(o):Lizard.goTo(o),!1):void 0}),!r){$("#headerview")&&$("#headerview").hide();var n=this;if(this.isInApp&&i.isPad&&this.setHead(),o.resetUserInfo(n),1===i.checkLogin()){if(this.handleBaseUserInfo(),this.wallet(),null===s.get())o.requestMessageInfo(function(e){n.renderMessageInfo(e)});else{var l=s.get();n.renderMessageInfo(l)}o.orderCount(function(e){for(var t in e)n.elsBox.tabCan.find("#"+t).text(e[t])}),this.requestOrder(),this.favoriteOrder()}}},onHide:function(){$("#headerview")&&$("#headerview").show()},events:{"click #viewMore":"moreJump","click #favoritelist li":"favoriteJump","click .mywallet":"walletJump","click #promocode":"promocodeJump","click #i-mail":"mailAction","click [data-href]":"nextPage","click #ordertab li":"tabClick","click #gotologin":"loginAction"},setHead:function(){this.headerview.set({title:"我的携程",back:!0,view:this,events:{returnHandler:function(){r.jump({url:"ctrip://wireless/home",targetModel:"app"})}}}),this.headerview.show()},renderMessageInfo:function(e){var t=e.MessageList.length;if(e&&t>0){var r="";this.elsBox.msgCentre.find(".home-mail").append('<span class="unread2"></span>'),r+='<div class="message-alert"><ul>';for(var i=0,a=t>3?3:t;a>i;i++){var o=e.MessageList[i].ContentList.RedirectUrl||"/webapp/message/messagecenter";r+='<li data-href="'+o+'" data-h5="'+o+'">'+e.MessageList[i].Title+"</a></li>"}r+="</ul></div>",this.elsBox.msgCentre.append(r)}},handleBaseUserInfo:function(){var e=o.handleBaseUserInfo();e&&(e.grade&&this.elsBox.memberbox.find("#"+e.grade).show(),e.lvlName&&this.elsBox.memberbox.find("#userlvl").html(e.lvlName),e.userName&&this.elsBox.userName.html(e.userName),e.degree&&(this.elsBox.currentLvl.text(e.degree[0]),this.elsBox.nextLvl.text(e.degree[1])))},tabClick:function(e){var t=this.elsBox.tabCan.find(".current")&&this.elsBox.tabCan.find(".current").data("key"),r=$(e.currentTarget).data("key");t&&r&&t!=r&&(this.$el.find("#ordertab li").removeClass(),$(e.currentTarget).addClass("current"),this.requestOrder())},loginAction:function(){var e=this;a.memberLogin({param:window.location.href,callback:function(t){t&&(e.renderTpl(),e.onShow())}})},nextPage:function(e){var t=$(e.currentTarget);h5Url=t.data("h5"),hybridUrl=t.data("href");var i=this.isInApp?hybridUrl:h5Url;i&&i.indexOf("ctrip://")>-1?r.jump({targetModel:"app",url:i}):Lizard.jump(i,{targetModel:4})},moreJump:function(){var e={NotTravel:"unuseorderlist",AwaitPay:"unpaidorderlist",AwaitReview:"uncommentorderlist",All:"allorders"},t=this.elsBox.tabCan.find(".current").data("key");Lizard.jump(Lizard.appBaseUrl+"orders/"+e[t])},favoriteJump:function(e){var t=this,e=$(e.currentTarget),i=e.data("statusid")||"",a=e.data("biz")||"",o=e.data("url");if(a)if(a.indexOf("DEST")>-1||"cruise"===a.toLowerCase()||0!==i){o+=o.indexOf("?")>-1?"&":"?";var n=o.match(/\/webapp\/([^\/]+)\/(.+)/);r.apply({hybridCallback:function(){if(o.indexOf("ctrip://")>-1)r.jump({targetModel:"app",url:o});else if(n&&n.length){if("high"===a.toLowerCase())return Lizard.jump(o,{targetModel:4});r.cross({path:n[1],param:n[2]+t.frompageurl})}else Lizard.jump(o,{targetModel:4})},callback:function(){o+="hotel_domestic"==a||"hotel_international"==a?t.fullFrom:t.frompageurl,Lizard.jump(o)}})}else this.showToast("此产品已下架")},mailAction:function(){var e=s.get(),t=(e?e.count:0,"/webapp/message/messagecenter");Lizard.jump(t,{targetModel:4})},wallet:function(){var e=this;o.requestBalanceInfo(function(t){if(t&&t.balanceInfo&&t.avatarUrl&&t.lvlProgress){for(var r in t.balanceInfo){var i=t.balanceInfo[r];e.$el.find("._"+r.toLowerCase()).text(i)}e.elsBox.progressBar.css("width",t.lvlProgress);var a=e.$el.find(".member-pic").find("img")[0];a&&(a.onerror=function(){this.src="http://pic.c-ctrip.com/h5/rwd_myctrip/portrain_unlogin.png"},a.src=t.avatarUrl)}})},requestOrder:function(){var e=this;o.showLocalLoading("#orderlist");var t=e.elsBox.tabCan,r=e.elsBox.orderCan,i=e.elsBox.tabCan.find(".current").data("key")||"All",a={PageSize:3,PageIndex:1,OrderStatusClassify:i};o.filterOrderData(e,a,function(a){if(a&&0===a.resultCode)if("undefined"!=typeof a.orderCount&&a.orderCount>0){var n=a.htmlStr||"",s=a.orderCount>3?"block":"none";n+='<li style="display:'+s+';"><span id="viewMore">• • •</span></li>',t.find("#"+i).text(a.orderCount),r.css("height","auto").html(n)}else{var l='<div class="home-none" style="height: 240px;"><i class="none-product-order"></i>暂时没有相关订单</div>';r.css("height","auto").html(l)}else o.showErrorTpl("#orderlist",function(){e.requestOrder()})})},favoriteOrder:function(){var e=this,t=e.elsBox.favoriteCan;o.showLocalLoading("#favoritelist");var r={QueryList:[{BizType:"All",ProductType:"All"}],SortBy:"CreateTime",SortType:0,StartOffset:1,ReturnCount:4};o.filterfavoriteData(r,function(r){if(r&&0===r.resultCode){var i=r.htmlStr||"",a='<div class="home-none" style="height: 240px;"><i class="none-product-favorite"></i>暂时没有相关产品</div>';i&&t.css("height","auto").html(i),!i&&t.css("height","auto").html(a)}else o.showErrorTpl("#favoritelist",function(){e.favoriteOrder()})})},promocodeJump:function(){var e="";if(e=location.host.match(/^(localhost|172\.16|127\.0)/i)||location.host.match(/^waptest\.ctrip|^210\.13\.100\.191|fat\d*\.qa\.nt\.ctripcorp\.com/i)?"https://smarket.fat21.qa.nt.ctripcorp.com/webapp/promocode/#index":location.host.match(/^m\.uat\.qa\.nt\.ctripcorp\.com/i)?"https://smarket.uat.qa.nt.ctripcorp.com/webapp/promocode/#index":"https://smarket.ctrip.com/webapp/promocode/#index",this.isInApp)Lizard.jump("/webapp/promocode/index.html#index?"+this.frompageurl,{targetModel:4});else{var t=JSON.parse(localStorage.getItem("USERINFO"));if(t&&t.data&&t.data.Auth){var r={auth:t.data.Auth};window.location.href=e+(e.indexOf("?")>0?"&":"?")+"token="+encodeURIComponent(n.Base64.encode(JSON.stringify(r)))}else this.loginJump()}},walletJump:function(){var e="",t="";location.host.match(/^m\.fat\d*\.qa\.nt\.ctripcorp\.com|^210\.13\.100\.191/i)?(e="https://secure.fws.qa.nt.ctripcorp.com/webapp/wallet/index.html",t="http://m.fat19.qa.nt.ctripcorp.com/webapp/myctrip/"):location.host.match(/^m\.uat\.qa\.nt\.ctripcorp\.com/i)?(e="https://secure.uat.qa.nt.ctripcorp.com/webapp/wallet/index.html",t="http://m.uat.qa.nt.ctripcorp.com/webapp/myctrip/"):(e="https://secure.ctrip.com/webapp/wallet/index.html",t="http://m.ctrip.com/webapp/myctrip/");var r={from:t,eback:t};this.isInApp?Lizard.jump("/webapp/wallet/index.html",{targetModel:4}):(e=e+"#index?token="+encodeURIComponent(n.Base64.encode(JSON.stringify(r))),window.location.href=e)}});return l});