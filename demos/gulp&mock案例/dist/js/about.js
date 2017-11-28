/**
 * Created by Gavin on 2017/10/13.
 */
var about = avalon.define({
    $id: "about",
    abouts: ''
});
$(function () {
    getabout()
});
function getabout() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 1,
        },
        dataType: 'json',
        success: function (data) {
            var aboutData = data.data[0]
            if (data.status === 'true' || data.status === true) {

                if(aboutData !=undefined && aboutData!='' && aboutData!= null){
                    about.abouts = aboutData
                    // console.log('11'+about.abouts)
                    // about.abouts.status = true;
                }else{
                    // about.abouts.status = false;
                    // console.log('22')
                }
            }
        },
    });

}       
var chairman = avalon.define({
    $id: "chairman",
    chairmans: ''
});
$(function () {
    getchairman()
});
function getchairman() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 2,
        },
        dataType: 'json',
        success: function (data) {
            var chairmanData = data.data[0]
            if (data.status === 'true' || data.status === true) {

                if(chairmanData !=undefined && chairmanData!='' && chairmanData!= null){
                    chairmanData.picUrl = hostURL +'/'+ chairmanData.picUrl
                    chairmanData = chairmanData
                    chairman.chairmans = chairmanData
                    // chairman.chairmans.status = true;
                }else{
                    // chairman.chairmans.status = false;
                }
            }
        },
    });
} 

var corporate = avalon.define({
    $id: "corporate",
    corporates: ''
});
$(function () {
    getcorporate()
});
function getcorporate() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 3,
        },
        dataType: 'json',
        success: function (data) {
            var corpoData = data.data[0]
            if (data.status === 'true' || data.status === true) {

                if(corpoData !=undefined && corpoData!='' && corpoData!= null){
                    corporate.corporates = corpoData
                    // corporate.corporates.status = true;
                }else{
                    // corporate.corporates.status = false;
                }
            }
        },
    });
}  

var company = avalon.define({
    $id: "company",
    companys: '',
});
$(function () {
    getcompany();

});
function getcompany() {
    $.ajax({
        url: hostURL + '/front/getVideoList.json',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var compData = data.data 
            for(var i=0;i<compData.length;i++){
                compData[i].picUrl = hostURL +'/'+ compData[i].picUrl
                if(compData[i].linkUrl!=''){
                    compData[i].linkUrl = hostURL +'/'+ compData[i].linkUrl
                }
                compData = compData
            }
            company.companys = compData
            aboutSlider();

        },
    });
}
function aboutSlider(){
       
    //点击右侧图片获取链接到视频
    $('.sp-thumbnail').click(function(){
        var urlV=$(this).find('span:first-child').text();
        $(this).addClass("on").siblings().removeClass('on')

        var flashvars={
            f:urlV,
            c:0
        };
        var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
        CKobject.embedSWF('ckplayer/ckplayer.swf','a1','ckplayer_a1','800','450',flashvars,params);
    })
    
    $('.sp-thumbnail').eq(0).click();
    
}
