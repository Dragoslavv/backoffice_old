$(document).ready(function () {

    $('#login-button').on('click', function(e){
        e.preventDefault();

        $.ajax({
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            url: 'functionality/login.php',
            data: $('#login-form').serialize(),
            cache: false,
            contentType: 'json',
            processData: false,
            type:'POST',
            success: function(result) {
                var result = $.parseJSON(result);

                if(result.success == true){
                    window.location = 'index.php';

                }

            }
        });

    });

    $('#logout').on('click', function (e) {
        e.preventDefault();

        $.ajax({
            headers : {
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            url: 'functionality/logout.php',
            cache: false,
            contentType: 'json',
            processData: false,
            async: false,
            type:'POST',
            crossDomain: true,
            success: function(result) {
                var result = $.parseJSON(result);

                if(result.success == true){
                    window.location = "login.php";
                }
            }
        });
    });

});
