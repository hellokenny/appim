//var socketIOManager = require("./libs/socketIOManager");


function login() {
    // socketIOManager.init();
    var ac=$("#ac").val();
    var name=$("#name").val();
    var avatar=$("#avatar").val();
    var startTime=$("#startTime").val();
    $.ajax({
        type : "POST",
        url : "http://10.101.132.67:8989/appim/user/login",
        data : JSON.stringify({ac: ac, name: name, avatar: avatar,startTime:startTime}),
        dataType: 'json',
        contentType: "application/json; charset=UTF-8",
        headers: {},
        success: function (response) {

            var errorCode = response.code;

            // server handled error
            if(errorCode != 1){

                // alert('fail');
                console.log('fail');
            }

            if(errorCode == 1){

                console.log('http login success');
                console.log(response.data);

            }


        },
        statusCode: {
            403: function() {
            }
        },
        error: function (e) {

            console.log('err1');
            console.log(e);

        }
    });
}