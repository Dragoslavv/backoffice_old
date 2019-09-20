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
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            url: 'functionality/logout.php',
            cache: false,
            contentType: 'json',
            processData: false,
            type:'POST',
            success: function(result) {
                var result = $.parseJSON(result);

                if(result.success == true){
                    window.location = "login.php";
                }
            }
        });
    });

    $.ajax({
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        url: 'functionality/operator.php',
        cache: false,
        contentType: 'json',
        processData: false,
        type:'GET',
        success: function(result) {

            // for(var i = 0 ; i < result.data.length; i++) {
            //     var index = i + 1;
            //     console.log(result.data[i]);
            //
            //     $('#profile-table').append(
            //         "<tbody>" +
            //             "<tr class='gradeA' id="+ result.data[index].id +">" +
            //                 "<td>"+ result.data[index].id +"</td>" +
            //                 "<td>"+ result.data[index].username +"</td>" +
            //                 "<td class='hidden-phone'>"+ result.data[index].firstname +"</td>" +
            //                 "<td class='center hidden-phone'>"+ result.data[index].lastname +"</td>" +
            //                 "<td class='center hidden-phone'>"+ result.data[index].role +"</td>" +
            //                 "<td class='center hidden-phone'>"+ result.data[index].email +"</td>" +
            //                 "<td class='center hidden-phone'>"+ result.data[index].phone +"</td>" +
            //                 "<td class='center hidden-phone'>" +
            //                     "<button class='btn btn-theme' type='submit'><i class='fa fa-edit'></i></button>" +
            //                     "<button class='btn btn-theme' type='submit'><i class='fa fa-remove'></i></button>" +
            //                 "</td>" +
            //             "<tr>"+
            //         "</tbody>"
            //     );
            // }
        }
    });
});
