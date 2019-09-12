<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Phone Numbers </h3>
        <div class="col-lg-12">
            <div class="content-panel">
                <div class="adv-table">
                    <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="phone-numbers">
                        <thead>
                        <tr>
                            <th>Number</th>
                            <th>Type</th>
                            <th class="hidden-phone">Status</th>
                            <th class="hidden-phone">Autorenew</th>
                            <th class="hidden-phone">Created</th>
                            <th class="hidden-phone">Expiration Date</th>
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
                        </tr>
                        <tr class="gradeC">
                            <td>Trident</td>
                            <td>Internet Explorer 4.0</td>
                            <td class="hidden-phone">Win 95+</td>
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

        $('#phone-numbers').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>
