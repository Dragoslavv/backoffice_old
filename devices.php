<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Devices </h3>
        <div class="col-lg-12">
            <div class="content-panel">
                <div class="adv-table">
                    <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="devices-table">
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Platform</th>
                            <th class="hidden-phone">Platform Data</th>
                            <th class="hidden-phone">App Version</th>
                            <th class="hidden-phone">Device ID</th>
                            <th class="hidden-phone">Trial Log</th>
                            <th class="hidden-phone">Caller ID</th>
                            <th class="hidden-phone">HC Prefix</th>
                            <th class="hidden-phone">Created</th>
                            <th class="hidden-phone">Registered</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="gradeA">
                            <td>Trident</td>
                            <td>Internet Explorer 4.0</td>
                            <td class="hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                        </tr>
                        <tr class="gradeA">
                            <td>Trident</td>
                            <td>Internet Explorer 4.0</td>
                            <td class="hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</section>
<?php require "footer.php"; ?>
<script type="text/javascript">
    $(document).ready(function() {

        $('#devices-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>
