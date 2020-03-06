import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import { MessagingHourly} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class Hourly extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect:false,
            day:today,
            direction:'',
            brand:'',
            message_type:'',
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
                    id: "basic-bar-messaging",
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
            series: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
           [e.target.name] : e.target.value
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        MessagingHourly(this.state.day, this.state.direction, this.state.brand, this.state.message_type).then(result => {

            if(result.status === true) {
                const hour = [];
                const series = [{name: 'DELIVERED',data:[]},{name: 'UNSUCCESSFULLY SENT',data:[]},{name: 'UNSUCCESSFULLY DELIVERED',data:[]},{name: 'RECEIVED',data:[]},{name: 'SENT',data:[]},{name: 'UNDELIVERED',data:[]}];


                result.data.map(function (data) {
                    hour.push(data.hour);

                    console.log(data);

                    series[0]['data'].push(data.DELIVERED);
                    series[1]['data'].push(data.UNSUCCESSFULLY_SENT);
                    series[2]['data'].push(data.UNSUCCESSFULLY_DELIVERED);
                    series[3]['data'].push(data.RECEIVED);
                    series[4]['data'].push(data.SENT);
                    series[5]['data'].push(data.UNDELIVERED);

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
                            id: "basic-bar-messaging",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: hour,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    series: series
                });

            }
        });
    };


    componentDidMount() {

        MessagingHourly(this.state.day, this.state.direction, this.state.brand, this.state.message_type).then(result => {

            if(result.status === true) {
                const hour = [];
                const series = [{name: 'DELIVERED',data:[]},{name: 'UNSUCCESSFULLY SENT',data:[]},{name: 'UNSUCCESSFULLY DELIVERED',data:[]},{name: 'RECEIVED',data:[]},{name: 'SENT',data:[]},{name: 'UNDELIVERED',data:[]}];


                result.data.map(function (data) {
                    hour.push(data.hour);

                    series[0]['data'].push(data.DELIVERED);
                    series[1]['data'].push(data.UNSUCCESSFULLY_SENT);
                    series[2]['data'].push(data.UNSUCCESSFULLY_DELIVERED);
                    series[3]['data'].push(data.RECEIVED);
                    series[4]['data'].push(data.SENT);
                    series[5]['data'].push(data.UNDELIVERED);

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
                            id: "basic-bar-messaging",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: hour,
                            labels: {
                                style: {
                                    colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                                }
                            }
                        }
                    },
                    series: series
                });

            }
        });

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
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Hourly Messaging</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-2">
                            <div className='wrap-border'>
                                <h6 className="content-title">Hourly</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='day' value={this.state.day} onChange={this.handleChange} autoComplete='off' placeholder='Date:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="direction" value={this.state.direction} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="APP">APP</option>
                                            <option value="SMS">SMS</option>
                                            <option value="WEB">WEB</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="brand" value={this.state.brand} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="1">Virtual SIM</option>
                                            <option value="2">Pink MOBILE</option>
                                            <option value="3">globaltel</option>
                                            <option value="4">EASY SIM</option>
                                            <option value="5">Big River</option>
                                            <option value="7">onlime</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="message_type" value={this.state.message_type} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="1">user messages</option>
                                            <option value="0">system messages</option>
                                        </select>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleClick} type="submit">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className='wrap-border'>
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

export default withRouter(Hourly);