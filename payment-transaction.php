<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Transaction </h3>
        <div class="row mt">
            <div class="col-lg-6 p-2">
                <h4><i class="fa fa-angle-right"></i>Transaction Payment Search</h4>
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
                            <label class="col-lg-4 control-label">User ID : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
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
            </div>

            <div class="col-lg-6 p-2">
                <h4><i class="fa fa-angle-right"></i> </h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Payment Status : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Payment Type : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Payment Data : </label>
                            <div class="col-lg-7">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Billing ID : </label>
                            <div class="col-lg-7">
                                <input type="email" placeholder="" id="email2" class="form-control">
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
                        <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="payment-transaction-table">
                            <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User</th>
                                <th class="hidden-phone">Payment Type</th>
                                <th class="hidden-phone">Payment Data</th>
                                <th class="hidden-phone">Transaction Started</th>
                                <th class="hidden-phone">Transaction Update</th>
                                <th class="hidden-phone">Payment Status</th>
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

        $('#payment-transaction-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>