define(["cUtilCryptBase64","cPageView","CommonStore","MyCtripStore","cMemberService","indexCommon","myctripCommon"],function(t,e,o,i,n,a,r){var c=i.UnreadMessageNumStore.getInstance(),p=o.UserStore.getInstance(),s=p?p.getUser():null,m=e.extend({pageid:"212051",hpageid:"212051",hasAd:!0,isLogin:!0,fromPageurl:"from="+encodeURIComponent("/webapp/myctrip/"),onHide:function(){$("#headerview")&&$("#headerview").show()},onCreate:function(){this.loginboxfun=_.template(Lizard.T("logintpl"))},events:{"click #returnBack":"returnAction","click #homeMail":"mailAction","click #goLogin":"loginAction","click [data-href]":"nextAction","click #promocodeUrl":"goPromocodeAction","click .goto-wallet":"goWalletAction","click #couponUrl":"goCouponAction"},onShow:function(){var t,e=window.location.hash,o=!1,i=[{old:"#more/index",news:"/webapp/myctrip/more/index"},{old:"#more",news:"/webapp/myctrip/more/index"}];if($.each(i,function(i,n){var a;return(t=e.match(n.old+"(.*)"))?(a=n.news+(t[1]||""),o=!0,n.out?Lizard.jump(a):Lizard.goTo(a),!1):void 0}),!o){var n=this;this.setTitle("携程旅行触屏版-我的携程-m.ctrip.com"),$("#headerview")&&$("#headerview").hide(),n.isLogin=1===r.checkLogin(),n.isLogin?s.isLogin=!0:s={isLogin:!1},this.tplRender(),n.isLogin&&n.loadUserInfo(),n.loadUnreadMessageNum(),navigator.userAgent.match(/CtripLite/i)&&$(".home-i-back").hide();var a=navigator.userAgent,c=a.indexOf("Android")>0&&a.indexOf("CtripLite")>0;c&&window.Util_a&&window.Util_a.showTabBar("3")}},loginAction:function(){n.memberLogin({param:window.location.href})},loadUserInfo:function(){var t=this;a.requestBalanceInfo(function(e){if(e&&e.balanceInfo&&e.avatarUrl){for(var o in e.balanceInfo){var i=e.balanceInfo[o];i="GroupTicketCount"===o&&0===i?"":"Promocode"===o||"GroupTicketCount"===o?i+"张":i,t.$el.find("."+o.toLowerCase()).text(i)}var n=t.$el.find(".member-pic").find("img")[0];n&&(n.onerror=function(){this.src="http://pic.c-ctrip.com/h5/rwd_myctrip/portrain_unlogin.png"},n.src=e.avatarUrl)}})},loadUnreadMessageNum:function(){var t=this;a.requestMessageInfo(function(e){if(e&&e.MessageList.length>0){var o=c.get();(!o||o&&e.MessageList.length>0)&&t.$el.find("#homeMail").append('<span class="unread2"></span>')}})},tplRender:function(){var t=this.loginboxfun(s);this.$el.html(t)},returnAction:function(){var t=Lizard.P("backurl");t&&t.length?(t=t.replace(/javascript|img/gi,"").replace(/\<|\>/g,""),Lizard.jump(decodeURIComponent(t))):Lizard.jump("/html5/")},mailAction:function(){var t=c.get(),e=t?t.count:0;c.set({count:e,hasRead:1}),Lizard.jump("/webapp/message/messagecenter")},goPromocodeAction:function(){var e=location.host,o="";o=e.match(/^(localhost|172\.16|127\.0)/i)||e.match(/^waptest\.ctrip|^210\.13\.100\.191|fat\d*\.qa\.nt\.ctripcorp\.com/i)?"https://smarket.fat21.qa.nt.ctripcorp.com/webapp/promocode/#index":e.match(/^m\.uat\.qa\.nt\.ctripcorp\.com/i)?"https://smarket.uat.qa.nt.ctripcorp.com/webapp/promocode/#index":"https://smarket.ctrip.com/webapp/promocode/#index";var i=JSON.parse(localStorage.getItem("USERINFO"));if(i&&i.data&&i.data.Auth){var n=encodeURIComponent(t.Base64.encode(JSON.stringify({auth:i.data.Auth})));window.location.href=o+"?token="+n}else this.loginAction()},goWalletAction:function(){var e=location.host,o="http://"+e+"/webapp/myctrip/",i="";i=e.match(/^m\.fat\d*\.qa\.nt\.ctripcorp\.com|^210\.13\.100\.191/i)?"https://secure.fws.qa.nt.ctripcorp.com/webapp/wallet/index":e.match(/^m\.uat\.qa\.nt\.ctripcorp\.com/i)?"https://secure.uat.qa.nt.ctripcorp.com/webapp/wallet/index":e.match(/^10\.8\.2\.111/i)||e.match(/^10\.8\.5\.10/i)?"https://10.8.5.10/webapp/wallet/index":"https://secure.ctrip.com/webapp/wallet/index";var n=encodeURIComponent(t.Base64.encode(JSON.stringify({from:o,eback:o})));i+="?token="+n,Lizard.jump(i)},goCouponAction:function(){localStorage.setItem("MYCTRIP_GROUP_MARK",1),Lizard.jump("/webapp/tuan/couponlist?"+this.fromPageurl)},nextAction:function(t){var e=$(t.currentTarget),o=e.data("href");this.isLogin||e.hasClass("aboutctrip")||"nouserlist"===e.attr("id")?o.indexOf("you/")>-1?this.jump(o):(e.hasClass("favorite")&&(o+="?"+this.fromPageurl),Lizard.jump(o)):this.loginAction()}});return m});