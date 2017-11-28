/**
 * Created by Gavin on 2017/10/13.
 */
var estate = avalon.define({
    $id: "estate",
    estates: ''
});
$(function () {
    var type=0;
    getprotype(type);
    $('.estate-dev .fl li').click(function(){
        var word=$(this).text();
        if(word=='写字楼'){
            type=1;
        }else if(word=='商务中心'){
             type=2;
        }else if(word=='商场'){
             type=3;
        }else if(word=='服务式公寓'){
             type=4;
        }else if(word=='酒店'){
             type=5;
        }else if(word=='全部类型'){
             type=0;
        }
        getprotype(type)
    })
    $('.estate-dev div span').click(function(){
        var itAddr=$(this).text();
        $(".poup-estate .tit span").text(itAddr)
        getestate(type,itAddr);
        // console.log(type,itAddr)
    });
});
function getestate(type,itAddr) {
    $.ajax({
        url: hostURL + '/front/getBusinessList.json',
        type: 'GET',
        data: {
            type: type,
            item_address:itAddr
        },
        dataType: 'json',
        success: function (data) {
            estate.estates = data.data
        },
    });

}       


var asset = avalon.define({
    $id: "asset",
    assets: ''
});
$(function () {
    getasset()
});
function getasset() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 4,
        },
        dataType: 'json',
        success: function (data) {
            var businData = data.data[0]
             if (data.status === 'true' || data.status === true) {

                if(businData !=undefined && businData!='' && businData!= null){
                    asset.assets = businData
                    // asset.assets.status = true;
                }else{
                    // asset.assets.status = false;
                }
            }
        },
    });
} 
var property = avalon.define({
    $id: "property",
    propertys: ''
});
$(function () {
    getproperty()
});
function getproperty() {
    $.ajax({
        url: hostURL + '/front/getArticleList.json',
        type: 'GET',
        data: {
            type: 5,
        },
        dataType: 'json',
        success: function (data) {
            var businData = data.data[0]
             if (data.status === 'true' || data.status === true) {

                if(businData !=undefined && businData!='' && businData!= null){
                    property.propertys = businData
                    // property.propertys.status = true;
                }else{
                    // property.propertys.status = false;
                }
            }
        },
    });
} 

var protype = avalon.define({
    $id: "protype",
    protA: new Array(),
    protypes: new Array()
});

function getprotype(type) {
    $.ajax({
        url: hostURL + '/front/getBusinessCountByType.json',
        type: 'GET',
        data: {
            type: type,
        },
        dataType: 'json',
        success: function (data) {
            var protypeData = data.data
             if (data.status === 'true' || data.status === true) {

                if(protypeData !=undefined && protypeData!='' && protypeData!= null){
                    protype.protA=[];
                    for(var i=0;i<protypeData.length;i++){
                       protype.protA[i]=protypeData[i].city;

                    }
                    protype.protypes=protype.protA;
                    IsCity(protype.protypes);
                    // property.propertys.status = true;
                }else{
                    // property.propertys.status = false;
                }
            }
        },
    });
} 
function IsCity(citys){
    // console.log(citys)
   $('.map').each(function(){
        var si=$(this).find("span").size();
        // console.log(si)
        if(si==1){
           if(citys.indexOf($(this).find("span").text())==-1){
             $(this).removeClass('onL')
           }else{
             $(this).addClass('onL')
           }
        }else if(si==2){
            var a=$(this).find("span:first-child").text();
            var b=$(this).find("span:nth-child(2)").text();
          if(citys.indexOf(a)==-1 && citys.indexOf(b)==-1){
             $(this).removeClass('onL')
           }else{
             $(this).addClass('onL')
           }
        }
   })
   
    $('.estate-dev .onL span').click(function(){
        $(".popup").fadeIn();
        $(".poup-estate").fadeIn();
        $(this).parents(".map").addClass("on").siblings(".map").removeClass("on")
    })
    // var arr=['沈阳','青岛','苏州','南京','上海','南昌'];
    // for(var i=0;i<arr.length;i++){
    //     if(citys.indexOf(arr[i])==0){
    //        var ci=arr[i];
    //        $('.map').each(function(){
    //             $(this).find('span').each(function(){
    //                if($(this).find('i').text()==ci){
    //                  $(this).parent('.map').addClass('onL')
    //                }
    //             })
    //        })
    //     }
    // }
}