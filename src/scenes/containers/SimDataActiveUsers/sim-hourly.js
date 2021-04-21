import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import {sim_hourly} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";

class SimHourly extends Component {
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
                    id: "basic-bar-sim-hourly-consumption",
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                }
            },
            series: [],
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    };

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        sim_hourly(this.state.date).then(result => {
            const counter = [];
            const series = [{name: 'Hours',data:[]}];

            result.data.map(function (data) {
                counter.push(data.stat_hour);

                series[0]['data'].push(data.counter);
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
                        id: "basic-bar-sim-hourly-consumption",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        categories: counter,
                    }
                },
                series: series
            });


        });

    };

    componentDidMount(){

        sim_hourly(this.state.date).then(result => {
            const counter = [];
            const series = [{name: 'Hours',data:[]}];

            result.data.map(function (data) {
                counter.push(data.stat_hour);

                series[0]['data'].push(data.counter);
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
                        id: "basic-bar-sim-hourly-consumption",
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        categories: counter,
                    }
                },
                series: series
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
                            <li className="breadcrumb-item active" aria-current="page">Sim Hourly</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-2 mb-3">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">Hourly</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='date' value={this.state.date} onChange={this.handleChanges} autoComplete='off' placeholder='Date:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-success btn-login-from" onClick={this.handleClick} type="submit">Apply</button>
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

export default withRouter(SimHourly);