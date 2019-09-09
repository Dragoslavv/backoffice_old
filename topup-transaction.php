<?php require "header.php"; ?>
<!-- **********************************************************************************************************************************************************
    MAIN CONTENT
    *********************************************************************************************************************************************************** -->
<!--main content start-->
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> TopUp Transaction </h3>
        <!-- BASIC FORM VALIDATION -->
        <div class="row mt">
            <div class="col-lg-6 p-2">
                <h4><i class="fa fa-angle-right"></i>TopUp Payment Search</h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Start : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-4 control-label">End : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">MSISDN : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>

            <div class="col-lg-6 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-5 control-label">TopUp Status : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">TransactionId : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-5 col-lg-7">
                                <button class="btn btn-theme" type="submit">Reset</button>
                                <button class="btn btn-theme04" type="button">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>
        </div>
        <div class="row mt">
            <div class="col-lg-12">
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
        </div>
        <!-- /row -->
    </section>
    <!-- /wrapper -->
</section>
<?php require "footer.php"; ?>
