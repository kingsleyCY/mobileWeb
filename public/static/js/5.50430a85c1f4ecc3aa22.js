webpackJsonp([5],{"+PoZ":function(t,e,s){"use strict";e.d=function(t){return Object(n.a)({url:"/apis/api/comments/all",method:"POST",data:t})},e.b=function(t){return Object(n.a)({url:"/apis/api/comments/add",method:"POST",data:t})},e.a=function(t){return Object(n.a)({url:"/apis/api/comments/replyComments",method:"POST",data:t})},e.c=function(t){return Object(n.a)({url:"/apis/api/comments/addImprint",method:"POST",data:t})};var n=s("l/JR")},"6oLF":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("4YfN"),i=s.n(n),a=s("DhLG"),r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item-model",staticStyle:{"background-color":"white"}},[s("div",{attrs:{id:"content"}},[s("div",{staticClass:"wrap"},[s("div",{staticClass:"comment clearfix"},[s("div",{staticClass:"head-face"},[t.userInfo?s("img",{attrs:{src:t.userInfo.avtor}}):s("p",{staticClass:"login",on:{click:function(e){return t.changeLoginModel(!0)}}},[t._v("登录")])]),t._v(" "),s("div",{staticClass:"content"},[t._m(0),t._v(" "),s("div",{staticClass:"tools-box"},[t._m(1),t._v(" "),s("div",{staticClass:"submit-btn",on:{click:t.submitMess}})])])])])]),t._v(" "),s("div",{staticClass:"reply-box"},[s("div",{staticClass:"reply-title"},[s("span",[t._v("足迹")]),t._v(" "),s("div",[s("span",[t._v(t._s(t.commentsData.total))]),t._v(" 条留言\n      ")])]),t._v(" "),s("transition",{attrs:{name:"show-box"}},[s("ul",{directives:[{name:"show",rawName:"v-show",value:t.commentsData.list,expression:"commentsData.list"}]},t._l(t.commentsData.list,function(e,n){return s("li",{key:n},[s("div",{ref:"everyComments"+n,refInFor:!0,class:["background-yin",t.screenWidth<768?"xs-screen":""]},t._l(e.yinArr,function(e,n){return s("img",{key:n,attrs:{src:t.computedYin(e.type)}})}),0),t._v(" "),s("div",{ref:"commentDetail"+n,refInFor:!0,staticClass:"base-info clearfix"},[s("img",{attrs:{src:e.userInfo.avtor,alt:""}}),t._v(" "),s("div",{staticClass:"comments-content"},[s("p",[t._v(t._s(e.username))]),t._v(" "),s("p",{domProps:{innerHTML:t._s(e.content)}})]),t._v(" "),s("div",{staticClass:"right-info"},[s("p",{staticClass:"comments-time"},[t._v(t._s(t.common.timestampToTime(e.create_time).slice(5)))]),t._v(" "),s("svg",{staticClass:"iconfont reply-btn",attrs:{"aria-hidden":"true"},on:{click:function(s){return t.replyCommont("comments",e,void 0,"commentDetail"+n)}}},[s("use",{attrs:{"xlink:href":"#icon-huifu"}})]),t._v(" "),e.username!==t.username?s("el-popover",{staticClass:"yin-btn",attrs:{placement:"top",width:"230",trigger:"click"}},[s("div",{ref:"dianyinSelect",refInFor:!0,staticClass:"dianyin-select"},[s("ul",[s("li",{staticClass:"active",on:{click:function(e){return t.selectYin(0,n)}}},[s("img",{attrs:{src:t.dou}})]),t._v(" "),s("li",{on:{click:function(e){return t.selectYin(1,n)}}},[s("img",{attrs:{src:t.geili}})]),t._v(" "),s("li",{on:{click:function(e){return t.selectYin(2,n)}}},[s("img",{attrs:{src:t.pei}})]),t._v(" "),s("li",{on:{click:function(e){return t.selectYin(3,n)}}},[s("img",{attrs:{src:t.penzi}})])]),t._v(" "),s("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(s){return t.addImprint(s,e)}}},[t._v("给他点印\n                  ")])],1),t._v(" "),s("span",{attrs:{slot:"reference"},slot:"reference"},[t._v("印")])]):t._e()],1)]),t._v(" "),e.replyArr?s("div",{staticClass:"reply-list"},[s("ul",t._l(e.replyArr,function(i,a){return s("li",{ref:"comments"+n+a,refInFor:!0,class:[t.username===i.username?"self-reply":""]},[s("span",[t._v(t._s(i.username))]),t._v("\n                "+t._s(e.username==i.reply_username?"评论":"回复")+"\n                "),s("span",[t._v(t._s(i.reply_username))]),t._v("："+t._s(i.content)+"\n                "),s("svg",{staticClass:"iconfont reply-btn",attrs:{"aria-hidden":"true"},on:{click:function(s){return t.replyCommont("reply",e,i,"comments"+n+a)}}},[s("use",{attrs:{"xlink:href":"#icon-huifu"}})])])}),0)]):t._e()])}),0)]),t._v(" "),s("transition",{attrs:{name:"show-box"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!t.commentsData.list,expression:"!commentsData.list"}],staticStyle:{"text-align":"center",color:"#d6d6d6","line-height":"100px"}},[t._v("暂无数据 "),s("i",{staticClass:"el-icon-loading"})])]),t._v(" "),t.commentsData.list&&t.commentsData.list.length<t.commentsData.total?s("div",{staticClass:"loading-more",on:{click:t.loadingMore}},[t._v("查看更多\n      "),t.isGetList?s("i",{staticClass:"el-icon-loading"}):s("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-xiangxia"}})])]):t._e()],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cont-box"},[e("textarea",{staticClass:"text scrollBar",attrs:{placeholder:"来说两句吧...",maxlength:"250"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"operator-box-btn"},[e("span",{staticClass:"face-icon"},[this._v("☺")])])}]};var o=function(t){s("xBBp")},c=s("C7Lr")(a.a,r,!1,o,"data-v-546d46cc",null).exports,l=s("M9A7"),m=s("2bvH"),u={name:"mess-tome",data:function(){return{screenWidth:document.body.clientWidth,friendLink:[{name:"源泉-79px",link:"https://79px.com",des:"一位技术大佬，老同事"},{name:"技术胖-JSpang",link:"http://jspang.com/",des:"学习网站，很多博主录得学习视频"}],userInfo:null,commentsData:{list:null,page:1,pre_page:20,total:0}}},mounted:function(){this.getVuexData()},methods:i()({getVuexData:function(){if(localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))){var t=JSON.parse(localStorage.getItem("userInfo"));this.userInfo=t}else this.userInfo=null},layoutSubmit:function(){var t=this;Object(l.a)().then(function(e){t.$message.success("注销成功"),localStorage.removeItem("sessionid"),localStorage.removeItem("userInfo"),t.userInfo=null,t.REMOVE_USERINFO()})},saveClicked:function(){var t=this.$refs.vueavatar.getImageScaled();this.$refs.image.src=t.toDataURL()},openUserDetail:function(){this.$router.push("/selfDetail")}},Object(m.a)(["changeLoginModel","REMOVE_USERINFO","changeUserModel"])),computed:i()({},Object(m.b)({username:function(t){return t.userInfor.username},useremail:function(t){return t.userInfor.useremail},userModel:function(t){return t.baseStates.userModel}})),watch:{username:function(t,e){this.getVuexData()}},components:{commontsList:c}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"blog-message"},[s("div",{staticClass:"container"},[s("el-row",{attrs:{gutter:20}},[s("el-col",{attrs:{xs:24,sm:16}},[s("commonts-list")],1),t._v(" "),s("el-col",{attrs:{xs:24,sm:8}},[s("div",{staticClass:"item-model"},[s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",{staticClass:"title"},[t._v("个人信息")]),t._v(" "),t.userInfo?s("el-button",{staticStyle:{padding:"0",float:"right"},attrs:{type:"text"},on:{click:t.layoutSubmit}},[t._v("退出\n              ")]):t._e()],1),t._v(" "),t.userInfo?s("div",{staticClass:"public-notice"},[s("div",{staticClass:"user-infor"},[s("img",{attrs:{src:t.userInfo.avtor}}),t._v(" "),s("div",[s("span",{staticClass:"user-name"},[t._v("\n                    "+t._s(t.userInfo.username.slice(0,10)+(t.userInfo.username.length>10?"...":""))+"\n                  ")]),t._v(" "),1==t.userInfo.sex?s("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-nvsheng"}})]):2==t.userInfo.sex?s("svg",{staticClass:"iconfont",attrs:{"aria-hidden":"true"}},[s("use",{attrs:{"xlink:href":"#icon-nansheng"}})]):t._e(),t._v(" "),s("div",{staticStyle:{padding:"5px 0","box-sizing":"border-box"}},[s("span",[t._v(t._s(t.useremail.slice(0,6))+"***"+t._s(t.useremail.slice(t.useremail.indexOf("@"))))])])])]),t._v(" "),s("div",{staticStyle:{"font-style":"italic","padding-top":"10px"}},[t._v('\n                "这个人很懒，什么都没有留下"\n              ')])]):s("div",{staticClass:"public-notice"},[t._v("\n              暂未登陆\n            ")])]),t._v(" "),s("el-card",{staticClass:"box-card"},[s("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[s("span",{staticClass:"title"},[t._v("友链")])]),t._v(" "),s("div",{staticClass:"public-notice"},[s("ul",t._l(t.friendLink,function(e,n){return s("li",{key:n},[s("a",{attrs:{href:e.link,target:"_blank"}},[t._v(t._s(e.name))]),t._v(" "),s("span",{staticClass:"link-desciption"},[t._v("("+t._s(e.des)+")")])])}),0)])])],1)])],1)],1)])},staticRenderFns:[]};var f=s("C7Lr")(u,d,!1,function(t){s("nxxV")},"data-v-0eb7ffec",null);e.default=f.exports},DhLG:function(t,e,s){"use strict";(function(t){var n=s("4YfN"),i=s.n(n),a=s("+PoZ"),r=s("2bvH");e.a={name:"commonts-list",data:function(){return{dou:"https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/dou.png",geili:"https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/geili.png",pei:"https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/pei.png",penzi:"https://lioncc.oss-cn-beijing.aliyuncs.com/base-avtor/penzi.png",screenWidth:document.body.clientWidth,friendLink:[{name:"源泉-79px",link:"https://79px.com",des:"一位技术大佬，老同事"},{name:"技术胖-JSpang",link:"http://jspang.com/",des:"学习网站，很多博主录得学习视频"}],userInfo:null,commentsData:{list:null,page:1,pre_page:20,total:0},messBtn:!1,isGetList:!1,replyObj:{replyText:"",commonts_id:void 0,reply_username:void 0,username:void 0}}},mounted:function(){this.getVuexData(),this.getCommentsList(),t(".face-icon").SinaEmotion(t(".text"))},methods:i()({getVuexData:function(){if(localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"))){var t=JSON.parse(localStorage.getItem("userInfo"));this.userInfo=t}else this.userInfo=null},submitMess:function(){var e=this;if(!this.messBtn){if(!this.username)return void this.changeLoginModel(!0);if(""==t(".text").val())return void this.$message.info("请输入内容");this.messBtn=!0;var s={username:this.username,content:t.AnalyticEmotion(t(".text").val())};Object(a.b)(s).then(function(s){1==s.code&&(e.$message.success(s.mess),t(".text").val(""),e.commentsData.page=1,e.getCommentsList()),e.messBtn=!1}).catch(function(t){e.messBtn=!1})}},getCommentsList:function(){var e=this,s=this;s.isGetList=!0;var n={page:this.commentsData.page,pre_page:this.commentsData.pre_page};Object(a.d)(n).then(function(n){s.isGetList=!1;var i=0;1==e.commentsData.page?e.commentsData.list=n.date.resuletList:(i=e.commentsData.list.length-1,e.commentsData.list=e.commentsData.list.concat(n.date.resuletList)),e.commentsData.total=n.date.commentsInfo.count,e.hideReplyText(),setTimeout(function(){t("#replyTextBox").remove()},500),e.$nextTick(function(){for(var t=i;t<s.commentsData.list.length;t++)if(s.$refs["everyComments"+t]&&s.$refs["everyComments"+t][0].querySelectorAll("img").length>0)for(var e=s.$refs["everyComments"+t][0].querySelectorAll("img"),n=0;n<e.length;n++){var a=.9*s.$refs["everyComments"+t][0].clientWidth-60,r=s.$refs["everyComments"+t][0].clientHeight-30,o=s.commentsData.list[t].yinArr[n].positionData;e[n].style.left=60+o.left*a+"px",e[n].style.top=o.left*r+"px"}})}).catch(function(t){s.isGetList=!1})},loadingMore:function(){++this.commentsData.page,this.getCommentsList()},replyCommont:function(e,s,n,i){var a,r,o;this.username?(n?(a=this.getReplyHtml(n.username,e),r=this.$refs[i][0]?this.$refs[i][0]:this.$refs[i],o=t(r)):(a=this.getReplyHtml(s.username,e),r=this.$refs[i][0]?this.$refs[i][0]:this.$refs[i],o=t(r).children(".comments-content")),t(r).find("#replyTextBox").length<=0?(t("#replyTextBox").remove(),o.append(a),this.replyObj.commonts_id=s.id,this.replyObj.reply_username=n?n.username:s.username,this.replyObj.username=this.username,this.showReplyText()):(this.hideReplyText(),setTimeout(function(){t("#replyTextBox").remove()},500))):this.$message.info("您还未登录")},submitReply:function(){var e=this;if(this.replyObj.replyText=t("#replyText").val(),""!=this.replyObj.replyText){var s={commonts_id:this.replyObj.commonts_id,reply_username:this.replyObj.reply_username,username:this.replyObj.username,content:this.replyObj.replyText};Object(a.a)(s).then(function(t){1==t.code&&(e.$message.success("添加成功"),e.commentsData.page=1,e.getCommentsList())})}else this.$message.info("评论不能为空")},selectYin:function(t,e){(this.$refs.dianyinSelect.length?this.$refs.dianyinSelect[e].querySelectorAll("li"):this.$refs.dianyinSelect.querySelectorAll("li")).forEach(function(e,s){s==t?e.classList.add("active"):e.classList.remove("active")})},addImprint:function(e,s){var n=this;if(this.username){var i=e.path.filter(function(t,e){return"BUTTON"===t.nodeName})[0],r=0;t.each(t(i).prev("ul").children("li"),function(e,s){t(s).hasClass("active")&&(r=t(s).index()+1)});var o={type:r,username:this.username,commentId:s.id,positionData:{left:Math.random(),top:Math.random()}};Object(a.c)(o).then(function(t){1==t.code&&(n.$message.success(t.mess),n.commentsData.page=1,n.getCommentsList())})}else this.$notify({message:"您还未登录",type:"warning"})},computedYin:function(t){switch(t){case 1:return this.dou;case 2:return this.geili;case 3:return this.pei;case 4:return this.penzi}},computedYinPosition:function(t,e){this.$refs["everyComments"+e];return{left:Math.random(),top:Math.random()}},getReplyHtml:function(t,e){var s="";return t&&"reply"==e?s="回复："+t:t&&(s="评论："+t),'<div id="replyTextBox"><input name="replyText" id="replyText" maxlength="150" placeholder="'+s+'"><button class="'+(this.xsScreen?"xs-screen":"")+'">确认</button></div>'},showReplyText:function(){var e=this;t("#replyTextBox").fadeIn(function(){t("#replyTextBox button").off("click").on("click",function(){e.submitReply()})}),t("#replyTextBox").height(30)},hideReplyText:function(){t("#replyTextBox").css("height",0)}},Object(r.a)(["changeLoginModel","REMOVE_USERINFO"])),computed:i()({},Object(r.b)({username:function(t){return t.userInfor.username},xsScreen:function(t){return t.baseStates.xsScreen}})),watch:{username:function(t,e){this.getVuexData()}}}}).call(e,s("0iPh"))},nxxV:function(t,e){},xBBp:function(t,e){}});
//# sourceMappingURL=5.50430a85c1f4ecc3aa22.js.map