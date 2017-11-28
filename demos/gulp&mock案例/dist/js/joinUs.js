/**
 * Created by Gavin on 2017/10/15.
 */
var join = avalon.define({
    $id: "joinUs",
    joinPic:[]
});

$(function () {
    getStaff()
});
function getStaff() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 9,
            pagesize: 1,
            offset: 1
        },
        dataType: 'json',
        success: function (data) {
            var joinPic = [];
            joinPic = data.data;
            for (var i = 0; i < joinPic.length; i++) {
                joinPic[i].picUrl = hostURL + '/' + joinPic[i].picUrl;
                joinPic[i].summary = joinPic[i].summary.replace(/<[^>]+>/g, "");
                joinPic = joinPic
            }
            join.joinPic = joinPic;
            var swiper = new Swiper('.swiper-container', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 30
            });
        },
    });
}