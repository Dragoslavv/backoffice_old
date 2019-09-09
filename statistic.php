<?php require "header.php"; ?>
<!-- **********************************************************************************************************************************************************
    MAIN CONTENT
    *********************************************************************************************************************************************************** -->
<!--main content start-->
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Statistic </h3>
        <!-- BASIC FORM VALIDATION -->
        <div class="row mt">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right"></i> Statistic</h4>
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
                            <div class="col-lg-offset-4 col-lg-8">
                                <button class="btn btn-theme" type="submit">Reset</button>
                                <button class="btn btn-theme04" type="button">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>
            <div class="col-lg-9 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <!--main content start-->
                    <div class="panel-heading">
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active">
                                <a data-toggle="tab" href="#overview">Daily</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#contact" class="contact-map">Hourly</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#edit">Total</a>
                            </li>
                        </ul>
                    </div>
                    <!-- /panel-heading -->
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="overview" class="tab-pane active">
                                <div class="row">
                                    <div class="col-md-6">


                                    </div>
                                    <!-- /col-md-6 -->
                                </div>
                                <!-- /OVERVIEW -->
                            </div>
                            <!-- /tab-pane -->
                            <div id="contact" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-6">


                                    </div>
                                    <!-- /col-md-6 -->
                                </div>
                                <!-- /row -->
                            </div>
                            <!-- /tab-pane -->
                            <div id="edit" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-6">


                                    </div>
                                    <!-- /col-md-6 -->
                                </div>
                                <!-- /row -->
                            </div>
                            <!-- /tab-pane -->
                        </div>
                        <!-- /tab-content -->
                    </div>
                    <!-- /panel-body -->
                </div>
                <!-- /form-panel -->
            </div>
        </div>
        <div class="row ">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <div class="content-panel">
                        <div class="adv-table">
                            <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="hidden-table-info">
                                <thead>
                                <tr>
                                    <th>Payment</th>
                                    <th>Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="gradeX">
                                    <td>Trident</td>
                                    <td>Internet Explorer 4.0</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
        </div>
        <!-- /row -->
    </section>
    <!-- /wrapper -->
</section>
<?php require "footer.php"; ?>
