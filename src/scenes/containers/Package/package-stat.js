import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PackageStatTotalTable} from "../../components/Table/package-stat-total-table";
import Chart from "react-apexcharts";
import {distinctdield, distinctfield_display, PackagesStatistic} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class PackageStat extends Component {
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
            start: dt,
            end: today,
            package: '',
            package_group: '',
            free_change: '',
            search : '',
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
                    labels: {
                        style: {
                            colors: ['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']

                        }
                    }
                }
            },
            series: [],
            distinctdield:[],
            distinctfield_display:[]
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

        PackagesStatistic(this.state.start, this.state.end, this.state.package, this.state.package_group , this.state.free_change).then(result => {

            if(result.status === true){

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
                    package: '',
                    package_group: '',
                    free_change: '',
                });

                const day = [];
                const series = [{name: 'Total Activated',data:[]},{name: 'Activation',data:[]},{name: 'Renew',data:[]},{name: 'Deactivation',data:[]}];

                result.data.map(function (data) {
                    day.push(data.stat_date);

                    series[0]['data'].push(data.Total_Activated);
                    series[1]['data'].push(data.Activation);
                    series[2]['data'].push(data.Renew);
                    series[3]['data'].push(data.Deactivation);

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
        })
    };

    handleClick = (e) => {
        e.preventDefault();

        this.setState({
            search: 'click'
        });

        PackagesStatistic(this.state.start, this.state.end, this.state.package, this.state.package_group , this.state.free_change).then(result => {

            if(result.status === true){
                const day = [];
                const series = [{name: 'Total Activated',data:[]},{name: 'Activation',data:[]},{name: 'Renew',data:[]},{name: 'Deactivation',data:[]}];

                result.data.map(function (data) {
                    day.push(data.stat_date);

                    series[0]['data'].push(data.Total_Activated);
                    series[1]['data'].push(data.Activation);
                    series[2]['data'].push(data.Renew);
                    series[3]['data'].push(data.Deactivation);

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
        })

    };


    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };


    componentDidMount() {

        distinctdield().then(result => {
           this.setState({
               distinctdield: result.data
           });
        });

        distinctfield_display().then(result => {
            this.setState({
                distinctfield_display: result.data
            });
        });


        PackagesStatistic(this.state.start, this.state.end, this.state.package, this.state.package_group , this.state.free_change).then(result => {

            if(result.status === true){
                const day = [];
                const series = [{name: 'Total Activated',data:[]},{name: 'Activation',data:[]},{name: 'Renew',data:[]},{name: 'Deactivation',data:[]}];

                result.data.map(function (data) {
                    day.push(data.stat_date);

                    series[0]['data'].push(data.Total_Activated);
                    series[1]['data'].push(data.Activation);
                    series[2]['data'].push(data.Renew);
                    series[3]['data'].push(data.Deactivation);

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
                            categories: day
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
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Package Stat</li>
                        </ol>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <div className='wrap-border mb-5'>
                                <h6>Filter</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='date' name='start' value={this.state.start} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='date' name='end' value={this.state.end} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="package" value={this.state.package} onChange={this.handleChanges}>
                                            <option value="">ALL</option>
                                            {this.state.distinctdield.map(function (item) {

                                                return <option key={item.value} value={item.value}>{item.value}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group'>

                                        <select className="input" name="package_group" value={this.state.package_group} onChange={this.handleChanges}>
                                            <option value="">ALL</option>
                                            {this.state.distinctfield_display.map(function (item) {

                                                return <option key={item.value} value={item.value}>{item.display}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="free_change" value={this.state.free_change} onChange={this.handleChanges}>
                                            <option value="">ALL</option>
                                            <option value="false">false</option>
                                            <option value="true">true</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleClick} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='wrap-border'>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h6>Total</h6>
                                            <hr/>
                                            <PackageStatTotalTable search={ this.state.search } data={{
                                                start_day: this.state.start,
                                                end_day: this.state.end,
                                                package: this.state.package,
                                                package_group: this.state.package_group,
                                                free_change: this.state.free_change
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border'>
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

export default withRouter(PackageStat);