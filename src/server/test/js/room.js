//var socketIOManager = require("./libs/socketIOManager");


function addRoom() {
    // socketIOManager.init();
    var ac=$("#ac").val();
    var name=$("#name").val();
    var avatar=$("#avatar").val();
    $.ajax({
        type : "POST",
        url : "http://10.101.132.67:8989/appim/user/login",
        data : JSON.stringify({ac: ac, name: name, avatar: avatar}),
        dataType: 'json',
        contentType: "application/json; charset=UTF-8",
        headers: {},
        success: function (response) {

            // socketIOManager.emit('login',{
            //     ac:ac,
            //     name:name,
            //     avatar:avatar
            // });

            var errorCode = response.code;

            // server handled error
            if(errorCode != 1){

                // alert('fail');
                console.log('fail');
            }

            if(errorCode == 1){

                // alert(response.data);
                console.log(response.data);

            }


        },
        statusCode: {
            403: function() {
            }
        },
        error: function (e) {

            alert('err1');
            alert(e);

        }
    });
}