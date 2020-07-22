import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import {currentlyActivePackages, distPack} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class DailyActivePackages extends Component {
    constructor(props){
        super(props);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            day: today,
            package: '',
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
                    id: "basic-bar-packages-stat",
                },
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: [],
                },
            },
            series: [],
            dist_pack:[],
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.sessionGet = this.sessionGet.bind(this);

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

    handleReset = (e) => {
        e.preventDefault();

        currentlyActivePackages(this.state.day, this.state.package).then(result => {

            if(result.status === true){

                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;

                this.setState({
                    day: today,
                    package: '',
                });

                const day = [];
                const series = [];

                result.data.map(function (data) {

                    day.push(data.stat_date);

                    series.push({name:  data.name, data: [data.counter] });

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
                            id: "basic-bar-packages-stat",
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
        })
    };

    handleClick = (e) => {
        e.preventDefault();

        this.setState({
            search: 'click'
        });

        currentlyActivePackages(this.state.day, this.state.package).then(result => {

            if(result.status === true){

                const day = [];
                const series = [];

                result.data.map(function (data) {

                    day.push(data.stat_date);


                    series.push({name:  data.name, data: [data.counter] });

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
                            id: "basic-bar-packages-stat",
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
        })

    };


    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };


    componentDidMount() {

        distPack().then(result => {
            this.setState({
                dist_pack:  result.data
            });
        });

        currentlyActivePackages(this.state.day, this.state.package).then(result => {

            if(result.status === true){

                const day = [];
                const series = [];

                result.data.map(function (data) {

                    day.push(data.stat_date);


                    series.push({name:  data.name, data: [data.counter] });

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
                            id: "basic-bar-packages-stat",
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
        })

    }

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
                            <li className="breadcrumb-item active" aria-current="page">Active packages</li>
                        </ol>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <div className='wrap-border table-col-gui mb-5'>
                                <h6>Filter</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='date' name='day' value={this.state.day} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="package" value={this.state.package} onChange={this.handleChanges}>
                                            <option value="">Package</option>
                                                {this.state.dist_pack.map(function (item) {

                                                    return <option key={item.value} value={item.value}>({item.value}) - {item.name}</option>

                                                })
                                                }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success btn-login-from" onClick={this.handleClick} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border table-col-gui'>
                                <Chart
                                    options={this.state.options}
                                    series={this.state.series}
                                    type="bar"
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

export default withRouter(DailyActivePackages);