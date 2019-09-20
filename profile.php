<?php require "header.php"; ?>
<?php $profile = $_SESSION['operator'][0] ; ?>
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
                                        <li><a href="#">Admin</a></li>
                                        <li><a href="#">User</a></li>
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
                            <?php $profile = json_decode($profile);  foreach ($profile->data as $key=>$val):  ?>
                                <tr class='gradeA' id="<?php echo $val->id; ?>">
                                    <td><?php echo $val->id; ?></td>
                                    <td><?php echo $val->username; ?></td>
                                    <td class='hidden-phone'><?php echo $val->firstname; ?></td>
                                    <td class='center hidden-phone'><?php echo $val->lastname; ?></td>
                                    <td class='center hidden-phone'><?php echo $val->role; ?></td>
                                    <td class='center hidden-phone'><?php echo $val->email; ?></td>
                                    <td class='center hidden-phone'><?php echo $val->phone; ?></td>
                                    <td class='center hidden-phone'>
                                        <button class='btn btn-theme' type='submit'><i class='fa fa-edit'></i></button>
                                        <button class='btn btn-theme' type='submit'><i class='fa fa-remove'></i></button>
                                    </td>
                                <tr>
                                <?php endforeach; ?>
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