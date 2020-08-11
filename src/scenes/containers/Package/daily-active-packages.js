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
            start_day: today,
            end_day: today,
            series: [],
            options: {
                chart: {
                    type: 'bar',
                    height: '10px',
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '8%',
                        barHeight: '8%',
                    },
                },
                xaxis: {
                    type: 'datetime',
                    categories: [],
                },
                legend: {
                    position: 'bottom',
                    offsetY: 0,

                },
                fill: {
                    opacity: 1
                }
            },
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

        currentlyActivePackages(this.state.start_day, this.state.end_day).then(result => {

            if(result.status === true){

                const day = [];

                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0');
                let yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;

                this.setState({
                    start_day:today,
                    end_day:today
                });

                result.date.map(function (data) {

                    day.push(data.date);
                });

                this.setState({
                    series: result.data,
                    options: {
                        chart: {
                            type: 'bar',
                            height: '10px',
                            stacked: true,
                            toolbar: {
                                show: true
                            },
                            zoom: {
                                enabled: true
                            }
                        },
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                legend: {
                                    position: 'bottom',
                                    offsetX: -10,
                                    offsetY: 0
                                }
                            }
                        }],
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '8%',
                                barHeight: '8%',
                            },
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: result.date,
                        },
                        legend: {
                            position: 'bottom',
                            offsetY: 0,

                        },
                        fill: {
                            opacity: 1
                        }
                    }
                });

            }
        })
    };

    handleClick = (e) => {
        e.preventDefault();

        const legendItem = document.querySelector(".apexcharts-legend-series")
        console.log(legendItem);

        this.setState({
            search: 'click'
        });

        currentlyActivePackages(this.state.start_day, this.state.end_day).then(result => {

            if(result.status === true){

                const day = [];
                const series = [];

                result.date.map(function (data) {

                    day.push(data.date);
                });

                console.log(result.data);
                console.log(result.date);

                this.setState({
                    series: result.data,
                    options: {
                        chart: {
                            type: 'bar',
                            height: '10px',

                            stacked: true,
                            toolbar: {
                                show: true
                            },
                            zoom: {
                                enabled: true
                            }
                        },
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                legend: {
                                    position: 'bottom',
                                    offsetX: -10,
                                    offsetY: 0
                                }
                            }
                        }],
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '8%',
                                barHeight: '8%',
                            },
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: result.date,
                        },
                        legend: {
                            position: 'bottom',
                            offsetY: 0,

                        },
                        fill: {
                            opacity: 1
                        }
                    }
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

        const legendItem = document.querySelector(".apexcharts-legend-series")
        console.log(legendItem);

        distPack().then(result => {
            this.setState({
                dist_pack:  result.data
            });
        });

        currentlyActivePackages(this.state.start_day, this.state.end_day).then(result => {

            if(result.status === true){

                const day = [];
                const series = [];

                result.data.map(function (data) {

                    series.push({name:  data.name, data: [data.counter] });

                });

                result.date.map(function (data) {

                    day.push(data.date);
                });

                this.setState({
                    series: result.data,
                    options: {
                        chart: {
                            type: 'bar',
                            height: '10px',

                            stacked: true,
                            toolbar: {
                                show: true
                            },
                            zoom: {
                                enabled: true
                            }
                        },
                        responsive: [{
                            breakpoint: 480,
                            options: {
                                legend: {
                                    position: 'bottom',
                                    offsetX: -10,
                                    offsetY: 0
                                }
                            }
                        }],
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '8%',
                                barHeight: '8%',
                            },
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: result.date,
                        },
                        legend: {
                            position: 'bottom',
                            offsetY: 0,

                        },
                        fill: {
                            opacity: 1
                        }
                    }
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
                                        <input className='input' type='date' name='start_day' value={this.state.start_day} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='date' name='end_day' value={this.state.end_day} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
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
                                <div id="chart">
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
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(DailyActivePackages);