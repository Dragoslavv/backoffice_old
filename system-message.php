<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> System Message </h3>
        <div class="row mt">
            <div class="col-lg-4 p-2">
                <h4><i class="fa fa-angle-right"></i> Brand</h4>
                <div class="form-panel">
                    <div class="panel-heading">
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active">
                                <a data-toggle="tab" href="#search">Search</a>
                            </li>
                            <li>
                                <a data-toggle="tab" href="#message-create" class="contact-map">Create Message</a>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body">
                        <div class="tab-content">
                            <div id="search" class="tab-pane active">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-panel">
                                            <form role="form" class="form-horizontal style-form">
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Key : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="f-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group ">
                                                    <label class="col-lg-4 control-label">Brand : </label>
                                                    <div class="col-lg-8">
                                                        <div class="dropdown">
                                                            <button class="btn btn-default dropdown-toggle btn-block" type="button" data-toggle="dropdown">ALL
                                                                <span class="caret"></span></button>
                                                            <ul class="dropdown-menu">
                                                                <li><a href="#">Big River</a></li>
                                                                <li><a href="#">Easy</a></li>
                                                                <li><a href="#">globaltel</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Script : </label>
                                                    <div class="col-lg-8">
                                                        <div class="dropdown">
                                                            <button class="btn btn-default dropdown-toggle btn-block" type="button" data-toggle="dropdown">ALL
                                                                <span class="caret"></span></button>
                                                            <ul class="dropdown-menu">
                                                                <li><a href="#">add number</a></li>
                                                                <li><a href="#">add number</a></li>
                                                                <li><a href="#">add number</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-offset-4 col-lg-8">
                                                        <button class="btn btn-theme" type="submit"><i class="fa fa-refresh"></i> Reset</button>
                                                        <button class="btn btn-success" type="button"><i class="fa fa-search"></i> Search</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div id="message-create" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-panel">
                                            <form role="form" class="form-horizontal style-form">
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Key : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="f-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group ">
                                                    <label class="col-lg-4 control-label">Message : </label>
                                                    <div class="col-lg-8">
                                                        <textarea type="text" placeholder="" id="l-name" class="form-control"></textarea>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Language : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="l-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label class="col-lg-4 control-label">Script : </label>
                                                    <div class="col-lg-8">
                                                        <input type="text" placeholder="" id="l-name" class="form-control">
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-offset-4 col-lg-8">
                                                        <button class="btn btn-theme" type="submit"><i class="fa fa-remove"></i> Clear</button>
                                                        <button class="btn btn-success" type="button"><i class="fa fa-plus"></i> Create</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8 p-2">
                <h4><i class="fa fa-angle-right"></i>Data </h4>
                <div class="content-panel">
                    <div class="adv-table">
                        <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="system-message-table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Key</th>
                                <th class="hidden-phone">Message</th>
                                <th class="hidden-phone">Language</th>
                                <th class="hidden-phone">Brand</th>
                                <th class="hidden-phone">Script</th>
                                <th class="hidden-phone">Actions</th>
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

        $('#system-message-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>