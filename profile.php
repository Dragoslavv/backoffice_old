<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Profile </h3>
        <div class="row">
            <div class="col-lg-3 p-2">
                <h4><i class="fa fa-angle-right"></i> Operator</h4>
                <div class="form-panel">
                    <form role="form" class="form-horizontal style-form">
                        <div class="form-group">
                            <div class="col-lg-offset-4 col-lg-8">
                                <button class="btn btn-success btn-block" type="submit"><i class="fa fa-user-plus"></i> Add</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">ID : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="f-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-4 control-label">Username : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="l-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">First Name : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Last Name : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Email : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="email2" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Role : </label>
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

            <div class="col-lg-9 p-2">
                <h4><i class="fa fa-angle-right"></i> Data</h4>
                <div class="content-panel">
                    <div class="adv-table">
                        <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="profile-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th class="hidden-phone">First Name</th>
                                <th class="hidden-phone">Last Name</th>
                                <th class="hidden-phone">Role</th>
                                <th class="hidden-phone">Email</th>
                                <th class="hidden-phone">Phone</th>
                                <th class="hidden-phone">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="gradeX">
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td class="hidden-phone">Win 95+</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeC">
                                <td>Trident</td>
                                <td>Internet Explorer 4.0</td>
                                <td class="hidden-phone">Win 95+</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Trident</td>
                                <td>Internet Explorer 5.5</td>
                                <td class="hidden-phone">Win 95+</td>
                                <td class="center hidden-phone">5.5</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Trident</td>
                                <td>Internet Explorer 6</td>
                                <td class="hidden-phone">Win 98+</td>
                                <td class="center hidden-phone">6</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Trident</td>
                                <td>Internet Explorer 7</td>
                                <td class="hidden-phone">Win XP SP2+</td>
                                <td class="center hidden-phone">7</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Trident</td>
                                <td>AOL browser (AOL desktop)</td>
                                <td class="hidden-phone">Win XP</td>
                                <td class="center hidden-phone">6</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Firefox 1.0</td>
                                <td class="hidden-phone">Win 98+ / OSX.2+</td>
                                <td class="center hidden-phone">1.7</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Firefox 1.5</td>
                                <td class="hidden-phone">Win 98+ / OSX.2+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Firefox 2.0</td>
                                <td class="hidden-phone">Win 98+ / OSX.2+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Firefox 3.0</td>
                                <td class="hidden-phone">Win 2k+ / OSX.3+</td>
                                <td class="center hidden-phone">1.9</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Camino 1.0</td>
                                <td class="hidden-phone">OSX.2+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Camino 1.5</td>
                                <td class="hidden-phone">OSX.3+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Netscape 7.2</td>
                                <td class="hidden-phone">Win 95+ / Mac OS 8.6-9.2</td>
                                <td class="center hidden-phone">1.7</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Netscape Browser 8</td>
                                <td class="hidden-phone">Win 98SE+</td>
                                <td class="center hidden-phone">1.7</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Netscape Navigator 9</td>
                                <td class="hidden-phone">Win 98+ / OSX.2+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.0</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.1</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1.1</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.2</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1.2</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.3</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1.3</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.4</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1.4</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.5</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1.5</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.6</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">1.6</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>

                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.7</td>
                                <td class="hidden-phone">Win 98+ / OSX.1+</td>
                                <td class="center hidden-phone">1.7</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Mozilla 1.8</td>
                                <td class="hidden-phone">Win 98+ / OSX.1+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Seamonkey 1.1</td>
                                <td class="hidden-phone">Win 98+ / OSX.2+</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Gecko</td>
                                <td>Epiphany 2.20</td>
                                <td class="hidden-phone">Gnome</td>
                                <td class="center hidden-phone">1.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>Safari 1.2</td>
                                <td class="hidden-phone">OSX.3</td>
                                <td class="center hidden-phone">125.5</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>Safari 1.3</td>
                                <td class="hidden-phone">OSX.3</td>
                                <td class="center hidden-phone">312.8</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>Safari 2.0</td>
                                <td class="hidden-phone">OSX.4+</td>
                                <td class="center hidden-phone">419.3</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>Safari 3.0</td>
                                <td class="hidden-phone">OSX.4+</td>
                                <td class="center hidden-phone">522.1</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>OmniWeb 5.5</td>
                                <td class="hidden-phone">OSX.4+</td>
                                <td class="center hidden-phone">420</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>iPod Touch / iPhone</td>
                                <td class="hidden-phone">iPod</td>
                                <td class="center hidden-phone">420.1</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Webkit</td>
                                <td>S60</td>
                                <td class="hidden-phone">S60</td>
                                <td class="center hidden-phone">413</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 7.0</td>
                                <td class="hidden-phone">Win 95+ / OSX.1+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 7.5</td>
                                <td class="hidden-phone">Win 95+ / OSX.2+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 8.0</td>
                                <td class="hidden-phone">Win 95+ / OSX.2+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 8.5</td>
                                <td class="hidden-phone">Win 95+ / OSX.2+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 9.0</td>
                                <td class="hidden-phone">Win 95+ / OSX.3+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 9.2</td>
                                <td class="hidden-phone">Win 88+ / OSX.3+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>

                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera 9.5</td>
                                <td class="hidden-phone">Win 88+ / OSX.3+</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Opera for Wii</td>
                                <td class="hidden-phone">Wii</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Nokia N800</td>
                                <td class="hidden-phone">N800</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Presto</td>
                                <td>Nintendo DS browser</td>
                                <td class="hidden-phone">Nintendo DS</td>
                                <td class="center hidden-phone">8.5</td>
                                <td class="center hidden-phone">C/A<sup>1</sup></td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeC">
                                <td>KHTML</td>
                                <td>Konqureror 3.1</td>
                                <td class="hidden-phone">KDE 3.1</td>
                                <td class="center hidden-phone">3.1</td>
                                <td class="center hidden-phone">C</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>KHTML</td>
                                <td>Konqureror 3.3</td>
                                <td class="hidden-phone">KDE 3.3</td>
                                <td class="center hidden-phone">3.3</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>KHTML</td>
                                <td>Konqureror 3.5</td>
                                <td class="hidden-phone">KDE 3.5</td>
                                <td class="center hidden-phone">3.5</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeX">
                                <td>Tasman</td>
                                <td>Internet Explorer 4.5</td>
                                <td class="hidden-phone">Mac OS 8-9</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeC">
                                <td>Tasman</td>
                                <td>Internet Explorer 5.1</td>
                                <td class="hidden-phone">Mac OS 7.6-9</td>
                                <td class="center hidden-phone">1</td>
                                <td class="center hidden-phone">C</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeC">
                                <td>Tasman</td>
                                <td>Internet Explorer 5.2</td>
                                <td class="hidden-phone">Mac OS 8-X</td>
                                <td class="center hidden-phone">1</td>
                                <td class="center hidden-phone">C</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Misc</td>
                                <td>NetFront 3.1</td>
                                <td>Embedded devices</td>
                                <td class="center">-</td>
                                <td class="center">C</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeA">
                                <td>Misc</td>
                                <td>NetFront 3.4</td>
                                <td class="hidden-phone">Embedded devices</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">A</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeX">
                                <td>Misc</td>
                                <td>Dillo 0.8</td>
                                <td class="hidden-phone">Embedded devices</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeX">
                                <td>Misc</td>
                                <td>Links</td>
                                <td class="hidden-phone">Text only</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeX">
                                <td>Misc</td>
                                <td>Lynx</td>
                                <td class="hidden-phone">Text only</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeC">
                                <td>Misc</td>
                                <td>IE Mobile</td>
                                <td class="hidden-phone">Windows Mobile 6</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">C</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeC">
                                <td>Misc</td>
                                <td>PSP browser</td>
                                <td class="hidden-phone">PSP</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">C</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
                            </tr>
                            <tr class="gradeU">
                                <td>Other browsers</td>
                                <td>All others</td>
                                <td class="hidden-phone">-</td>
                                <td class="center hidden-phone">-</td>
                                <td class="center hidden-phone">U</td>
                                <td class="center hidden-phone">4</td>
                                <td class="center hidden-phone">X</td>
                                <td class="center hidden-phone">
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-edit"></i></button>
                                    <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i></button>
                                </td>
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

        $('#profile-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>