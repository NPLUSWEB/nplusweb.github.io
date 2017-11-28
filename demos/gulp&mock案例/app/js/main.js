var hostURL = 'http://www.hqswcenter.com';
$(function () {
    $(".scrollTop").hide();
    var winH=$(window).height();
    $(window).scroll(function (){
        var st = $(this).scrollTop();
        if(st>winH){
            $(".scrollTop").show();
        }else{
            $(".scrollTop").hide();
        }
    });
    $(".scrollTop").click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
    })
});
var url = window.location.href;
var projectName = url.substr(0, url.indexOf('/dist'));
console.log(projectName);
function changeUrlArg(arg, val) {
    var url = window.location.href;
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + val;
    return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
function wordlimit(cname,wordlength){//1.首先，定义函数，其中两个参数，参数一是目标元素，也就是需要显示省略号的那个元素；参数二是需要限制的字数。

    var cname=$(cname);//2.定义变量cname，即目标元素

    for(var i=0;i<cname.length;i++){//3.这里写了个循环，因为目标元素不止一个，之前找到一个通过获取id来截取字段实现效果的，但是如果目标元素有多个，id每个又不能相同，就显得麻烦了

        var nowLength=cname[i].innerHTML.length;//4.定义变量nowLength，里面存储的是每一个目标元素所包含的字数。

        if(nowLength>wordlength){//这里做一些判断，如果现在的每个目标元素里面的字数多于我们需要限制的字数
            console.log(nowLength)
            cname[i].innerHTML=$(cname)[i].innerHTML.substr(0,wordlength)+' . . . ';//每个目标元素的内容就会被改变为当前内容的字符长度从0开始然后一直截取到需要限制的字数位置。

        }

    }

}
var debug = true;
if(debug){
    Mock.mock(/getBannerList.json/, {
        'data|2-5': [{
            'picUrl': '/site/resource/system/website/dist/img/home-banner1.jpg',
            'sort': '1',
            'linkUrl': 'http://www.baidu.com'
        }]
    });

    Mock.mock(/getArticleList.json/, {
        'data|3-10': [{
            'picUrl': '/site/upload/data/20171017/150821248579150.jpg',
            'id|+1': 1,
            'title': '@ctitle',
            'summary': '@cparagraph'
        }]
    });
}