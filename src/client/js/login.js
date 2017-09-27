var $ = require('jquery');




function login() {
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

            var errorCode = response.code;

            // server handled error
            if(errorCode != 1){

                alert('fail');
            }

            if(errorCode == 1){

                alert(response.data);

            }


        },
        statusCode: {
            403: function() {
            }
        },
        error: function (e) {

            alert('err');
            alert(e);

        }
    });
}