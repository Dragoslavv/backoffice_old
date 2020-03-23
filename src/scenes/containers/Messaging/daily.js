import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import {MessagingDaily} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class Daily extends Component {
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
            start:dt,
            end:today,
            direction: '',
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
                    id: "basic-bar-messaging-daily",
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

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        MessagingDaily(this.state.start, this.state.end, this.state.direction, this.state.brand, this.state.message_type).then(result => {

            if(result.status === true) {
                const day = [];
                const series = [{name: 'DELIVERED',data:[]},{name: 'UNSUCCESSFULLY SENT',data:[]},{name: 'UNSUCCESSFULLY DELIVERED',data:[]},{name: 'RECEIVED',data:[]},{name: 'SENT',data:[]}];


                result.data.map(function (data) {
                    day.push(data.day);

                    series[0]['data'].push(data.DELIVERED);
                    series[1]['data'].push(data.UNSUCCESSFULLY_SENT);
                    series[2]['data'].push(data.UNSUCCESSFULLY_DELIVERED);
                    series[3]['data'].push(data.RECEIVED);
                    series[4]['data'].push(data.SENT);

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
                            id: "basic-bar-messaging-daily",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: day,
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

        MessagingDaily(this.state.start, this.state.end, this.state.direction, this.state.brand, this.state.message_type).then(result => {

            if(result.status === true) {
                const day = [];
                const series = [{name: 'DELIVERED',data:[]},{name: 'UNSUCCESSFULLY SENT',data:[]},{name: 'UNSUCCESSFULLY DELIVERED',data:[]},{name: 'RECEIVED',data:[]},{name: 'SENT',data:[]}];


                result.data.map(function (data) {
                    day.push(data.day);

                    series[0]['data'].push(data.DELIVERED);
                    series[1]['data'].push(data.UNSUCCESSFULLY_SENT);
                    series[2]['data'].push(data.UNSUCCESSFULLY_DELIVERED);
                    series[3]['data'].push(data.RECEIVED);
                    series[4]['data'].push(data.SENT);

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
                            id: "basic-bar-messaging-daily",
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        xaxis: {
                            categories: day,
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
                            <li className="breadcrumb-item active" aria-current="page">Hourly Messaging</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-2">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">Hourly</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='start' value={this.state.start} onChange={this.handleChange} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='end' value={this.state.end} onChange={this.handleChange} autoComplete='off' placeholder='End:'/>
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
                                                <button className="btn btn-block btn-outline-success" onClick={this.handleClick} type="submit">Apply</button>
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

export default withRouter(Daily);