"use strict";var url=window.location.href,projectName=url.substr(0,url.indexOf("/resource"));console.log(projectName);var app=new Vue({el:"#app",data:{numBe:"50%",numAf:"50%",openid:null},created:function(){this.init()},methods:{getOpenid:function getOpenid(){var _this=this,code=$.util.getParameter("code");$.ajax({type:"POST",async:!1,cache:!1,url:WxShare.serverHost+"api/WxOpen/getOpenidByCode.json",data:{code:code},success:function success(result){var data=eval("("+result+")");if(1!=data.status&&"true"!=data.status)return WxShare.authBase(),null;_this.openid=data.data},error:function(){return null}})},init:function(){this.getOpenid(),$.ajax({type:"POST",url:projectName+"/upvote/phone/Upvote/getAmount.json",dataType:"json",success:function(e){if("true"===e.status||!0===e.status){var t=e.data.type_1+e.data.type_2;app.numBe=parseInt(e.data.type_1/t*100)+"%",app.numAf=100-parseInt(e.data.type_1/t*100)+"%"}else alert(e.msg)},error:function(e,t){return console.error(JSON.stringify(e)+" - "+t),!1}})},clickBefore:function(){$.ajax({type:"POST",url:projectName+"/upvote/phone/Upvote/like.json",dataType:"json",data:{openid:this.openid,type:1},success:function(e){if("openid参数缺失，请重新授权登录"==e.msg?$(".prop .p1").html("亲,你的网络不太稳定,<br>请刷新页面,重新尝试!"):"支持对象参数缺失"==e.msg?$(".prop .p1").html("亲,你的网络不太稳定,<br>请刷新页面,重新尝试!"):$(".prop .p1").html(e.msg),$(".prop").fadeIn(),"true"===e.status||!0===e.status){var t=e.data.type_1+e.data.type_2;app.numBe=parseInt(e.data.type_1/t*100)+"%",app.numAf=100-parseInt(e.data.type_1/t*100)+"%"}},error:function(e,t){return console.error(JSON.stringify(e)+" - "+t),!1}})},clickAfter:function(){$.ajax({type:"POST",url:projectName+"/upvote/phone/Upvote/like.json",dataType:"json",data:{openid:this.openid,type:2},success:function(e){if("openid参数缺失，请重新授权登录"==e.msg?$(".prop .p1").html("亲,你的网络不太稳定,<br>请刷新页面,重新尝试!"):"支持对象参数缺失"==e.msg?$(".prop .p1").html("亲,你的网络不太稳定,<br>请刷新页面,重新尝试!"):$(".prop .p1").html(e.msg),$(".prop").fadeIn(),"true"===e.status||!0===e.status){var t=e.data.type_1+e.data.type_2;app.numBe=parseInt(e.data.type_1/t*100)+"%",app.numAf=100-parseInt(e.data.type_1/t*100)+"%"}},error:function(e,t){return console.error(JSON.stringify(e)+" - "+t),!1}})}}});$(function(){var e=new tvp.VideoInfo;e.setVid("c05224cxxyn");var t=new tvp.Player("100%","100%");t.setCurVideo(e),t.addParam("adplay","0"),t.addParam("player","html5"),t.addParam("pic","img/img1.jpg"),t.write("videoBox"),setTimeout(function(){$("video").attr("x5-video-player-type","h5"),$("video").attr("x5-video-player-fullscreen","true"),$("video").attr("id","video");var e=document.getElementById("video");e.addEventListener("x5videoexitfullscreen",function(){$("body").removeClass("fullscreen"),$(".close").hide()}),e.addEventListener("x5videoenterfullscreen",function(){$("body").addClass("fullscreen"),$(".close").show()})},500),$(".close").click(function(){$("body").removeClass("fullscreen");var e=new Date;window.location.href=projectName+"/resource/gulp-demo/dist/index.html?"+e.getTime()});var a=$(window).height(),r=100/parseFloat(document.documentElement.style.fontSize);if(a<1030/r){var n=a/(1030/r);$(".main").css({transform:"scale("+n+")","-webkit-transform":"scale("+n+")"})}else $(".main").css({transform:"scale(1)","-webkit-transform":"scale(1)"});$("body").height(a),$(".play").click(function(){e.play(),$(".video .play").hide(),$("#video").attr("controls",!0)}),$(".prop .btn").click(function(){$(this).parents(".prop").fadeOut()})});var shareparams={title:"谁是OPPO拍照KING？",link:projectName+"/resource/gulp-demo/dist/index.html",imgUrl:"http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/upvote/img/share2.jpg",desc:"前置2000万还是后置2000万？"};WxShare.initConfig(shareparams);
//# sourceMappingURL=main-18b8381533.js.map
