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
    <link href="images/icons/favicon.ico" rel="icon">

    <!-- Bootstrap core CSS -->
    <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!--external css-->
    <link href="lib/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="lib/advanced-datatable/css/demo_page.css" rel="stylesheet" />
    <link href="lib/advanced-datatable/css/demo_table.css" rel="stylesheet" />
    <link rel="stylesheet" href="lib/advanced-datatable/css/DT_bootstrap.css" />
    <!-- Custom styles for this template -->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/style-responsive.css" rel="stylesheet">
</head>

<body>
<section id="container">
    <!--header start-->
    <header class="header black-bg">
        <div class="sidebar-toggle-box">
            <div class="fa fa-bars tooltips" data-placement="right" data-original-title="Toggle Navigation"></div>
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
    <!--header end-->
    <!-- **********************************************************************************************************************************************************
        MAIN SIDEBAR MENU
        *********************************************************************************************************************************************************** -->
    <!--sidebar start-->
    <aside>
        <div id="sidebar" class="nav-collapse ">
            <!-- sidebar menu start-->
            <ul class="sidebar-menu" id="nav-accordion">
                <p class="centered">
                    <a class="dropdown-toggle" href="profile.html">
                        <i class="fa fa-user"></i>
                    </a>
                </p>
                <h5 class="centered">Dragoslav Predojevic</h5>
                <li class="mt sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-dashboard"></i>
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
                        <li><a href="package.php">Package</a></li>
                        <li><a href="sim-details.php">Sim details</a></li>

                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-desktop"></i>
                        <span>Payment</span>
                    </a>
                    <ul class="sub">
                        <li><a href="customer-billing.php">Transaction</a></li>
                        <li><a href="buttons.html">Statistic</a></li>
                        <li><a href="panels.html">Payment Transaction</a></li>
                        <li><a href="font_awesome.html">Topup Transaction</a></li>
                        <li><a href="font_awesome.html">Card Transaction</a></li>
                        <li><a href="font_awesome.html">iPay Transaction</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-cogs"></i>
                        <span>Cdr Log</span>
                    </a>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
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
                        <li><a href="form_component.html">Hourly Statistic</a></li>
                        <li><a href="advanced_form_components.html">Daily Statistic</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-th"></i>
                        <span>Messaging</span>
                    </a>
                    <ul class="sub">
                        <li><a href="basic_table.html">Hourly</a></li>
                        <li><a href="responsive_table.html">Daily</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Numbers</span>
                    </a>
                    <ul class="sub">
                        <li><a href="morris.html">Numbers</a></li>
                        <li><a href="chartjs.html">Statistic</a></li>
                        <li><a href="flot_chart.html">Special Offer Numbers</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class="fa fa-comments-o"></i>
                        <span>Routes</span>
                    </a>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
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
                        <li><a href="morris.html">Parking Service</a></li>
                        <li><a href="chartjs.html">Parking Stat</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Package</span>
                    </a>
                    <ul class="sub">
                        <li><a href="morris.html">Package</a></li>
                        <li><a href="chartjs.html">Package Group</a></li>
                        <li><a href="chartjs.html">Package Stat</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>Sim, Data & Active users</span>
                    </a>
                    <ul class="sub">
                        <li><a href="morris.html">Sim</a></li>
                        <li>
                            <a href="javascript:;">
                                <i class=" fa fa-bar-chart-o"></i>
                                <span>Sim</span>
                            </a>
                            <ul class="sub">
                                <li><a href="morris.html">Sim Daily</a></li>
                                <li><a href="chartjs.html">Sim Hourly</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="chartjs.html">
                                <i class=" fa fa-bar-chart-o"></i>
                                <span>Activate</span>
                            </a>
                        </li>
                        <li>
                            <a href="chartjs.html">
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
                        <li><a href="morris.html">Daily Activation Statistic</a></li>
                        <li><a href="chartjs.html">Hourly Activation Statistic</a></li>
                    </ul>
                </li>
                <li class="sub-menu">
                    <a href="javascript:;">
                        <i class=" fa fa-bar-chart-o"></i>
                        <span>System Message</span>
                    </a>
                </li>
            </ul>
            <!-- sidebar menu end-->
        </div>
    </aside>
    <!--sidebar end-->