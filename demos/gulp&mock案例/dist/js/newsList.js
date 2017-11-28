/**
 * Created by Gavin on 2017/10/15.
 */
var newsListAva = avalon.define({
    $id: "newsList",
    newsListGroup: [],
    newsListSingle: [],
    type: '',
    artType:'',
    page:''
});
$(function () {
    getNewsList(1);
    var type = getUrlParam('type');
    newsListAva.artType = type;
    if (type == 1) {
        newsListAva.type = '集团新闻';
    } else if (type == 2) {
        newsListAva.type = '项目动态';
    } else if (type == 3) {
        newsListAva.type = '媒体报道';
    }

});
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
function getNewsList(offset) {
    var newsType = getUrlParam('newsType');
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: newsType,
            pageSize: 9,
            offset: offset
        },
        dataType: 'json',
        success: function (data) {
            if(data.page>9){
                pageNum = parseInt(Math.ceil(data.page/9));
            }else{
                pageNum = 1;
            }

            var newsList = [];
            var newsSingle = [];
            newsList = data.data;
            for (var i = 0; i < newsList.length; i++) {
                newsList[i].picUrl = hostURL + '/' + newsList[i].picUrl;newsSingle = data.data[0];
                if (newsList[i].summary != null) {
                    newsList[i].summary = newsList[i].summary.replace(/<[^>]+>/g, "");
                }else{
                    newsList[i].summary = ''
                }

                var date = newsList[i].updateTime;
                var time = date;
                var year = time.substr(0, 4);
                var index1 = time.indexOf("-");
                var index2 = time.lastIndexOf("-");
                var cha = parseInt(index2) - (parseInt(index1) + 1);
                var month = time.substr((parseInt(index1) + 1), cha);
                var kg = time.indexOf(" ");
                cha = parseInt(kg) - parseInt(index2);
                var day = time.substr(parseInt(index2) + 1, cha);
                newsList[i].year = year;
                newsList[i].month = month;
                newsList[i].day = day;
                newsList[i].sort = 'null';
                newsList = newsList
            }
            newsListAva.newsListGroup = newsList;
            newsSingle = data.data[0];

            if (newsSingle.summary != null) {
                newsSingle.summary = newsSingle.summary.replace(/<[^>]+>/g, "");
            }else{
                newsSingle.summary = ''
            }
            var date = newsSingle.updateTime;
            var time = date;
            var year = time.substr(0, 4);
            var index1 = time.indexOf("-");
            var index2 = time.lastIndexOf("-");
            var cha = parseInt(index2) - (parseInt(index1) + 1);
            var month = time.substr((parseInt(index1) + 1), cha);
            var kg = time.indexOf(" ");
            cha = parseInt(kg) - parseInt(index2);
            var day = time.substr(parseInt(index2) + 1, cha);
            newsSingle.year = year;
            newsSingle.month = month;
            newsSingle.day = day;
            newsSingle.sort = 'null';
            newsListAva.newsListSingle = newsSingle;
            $("#page").Page({
                totalPages: pageNum,//分页总数
                liNums: 7,//分页的数字按钮数(建议取奇数)
                activeClass: 'activP', //active 类样式定义
                callBack : function(page){
                    getNewsByOffset(page)
                }
            });
            $('.top-news-detail').height($('.news-detail').height()+60);
            wordlimit('.news-detail-tit',25);
            wordlimit('.news-detail-summary',78);
            wordlimit('.news-list-title',30);
            wordlimit('.news-list-text',54)
        },
    });
}
function getNewsByOffset(offset) {
    var newsType = getUrlParam('newsType');
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: newsType,
            pageSize: 9,
            offset: offset
        },
        dataType: 'json',
        success: function (data) {
            newsListAva.page = data.page;
            var newsList = [];
            var newsSingle = [];
            newsList = data.data;
            for (var i = 0; i < newsList.length; i++) {
                newsList[i].picUrl = hostURL + '/' + newsList[i].picUrl;newsSingle = data.data[0];
                if (newsList[i].summary != null) {
                    newsList[i].summary = newsList[i].summary.replace(/<[^>]+>/g, "");
                }else{
                    newsList[i].summary = ''
                }
                var date = newsList[i].updateTime;
                var time = date;
                var year = time.substr(0, 4);
                var index1 = time.indexOf("-");
                var index2 = time.lastIndexOf("-");
                var cha = parseInt(index2) - (parseInt(index1) + 1);
                var month = time.substr((parseInt(index1) + 1), cha);
                var kg = time.indexOf(" ");
                cha = parseInt(kg) - parseInt(index2);
                var day = time.substr(parseInt(index2) + 1, cha);
                newsList[i].year = year;
                newsList[i].month = month;
                newsList[i].day = day;
                newsList[i].sort = 'null';
                newsList = newsList
            }
            newsListAva.newsListGroup = newsList;
            $('.top-news-detail').height($('.news-detail').height()+60);
            wordlimit('.news-detail-tit',25);
            wordlimit('.news-detail-summary',78);
            wordlimit('.news-list-title',30);
            wordlimit('.news-list-text',54)
        },
    });
}
