<?php require "header.php"; ?>
<section id="main-content">
    <section class="wrapper">
        <h3><i class="fa fa-angle-right"></i> Package </h3>
        <div class="col-lg-12">
            <div class="content-panel">
                <div class="adv-table">
                    <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="sim-detail-table">
                        <thead>
                        <tr>
                            <th>Number</th>
                            <th>Insert Time</th>
                            <th class="hidden-phone">Activation Time</th>
                            <th class="hidden-phone">Status</th>
                            <th class="hidden-phone">Bonus Activated</th>
                            <th class="hidden-phone">ICCID</th>
                            <th class="hidden-phone">Vendor</th>
                            <th class="hidden-phone">PUK1</th>
                            <th class="hidden-phone">PUK2</th>
                            <th class="hidden-phone">Sim Type</th>
                            <th class="hidden-phone">IMSI</th>
                            <th class="hidden-phone">PIN2</th>
                            <th class="hidden-phone">SQN</th>
                            <th class="hidden-phone">Ported</th>
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
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                        </tr>
                        <tr class="gradeC">
                            <td>Trident</td>
                            <td>Internet Explorer 4.0</td>
                            <td class="hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">X</td>
                            <td class="center hidden-phone">4</td>
                            <td class="center hidden-phone">Win 95+</td>
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

        $('#sim-detail-table').dataTable({
            "bFilter": false,
            "bInfo": false,
            "bSort": true,
            "bProcessing": true,
            "bLengthChange": false
        });
    });
</script>
