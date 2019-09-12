    <?php require "header.php"; ?>
    <section id="main-content">
        <section class="wrapper">
            <h3><i class="fa fa-angle-right"></i> Customer Payment </h3>
                <div class="col-lg-12">
                    <div class="content-panel">
                        <div class="adv-table">
                            <table cellpadding="0" cellspacing="0" border="0" class="display table table-bordered" id="customer-payment-table">
                                <thead>
                                <tr>
                                    <th>Created</th>
                                    <th>Expires</th>
                                    <th class="hidden-phone">ID</th>
                                    <th class="hidden-phone">Transaction</th>
                                    <th class="hidden-phone">Billing Type</th>
                                    <th class="hidden-phone">ALL</th>
                                    <th class="hidden-phone">Committed</th>
                                    <th class="hidden-phone">Result</th>
                                    <th class="hidden-phone">Meta Data</th>
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
                                    <td class="center hidden-phone">X</td>
                                    <td class="center hidden-phone">X</td>

                                </tr>
                                <tr class="gradeC">
                                    <td>Trident</td>
                                    <td>Internet Explorer 4.0</td>
                                    <td class="hidden-phone">Win 95+</td>
                                    <td class="center hidden-phone">4</td>
                                    <td class="center hidden-phone">X</td>
                                    <td class="center hidden-phone">4</td>
                                    <td class="center hidden-phone">X</td>
                                    <td class="center hidden-phone">X</td>
                                    <td class="center hidden-phone">X</td>

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

            $('#customer-payment-table').dataTable({
                "bFilter": false,
                "bInfo": false,
                "bSort": true,
                "bProcessing": true,
                "bLengthChange": false
            });
        });
    </script>
