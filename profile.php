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
                        <table id="example" class="table table-striped table-bordered table-responsive" style="width:100%">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone</th>
                            </tr>
                            </thead>
                            <!--- ToDo --->
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</section>


<?php require "footer.php"; ?>
<script>
    $(document).ready(function() {

        $("#example").DataTable({
            "info":false,
            "responsive": true,
            "columns": [
                { "data": "id" },
                { "data": "username" },
                { "data": "firstname" },
                { "data": "lastname" },
                { "data": "role" },
                { "data": "email" },
                { "data": "phone" }
            ],
            "ajax": {
                "url": "functionality/operator.php",
                "type": "POST"
            }

        });

    });

</script>
