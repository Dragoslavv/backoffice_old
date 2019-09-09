<?php require "header.php"; ?>
<!-- **********************************************************************************************************************************************************
    MAIN CONTENT
    *********************************************************************************************************************************************************** -->
<!--main content start-->
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Hourly Activation Statistic </h3>
        <!-- BASIC FORM VALIDATION -->
        <div class="row mt">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right"></i>Filter</h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Date : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-4 col-lg-8">
                                <button class="btn btn-theme" type="submit">Reset</button>
                                <button class="btn btn-theme04" type="button">Apply</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>

            <div class=" col-lg-9 p-2">
                <h4><i class="fa fa-angle-right"></i></h4>

            </div>

        </div>
        <!-- /row -->
        <div class="row mt">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right">Total</i></h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-4 control-label">ACTIVATED : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-4 control-label">REGISTERED : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-4 control-label">INTERESTED : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- /wrapper -->
</section>
<?php require "footer.php"; ?>
