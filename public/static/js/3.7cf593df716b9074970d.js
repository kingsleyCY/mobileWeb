webpackJsonp([3],{9150:function(t,s){},FUbX:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i={name:"index-page",data:function(){return{dynamicList:[]}},created:function(){var t=this;this.$http.get("http://lionynn.cn/apis/api/article/all").then(function(s){console.log(s),t.dynamicList=s.data})}},l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("div",{staticClass:"container padding10"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{xs:24,sm:16}},[a("div",{staticClass:"item-model"},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"title"},[t._v("相关动态")])]),t._v(" "),a("div",[a("ul",t._l(t.dynamicList,function(s,i){return a("li",{key:i,staticClass:"dynamic-item"},[a("div",{staticClass:"left-base"},[a("img",{attrs:{src:s.avtar?s.avtar:"https://lionynn.cn/images/defaultAvtor.jpg",alt:"用户头像"}}),t._v(" "),a("p",[a("span",[t._v(t._s(s.article_info.comment_num))]),t._v(" /\n                      "),a("span",[t._v(t._s(s.article_info.look_num))])])]),t._v(" "),a("div",{staticClass:"article-con"},[a("p",{staticClass:"article-title"},[t._v(t._s(s.title))]),t._v(" "),a("p",{staticClass:"article-content"},[t._v(t._s(s.content))])]),t._v(" "),a("div",{staticClass:"other-mess"},[a("p",[t._v(t._s(s.user_info.username))]),t._v(" "),a("p",[t._v(t._s(s.created_time))])])])}))])])],1)]),t._v(" "),a("el-col",{attrs:{xs:24,sm:8}},[a("div",{staticClass:"item-model",staticStyle:{"background-color":"#F6F6F6"}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"title"},[t._v("关注小程序")])]),t._v(" "),a("div",{staticClass:"public-notice my-smallprogram"},[a("img",{attrs:{src:"https://lionynn.cn/images/smallProgram.jpg",alt:""}}),t._v(" "),a("div",{staticClass:"smallgrogram-introduce"},[a("p",[t._v("ID：四季豆花")]),t._v(" "),a("p",[t._v("个人网站关联的小程序，记录family的点点滴滴。"),a("br"),a("br"),t._v("不忘丶始终")])])])]),t._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"title"},[t._v("消息")])]),t._v(" "),a("div",{staticClass:"public-notice"},[t._v("\n              网站以后会在每两周的星期天晚上12:00更新迭代，希望大家多多支持。"),a("br"),t._v(" "),a("p",{staticClass:"update-time"},[t._v("下次更新：2018-09-30")])])]),t._v(" "),a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",{staticClass:"title"},[t._v("社交")])]),t._v(" "),a("div",{staticClass:"public-notice social-content"},[a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[t._v("GitHub")]),t._v(" "),a("div",{staticClass:"social-contact"},[a("a",{attrs:{href:"https://github.com/Stur-Lion",target:"_blank"}},[a("img",{attrs:{src:"https://lionynn.cn/images/github.jpg",alt:""}})])])]),t._v(" "),a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("img",{attrs:{src:"https://lionynn.cn/images/qq-qr.png",alt:""}})]),t._v(" "),a("div",{staticClass:"social-contact"},[a("img",{attrs:{src:"https://lionynn.cn/images/qq.jpg",alt:""}})])]),t._v(" "),a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("img",{attrs:{src:"https://lionynn.cn/images/weibo-qr.jpg",alt:""}})]),t._v(" "),a("div",{staticClass:"social-contact"},[a("img",{attrs:{src:"https://lionynn.cn/images/weibo.jpg",alt:""}})])]),t._v(" "),a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("img",{attrs:{src:"https://lionynn.cn/images/weixin-qr.jpg",alt:""}})]),t._v(" "),a("div",{staticClass:"social-contact"},[a("img",{attrs:{src:"https://lionynn.cn/images/weixin.jpg",alt:""}})])])],1)])],1)])],1)],1)])},staticRenderFns:[]};var e=a("C7Lr")(i,l,!1,function(t){a("9150")},"data-v-10297e4c",null);s.default=e.exports}});
//# sourceMappingURL=3.7cf593df716b9074970d.js.map