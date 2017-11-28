/**
 * Created by Gavin on 2017/10/15.
 */
var newsDetailAva = avalon.define({
    $id: "newsDetail",
    newsInfo:{},
    artType:'',
    type:'',
    detailType:''
});
$(function () {
    getNewsDetail();
    var type = getUrlParam('type');
    newsDetailAva.artType = type;
    if(type==1){
        newsDetailAva.type = '集团新闻';
        $('#NavNews').addClass('active');
    }else if(type==2){
        newsDetailAva.type = '项目动态';
        $('#NavNews').addClass('active');
    }else if(type==3){
        newsDetailAva.type = '媒体报道';
        $('#NavNews').addClass('active');
    }else if(type==4){
        $(".crumbs .lo").html('加入我们');
        $(".crumbs .lo").attr("href",'join.html');
        $('#NavJoin').addClass('active');
        newsDetailAva.type = '员工发展';
    }
});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function getNewsDetail() {
    var id = getUrlParam('id');
    console.log(id);
    $.ajax({
        url: hostURL + '/front/getArticleInfo.json',
        type: 'GET',
        data: {
            id: id,
        },
        dataType: 'json',
        success: function (data) {
            var newsDetail = [];
            newsDetail = data.data;
            newsDetail.sort = 'null';
            newsDetailAva.newsInfo = newsDetail;
            newsDetailAva.detailType = newsDetail.type;
            console.log(newsDetailAva.newsInfo)
        },
    });
}