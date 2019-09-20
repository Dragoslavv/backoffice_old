<?php require "header.php"; ?>

<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Customer Billing</h3>

        <div class="row">
            <div class="col-lg-3">
                <h5><i class="fa fa-angle-right"></i> Customer Search</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 333px">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Number : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Email : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">User ID : </label>
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
                        <div class="form-group">
                            <div class="col-lg-offset-5 col-lg-7">
                                <button class="btn btn-theme" type="submit">Save</button>
                                <button class="btn btn-theme04" type="button">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-6 -->
            <div class="col-lg-3">
                <h5><i class="fa fa-angle-right"></i> Customer Data</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 333px">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <label class="col-lg-5 control-label">User ID : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Email : </label>
                            <div class="col-lg-7">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Name : </label>
                            <div class="col-lg-7">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-5 control-label">Subscription : </label>
                            <div class="col-lg-7">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">Wallet ID : </label>
                            <div class="col-lg-7">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-5 control-label">App Force : </label>
                            <div class="col-lg-7">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>

                    </form>
                </div>
                <!-- /form-panel -->
            </div>

            <div class="col-lg-3">
                <h5><i class="fa fa-angle-right"></i> Billing Details</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 333px">
                    <div class=" form">
                        <form class="cmxform form-horizontal style-form" id="commentForm" method="get" action="">
                            <div class="form-group ">
                                <label for="cname" class="control-label col-lg-5">Billing ID : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="cname" name="name" minlength="2" type="text" required />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="cemail" class="control-label col-lg-5">Balances : </label>
                                <div class="col-lg-7">
                                    <input class="form-control " id="cemail" type="email" name="email" required />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="curl" class="control-label col-lg-5"> Reservations : </label>
                                <div class="col-lg-7">
                                    <input class="form-control " id="curl" type="url" name="url" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>

            <div class="col-lg-3 ">
                <h5><i class="fa fa-angle-right"></i> Add / Remove Credit</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 333px">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-5">Amount : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-5">Account : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="username" class="control-label col-lg-5">Password : </label>
                                <div class="col-lg-7">
                                    <input class="form-control " id="username" name="username" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="password" class="control-label col-lg-5">Info :</label>
                                <div class="col-lg-7">
                                    <input class="form-control " id="password" name="password" type="password" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-5 col-lg-7">
                                    <button class="btn btn-theme" type="submit">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /form-panel -->
        </div>
        <!-- /row -->
        <div class="row mt">
            <div class="col-lg-2">
                <h5><i class="fa fa-angle-right"></i> Deactivation/Activation</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 240px">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="agree" class="control-label col-lg-5 col-sm-3">Active :</label>
                                <div class="col-lg-7 col-sm-9">
                                    <input type="checkbox" checked="" data-toggle="switch" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="password" class="control-label col-lg-5">Info :</label>
                                <div class="col-lg-7">
                                    <input class="form-control " id="password" name="password" type="password" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-5 col-lg-7">
                                    <button class="btn btn-theme" type="submit">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <div class="col-lg-3">
                <h5><i class="fa fa-angle-right"></i> Subscription</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 240px">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-5">Subscription : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-5">Plan : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-5 col-lg-7">
                                    <button class="btn btn-theme" type="submit">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <div class="col-lg-3">
                <h5><i class="fa fa-angle-right"></i> Package Activation</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 240px">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-5">Package : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-5">Duration : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="agree" class="control-label col-lg-5 col-sm-3">Active sim :</label>
                                <div class="col-lg-7 col-sm-9">
                                    <input type="checkbox" checked="" data-toggle="switch" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-5 col-lg-7">
                                    <button class="btn btn-theme" type="submit">Active</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <div class="col-lg-2">
                <h6><i class="fa fa-angle-right"></i> Add/Replace/Transfer Number </h6>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 240px">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-5">Action : </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-5">Number </label>
                                <div class="col-lg-7">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-5 col-lg-5">
                                    <button class="btn btn-theme" type="submit">Add/Re...</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>

            <div class="col-lg-2">
                <h5><i class="fa fa-angle-right"></i> Wallet Transactions</h5>
                <div class="form-panel d-flex align-content-stretch flex-wrap" style="min-height: 240px">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">

                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <button class="btn btn-theme" type="submit">Transaction</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-12 -->
        </div>

    </section>
    <!-- /wrapper -->
</section>
<?php require "footer.php"; ?>
