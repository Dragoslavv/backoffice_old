<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Cdr Log </h3>
        <div class="row mt">
            <div class="col-lg-4 p-2">
                <h4><i class="fa fa-angle-right"></i>Cdr Log Search</h4>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 280px">
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
                            <label class="col-lg-4 control-label">Brand : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label"><b>Total Minutes :</b> </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-lg-4 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 280px">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Disposition : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Route : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Call Type : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-lg-4 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel  d-flex align-content-stretch flex-wrap" style="min-height: 280px">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-5 control-label">User ID : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">User ID B : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Source : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Destination : </label>
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
            </div>
        </div>
        <div class="row mt">
            <div class="col-lg-12">
                <div class="content-panel">
                    <div class="adv-table">
                        <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="cdr-log-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Start</th>
                                <th class="hidden-phone">Billsec</th>
                                <th class="hidden-phone">Source</th>
                                <th class="hidden-phone">Destination</th>
                                <th class="hidden-phone">User ID</th>
                                <th class="hidden-phone">User ID B</th>
                                <th class="hidden-phone">Disposition</th>
                                <th class="hidden-phone">Status</th>
                                <th class="hidden-phone">CDR</th>
                                <th class="hidden-phone">Cdr ID</th>
                                <th class="hidden-phone">Call Type</th>
                                <th class="hidden-phone">Route Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="gradeA">
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td class="hidden-phone">Win 95+</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">X</td>
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
        </div>
    </section>
</section>
<?php require "footer.php"; ?>
<script type="text/javascript">
    $(document).ready(function() {

        $('#cdr-log-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>