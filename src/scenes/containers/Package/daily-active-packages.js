import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import Chart from "react-apexcharts";
import {currentlyActivePackages} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class DailyActivePackages extends Component {
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
                }
            },
            series: [],
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

        currentlyActivePackages(this.state.start, this.state.end, this.state.package).then(result => {

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
                });

                const day = [];
                const series = [{name: 'Packages',data:[]},{name: 'Counter',data:[]}];

                result.data.map(function (data) {
                    day.push(data.stat_date);

                    series[0]['data'].push(data.name);
                    series[1]['data'].push(data.counter);

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

        currentlyActivePackages(this.state.start, this.state.end, this.state.package).then(result => {

            if(result.status === true){
                const day = [];
                const series = [{name: 'Packages',data:[]},{name: 'Counter',data:[]}];

                result.data.map(function (data) {
                    day.push(data.stat_date);

                    series[0]['data'].push(data.name);
                    series[1]['data'].push(data.counter);

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

        currentlyActivePackages(this.state.start, this.state.end, this.state.package).then(result => {

            if(result.status === true){
                const day = [];
                const series = [
                    {name:  "1 GB",data:[]},
                    {name:  "3 GB",data:[]},
                    {name:  "5 GB",data:[]},
                    {name:  "256 MB",data:[]},
                    {name:  "1 GB",data:[]},
                    {name:  "60 poziva",data:[]},
                    {name:  "120 poziva",data:[]},
                    {name:  "5 GB",data:[]},
                    {name:  "5 GB + 50 min/sms",data:[]},
                    {name:  "50 min/sms",data:[]},
                    {name:  "50 klikova",data:[]},
                    {name:  "1 GB",data:[]},
                    {name:  "3 GB",data:[]},
                    {name:  "5 GB",data:[]},
                    {name:  "20 min/sms",data:[]},
                    {name:  "50 min/sms",data:[]},
                    {name:  "100 min/sms",data:[]},
                    {name:  "2 GB",data:[]},
                    {name:  "30 min/sms",data:[]},
                    {name:  "2 GB + 30 min/sms",data:[]},
                    {name:  "4 GB ",data:[]}
                    // {name:  "150 min/sms",data:[]},
                    // {name:  "4 GB + 150 min/sms",data:[]},
                    // {name:  "50 poziva",data:[]},
                    // {name:  "10,data:[]},000 min",data:[]},
                    // {name:  "50,data:[]},000 min",data:[]},
                    // {name:  "1 GB",data:[]},
                    // {name:  "10 GB",data:[]},
                    // {name:  "50 min/sms",data:[]},
                    // {name:  "10 GB + 50 min/sms",data:[]},
                    // {name:  "10 GB + 150 min/sms",data:[]},
                    // {name:  "1 GB",data:[]},
                    // {name:  "250 min/sms",data:[]},
                    // {name:  "1 GB + 250 min/sms",data:[]},
                    // {name:  "10 GB + 250 min/sms",data:[]},
                    // {name:  "1 GB + 50 min/sms",data:[]},
                    // {name:  "4 GB + 50 min/sms",data:[]},
                    // {name:  "1 GB + 150 min/sms",data:[]},
                    // {name:  "4 GB ",data:[]},
                    // {name:  "4 GB + 30 min/sms",data:[]},
                    // {name:  "80 min/sms",data:[]},
                    // {name:  "2 GB + 80 min/sms",data:[]},
                    // {name:  "4 GB + 80 min/sms",data:[]},
                    // {name:  "4 GB + 250 min/sms",data:[]},
                    // {name:  "5 GB",data:[]},
                    // {name:  "∞ min & SMS",data:[]},
                    // {name:  "1 GB + ∞ min & sms",data:[]},
                    // {name:  "4 GB + ∞ min & sms",data:[]},
                    // {name:  "10 GB + ∞ min & sms",data:[]},
                    // {name:  "1 GB",data:[]},
                    // {name:  "4 GB ",data:[]},
                    // {name:  "10 GB",data:[]},
                    // {name:  "∞ min & SMS",data:[]},
                    // {name:  "∞ min & SMS",data:[]}
                ];

                result.data.map(function (data) {
                    day.push(data.dan);

                    series[0]['data'].push(data.GB1);
                    series[1]['data'].push(data.GB3);
                    series[2]['data'].push(data.GB5);
                    series[3]['data'].push(data.MB256);
                    series[4]['data'].push(data.GB1);
                    series[5]['data'].push(data.poziva60);
                    series[6]['data'].push(data.poziva120);
                    series[7]['data'].push(data.GB5);
                    series[8]['data'].push(data.GB5_minsms50);
                    series[9]['data'].push(data.minsms50);
                    series[10]['data'].push(data.klikova50);
                    series[11]['data'].push(data.GB1);
                    series[12]['data'].push(data.GB3);
                    series[13]['data'].push(data.GB5);
                    series[14]['data'].push(data.minsms20);
                    series[15]['data'].push(data.minsms50);
                    series[16]['data'].push(data.minsms100);
                    series[17]['data'].push(data.GB2);
                    series[18]['data'].push(data.minsms30);
                    series[19]['data'].push(data.GB2_minsms30);
                    series[20]['data'].push(data.GB4);
                    // series[21]['data'].push(data.minsms150);
                    // series[22]['data'].push(data.GB4_minsms150);
                    // series[23]['data'].push(data.poziva50);
                    // series[24]['data'].push(data.min10000);
                    // series[25]['data'].push(data.min50000);
                    // series[26]['data'].push(data.GB1);
                    // series[27]['data'].push(data.GB10);
                    // series[28]['data'].push(data.minsms50);
                    // series[29]['data'].push(data.GB10_minsms50);
                    // series[30]['data'].push(data.GB10_minsms150);
                    // series[31]['data'].push(data.GB1);
                    // series[32]['data'].push(data.minsms250);
                    // series[33]['data'].push(data.GB1_minsms250);
                    // series[34]['data'].push(data.GB10_minsms250);
                    // series[35]['data'].push(data.GB1_minsms50);
                    // series[36]['data'].push(data.GB4_minsms50);
                    // series[38]['data'].push(data.GB1_minsms150);
                    // series[39]['data'].push(data.GB4);
                    // series[40]['data'].push(data.GB4_minsms30);
                    // series[41]['data'].push(data.minsms80);
                    // series[42]['data'].push(data.GB2_minsms80);
                    // series[43]['data'].push(data.GB4_minsms80);
                    // series[44]['data'].push(data.GB4_minsms250);
                    // series[45]['data'].push(data.GB5);
                    // series[46]['data'].push(data.minEndSMS);
                    // series[47]['data'].push(data.GB1minEndsms);
                    // series[48]['data'].push(data.GB4minEndsms);
                    // series[49]['data'].push(data.GB10minEndsms);
                    // series[50]['data'].push(data.GB1);
                    // series[51]['data'].push(data.GB4);
                    // series[52]['data'].push(data.GB10);
                    // series[53]['data'].push(data.ENDminSMS);
                    // series[54]['data'].push(data.END2minSMS);


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
                {/*<section id="content-wrapper" >*/}
                    {/*<nav aria-label="breadcrumb">*/}
                        {/*<ol className="breadcrumb head-pages wrap-border">*/}
                            {/*<li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>*/}
                            {/*<li className="breadcrumb-item active" aria-current="page">Package Stat</li>*/}
                        {/*</ol>*/}
                    {/*</nav>*/}
                    {/*<div className="row mb-3">*/}
                        {/*<div className="col-lg-3">*/}
                            {/*<div className='wrap-border table-col-gui mb-5'>*/}
                                {/*<h6>Filter</h6>*/}
                                {/*<hr/>*/}
                                {/*<form method="post">*/}
                                    {/*<div className='form-group'>*/}
                                        {/*<input className='input' type='date' name='start' value={this.state.start} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>*/}
                                    {/*</div>*/}
                                    {/*<div className='form-group'>*/}
                                        {/*<input className='input' type='date' name='end' value={this.state.end} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>*/}
                                    {/*</div>*/}
                                    {/*<div className='form-group'>*/}
                                        {/*<select className="input " name="package" value={this.state.package} onChange={this.handleChanges}>*/}
                                            {/*<option value="">ALL</option>*/}
                                            {/*/!*{this.state.distinctdield.map(function (item) {*!/*/}

                                                {/*/!*return <option key={item.value} value={item.value}>{item.value}</option>*!/*/}

                                            {/*/!*})*!/*/}
                                            {/*/!*}*!/*/}
                                        {/*</select>*/}
                                    {/*</div>*/}
                                    {/*<div className="form-group">*/}
                                        {/*<div className="row">*/}
                                            {/*<div className="col-lg-6">*/}
                                                {/*<button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleReset} type="submit">Reset</button>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-lg-6">*/}
                                                {/*<button className="btn btn-block btn-outline-success btn-login-from" onClick={this.handleClick} type="submit">Search</button>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</form>*/}
                            {/*</div>*/}
                            {/*<div className='wrap-border table-col-gui  mb-3'>*/}
                                {/*<div className="form-group">*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-lg-12">*/}
                                            {/*<h6>Total</h6>*/}
                                            {/*<hr/>*/}
                                            {/*/!*<PackageStatTotalTable search={ this.state.search } data={{*!/*/}
                                                {/*/!*start_day: this.state.start,*!/*/}
                                                {/*/!*end_day: this.state.end,*!/*/}
                                                {/*/!*package: this.state.package,*!/*/}
                                                {/*/!*package_group: this.state.package_group,*!/*/}
                                                {/*/!*free_change: this.state.free_change*!/*/}
                                            {/*/!*}}/>*!/*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<div className="col-lg-9">*/}
                            {/*<div className='wrap-border table-col-gui'>*/}
                                {/*<Chart*/}
                                    {/*options={this.state.options}*/}
                                    {/*series={this.state.series}*/}
                                    {/*type="line"*/}
                                    {/*width="100%"*/}
                                    {/*height='600'*/}
                                {/*/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</section>*/}
            </div>
        )
    }

}

export default withRouter(DailyActivePackages);