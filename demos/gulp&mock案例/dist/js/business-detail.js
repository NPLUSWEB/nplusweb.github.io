
var businessD = avalon.define({
    $id: "businessD",
    businesDw:'',
    data: new Array(),
    businessDs: new Array(),
    xiaoguo_pics_args:new Array(),
    shijing_pics_args:new Array(),
    pingmian_pics_args:new Array(),
    listBuss:'',
    listBussUrl:'',
    listBussUrls:new Array(),
    listBussd:new Array()
});

function getbusinessD(ida) {
    $.ajax({
        url: hostURL + '/front/getBusinessInfo.json',
        type: 'GET',
        data: {
            id: ida
        },
        dataType: 'json',
        success: function (data) { 
            var businData = data.data 
            if (data.status === 'true' || data.status === true) {
            if(businData !=undefined && businData!='' && businData!= null){
                if(businData.item_wechat_pic_url!=''){
                    businData.item_wechat_pic_url = hostURL +'/'+ businData.item_wechat_pic_url
                }
                    businData = businData
                //获取图片    
                if(businData.item_xiaoguo_pics_url!=null&& businData.item_xiaoguo_pics_url!=''){
                    businessD.xiaoguo_pics_args = businData.item_xiaoguo_pics_url.split(",");  
                    for (var i=0;i<businessD.xiaoguo_pics_args.length;i++){
                        businessD.xiaoguo_pics_args[i]= hostURL +'/'+ businessD.xiaoguo_pics_args[i]
                    }
                }
                if(businData.item_shijing_pics_url!=null&& businData.item_shijing_pics_url!=''){
                    businessD.shijing_pics_args = businData.item_shijing_pics_url.split(","); 
                    for (var i=0;i<businessD.shijing_pics_args.length;i++){
                        businessD.shijing_pics_args[i]= hostURL +'/'+ businessD.shijing_pics_args[i]
                    } 
                }
                if(businData.item_pingmian_pics_url!=null&& businData.item_pingmian_pics_url!=''){
                    businessD.pingmian_pics_args = businData.item_pingmian_pics_url.split(","); 
                    for (var i=0;i<businessD.pingmian_pics_args.length;i++){
                        businessD.pingmian_pics_args[i]= hostURL +'/'+ businessD.pingmian_pics_args[i]
                    } 
                }
                businessD.businessDs = businessD.xiaoguo_pics_args.concat(businessD.shijing_pics_args).concat(businessD.pingmian_pics_args); 
                //项目基本信息
                if( businData.listBussinessInfo !=undefined && businData.listBussinessInfo!='' && businData.listBussinessInfo!= null){
                     var a=0;
                     var b=0;
                    for(var i=0;i<businData.listBussinessInfo.length;i++){
                        var testUrl=businData.listBussinessInfo[i].description;
                        if(IsURL(testUrl)){//正则判断是否是链接地址
                            businessD.listBussUrls[a]=businData.listBussinessInfo[i];//链接地址
                            a++;
                        }else{
                            businessD.listBussd[b]=businData.listBussinessInfo[i];//非链接地址
                            b++;
                        }
                        
                    }
                }
            }          
            businData=businData

            businessD.data=businessD.businessDs//图片
            businessD.businesDw=businData;//详情
            if(businessD.listBussUrls !=undefined &&businessD.listBussUrls!='' && businessD.listBussUrls!= null){
                businessD.listBussUrl=businessD.listBussUrls
                businessD.businesDw.status=true;
            }else{
                businessD.businesDw.status=false;
            }
            businessD.listBuss=businessD.listBussd//项目基本信息
            businessSlider();
            
            $(".img-show img").load(function(){
                 timeline()
            })
            
            $(window).resize(function() {
                timeline();
            });

            }  
        },
    });
} 
function businessSlider(){
    $(document).ready(function(){
        $(".group4").colorbox({rel:'group4', slideshow:false});
    });

     $(".er-btn>img").click(function(){
        $(".er-wh").toggleClass("on");
    })
}
function timeline(){
    var winW = $(window).width();
    var htmleafW = $('.htmleaf-content ul').width();
    $(".htmleaf-content").css("left",0)
    if(winW <= 1000){
        winW = 1000;
    }
    //$(".development").css({"width":winW+"px"})
        
    $(".rightbtn").click(function(){
        this_left = $(".htmleaf-content").position().left-500;
        if(Math.abs(this_left) >= htmleafW-winW){
            this_left = -(htmleafW-winW);
        }
        // console.log(this_left)
        $(".htmleaf-content").stop().animate({"left":this_left+"px"},1000);
    })
    $(".leftbtn").click(function(){
        this_left = $(".htmleaf-content").position().left+500;
        if(this_left >=0 ){
            this_left = 0;
        }
        // console.log(this_left)
        $(".htmleaf-content").stop().animate({"left":this_left+"px"},1000);
    })
}
function IsURL(str_url){ 
    var success=false;
    var arr=['https://','http://'];
    for(var i=0;i<arr.length;i++){
        if(str_url.indexOf(arr[i])==0){
            success=true;
        }
    }
    return success;
}