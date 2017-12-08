// JavaScript Document
var url = window.location.href;
var projectName = url.substr(0, url.indexOf('/resource'));
console.log(projectName);
var app = new Vue({
    el: '#app',
    data: {
        numBe: '50%',
        numAf: '50%',
        openid: null
    },
    created() {
        var _this = this;
        this.init();
    },
    methods: {
        getOpenid: function () {
            var _this = this;
            var code = $.util.getParameter("code");

            $.ajax({
                type: "POST",
                async: false, // 设置同步方式
                cache: false,
                url: WxShare.serverHost + "api/WxOpen/getOpenidByCode.json",
                data: {
                    "code": code
                },
                success: function (result) {
                    var data = eval("(" + result + ")");

                    if (data.status == true || data.status == "true") {
                        _this.openid = data.data;
                    } else {
                        WxShare.authBase();
                        return null;
                    }
                },
                error: function () {
                    return null;
                }
            });
        },
        init: function () {
            var _this = this;
            _this.getOpenid();
            $.ajax({
                type: 'POST',
                url: projectName + '/upvote/phone/Upvote/getAmount.json',
                dataType: 'json',
                success: function (result) {
                    if (result.status === 'true' || result.status === true) {
                        var total = result.data.type_1 + result.data.type_2;
                        app.numBe = parseInt(result.data.type_1 / total * 100) + '%';
                        app.numAf = (100 - parseInt(result.data.type_1 / total * 100)) + '%';
                    } else {
                        alert(result.msg);
                    }
                },
                error: function (e, msg) {
                    console.error(JSON.stringify(e) + ' - ' + msg);
                    return false;
                }
            });
        },
        clickBefore: function () {
            var _this = this;
            $.ajax({
                type: 'POST',
                url: projectName + '/upvote/phone/Upvote/like.json',
                dataType: 'json',
                data: {
                    openid: _this.openid,
                    type: 1
                },
                success: function (result) {
                    if (result.msg == 'openid参数缺失，请重新授权登录') {
                        $(".prop .p1").html('亲,你的网络不太稳定,<br>请刷新页面,重新尝试!');
                    } else if (result.msg == '支持对象参数缺失') {
                        $(".prop .p1").html('亲,你的网络不太稳定,<br>请刷新页面,重新尝试!');
                    } else {
                        $(".prop .p1").html(result.msg);
                    }
                    $(".prop").fadeIn();
                    /*alert(result.msg);*/
                    if (result.status === 'true' || result.status === true) {
                        var total = result.data.type_1 + result.data.type_2;
                        app.numBe = parseInt(result.data.type_1 / total * 100) + '%';
                        app.numAf = (100 - parseInt(result.data.type_1 / total * 100)) + '%';
                    }
                },
                error: function (e, msg) {
                    console.error(JSON.stringify(e) + ' - ' + msg);
                    return false;
                }
            });
        },
        clickAfter: function () {
            var _this = this;
            $.ajax({
                type: 'POST',
                url: projectName + '/upvote/phone/Upvote/like.json',
                dataType: 'json',
                data: {
                    openid: _this.openid,
                    type: 2
                },
                success: function (result) {
                    if (result.msg == 'openid参数缺失，请重新授权登录') {
                        $(".prop .p1").html('亲,你的网络不太稳定,<br>请刷新页面,重新尝试!');
                    } else if (result.msg == '支持对象参数缺失') {
                        $(".prop .p1").html('亲,你的网络不太稳定,<br>请刷新页面,重新尝试!');
                    } else {
                        $(".prop .p1").html(result.msg);
                    }
                    $(".prop").fadeIn();
                    /*alert(result.msg);*/
                    if (result.status === 'true' || result.status === true) {
                        var total = result.data.type_1 + result.data.type_2;
                        app.numBe = parseInt(result.data.type_1 / total * 100) + '%';
                        app.numAf = (100 - parseInt(result.data.type_1 / total * 100)) + '%';
                    }
                },
                error: function (e, msg) {
                    console.error(JSON.stringify(e) + ' - ' + msg);
                    return false;
                }
            });
        }
    }
});
$(function () {
    var video = new tvp.VideoInfo();
    video.setVid("c05224cxxyn");
    var player = new tvp.Player('100%', '100%');
    player.setCurVideo(video);
    player.addParam("adplay", "0");
    player.addParam("player", "html5");
    player.addParam("pic", "img/img1.jpg");
    player.write("videoBox");
    setTimeout(function () {
        $('video').attr('x5-video-player-type', 'h5');
        $('video').attr('x5-video-player-fullscreen', 'true');
        $('video').attr('id', 'video');
        var v = document.getElementById('video');
        v.addEventListener("x5videoexitfullscreen", function () {
            $('body').removeClass('fullscreen');
            $('.close').hide();
        });
        v.addEventListener("x5videoenterfullscreen", function () {
            $('body').addClass('fullscreen');
            $('.close').show();
        });
    }, 500);

    $('.close').click(function () {
        $('body').removeClass('fullscreen');
        var d = new Date();
        window.location.href = projectName + '/resource/gulp-demo/dist/index.html?' + d.getTime();
    });

    var winH = $(window).height();
    var ff = parseFloat(document.documentElement.style.fontSize);
    var dw = 100 / ff;
    if (winH < (1030 / dw)) {
        var s = winH / (1030 / dw);
        $(".main").css({
            "transform": "scale(" + s + ")",
            "-webkit-transform": "scale(" + s + ")"
        });
    } else {
        $(".main").css({
            "transform": "scale(1)",
            "-webkit-transform": "scale(1)"
        });
    }
    $("body").height(winH);
    $('.play').click(function () {
        video.play();
        $('.video .play').hide();
        $('#video').attr('controls', true);
    });
    $(".prop .btn").click(function () {
        $(this).parents(".prop").fadeOut();
    });
});
var shareparams = {
    'title': '谁是OPPO拍照KING？',
    'link': projectName + '/resource/gulp-demo/dist/index.html',
    'imgUrl': 'http://opponplusgroup.oss-cn-hangzhou.aliyuncs.com/upvote/img/share2.jpg',
    'desc': '前置2000万还是后置2000万？'
};
WxShare.initConfig(shareparams);