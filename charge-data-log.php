<?php require "header.php"; ?>
    <!-- **********************************************************************************************************************************************************
        MAIN CONTENT
        *********************************************************************************************************************************************************** -->
    <!--main content start-->
    <section id="main-content">
        <section class="wrapper">
            <h3><i class="fa fa-angle-right"></i> Charge Data Log</h3>
            <div class="row mb">
                <!-- page start-->
                <div class="col-lg-3">
                    <div class="content-panel">
                        <form role="form" class="form-horizontal style-form">
                            <div class="form-group has-success">
                                <label class="col-lg-3 control-label">Start: </label>
                                <div class="col-lg-9">
                                    <input type="text" placeholder="" id="f-name" class="form-control">
                                </div>
                            </div>
                            <div class="form-group has-error">
                                <label class="col-lg-3 control-label">End : </label>
                                <div class="col-lg-9">
                                    <input type="text" placeholder="" id="l-name" class="form-control">
                                </div>
                            </div>
                            <div class="form-group has-error">
                                <label class="col-lg-3 control-label">Type : </label>
                                <div class="col-lg-9">
                                    <input type="text" placeholder="" id="l-name" class="form-control">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-9">
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
                    <!-- page end-->
                </div>
            </div>
            <!-- /row -->
        </section>
        <!-- /wrapper -->
    </section>
    <!-- /MAIN CONTENT -->
    <!--main content end-->
    <!--footer start-->
<?php require "footer.php"; ?>