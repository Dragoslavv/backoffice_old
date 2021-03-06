import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import {statistic_hourly_master, total_hourly_mastercard} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";

class HourlyActivationStatistic extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            date:today,
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
                    id: "basic-bar-hourly-mastercard",
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                }
            },
            series: [],
            total_activ: '',
            total_regis: '',
            total_inter: ''
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    handleReset = (e) => {
        e.preventDefault();

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.setState({
            date: today
        });

        total_hourly_mastercard(this.state.date).then(result => {

            this.setState({
                total_activ: (result.data[0].AKTIVACIJA !== null)?'ACTIVATED: '+result.data[0].AKTIVACIJA:'',
                total_regis: (result.data[0].REGISTRACIJA !== null)?'REGISTERED: '+result.data[0].REGISTRACIJA:'',
                total_inter: (result.data[0].INTERESOVANJE !== null)?'INTERESTED IN: '+result.data[0].INTERESOVANJE:''
            });
        });

        statistic_hourly_master(this.state.date).then(result => {
            const hour = [];
            const series = [{name: 'REGISTERED',data:[]},{name: 'ACTIVATED',data:[]},{name: 'INTERESTED IN',data:[]}];


            result.data.map(function (data) {
                hour.push(data.hour);

                series[0]['data'].push(data.REGISTRATED);
                series[1]['data'].push(data.ACTIVATED);
                series[2]['data'].push(data.INTERESTED);
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
                        id: "basic-bar-hourly-mastercard",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        categories: hour,
                    }
                },
                series: series,
            });

        });
    };

    handleClick = (e) => {
        e.preventDefault();

        total_hourly_mastercard(this.state.date).then(result => {
            this.setState({
                total_activ: (result.data[0].AKTIVACIJA !== null)?'ACTIVATED: '+result.data[0].AKTIVACIJA:'',
                total_regis: (result.data[0].REGISTRACIJA !== null)?'REGISTERED: '+result.data[0].REGISTRACIJA:'',
                total_inter: (result.data[0].INTERESOVANJE !== null)?'INTERESTED IN: '+result.data[0].INTERESOVANJE:''
            });
        });

        statistic_hourly_master(this.state.date).then(result => {
            const hour = [];
            const series = [{name: 'REGISTERED',data:[]},{name: 'ACTIVATED',data:[]},{name: 'INTERESTED IN',data:[]}];


            result.data.map(function (data) {
                hour.push(data.hour);

                series[0]['data'].push(data.REGISTRATED);
                series[1]['data'].push(data.ACTIVATED);
                series[2]['data'].push(data.INTERESTED);
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
                        id: "basic-bar-hourly-mastercard",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        categories: hour,
                    }
                },
                series: series,
            });

        });

    };

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    componentDidMount(){

        total_hourly_mastercard(this.state.date).then(result => {
            this.setState({
                total_activ: (result.data[0].AKTIVACIJA !== null)?'ACTIVATED: '+result.data[0].AKTIVACIJA:'',
                total_regis: (result.data[0].REGISTRACIJA !== null)?'REGISTERED: '+result.data[0].REGISTRACIJA:'',
                total_inter: (result.data[0].INTERESOVANJE !== null)?'INTERESTED IN: '+result.data[0].INTERESOVANJE:''
            });
        });

        statistic_hourly_master(this.state.date).then(result => {
            const hour = [];
            const series = [{name: 'REGISTERED',data:[]},{name: 'ACTIVATED',data:[]},{name: 'INTERESTED IN',data:[]}];


            result.data.map(function (data) {
                hour.push(data.hour);

                series[0]['data'].push(data.REGISTRATED);
                series[1]['data'].push(data.ACTIVATED);
                series[2]['data'].push(data.INTERESTED);
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
                        id: "basic-bar-hourly-mastercard",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        categories: hour,
                    }
                },
                series: series,
            });

        });

    }

    sessionGet = (key) => {
        let stringValue = window.sessionStorage.getItem(key);
        if (stringValue !== null) {
            let value = JSON.parse(stringValue);
            let expirationDate = new Date(value.expirationDate);
            if (value.value) {
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
        // this.$el.DataTable.destroy(true);
    }

    render() {

        const cookies = new Cookies();

        if(!cookies.get('tokens')){
            return <Redirect to={'/'} />
        }

        return (
            <div id="wrapper" className={ cookies.get('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Hourly Activation Statistic</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-2">
                            <div className='wrap-border table-col-gui mb-5'>
                                <h6 className="content-title">Filter</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' value={this.state.date} onChange={this.handleChanges} name='date' autoComplete='off' placeholder='Date:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success btn-login-from" onClick={this.handleClick} type="submit">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='wrap-border table-col-gui mb-5'>
                                <h6 className="content-title">Total</h6>
                                <hr/>
                                <div className='form-group billing-input'>
                                    <input className='input' type='text' name='total_activ' value={this.state.total_activ} onChange={this.handleChanges} readOnly={true} autoComplete='off' placeholder='ACTIVATED:'/>
                                </div>
                                <div className='form-group billing-input'>
                                    <input className='input' type='text' name='total_regis' value={this.state.total_regis} onChange={this.handleChanges} readOnly={true} autoComplete='off' placeholder='REGISTERED:'/>
                                </div>
                                <div className='form-group billing-input'>
                                    <input className='input' type='text' name='total_inter' value={this.state.total_inter} onChange={this.handleChanges} readOnly={true} autoComplete='off' placeholder='INTERESTED:'/>
                                </div>
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

export default withRouter(HourlyActivationStatistic);