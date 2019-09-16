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
                                <input type="text" placeholder="" id="p-id" class="form-control">
                            </div>
                        </div>
                        <div class="form-group ">
                            <label class="col-lg-4 control-label">Username : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="p-username" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">First Name : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="p-first-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Last Name : </label>
                            <div class="col-lg-8">
                                <input type="text" placeholder="" id="p-last-name" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Email : </label>
                            <div class="col-lg-8">
                                <input type="email" placeholder="" id="p-email" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-4 control-label">Role : </label>
                            <div class="col-lg-8">
                                <div class="dropdown">
                                    <button class="btn btn-default dropdown-toggle btn-block" type="button" data-toggle="dropdown">
                                        ALL <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">Big River</a></li>
                                        <li><a href="#">Easy</a></li>
                                        <li><a href="#">globaltel</a></li>
                                    </ul>
                                </div>
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
            <?php
            $url = 'http://new-gui.com/php/operator/read.php';
            $json = file_get_contents($url);
            $data = json_decode($json, TRUE);
            var_dump($json);
            ?>
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