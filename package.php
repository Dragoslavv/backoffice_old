<?php require "header.php"; ?>
<!-- **********************************************************************************************************************************************************
    MAIN CONTENT
    *********************************************************************************************************************************************************** -->
<!--main content start-->
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Package </h3>
        <!-- BASIC FORM VALIDATION -->
        <div class="row mt">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right"></i> Package Search</h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Promo ID : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-4 control-label">Package Group : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-4 col-lg-8">
                                <button class="btn btn-theme" type="submit">Reset</button>
                                <button class="btn btn-theme04" type="button">Search</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <p class="text-center">Add New Package : </p>

                            <div class="col-lg-offset-4 col-lg-8">
                                <button class="btn btn-theme04" type="button">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>

            <div class="col-lg-9 p-2">
                <h4><i class="fa fa-angle-right"></i></h4>
                <div class="content-panel">
                    <div class="adv-table">
                        <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="hidden-table-info">
                            <thead>
                            <tr>
                                <th>Created</th>
                                <th>Expires</th>
                                <th class="hidden-phone">ID</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="gradeA">
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td class="hidden-phone">Win 95+</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- page end-->
            </div>
        </div>

        <div class="row mt">
            <div class="col-lg-12 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <div class="panel-heading">
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active">
                                <a data-toggle="tab" href="#search">Add Package Lang</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#message-create" class="contact-map">Copy Lang Package</a>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="search" class="tab-pane active">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="content-panel">
                                            <div class="adv-table">
                                                <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="hidden-table-info">
                                                    <thead>
                                                    <tr>
                                                        <th>Created</th>
                                                        <th>Expires</th>
                                                        <th class="hidden-phone">ID</th>
                                                        <th class="hidden-phone">Transaction</th>
                                                        <th class="hidden-phone">Billing Type</th>
                                                        <th class="hidden-phone">All</th>
                                                        <th class="hidden-phone">Committed</th>
                                                        <th class="hidden-phone">Result</th>
                                                        <th class="hidden-phone">Meta Data</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr class="gradeX">
                                                        <td>Trident</td>
                                                        <td>Internet Explorer 4.0</td>
                                                        <td class="hidden-phone">Win 95+</td>
                                                        <td class="center hidden-phone">4</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- /col-md-6 -->
                                </div>
                                <!-- /OVERVIEW -->
                            </div>
                            <!-- /tab-pane -->
                            <div id="message-create" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="content-panel">
                                            <div class="adv-table">
                                                <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="hidden-table-info">
                                                    <thead>
                                                    <tr>
                                                        <th>Created</th>
                                                        <th>Expires</th>
                                                        <th class="hidden-phone">ID</th>
                                                        <th class="hidden-phone">Transaction</th>
                                                        <th class="hidden-phone">Billing Type</th>
                                                        <th class="hidden-phone">All</th>
                                                        <th class="hidden-phone">Committed</th>
                                                        <th class="hidden-phone">Result</th>
                                                        <th class="hidden-phone">Meta Data</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr class="gradeX">
                                                        <td>Trident</td>
                                                        <td>Internet Explorer 4.0</td>
                                                        <td class="hidden-phone">Win 95+</td>
                                                        <td class="center hidden-phone">4</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                        <td class="center hidden-phone">X</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                    <!-- /col-md-6 -->
                                </div>
                                <!-- /row -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
        </div>

        </div>
        <!-- /row -->
    </section>
    <!-- /wrapper -->
</section>
<?php require "footer.php"; ?>
