/**
 * Created by Gavin on 2017/10/13.
 */
var lunBo = avalon.define({
    $id: "lunBo",
    banners: ''
});
$(function () {
    getbanners()
});
function getbanners() {
    $.ajax({
        url: hostURL + '/front/getBannerList.json',
        type: 'GET',
        data: {
            type: 1,
        },
        dataType: 'json',
        success: function (data) {
            var swiperData = data.data 
            console.log(swiperData);
            for(var i=0;i<swiperData.length;i++){
                swiperData[i].picUrl = hostURL +'/'+ swiperData[i].picUrl
                swiperData[i].sort = 'null'
                swiperData = swiperData
            }
            lunBo.banners = swiperData
            banSwiper();
        },
    });
}       
function banSwiper(){
    // 轮播图
    var mySwiper = new Swiper ('#lunBo', {
        loop: false,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        speed:600,
        //pagination: '.swiper-pagination',
        onSlideChangeEnd: function(swiper){
          var i=parseInt(swiper.activeIndex+1);
         $("#lunBo .swiperpn span").html(i)
        }
    })
    $(function(){
        var pagen=$(".swiper-slide").size();
        $("#lunBo .swiperpn i").html(pagen);
        $("#lunBo .swiperpn").hover(function(){
            $(this).children("p").show();
            $(this).addClass('on')
        },function(){
            $(this).children("p").hide();
            $(this).removeClass('on')
        })
    })
}
        
var newsh = avalon.define({
    $id: "newsh",
    comNews: ''
});
$(function () {
    getComNews()
});
function getComNews() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 6,
            pagesize: 3,
        },
        dataType: 'json',
        success: function (data) {
            var newsData = data.data 
            console.log(newsData);
            for(var i=0;i<newsData.length;i++){
                newsData[i].picUrl = hostURL +'/'+ newsData[i].picUrl
                newsData = newsData
            }
            newsh.comNews = newsData
            wordSize();
        },
    });
}
var newsh2 = avalon.define({
    $id: "newsh2",
    comNews: ''
});
$(function () {
    getComNews2()
});
function getComNews2() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 7,
            pagesize: 3,
        },
        dataType: 'json',
        success: function (data) {
            var newsData = data.data 
            for(var i=0;i<newsData.length;i++){
                newsData[i].picUrl = hostURL +'/'+ newsData[i].picUrl
                newsData = newsData
            }
            newsh2.comNews = newsData
        },
    });
}
function wordSize(){
    $(".news li").each(function(){
        var maxwidth2=53;
        if($(this).find('.con').text().length>maxwidth2){
            $(this).find('.con').text($(this).find('.con').text().substring(0,maxwidth2));
            $(this).find('.con').html($(this).find('.con').html()+'…');
        }
    });
    setTimeout(function(){
        $('.home-news .news1').find('ul li:gt(0) .img').hide();
        $('.home-news .news1').find('ul li:gt(0) .con').hide();
        $('.home-news .news2').find('ul li:gt(0) .img').hide();
        $('.home-news .news2').find('ul li:gt(0) .con').hide();

        $(".home-news .news1 ul li").hover(function(){
                $(this).find(".img").show().parent("li").siblings("li").find(".img").hide();
                $(this).find(".con").show().parent("li").siblings("li").find(".con").hide();
            },function(){
                 $(this).find(".img").hide()
                 $(this).find(".con").hide()
                 $('.home-news .news1 ul li:first-child').find(".img").show();
                 $('.home-news .news1 ul li:first-child').find(".con").show()
        })
        $(".home-news .news2 ul li").hover(function(){
                $(this).find(".img").show().parent("li").siblings("li").find(".img").hide();
                $(this).find(".con").show().parent("li").siblings("li").find(".con").hide();
            },function(){
                 $(this).find(".img").hide()
                 $(this).find(".con").hide()
                 $('.home-news .news2 ul li:first-child').find(".img").show();
                 $('.home-news .news2 ul li:first-child').find(".con").show()
        })
    },500)
}