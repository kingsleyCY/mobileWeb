webpackJsonp([8],{"+qiL":function(e,t){},"0iPh":function(e,t){e.exports=jQuery},"1lyH":function(e,t,n){"use strict";var o=n("AA3o"),a=n.n(o),s=n("xSur"),i=n.n(s),r=n("DVuL"),c=(n.n(r),function(){function e(){a()(this,e)}return i()(e,[{key:"timestampToTime",value:function(e){var t=new Date(Number(e)),n=t.getFullYear()+"-",o=(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-",a=t.getDate()+" ",s=t.getHours();s=Number(s)<10?"0"+s:s;var i=t.getMinutes();i=Number(i)<10?"0"+i:i;t.getSeconds();return n+o+a+s+":"+i}},{key:"createRandom",value:function(){var e=["a","b","c","d","e","f","g","h","e","j","k","l","m","n","o","p","q","r","s","t","w","v","u","x","y","z"],t=Math.floor(26*Math.random()+1),n=Math.floor(26*Math.random()+1);return(1e7*Math.random()).toString(16).substr(0,5)+(e[t]?e[t]:"-")+(new Date).getTime().toString().substr(0,10)+(e[n]?e[n]:"-")+Math.random().toString().substr(2,7)}},{key:"shoeMessege",value:function(e,t){Object(r.Message)({message:t,type:e})}}]),e}());t.a=c},IazO:function(e,t,n){(function(e){var t;(t=e).fn.extend({insertContent:function(e,n){var o=t(this)[0];if(document.selection){this.focus();var a=document.selection.createRange();a.text=e,this.focus(),a.moveStart("character",-i);var s=a.text.length;if(2==arguments.length){var i=o.value.length;a.moveEnd("character",s+n),n<=0?a.moveStart("character",s-2*n-e.length):a.moveStart("character",s-n-e.length),a.select()}}else if(o.selectionStart||"0"==o.selectionStart){var r=o.selectionStart,c=o.selectionEnd,l=o.scrollTop;o.value=o.value.substring(0,r)+e+o.value.substring(c,o.value.length),this.focus(),o.selectionStart=r+e.length,o.selectionEnd=r+e.length,o.scrollTop=l,2==arguments.length&&(o.setSelectionRange(r-n,o.selectionEnd+n),this.focus())}else this.value+=e,this.focus()}})}).call(t,n("0iPh"))},IcnI:function(e,t,n){"use strict";var o=n("rVsN"),a=n.n(o),s=n("l/JR"),i={state:{allClient:!1,isPc:null,loginModel:!1,loginCodeModel:!1,loginCodeObj:{},userModel:!1,xsScreen:null,env:Object({NODE_ENV:"production",BASE_API:"https://lionynn.cn",STATICS_API:"https://lionynn.cn",BASE_URL:"http://lioncc.cn"})},mutations:{changeAllClient:function(e,t){e.allClient=t},changeLoginModel:function(e,t){e.loginModel=t},changeLoginCodeModel:function(e,t){e.loginCodeModel=!!t.modelFlag&&t.modelFlag,e.loginCodeObj=t.loginCodeObj?t.loginCodeObj:{}},changeUserModel:function(e,t){e.userModel=t}},actions:{getAssesionToken:function(e,t){e.commit;return new a.a(function(e,n){s.a.post("/apis/api/wx/getAccessToken",t).then(function(t){e(t)}).then(function(e){n(e)})})}}},r=n("3cXf"),c=n.n(r),l=new(n("1lyH").a),u={state:{username:null,usereamil:null,avtor:null,sex:null,root:null},mutations:{SET_USERINFO:function(e,t){e[t[0]]=t[1]},REMOVE_USERINFO:function(e){e.username=null,e.usereamil=null,e.avtor=null,e.sex=null,e.root=null}},actions:{login:function(e,t){var n=e.commit;return new a.a(function(e,o){s.a.post("/apis/api/status/login",t).then(function(o){1==o.code?(localStorage.setItem("sessionid",o.date.sessionid),localStorage.setItem("userInfo",c()(o.date.userInfo)),n("SET_USERINFO",["username",o.date.userInfo.username]),n("SET_USERINFO",["useremail",o.date.userInfo.useremail]),n("SET_USERINFO",["avtor",o.date.userInfo.avtor]),n("SET_USERINFO",["sex",o.date.userInfo.sex]),n("SET_USERINFO",["root",o.date.userInfo.root]),l.shoeMessege("success","登录成功，welcome "+t.username),n("changeLoginModel",!1),n("changeLoginCodeModel",!1),e(o)):(localStorage.setItem("sessionid",""),e(o))}).catch(function(e){o(e)})})},codeLogin:function(e,t){e.commit;return new a.a(function(e,n){s.a.post("/apis/api/status/codeLogin",t).then(function(t){e(t)}).catch(function(e){n(e)})})},clientLogin:function(e,t){var n=e.commit;return new a.a(function(e,o){s.a.post("/apis/api/status/loginByServer",t).then(function(o){1==o.code?(localStorage.setItem("sessionid",o.date.sessionid),localStorage.setItem("userInfo",c()(o.date.userInfo)),n("SET_USERINFO",["username",o.date.userInfo.username]),n("SET_USERINFO",["useremail",o.date.userInfo.useremail]),n("SET_USERINFO",["avtor",o.date.userInfo.avtor]),n("SET_USERINFO",["sex",o.date.userInfo.sex]),n("SET_USERINFO",["root",o.date.userInfo.root]),l.shoeMessege("success","登录成功，welcome "+t.username),n("changeLoginModel",!1),n("changeLoginCodeModel",!1),e(o)):(localStorage.setItem("sessionid",""),e(o))}).catch(function(e){o(e)})})},layout:function(e,t){e.commit;s.a.post("/apis/api/status/layout",t).then(function(e){1==e.code&&(localStorage.setItem("sessionid",""),localStorage.setItem("userInfo",""))})},clear_session:function(e){var t=e.commit;localStorage.setItem("sessionid",""),localStorage.setItem("userInfo",""),t("REMOVE_USERINFO")}}},h=new Vuex.Store({modules:{baseStates:i,userInfor:u}});t.a=h},LudK:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("lRwf"),a=n.n(o),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("C7Lr")({name:"App"},s,!1,function(e){n("LudK")},null,null).exports,r=new VueRouter({mode:"history",routes:[{path:"/",name:"index",component:function(e){return Promise.all([n.e(0),n.e(1)]).then(function(){var t=[n("YPWR")];e.apply(null,t)}.bind(this)).catch(n.oe)},redirect:"/indexPage",children:[{path:"indexPage",name:"index-page",component:function(e){return Promise.all([n.e(0),n.e(3)]).then(function(){var t=[n("FUbX")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"forOurs",name:"for-ours",component:function(e){return n.e(6).then(function(){var t=[n("Fp9I")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"someNote",name:"some-note",component:function(e){return Promise.all([n.e(0),n.e(2)]).then(function(){var t=[n("GHKu")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"myIntroduce",name:"my-introduce",component:function(e){return Promise.all([n.e(0),n.e(5)]).then(function(){var t=[n("JhQo")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"messTome",name:"mess-tome",component:function(e){return Promise.all([n.e(0),n.e(4)]).then(function(){var t=[n("6oLF")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}]}),c=n("IcnI"),l=(n("D0oh"),n("JAS+")),u=n.n(l),h=n("DVuL"),d=n.n(h),f=(n("+qiL"),n("1lyH")),m=n("mtg+"),g=n.n(m);a.a.use(u.a),a.a.use(d.a),a.a.prototype.common=new f.a,n("IazO"),n("e2VL"),a.a.config.productionTip=!1,a.a.use(new g.a({debug:!0,connection:"http://139.196.127.127:8806"})),a.a.prototype.BASE_URL="https://lionynn.cn",r.beforeEach(function(e,t,n){var o=void 0;navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)?c.a.state.baseStates.isPc=!1:(o=!0,c.a.state.baseStates.isPc=!0),document.body.clientWidth<768?c.a.state.baseStates.xsScreen=!0:c.a.state.baseStates.xsScreen=!1,[].indexOf(e.fullPath)>=0&&o?c.a.state.baseStates.allClient=!0:c.a.state.baseStates.allClient=!1,n()}),new a.a({el:"#app",router:r,store:c.a,components:{App:i},template:"<App/>"})},e2VL:function(e,t,n){(function(e,t){var n=new Array,o=new Array,a=new function(){this._hash=new Object,this.put=function(e,t){return void 0!==e&&0==this.containsKey(e)&&(this._hash[e]=void 0===t?null:t,!0)},this.remove=function(e){delete this._hash[e]},this.size=function(){var e=0;for(var t in this._hash)e++;return e},this.get=function(e){return this._hash[e]},this.containsKey=function(e){return void 0!==this._hash[e]},this.clear=function(){for(var e in this._hash)delete this._hash[e]}};e(function(){e.ajax({dataType:"jsonp",url:"https://api.weibo.com/2/emotions.json?source=1362404091",success:function(e){var t=e.data;for(var s in t)""==t[s].category&&(t[s].category="默认"),void 0==n[t[s].category]&&(n[t[s].category]=new Array,o.push(t[s].category)),n[t[s].category].push({name:t[s].phrase,icon:t[s].icon}),a.put(t[s].phrase,t[s].icon)}})}),function(e){e.fn.SinaEmotion=function(t){var a,s;function i(){var t=arguments[0]?arguments[0]:0;if(!(t<0||t>=o.length/6)){e("#emotions .categorys").html(""),s=t;for(var n=6*t;n<6*(t+1)&&n<o.length;++n)e("#emotions .categorys").append(e('<a href="javascript:void(0);">'+o[n]+"</a>"));e("#emotions .categorys a").click(function(){r(e(this).text())}),e("#emotions .categorys a").each(function(){e(this).text()==a&&e(this).addClass("current")})}}function r(){var o=arguments[0]?arguments[0]:"默认";arguments[1]&&arguments[1];e("#emotions .container").html(""),a=o;for(var s=0;s<n[o].length;++s)e("#emotions .container").append(e('<a href="javascript:void(0);" title="'+n[o][s].name+'"><img src="'+n[o][s].icon+'" alt="'+n[o][s].name+'" width="22" height="22" /></a>'));e("#emotions .container a").click(function(){t.insertText(e(this).attr("title"))}),e("#emotions .categorys a.current").removeClass("current"),e("#emotions .categorys a").each(function(){e(this).text()==o&&e(this).addClass("current")})}e(this).click(function(n){n.stopPropagation();var o=t.offset().top+t.height()+15,a=t.offset().left-1;if(e("#emotions .categorys")[0])return e("#emotions").css({top:o,left:a}),void e("#emotions").toggle();e("body").width()<768?e("body").append('<div id="emotions" class="xs-screen"></div>'):e("body").append('<div id="emotions"></div>'),e("#emotions").css({top:o,left:a}),e("#emotions").html("<div>正在加载，请稍候...</div>"),e("#emotions").click(function(e){e.stopPropagation()}),e("#emotions").html('<div style="display: none"><a href="javascript:void(0);" id="prev">&laquo;</a><a href="javascript:void(0);" id="next">&raquo;</a></div><div class="categorys"></div><div class="container scrollBar"></div>'),e("#emotions #prev").click(function(){i(s-1)}),e("#emotions #next").click(function(){i(s+1)}),i(),r()}),e("body").click(function(){e("#emotions").remove()}),e.fn.insertText=function(e){return this.each(function(){if("INPUT"===this.tagName||"TEXTAREA"===this.tagName)if(document.selection){this.focus();var t=document.selection.createRange();t.text=e,t.collapse(),t.select()}else if(this.selectionStart||"0"==this.selectionStart){var n=this.selectionStart,o=this.selectionEnd;this.value=this.value.substring(0,n)+e+this.value.substring(o,this.value.length),this.selectionStart=this.selectionEnd=n+e.length}else this.value+=e}),this}},e.extend({AnalyticEmotion:function(e){if(void 0!==e){var t=e.match(/\[.*?\]/g);if(null!=t&&""!=t)for(var n=0;n<t.length;n++)if(a.containsKey(t[n])){var o='<img src="'+a.get(t[n])+'" height="22" width="22" />';e=e.replace(t[n],o)}}return e}})}(t)}).call(t,n("0iPh"),n("0iPh"))},"l/JR":function(e,t,n){"use strict";var o=n("rVsN"),a=n.n(o),s=n("IcnI"),i=n("DVuL");n.n(i);if(axios){var r=axios.create({baseURL:"https://lionynn.cn",timeout:15e3});r.interceptors.request.use(function(e){e.withCredentials=!0;var t=localStorage.getItem("sessionid");return e.headers.sessionid=t||"",e},function(e){return a.a.reject(e)}),r.interceptors.response.use(function(e){return 1==e.data.code?e.data:0==e.data.code?e.data:1e4==e.data.code?(Object(i.Message)({message:e.data.mess,type:"warning"}),e.data):100001==e.data.code?(Object(i.Message)({message:"登录过期，请重新登录",type:"warning"}),s.a.dispatch("clear_session"),e.data):10001==e.data.code?(Object(i.Message)({message:"您还未绑定微信，请扫码绑定微信",type:"warning"}),e.data):void 0},function(e){return a.a.reject(e)})}t.a=r},lRwf:function(e,t){e.exports=Vue}},["NHnr"]);
//# sourceMappingURL=app.b627ac7ab3ef55e64aa2.js.map