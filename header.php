<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Dashboard">
    <meta name="keyword" content="Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <title>Globaltel | GUI</title>

    <!-- Favicons -->
    <link href="img/favicon.ico" rel="icon">

    <!-- Bootstrap core CSS -->
    <!--===============================================================================================-->
    <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!--===============================================================================================-->
    <!--external css-->
    <!--===============================================================================================-->
    <link href="lib/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <!--===============================================================================================-->
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    <!--===============================================================================================-->
    <link href="lib/advanced-datatable/css/demo_page.css" rel="stylesheet" />
    <!--===============================================================================================-->
    <link href="lib/advanced-datatable/css/demo_table.css" rel="stylesheet" />
    <!--===============================================================================================-->
    <link rel="stylesheet" href="lib/advanced-datatable/css/DT_bootstrap.css" />
    <!--===============================================================================================-->
    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/style-responsive.css" rel="stylesheet">
    <!--===============================================================================================-->
</head>

<body>
<section id="container">
    <!--header start-->
    <header class="header black-bg">
        <div class="sidebar-toggle-box">
            <div class="fa fa-bars tooltips" data-placement="right" ></div>
        </div>
        <!--logo start-->
        <a href="index.php" class="logo"><b>Globaltel<span>Gui</span></b></a>
        <!--logo end-->
        <div class="top-menu">
            <ul class="nav pull-right top-menu">
                <li><a class="logout" href="login.php">Logout</a></li>
            </ul>
        </div>
    </header>

    <aside>
        <div id="sidebar" class="nav-collapse ">
            <!-- sidebar menu start-->
            <ul class="sidebar-menu" id="nav-accordion">
                <p class="centered">
                    <a class="dropdown-toggle" href="profile.php">
                        <i class="fa fa-user"></i>
                    </a>
                </p>
                <h5 class="centered">Dragoslav Predojevic</h5>
                <li class="mt sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-database"></i>
                        <span>Billing</span>
                    </a>
                    <ul class="sub">
                        <li><a href="customer-billing.php">Customer Billing</a></li>
                        <li><a href="customer-pyment.php">Customer Payment</a></li>
                        <li><a href="charge-log.php">Charge Log</a></li>
                        <li><a href="charge-data-log.php">Charge Data Log</a></li>
                        <li><a href="phone-numbers.php">Phone Numbers</a></li>
                        <li><a href="devices.php">Devices</a></li>
                        <li><a href="cdr-outbound.php">Cdr Outbound</a></li>
                        <li><a href="cdr-inbound.php">Cdr Inbound</a></li>
                        <li><a href="billing-package.php">Package</a></li>
                        <li><a href="sim-details.php">Sim details</a></li>

                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-desktop"></i>
                        <span>Payment</span>
                    </a>
                    <ul class="sub">
                        <li><a href="transaction.php">Transaction</a></li>
                        <li><a href="statistic.php">Statistic</a></li>
                        <li><a href="payment-transaction.php">Payment Transaction</a></li>
                        <li><a href="topup-transaction.php">Topup Transaction</a></li>
                        <li><a href="card-transaction.php">Card Transaction</a></li>
                        <li><a href="ipay-transaction.php">iPay Transaction</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="cdr-log.php">
                        <i class="fa fa-cogs"></i>
                        <span>Cdr Log</span>
                    </a>
                </li>
                <li class="sub-menu">
                    <a href="message-log.php">
                        <i class="fa fa-book"></i>
                        <span>Message Log</span>
                    </a>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-tasks"></i>
                        <span>Cdr</span>
                    </a>
                    <ul class="sub">
                        <li><a href="cdr-hourly-statistic.php">Hourly Statistic</a></li>
                        <li><a href="cdr-daily-statistic.php">Daily Statistic</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-th"></i>
                        <span>Messaging</span>
                    </a>
                    <ul class="sub">
                        <li><a href="messaging-daily.php">Daily</a></li>
                        <li><a href="messaging-hourly.php">Hourly</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Numbers</span>
                    </a>
                    <ul class="sub">
                        <li><a href="numbers.php">Numbers</a></li>
                        <li><a href="numb-statistic.php">Statistic</a></li>
                        <li><a href="flot_chart.html">Special Offer Numbers</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="routes.php">
                        <i class="fa fa-comments-o"></i>
                        <span>Routes</span>
                    </a>
                </li>
                <li class="sub-menu">
                    <a href="rates.php">
                        <i class="fa fa-comments-o"></i>
                        <span>Rates</span>
                    </a>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Parking</span>
                    </a>
                    <ul class="sub">
                        <li><a href="parking-service.php">Parking Service</a></li>
                        <li><a href="parking-stat.php">Parking Stat</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Package</span>
                    </a>
                    <ul class="sub">
                        <li><a href="package.php">Package</a></li>
                        <li><a href="package-group.php">Package Group</a></li>
                        <li><a href="package-stat.php">Package Stat</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Sim, Data & Active users</span>
                    </a>
                    <ul class="sub">
                        <li><a href="sim.php">Sim</a></li>
                        <li>
                            <a href="javascript:;">
                                <i class=" fa fa-bar-chart-o"></i>
                                <span>Sim</span>
                            </a>
                            <ul class="sub">
                                <li><a href="sim-daily.php">Sim Daily</a></li>
                                <li><a href="sim-hourly.php">Sim Hourly</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="activate-users.php">
                                <i class=" fa fa-bar-chart-o"></i>
                                <span>Activate</span>
                            </a>
                        </li>
                        <li>
                            <a href="data.php">
                                <i class=" fa fa-bar-chart-o"></i>
                                <span>Data</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Mastercard</span>
                    </a>
                    <ul class="sub">
                        <li><a href="mastercard-daily-activation-s.php">Daily Activation Statistic</a></li>
                        <li><a href="mastercard-hourly-activation-s.php">Hourly Activation Statistic</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="system-message.php">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>System Message</span>
                    </a>
                </li>
            </ul>
            <!-- sidebar menu end-->
        </div>
    </aside>
    <!--sidebar end-->