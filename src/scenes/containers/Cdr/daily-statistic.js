import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import {CdrHourlyStatistic} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class DailyStatistic extends Component {
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
            redirect:false,
            start: dt,
            end: today,
            account_code_name: '',
            inType: '',
            type:'',
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
                    id: "basic-bar-hourly-statistic",
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                }
            },
            series: []
        };

        this.handleChnage = this.handleChnage.bind(this);
        this.handleClickHourly = this.handleClickHourly.bind(this);
        this.onClickReset = this.onClickReset.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    onClickReset = (e) => {
        e.preventDefault();


        CdrHourlyStatistic(this.state.start, this.state.end).then(result => {

            if(result.status === true) {

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

                this.setState({
                    start: dt,
                    end: today,
                    account_code_name: '',
                    inType: '',
                    type: '',
                });


                const day = [];
                const series = [{name: 'ANSWERED',data:[]},{name: 'BUSY',data:[]},{name: 'NO ANSWER',data:[]},{name: 'FAILED',data:[]},{name: 'CONGESTION',data:[]},{name: 'BILLMIN',data:[]}];


                result.data.map(function (data) {
                    day.push(data.day);

                    series[0]['data'].push(data.ANSWERED);
                    series[1]['data'].push(data.BUSY);
                    series[2]['data'].push(data.NO_ANSWER);
                    series[3]['data'].push(data.FAILED);
                    series[4]['data'].push(data.CONGESTION);
                    series[5]['data'].push(data.billmin);

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
                            id: "basic-bar-Total",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: day,
                        }
                    },
                    series: series
                });

            }
        });

    };

    handleChnage = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };

    handleClickHourly = (e) => {
        e.preventDefault();

        CdrHourlyStatistic(this.state.start, this.state.end, this.state.account_code_name, this.state.type, this.state.inType).then(result => {

            if(result.status === true) {
                const day = [];
                const series = [{name: 'ANSWERED',data:[]},{name: 'BUSY',data:[]},{name: 'NO ANSWER',data:[]},{name: 'FAILED',data:[]},{name: 'CONGESTION',data:[]},{name: 'BILLMIN',data:[]}];


                result.data.map(function (data) {
                    day.push(data.day);

                    series[0]['data'].push(data.ANSWERED);
                    series[1]['data'].push(data.BUSY);
                    series[2]['data'].push(data.NO_ANSWER);
                    series[3]['data'].push(data.FAILED);
                    series[4]['data'].push(data.CONGESTION);
                    series[5]['data'].push(data.billmin);

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
                            id: "basic-bar-Total",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: day,
                        }
                    },
                    series: series
                });

            }
        });

    };

    componentDidMount() {

        CdrHourlyStatistic(this.state.start, this.state.end, this.state.account_code_name, this.state.type, this.state.inType).then(result => {

            if(result.status === true) {
                const day = [];
                const series = [{name: 'ANSWERED',data:[]},{name: 'BUSY',data:[]},{name: 'NO ANSWER',data:[]},{name: 'FAILED',data:[]},{name: 'CONGESTION',data:[]},{name: 'BILLMIN',data:[]}];


                result.data.map(function (data) {
                    day.push(data.day);

                    series[0]['data'].push(data.ANSWERED);
                    series[1]['data'].push(data.BUSY);
                    series[2]['data'].push(data.NO_ANSWER);
                    series[3]['data'].push(data.FAILED);
                    series[4]['data'].push(data.CONGESTION);
                    series[5]['data'].push(data.billmin);

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
                            id: "basic-bar-Total",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: day,
                        }
                    },
                    series: series
                });

            }
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
                window.sessionStorage.removeItem(key);
                sessionStorage.setItem('billing_active','');
                sessionStorage.setItem('billing_balances','');
                sessionStorage.setItem('billing_id','');
                sessionStorage.setItem('billing_brand','');
                sessionStorage.setItem('billing_created','');
                sessionStorage.setItem('billing_email','');
                sessionStorage.setItem('billing_force_app','');
                sessionStorage.setItem('billing_name','');
                sessionStorage.setItem('billing_reservations','');
                sessionStorage.setItem('billing_user_id','');
                sessionStorage.setItem('billing_user_type','');
                sessionStorage.setItem('billing_wallet_id','');

                sessionStorage.setItem('number','');
                sessionStorage.setItem('email','');
                sessionStorage.setItem('userId','');
                sessionStorage.setItem('billingId','');

                sessionStorage.removeItem('number');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('billingId');

                sessionStorage.removeItem('billing_active');
                sessionStorage.removeItem('billing_balances');
                sessionStorage.removeItem('billing_id');
                sessionStorage.removeItem('billing_brand');
                sessionStorage.removeItem('billing_created');
                sessionStorage.removeItem('billing_email');
                sessionStorage.removeItem('billing_force_app');
                sessionStorage.removeItem('billing_name');
                sessionStorage.removeItem('billing_reservations');
                sessionStorage.removeItem('billing_user_id');
                sessionStorage.removeItem('billing_user_type');
                sessionStorage.removeItem('billing_wallet_id');
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

    componentWillUnmount() {
        //ToDo
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Hourly Statistic</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-2  mb-3">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">Filter</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='start' value={this.state.start} onChange={this.handleChnage} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='end' value={this.state.end} onChange={this.handleChnage} autoComplete='off' placeholder='End:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="account_code_name" value={this.state.account_code_name} onChange={this.handleChnage}>
                                            <option value="">ALL</option>
                                            <option value="1">app2app</option>
                                            <option value="2">app2sim</option>
                                            <option value="3">sim2sim</option>
                                            <option value="4">sim2app</option>
                                            <option value="5">vip2app</option>
                                            <option value="6">vim2sim</option>
                                            <option value="7">sr_mobile2app</option>
                                            <option value="8">sr_mobile2sim</option>
                                            <option value="9">sr_landline2app</option>
                                            <option value="10">sr_landline2sim</option>
                                            <option value="11">ino2app</option>
                                            <option value="12">ino2sim</option>
                                            <option value="13">app2vip</option>
                                            <option value="14">sim2vip</option>
                                            <option value="15">app2sr_mobile</option>
                                            <option value="16">sim2sr_mobile</option>
                                            <option value="17">app2sr_landline</option>
                                            <option value="18">sim2sr_landline</option>
                                            <option value="19">app2ino</option>
                                            <option value="20">sim2ino</option>
                                            <option value="21">app2sr_services</option>
                                            <option value="22">sim2sr_services</option>
                                            <option value="23">sr_services2app</option>
                                            <option value="24">sr_services2sim</option>
                                            <option value="30">sim2global_services</option>
                                            <option value="31">sim2short_code</option>
                                            <option value="32">app2global_services</option>
                                            <option value="33">app2short_code</option>
                                            <option value="51">auth2sim</option>
                                            <option value="52">auth2vip</option>
                                            <option value="53">auth2sr_mobile</option>
                                            <option value="54">auth2sr_landline</option>
                                            <option value="55">auth2ino</option>
                                            <option value="56">auth2sr_services</option>
                                            <option value="57">auth2global_services</option>
                                            <option value="58">auth2short_code</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="type" value={this.state.type} onChange={this.handleChnage}>
                                            <option value="">ALL</option>
                                            <option value="app2telr">app2tel</option>
                                            <option value="tel2app">tel2app</option>
                                            <option value="sim2tel">sim2tel</option>
                                            <option value="tel2sim">tel2sim</option>
                                            <option value="allip">allip</option>
                                            <option value="tvlive">tvlive</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="inType" value={this.state.inType} onChange={this.handleChnage}>
                                            <option value="">ALL</option>
                                            <option value="inbound">inbound</option>
                                            <option value="outbound">outbound</option>
                                            <option value="in_international">in_international</option>
                                            <option value="out_international">out_international</option>
                                        </select>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info" onClick={this.onClickReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" onClick={this.handleClickHourly} type="submit">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className='wrap-border table-col-gui'>
                                <Chart
                                    options={this.state.options}
                                    series={this.state.series}
                                    type="line"
                                    width="100%"
                                    height='600'
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(DailyStatistic);