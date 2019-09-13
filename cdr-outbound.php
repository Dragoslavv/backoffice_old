<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Cdr Outbound </h3>
        <div class="col-lg-12">
            <div class="content-panel">
                <div class="adv-table">
                    <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="cdr-outbound-table">
                        <thead>
                        <tr>
                            <th>Start</th>
                            <th>End</th>
                            <th class="hidden-phone">Answer</th>
                            <th class="hidden-phone">Duration</th>
                            <th class="hidden-phone">Billsec</th>
                            <th class="hidden-phone">Source</th>
                            <th class="hidden-phone">Destination</th>
                            <th class="hidden-phone">Caller ID</th>
                            <th class="hidden-phone">Roaming</th>
                            <th class="hidden-phone">Disposition</th>
                            <th class="hidden-phone">ALL</th>
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
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
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

        $('#cdr-outbound-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>
