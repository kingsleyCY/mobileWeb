webpackJsonp([6],{"+qiL":function(e,n){},"1nSg":function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t("rVsN"),a=t.n(o),r=t("IvJb"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var u=t("C7Lr")({name:"App"},i,!1,function(e){t("vCsh")},null,null).exports,s=t("zO6J");r.default.use(s.a);var l=new s.a({routes:[{path:"/",name:"index",component:function(){return t.e(0).then(t.bind(null,"YPWR"))},children:[{path:"indexPage",name:"index-page",component:function(){return t.e(3).then(t.bind(null,"FUbX"))}},{path:"forOurs",name:"for-ours",component:function(){return t.e(4).then(t.bind(null,"Fp9I"))}},{path:"someNote",name:"some-note",component:function(){return t.e(1).then(t.bind(null,"GHKu"))}},{path:"myIntroduce",name:"my-introduce",component:function(){return t.e(2).then(t.bind(null,"JhQo"))}}]}]}),c=(t("D0oh"),t("fu2u"),t("aozt")),p=t.n(c),f=t("srH3"),d=t.n(f),h=(t("1nSg"),t("OIlf"),t("wiGe"),t("+qiL"),t("9rMa")),m={state:{allClient:!1},mutations:{changeAllClient:function(e,n){e.allClient=n}},actions:{}},b={state:{},mutations:{},actions:{}};r.default.use(h.a);var v=new h.a.Store({modules:{baseStates:m,userInfor:b}});r.default.config.productionTip=!1,r.default.use(d.a),p.a.interceptors.response.use(function(e){return e.data},function(e){return a.a.reject(e)}),r.default.prototype.$http=p.a,l.beforeEach(function(e,n,t){if(!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))var o=!0;[].indexOf(e.fullPath)>=0&&o?v.state.baseStates.allClient=!0:v.state.baseStates.allClient=!1,t()}),new r.default({el:"#app",router:l,store:v,components:{App:u},template:"<App/>"})},OIlf:function(e,n){},vCsh:function(e,n){},wiGe:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.b8447827c9f6b28aac1e.js.map