webpackJsonp([7],{"+qiL":function(e,n){},"1nSg":function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("rVsN"),o=t.n(a),r=t("IvJb"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var u=t("C7Lr")({name:"App"},i,!1,function(e){t("NMvz")},null,null).exports,s=t("zO6J");r.default.use(s.a);var l=new s.a({routes:[{path:"/",name:"index",component:function(){return t.e(1).then(t.bind(null,"YPWR"))},redirect:"/indexPage",children:[{path:"indexPage",name:"index-page",component:function(){return t.e(0).then(t.bind(null,"FUbX"))}},{path:"forOurs",name:"for-ours",component:function(){return t.e(5).then(t.bind(null,"Fp9I"))}},{path:"someNote",name:"some-note",component:function(){return t.e(4).then(t.bind(null,"GHKu"))}},{path:"myIntroduce",name:"my-introduce",component:function(){return t.e(2).then(t.bind(null,"JhQo"))}},{path:"messTome",name:"mess-tome",component:function(){return t.e(3).then(t.bind(null,"6oLF"))}}]}]}),c=(t("D0oh"),t("fu2u"),t("aozt")),d=t.n(c),p=t("srH3"),f=t.n(p),m=(t("1nSg"),t("OIlf"),t("wiGe"),t("+qiL"),t("9rMa")),h={state:{allClient:!1},mutations:{changeAllClient:function(e,n){e.allClient=n}},actions:{}},b={state:{},mutations:{},actions:{}};r.default.use(m.a);var v=new m.a.Store({modules:{baseStates:h,userInfor:b}});r.default.config.productionTip=!1,r.default.use(f.a),d.a.defaults.baseURL="https://lionynn.cn",d.a.interceptors.response.use(function(e){if(1==e.data.code)return e.data.date;f.a.Message({message:e.data.mess,type:"warning"})},function(e){return o.a.reject(e)}),r.default.prototype.$http=d.a,l.beforeEach(function(e,n,t){if(!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))var a=!0;[].indexOf(e.fullPath)>=0&&a?v.state.baseStates.allClient=!0:v.state.baseStates.allClient=!1,t()}),new r.default({el:"#app",router:l,store:v,components:{App:u},template:"<App/>"})},NMvz:function(e,n){},OIlf:function(e,n){},wiGe:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.e32d2537d1a3ef9146b5.js.map