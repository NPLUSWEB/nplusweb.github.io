/**
 * Created by Gavin on 2017/10/13.
 */
var news = avalon.define({
    $id: "news",
    comNews: '',
    comNewsGroup: [],
    proNews: [],
    mediaNewsSingle: [],
    mediaNews: [],
});
$(function () {
    getComNews();
    getProNews();
    getMediaNews();
});
function getComNews() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 6,
            pageSize: 3,
            offset: 1
        },
        dataType: 'json',
        success: function (data) {
            var comNewsGroup = [];
            comNewsGroup = data.data;
            for (var i = 0; i < comNewsGroup.length; i++) {
                comNewsGroup[i].picUrl = hostURL + '/' + comNewsGroup[i].picUrl;
                if (comNewsGroup[i].summary != null) {
                    comNewsGroup[i].summary = comNewsGroup[i].summary.replace(/<[^>]+>/g, "");
                }

                comNewsGroup = comNewsGroup
            }
            news.comNewsGroup = comNewsGroup;
            var newsSum = data.data[0];
            if (newsSum.summary != null) {
                newsSum.summary = newsSum.summary.replace(/<[^>]+>/g, "");
            }
            newsSum.sort = "null";
            // newsSum.picUrl = hostURL + '/' + newsSum.picUrl;
            news.comNews = newsSum;
            wordlimit('.news-title',28);
            wordlimit('.news-text',76);
            wordlimit('.news-list-title',30);
            wordlimit('.news-list-text',55)
        },
    });
}
function getProNews() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 7,
            pageSize: 3,
            offset: 1
        },
        dataType: 'json',
        success: function (data) {
            var proNews = [];
            proNews = data.data;
            for (var i = 0; i < proNews.length; i++) {
                proNews[i].picUrl = hostURL + '/' + proNews[i].picUrl;
                if (proNews[i].summary != null) {
                    proNews[i].summary = proNews[i].summary.replace(/<[^>]+>/g, "");
                }

                proNews = proNews
            }
            news.proNews = proNews;
            wordlimit('.news-list-title',30);
            wordlimit('.news-list-text',55)
        },
    });
}
function getMediaNews() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 8,
            pageSize: 5,
            offset: 1
        },
        dataType: 'json',
        success: function (data) {
            var mediaNews = [];
            mediaNews = data.data;
            for (var i = 0; i < mediaNews.length; i++) {
                mediaNews[i].picUrl = hostURL + '/' + mediaNews[i].picUrl;
                if (mediaNews[i].summary != null) {
                    mediaNews[i].summary = mediaNews[i].summary.replace(/<[^>]+>/g, "");
                }

                mediaNews = mediaNews
            }

            news.mediaNews = mediaNews;
            var mediaNewsSingle = [];
            var mediaNewsSingle = data.data[0];
            mediaNewsSingle.summary = mediaNewsSingle.summary.replace(/<[^>]+>/g, "");
            mediaNewsSingle.sort = "null";
            news.mediaNewsSingle = mediaNewsSingle;
        },
    });
}