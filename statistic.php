<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Statistic </h3>
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
                                <button class="btn btn-theme" type="submit"><i class="fa fa-refresh"></i> Reset</button>
                                <button class="btn btn-theme04" type="button"><i class="fa fa-search"></i> Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-lg-9 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <!--main content start-->
                    <div class="panel-heading">
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active">
                                <a data-toggle="tab" href="#daily">Daily</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#hourly">Hourly</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#total">Total</a>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="daily" class="tab-pane active">
                                <div class="row">
                                    <div class="col-md-12">

                                        <div id="myfirstchart" ></div>

                                    </div>
                                </div>
                            </div>
                            <div id="hourly" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-12">

                                        <div id="myfirstchart1" ></div>

                                    </div>
                                </div>
                            </div>
                            <div id="total" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-6">

                                        <div id="myfirstchart2" ></div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row ">
            <div class="col-lg-3 p-2 topup">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <div class="content-panel">
                        <div class="adv-table">
                            <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered">
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
            </div>
        </div>
    </section>
</section>
<?php require "footer.php"; ?>