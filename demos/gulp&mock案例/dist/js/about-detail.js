
var aboutD = avalon.define({
    $id: "aboutD",
    aboutDs: ''
});

function getaboutD(ida) {
    $.ajax({
        url: hostURL + '/front/getArticleInfo.json',
        type: 'GET',
        data: {
            id: ida,
        },
        dataType: 'json',
        success: function (data) {
            aboutD.aboutDs = data.data
        },
    });
} 