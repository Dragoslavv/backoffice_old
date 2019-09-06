<?php require "header.php"; ?>
<!-- **********************************************************************************************************************************************************
    MAIN CONTENT
    *********************************************************************************************************************************************************** -->
<!--main content start-->
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Customer Billing</h3>
        <!-- BASIC FORM VALIDATION -->
        <div class=" d-flex row mt">
            <div class="col-lg-6 p-2">
                <h4><i class="fa fa-angle-right"></i> Customer Search</h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group has-success">
                            <label class="col-lg-2 control-label">Number : </label>
                            <div class="col-lg-10">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                                <p class="help-block">Successfully done</p>
                            </div>
                        </div>
                        <div class="form-group has-error">
                            <label class="col-lg-2 control-label">Email : </label>
                            <div class="col-lg-10">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                                <p class="help-block">Aha you gave a wrong info</p>
                            </div>
                        </div>
                        <div class="form-group has-warning">
                            <label class="col-lg-2 control-label">User ID : </label>
                            <div class="col-lg-10">
                                <input type="email" placeholder="" id="email2" class="form-control">
                                <p class="help-block">Something went wrong</p>
                            </div>
                        </div>
                        <div class="form-group has-warning">
                            <label class="col-lg-2 control-label">Billing ID : </label>
                            <div class="col-lg-10">
                                <input type="email" placeholder="" id="email2" class="form-control">
                                <p class="help-block">Something went wrong</p>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-offset-2 col-lg-10">
                                <button class="btn btn-theme" type="submit">Save</button>
                                <button class="btn btn-theme04" type="button">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-6 -->
            <div class="col-lg-6 p-2">
                <h4><i class="fa fa-angle-right"></i> Customer Data</h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group has-success">
                            <label class="col-lg-2 control-label">User ID : </label>
                            <div class="col-lg-10">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                                <p class="help-block">Successfully done</p>
                            </div>
                        </div>
                        <div class="form-group has-error">
                            <label class="col-lg-2 control-label">Email : </label>
                            <div class="col-lg-10">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                                <p class="help-block">Aha you gave a wrong info</p>
                            </div>
                        </div>
                        <div class="form-group has-warning">
                            <label class="col-lg-2 control-label">Name : </label>
                            <div class="col-lg-10">
                                <input type="email" placeholder="" id="email2" class="form-control">
                                <p class="help-block">Something went wrong</p>
                            </div>
                        </div>
                        <div class="form-group has-warning">
                            <label class="col-lg-2 control-label">Subscription : </label>
                            <div class="col-lg-10">
                                <input type="email" placeholder="" id="email2" class="form-control">
                                <p class="help-block">Something went wrong</p>
                            </div>
                        </div>
                        <div class="form-group has-warning">
                            <label class="col-lg-2 control-label">Wallet ID : </label>
                            <div class="col-lg-10">
                                <input type="email" placeholder="" id="email2" class="form-control">
                                <p class="help-block">Something went wrong</p>
                            </div>
                        </div>
                        <div class="form-group has-warning">
                            <label class="col-lg-2 control-label">App Force : </label>
                            <div class="col-lg-10">
                                <input type="email" placeholder="" id="email2" class="form-control">
                                <p class="help-block">Something went wrong</p>
                            </div>
                        </div>

                    </form>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /form-panel -->
        </div>
        </div>
        <!-- /row -->
        <!-- FORM VALIDATION -->
        <div class="row mt">
            <div class="col-lg-12">
                <h4><i class="fa fa-angle-right"></i> Billing Details</h4>
                <div class="form-panel">
                    <div class=" form">
                        <form class="cmxform form-horizontal style-form" id="commentForm" method="get" action="">
                            <div class="form-group ">
                                <label for="cname" class="control-label col-lg-2">Billing ID : </label>
                                <div class="col-lg-10">
                                    <input class=" form-control" id="cname" name="name" minlength="2" type="text" required />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="cemail" class="control-label col-lg-2">Balances : </label>
                                <div class="col-lg-10">
                                    <input class="form-control " id="cemail" type="email" name="email" required />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="curl" class="control-label col-lg-2"> Reservations : </label>
                                <div class="col-lg-10">
                                    <input class="form-control " id="curl" type="url" name="url" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-12 -->
        </div>
        <!-- /row -->
        <div class="row mt">
            <div class="col-lg-12">
                <h4><i class="fa fa-angle-right"></i> Add / Remove Credit</h4>
                <div class="form-panel">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-2">Amount : </label>
                                <div class="col-lg-10">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-2">Account : </label>
                                <div class="col-lg-10">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="username" class="control-label col-lg-2">Password : </label>
                                <div class="col-lg-10">
                                    <input class="form-control " id="username" name="username" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="password" class="control-label col-lg-2">Info :</label>
                                <div class="col-lg-10">
                                    <input class="form-control " id="password" name="password" type="password" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="agree" class="control-label col-lg-2 col-sm-3">Agree to Our Policy</label>
                                <div class="col-lg-10 col-sm-9">
                                    <input type="checkbox" style="width: 20px" class="checkbox form-control" id="agree" name="agree" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <button class="btn btn-theme" type="submit">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-12 -->
        </div>
        <!-- /row -->
        <div class="row mt">
            <div class="col-lg-4">
                <h4><i class="fa fa-angle-right"></i> Deactivation/Activation</h4>
                <div class="form-panel">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="agree" class="control-label col-lg-4 col-sm-3">Active :</label>
                                <div class="col-lg-8 col-sm-9">
                                    <input type="checkbox" style="width: 20px" class="checkbox form-control" id="agree" name="agree" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="password" class="control-label col-lg-4">Info :</label>
                                <div class="col-lg-8">
                                    <input class="form-control " id="password" name="password" type="password" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <button class="btn btn-theme" type="submit">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <div class="col-lg-4">
                <h4><i class="fa fa-angle-right"></i> Subscription</h4>
                <div class="form-panel">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-4">Subscription : </label>
                                <div class="col-lg-8">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-4">Plan : </label>
                                <div class="col-lg-8">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <button class="btn btn-theme" type="submit">Proceed</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <div class="col-lg-4">
                <h4><i class="fa fa-angle-right"></i> Package Activation</h4>
                <div class="form-panel">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-4">Package : </label>
                                <div class="col-lg-8">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-4">Duration : </label>
                                <div class="col-lg-8">
                                    <input type="checkbox" style="width: 20px" class="checkbox form-control" id="agree" name="agree" />
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="agree" class="control-label col-lg-4 col-sm-3">Agree to Our Policy</label>
                                <div class="col-lg-8 col-sm-9">
                                    <input type="checkbox" style="width: 20px" class="checkbox form-control" id="agree" name="agree" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <button class="btn btn-theme" type="submit">Active</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-12 -->
        </div>
        <!-- /row -->
        <div class="row mt">
            <div class="col-lg-6">
                <h4><i class="fa fa-angle-right"></i> Add/Replace/Transfer Number </h4>
                <div class="form-panel">
                    <div class="form">
                        <form class="cmxform form-horizontal style-form" id="signupForm" method="get" action="">
                            <div class="form-group ">
                                <label for="firstname" class="control-label col-lg-2">Action : </label>
                                <div class="col-lg-10">
                                    <input class=" form-control" id="firstname" name="firstname" type="text" />
                                </div>
                            </div>
                            <div class="form-group ">
                                <label for="lastname" class="control-label col-lg-2">Number : </label>
                                <div class="col-lg-10">
                                    <input class=" form-control" id="lastname" name="lastname" type="text" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-2 col-lg-10">
                                    <button class="btn btn-theme" type="submit">Add/Replace/Transfer Number</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- /form-panel -->
            </div>
            <!-- /col-lg-6 -->
            <div class="col-lg-6">
                <h4><i class="fa fa-angle-right"></i> Wallet Transactions</h4>
                <div class="form-panel">
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
        </div>
    </section>
    <!-- /wrapper -->
</section>
<?php require "footer.php"; ?>
