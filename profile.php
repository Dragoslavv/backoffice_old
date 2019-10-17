<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Profile </h3>
        <input type="hidden" id="session-token" value="<?php echo $_SESSION['tokenSession'][0]; ?>">
        <div class="row">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right"></i> Operator</h4>

                    <div class="panel-heading">
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active">
                                <a data-toggle="tab" href="#add"><i class="fa fa-user-plus"></i> Add</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#search"><i class="fa fa-search"></i> Search</a>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="add" class="tab-pane active">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-panel">
                                            <form role="form" class="form-horizontal style-form">
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">ID : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-id" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group ">
                                                    <label class="col-lg-4 control-label">Username : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-username" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">First Name : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-first-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Last Name : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-last-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Email : </label>
                                                    <div class="col-lg-8">
                                                        <input type="email" placeholder="" id="p-email" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Role : </label>
                                                    <div class="col-lg-8">
                                                        <div class="dropdown">
                                                            <button class="btn btn-default dropdown-toggle btn-block" id="ALL" type="button" data-toggle="dropdown">
                                                                ALL <span class="caret"></span>
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <li><a href="#">User</a></li>
                                                                <li><a href="#">Admin</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-offset-4 col-lg-8">
                                                        <button class="btn btn-theme" type="submit">Reset</button>
                                                        <button class="btn btn-theme04" id="search-profile" type="button">Search</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="search" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-panel">
                                            <form role="form" class="form-horizontal style-form">
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">ID : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-id" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group ">
                                                    <label class="col-lg-4 control-label">Username : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-username" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">First Name : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-first-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Last Name : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="p-last-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Email : </label>
                                                    <div class="col-lg-8">
                                                        <input type="email" placeholder="" id="p-email" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-offset-4 col-lg-8">
                                                        <button class="btn btn-theme" type="submit">Reset</button>
                                                        <button class="btn btn-theme04" id="search-profile" type="button">Search</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            <div class="col-lg-9 p-2">
                <h4><i class="fa fa-angle-right"></i> Data</h4>
                <div class="content-panel">
                    <div class="adv-table" >
                        <table cellpadding="0" cellspacing="0" border="0" class="display table-bordered" id="profile-table">
                            <!--- ToDo --->
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</section>


<?php require "footer.php"; ?>
<script type="text/javascript">
    $(document).ready(function() {
        $('#profile-table').dataTable({
            "bServerSide": true,
            "aoColumns": [
                { "sTitle": "ID" },
                { "sTitle": "Username" },
                { "sTitle": "First Name" },
                { "sTitle": "Last Name"},
                { "sTitle": "Role"},
                { "sTitle": "Email"},
                { "sTitle": "Phone"},
                { "sTitle": "Edit"},
                { "sTitle": "Delete"}
            ],
            "sAjaxSource": 'https://api.globaltel.rs/api-gui/php/operator/read.php',
            "fnServerData": function ( sSource, aoData ) {

                var token = $('#session-token').val();

                $.ajax( {
                    "dataType": 'json',
                    "cache": false,
                    "type": "POST",
                    "url": sSource,
                    "data": aoData,
                    "header":{
                        'Authorization':'Basic '+token,
                        'Set-Cookie':"GLOBALTEL=" + token + 'Path=/; HttpOnly'
                    },
                    "success": function (result) {
                        console.log(result);

                        // for(var i = 0 ; i < result.data.length; i++) {
                        //     $('#profile-table tbody').append(
                        //         "<tr class='gradeA' id="+ result.data[i].id +">" +
                        //         "<td>"+ result.data[i].id +"</td>" +
                        //         "<td>"+ result.data[i].username +"</td>" +
                        //         "<td class='hidden-phone'>"+ result.data[i].firstname +"</td>" +
                        //         "<td class='center hidden-phone'>"+ result.data[i].lastname +"</td>" +
                        //         "<td class='center hidden-phone'>"+ result.data[i].role +"</td>" +
                        //         "<td class='center hidden-phone'>"+ result.data[i].email +"</td>" +
                        //         "<td class='center hidden-phone'>"+ result.data[i].phone +"</td>" +
                        //         "<td class='center hidden-phone'>" +
                        //         "<button class='btn btn-theme' type='submit'><i class='fa fa-edit'></i></button>" +
                        //         "</td>" +
                        //         "<td class='center hidden-phone'>" +
                        //         "<button class='btn btn-theme' type='submit'><i class='fa fa-remove'></i></button>" +
                        //         "</td>" +
                        //         "<tr>"
                        //     );
                        // }
                    }
                } );
            }
        });

    });
</script>