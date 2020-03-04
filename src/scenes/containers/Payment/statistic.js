import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './../../stayles/statistic.css';
import Chart from "react-apexcharts";
import {PaymentStatisticDailyTable} from "../../components/Table/payment-statistic-daily-table";
import {PaymentStatisticHourlyTable} from "../../components/Table/payment-statistic-hourly-table";
import {PaymentStatisticTotalTable} from "../../components/Table/payment-statistic-total-table";
import {store} from "react-notifications-component";
import {
    StatisticReadChartDaily,
    StatisticReadChartHourly,
    StatisticReadGrid,
    TotalPaymentChart
} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class Statistic extends Component {
    constructor(props){
        super(props);


        let dt = new Date();
        let dd1 = String(dt.getDate()).padStart(2, '0');
        let mm1 = String(dt.getMonth() + 1 - 1).padStart(2, '0');

        let yyyy1 = dt.getFullYear();


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        dt = yyyy1 + '-' + mm1 + '-' + dd1;

        this.state = {
            redirect: false,
            daily: true,
            hourly:false,
            total:false,
            options: {
                colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                grid: {
                    show: true,
                    borderColor: '#90A4AE',
                    padding: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    },
                },
                chart: {
                    id: "basic-bar",
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 350
                        }
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                    labels: {
                        style: {
                            colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                        }
                    }
                }
            },
            optionsHourly: {
                colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                grid: {
                    show: true,
                    borderColor: '#90A4AE',
                    padding: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    },
                },
                chart: {
                    id: "basic-bar-hourly",
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                    labels: {
                        style: {
                            colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                        }
                    }
                }
            },
            optionsTotal: {
                colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                grid: {
                    show: true,
                    borderColor: '#90A4AE',
                    padding: {
                        top: 10,
                        right: 10,
                        bottom: 10,
                        left: 10
                    },
                },
                chart: {
                    id: "basic-bar-Total",
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                    labels: {
                        style: {
                            colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                        }
                    }
                }
            },
            series: [],
            seriesHourly: [],
            seriesTotal: [],
            startDay: dt,
            endDay: today,
            endDayHourly:today,
            readGridHourly:[],
            readGrid:[],
            statisticChartDaily:[]
        };

        this.daily = this.daily.bind(this);
        this.hourly = this.hourly.bind(this);
        this.total = this.total.bind(this);
        this.handleChnage = this.handleChnage.bind(this);
        this.handleSearchTotal = this.handleSearchTotal.bind(this);
        this.handleSearchTotalHourly = this.handleSearchTotalHourly.bind(this);
        this.handleTotalChart = this.handleTotalChart.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    handleChnage = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleTotalChart = (e) => {
        e.preventDefault();

        StatisticReadGrid(this.state.startDay, this.state.endDay,true).then(result => {
            this.setState({
                readGrid: result.data,
            });
        });

        TotalPaymentChart(this.state.startDay, this.state.endDay).then(result => {

            if(result.status === true) {
                const dan = [];
                const series = [{name: 'total_data',data:[]},{name: 'telekom',data:[]}];

                result.data.map(function (data) {
                    dan.push(data.dan);

                    series[0]['data'].push(data.total_data);
                    series[1]['data'].push(data.telekom);
                });

                this.setState({
                    optionsTotal: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                        grid: {
                            show: true,
                            borderColor: '#90A4AE',
                            padding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            },
                        },
                        chart: {
                            id: "basic-bar-Total",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: dan,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    seriesTotal: series
                });

            }
        });

    };

    handleSearchTotalHourly = (e) => {
        e.preventDefault();

        StatisticReadGrid(this.state.startDay, this.state.endDayHourly).then(result => {
            this.setState({
                readGridHourly: result.data,
            });
        });

        StatisticReadChartHourly(this.state.endDayHourly).then(result => {
            if(result.status === true) {

                const sat = [];
                const series = [{name: 'GooglePlay',data:[]},{name: 'PayPal',data:[]},{name: 'PayPalWeb',data:[]},{name: 'PayPinkAik',data:[]},{name: 'TopUp',data:[]},{name: 'gui',data:[]},{name: 'iTunes',data:[]}];

                result.data.map(function (data) {
                    sat.push(data.sat);

                    series[0]['data'].push(data.GooglePlay);
                    series[1]['data'].push(data.PayPal);
                    series[2]['data'].push(data.PayPalWeb);
                    series[3]['data'].push(data.PayPinkAik);
                    series[4]['data'].push(data.TopUp);
                    series[5]['data'].push(data.gui);
                    series[6]['data'].push(data.iTunes);
                });

                this.setState({
                    optionsHourly: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                        grid: {
                            show: true,
                            borderColor: '#90A4AE',
                            padding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            },
                        },
                        chart: {
                            id: "basic-bar-hourly",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: sat,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    seriesHourly:series
                });
            }
        });

    };

    handleSearchTotal = (e) => {
      e.preventDefault();

        StatisticReadGrid(this.state.startDay, this.state.endDay, true).then(result => {
            this.setState({
                readGrid: result.data
            });
        });

        StatisticReadChartDaily(this.state.startDay, this.state.endDay).then(result => {
            if(result.status === true){

                const categories = [];
                const series = [{name: 'GooglePlay',data:[]},{name: 'PayPal',data:[]},{name: 'PayPalWeb',data:[]},{name: 'PayPinkAik',data:[]},{name: 'TopUp',data:[]},{name: 'gui',data:[]},{name: 'iTunes',data:[]}];

                result.data.map(function (data) {
                    categories.push(data.dani);

                    series[0]['data'].push(data.GooglePlay);
                    series[1]['data'].push(data.PayPal);
                    series[2]['data'].push(data.PayPalWeb);
                    series[3]['data'].push(data.PayPinkAik);
                    series[4]['data'].push(data.TopUp);
                    series[5]['data'].push(data.gui);
                    series[6]['data'].push(data.iTunes);
                });

                this.setState({
                    options: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                        grid: {
                            show: true,
                            borderColor: '#90A4AE',
                            padding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            },
                        },
                        chart: {
                            id: "basic-bar",
                            animations: {
                                enabled: true,
                                easing: 'linear',
                                speed: 800,
                                animateGradually: {
                                    enabled: true,
                                    delay: 150
                                },
                                dynamicAnimation: {
                                    enabled: true,
                                    speed: 350
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: categories,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    series:series
                });
            }
        });

    };

    componentDidMount() {

        StatisticReadGrid(this.state.startDay, this.state.endDay,true).then(result => {
            this.setState({
                readGrid: result.data,
            });
        });

        StatisticReadGrid(this.state.startDay, this.state.endDayHourly).then(result => {
            this.setState({
                readGridHourly: result.data,
            });
        });

        TotalPaymentChart(this.state.startDay, this.state.endDay).then(result => {

            if(result.status === true) {
                const dan = [];
                const series = [{name: 'total_data',data:[]},{name: 'telekom',data:[]}];

                result.data.map(function (data) {
                    dan.push(data.dan);

                    series[0]['data'].push(data.total_data);
                    series[1]['data'].push(data.telekom);
                });

                this.setState({
                    optionsTotal: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                        grid: {
                            show: true,
                            borderColor: '#90A4AE',
                            padding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            },
                        },
                        chart: {
                            id: "basic-bar-Total",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: dan,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    seriesTotal: series
                });

            }
        });

        StatisticReadChartHourly(this.state.endDayHourly).then(result => {

            if(result.status === true) {

                const sat = [];
                const series = [{name: 'GooglePlay',data:[]},{name: 'PayPal',data:[]},{name: 'PayPalWeb',data:[]},{name: 'PayPinkAik',data:[]},{name: 'TopUp',data:[]},{name: 'gui',data:[]},{name: 'iTunes',data:[]}];

                result.data.map(function (data) {
                    sat.push(data.sat);

                    series[0]['data'].push(data.GooglePlay);
                    series[1]['data'].push(data.PayPal);
                    series[2]['data'].push(data.PayPalWeb);
                    series[3]['data'].push(data.PayPinkAik);
                    series[4]['data'].push(data.TopUp);
                    series[5]['data'].push(data.gui);
                    series[6]['data'].push(data.iTunes);
                });

                this.setState({
                    optionsHourly: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                        grid: {
                            show: true,
                            borderColor: '#90A4AE',
                            padding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            },
                        },
                        chart: {
                            id: "basic-bar-hourly",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: sat,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    seriesHourly:series
                });
            }
        });

        StatisticReadChartDaily(this.state.startDay, this.state.endDay).then(result => {
            if(result.status === true){

                const categories = [];
                const series = [{name: 'GooglePlay',data:[]},{name: 'PayPal',data:[]},{name: 'PayPalWeb',data:[]},{name: 'PayPinkAik',data:[]},{name: 'TopUp',data:[]},{name: 'gui',data:[]},{name: 'iTunes',data:[]}];

                result.data.map(function (data) {
                    categories.push(data.dani);

                    series[0]['data'].push(data.GooglePlay);
                    series[1]['data'].push(data.PayPal);
                    series[2]['data'].push(data.PayPalWeb);
                    series[3]['data'].push(data.PayPinkAik);
                    series[4]['data'].push(data.TopUp);
                    series[5]['data'].push(data.gui);
                    series[6]['data'].push(data.iTunes);
                });

                this.setState({
                    options: {
                        colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#686f73'],
                        grid: {
                            show: true,
                            borderColor: '#90A4AE',
                            padding: {
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            },
                        },
                        chart: {
                            id: "basic-bar",
                            animations: {
                                enabled: true,
                                easing: 'linear',
                                speed: 800,
                                animateGradually: {
                                    enabled: true,
                                    delay: 150
                                },
                                dynamicAnimation: {
                                    enabled: true,
                                    speed: 350
                                }
                            }
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: categories,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    series:series
                });
            }
        });

    }

    componentWillUnmount() {
        //ToDo
    }

    daily(){
        this.setState({
            daily: !this.state.daily,
            hourly:false,
            total:false
        });
    }

    hourly(){
        this.setState({
            hourly: !this.state.hourly,
            daily:false,
            total:false
        });
    }

    total(){
        this.setState({
            total: !this.state.total,
            daily:false,
            hourly:false
        });
    }

    sessionGet = (key) => {
        let stringValue = window.sessionStorage.getItem(key);
        if (stringValue !== null) {
            let value = JSON.parse(stringValue);
            let expirationDate = new Date(value.expirationDate);
            if (expirationDate > new Date()) {
                return value.value
            } else {
                window.sessionStorage.removeItem(key)
            }
        }
        return null
    };

    componentWillMount() {
        if(this.sessionGet('token')){
            console.log('Call User Feed');
        } else {
            this.setState({
                redirect:true
            });
        }
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }


        const dataTable = this.state.readGrid.map(function (item) {

            return item;

        });

        const dataTableHourly = this.state.readGridHourly.map(function (item) {

            return item;

        });

        function TableReadGrid() {
            if(dataTable.length > 0){
                return <PaymentStatisticDailyTable data={dataTable} />;
            } else {
                return <PaymentStatisticDailyTable data='' />
            }
        }

        function TableReadGridHourly() {
            if(dataTableHourly.length > 0){
                return <PaymentStatisticHourlyTable data={dataTableHourly} />;
            } else {
                return <PaymentStatisticHourlyTable data='' />
            }
        }

        function TableTotal() {
            if(dataTable.length > 0){
                return <PaymentStatisticTotalTable data={dataTable} />;
            } else {
                return <PaymentStatisticTotalTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Statistic</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-2">
                            <div className={this.state.daily?'wrap-border mb-5':'hidden-ul'}>
                                <h6 className="content-title">Transaction Type Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='startDay' value={this.state.startDay} onChange={this.handleChnage} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='endDay' value={this.state.endDay } onChange={this.handleChnage} autoComplete='off' placeholder='End:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleSearchTotal} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={this.state.daily?'wrap-border':'hidden-ul'}>
                                <TableReadGrid/>
                            </div>
                            <div className={this.state.hourly?'wrap-border mb-5':'hidden-ul'}>
                                <h6 className="content-title">Transaction Type Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='endDayHourly' value={this.state.endDayHourly} onChange={this.handleChnage} autoComplete='off' placeholder='End:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light"  onClick={this.handleSearchTotalHourly} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={this.state.hourly?'wrap-border':'hidden-ul'}>
                                <TableReadGridHourly />
                            </div>
                            <div className={this.state.total?'wrap-border mb-5':'hidden-ul'}>
                                <h6 className="content-title">Transaction Type Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='startDay' value={this.state.startDay} onChange={this.handleChnage} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='endDay' value={this.state.endDay } onChange={this.handleChnage} autoComplete='off' placeholder='End:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light"  onClick={this.handleTotalChart} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={this.state.total?'wrap-border':'hidden-ul'}>
                                <TableTotal />
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className='wrap-border  border-table-smt'>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <button type='submit' className="btn btn-block btn-light" onClick={this.daily}>Daily</button>
                                        {this.state.daily ?<hr className="hr-border-color "/> : ''}
                                    </div>
                                    <div className="col-lg-4">
                                        <button type='submit' className="btn btn-block btn-light" onClick={this.hourly} >Hourly</button>
                                        {this.state.hourly ?<hr className="hr-border-color "/> : ''}
                                    </div>
                                    <div className="col-lg-4">
                                        <button type='submit' className="btn btn-block btn-light" onClick={this.total}>Total</button>
                                        {this.state.total ?<hr className="hr-border-color "/> : ''}
                                    </div>
                                </div>
                                <div className={this.state.daily?'row':'hidden-ul'}>
                                    <div className="col-lg-12">
                                        <div className="mixed-chart">
                                            <Chart
                                                options={this.state.options}
                                                series={this.state.series}
                                                type="bar"
                                                width="100%"
                                                height="600"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.hourly?'row':'hidden-ul'}>
                                    <div className="col-lg-12">
                                        <div className="mixed-chart">
                                            <Chart
                                                options={this.state.optionsHourly}
                                                series={this.state.seriesHourly}
                                                type="bar"
                                                width="100%"
                                                height="600"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={this.state.total?'row':'hidden-ul'}>
                                    <div className="col-lg-12">
                                        <div className="mixed-chart">
                                            <Chart
                                                options={this.state.optionsTotal}
                                                series={this.state.seriesTotal}
                                                type="line"
                                                width="100%"
                                                height="600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(Statistic);