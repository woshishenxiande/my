define(["cUtilValidate","cLocalStorage","MyCtripModel","cPageView","cGuiderService","cUIInputClear","myctripCommon"],function(e,t,a,o,n,i,l){var s=a.UnLoginCheckModel.getInstance(),d=a.SendValidateCodeModel.getInstance(),c=a.GetPicValCodeModel.getInstance(),r={},h=!1,u=o.extend({onCreate:function(){this.$el.html(Lizard.T("newunlogin")),r={btnSendCode:this.$el.find("#sendValCode"),phoneBox:this.$el.find("#regphone"),valCode:this.$el.find("#valCode"),picValInput:this.$el.find("#picValidateCode"),ValidateCodePic:this.$el.find("#ValidateCode")},i(r.phoneBox),i(r.picValInput,""),i(r.valCode,"");var e=t.localStorage.oldGet("Unlogin_Mobile");e&&r.phoneBox.val(e)},events:{"click #sendValCode":"sendValCode","click #search":"search","input #picValidateCode":"setable","input #regphone":"setable","click #AnotherImg":"showCode"},setable:function(){var e=r.btnSendCode,t=$.trim(r.picValInput.val()),a=$.trim(r.phoneBox.val()),o=a.length>0?6===t.length:!1;h||(o?e.attr("class","btn02").data("disabled",1):e.attr("class","btn02_disabled").data("disabled",0))},onShow:function(){var e=this;if(!l.isTieYou()){var e=this;this.headerview.set({title:"订单查询",back:!0,view:e,events:{returnHandler:function(){n.apply({callback:function(){Lizard.goTo("/webapp/myctrip/orders/ordertypelist")},hybridCallback:function(){n.backToLastPage()}})},homeHandler:function(){e.jump("/html5/")}}}),this.headerview.show()}this.showCode(),this.counter()},showCode:function(){var e=this,t=6,a=Math.floor(Math.random()*(1e6+1));c.setParam({length:t,sessionid:a}),c.excute(function(e){"object"==typeof e&&(r.ValidateCodePic.data("captcbaid",e.captcbaid||"").attr("src","data:image/png;base64,"+e.imageStr||""),r.picValInput.val(""),r.btnSendCode.data("disabled",0))},function(){e.showToast("验证码获取失败,请重新获取！")},!0,this,function(){e.showToast("验证码获取失败,请重新获取！")})},valite:function(){var t=r.phoneBox.val(),a=$.trim(r.picValInput.val());return $.trim(t).length<=0?(this.showToast("请输入手机号码"),!1):e.isMobile(t)?a.length<=0?(this.showToast("请输入图片验证码"),!1):a.length>0&&a.length<6?(this.showToast("请输入正确的图片验证码"),!1):!0:(this.showToast("手机号码不正确"),!1)},search:function(){var e=this;if(e.valite()){var a=$.trim($("#valCode").val());if(a.length<=0)return this.showToast("请输入6位短信验证码");var o=r.phoneBox.val();s.setParam({MobilePhoneNumber:o,VerifyCode:r.valCode.val()}),s.excute(function(a){if(0!=a.ReturnCode)e.showToast(a.Message);else{t.localStorage.oldSet("unlogininfo",JSON.stringify({token:a.Token,phone:o}));var n=Lizard.P("from");Lizard.jump(n,{targetModel:4})}},function(){e.showToast("网络不给力，请稍后重试")},this,function(){e.showToast("网络不给力，请稍后重试")})}},sendValCode:function(){var e=this,a=r.ValidateCodePic,o=r.picValInput,n=r.btnSendCode.data("disabled");if(n&&e.valite()){var i=a.data("captcbaid"),l=o.val(),s=r.phoneBox.val();t.localStorage.oldSet("Unlogin_Mobile",s),d.setParam({captchaId:i,captchacode:l,mobile:s}),d.excute(function(a){a&&a.ServerCode&&"1"==a.ServerCode?(e.showToast(a.Message||"发送验证码成功"),t.localStorage.oldSet("VERIFYTIMEOUT",(new Date).valueOf()),e.counter()):e.showToast({datamodel:{content:a.Message||"网络不给力，请稍后重试"},hideAction:function(){e.showCode()}})},function(){e.showToast("网络不给力，请稍后重试"),e.showCode()},!0,this,function(){e.showToast("网络不给力，请稍后重试"),e.showCode()})}},counter:function(){var e=this,a=60,o=t.localStorage.oldGet("VERIFYTIMEOUT")||(new Date).valueOf(),n=r.btnSendCode;if(n.attr("class","btn02_disabled").data("disabled",0),t.localStorage.oldGet("VERIFYTIMEOUT")){var i=(new Date).valueOf()-o;if(1e3*a>i){h=!0;var l=a-Math.ceil(i/1e3);resource=setInterval(function(){n.text(l+"秒后重发"),0>=l&&(clearInterval(resource),n.text("发送验证码"),h=!1,e.setable()),l--},1e3)}}}});return u});