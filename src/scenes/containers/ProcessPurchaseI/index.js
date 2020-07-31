import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {ProcessPaymentTable} from "../../components/Table/ProcessPaymentTable";
import {ProcessPurchaselTable} from "../../components/Table/ProcessPurchaselTable";
import {VoipTable} from "../../components/Table/voip-table";
import CsvDownload from "react-json-to-csv";

class ProcessPurchasel extends Component {
    constructor(props){
        super(props);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        let dt = new Date();
        let dd1 = String(dt.getDate()).padStart(2, '0');
        let mm1 = String(dt.getMonth() + 1 - 1).padStart(2, '0');

        let yyyy1 = dt.getFullYear();

        dt = yyyy1 + '-' + mm1 + '-' + dd1;

        this.state = {
            start:dt,
            end:today,
            redirect: false,
            payment : false,
            purchase: true,
            type: '2',
            search:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.purchase = this.purchase.bind(this);
        this.payment = this.payment.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'voip_click') {

            this.setState({
                search: 'click'
            });
        }
    };

    payment = (e) => {
        e.preventDefault();

        this.setState({
            payment: true,
            purchase:false,
            type:'1'
        });
    };

    purchase = (e) => {
        e.preventDefault();

        this.setState({
            purchase: true,
            payment:false,
            type:'2'
        });
    };

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

    componentDidMount() {


    }

    componentWillUnmount() {
        //ToDo
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
                            <li className="breadcrumb-item active" aria-current="page">Process Purchasel Log</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-lg-4 mx-auto">
                            <div className="row mb-4">
                                <div className="col-lg-6">
                                    <button className="btn btn-block btn-outline-success wrap-border" onClick={this.purchase} type="submit">Purchase</button>
                                </div>
                                <div className="col-lg-6">
                                    <button className="btn btn-block btn-outline-info wrap-border" onClick={this.payment} type="submit">Payment</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-lg-8 mb-3 mx-auto">

                            <div className="row mb-4">
                                <div className="col-lg-6">
                                    <div className='wrap-border table-col-gui'>
                                        <h6 className="content-title">SEARCH</h6>
                                        <hr/>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='date' name='start' value={this.state.start} onChange={this.handleChange} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='date' name='end' value={this.state.end} onChange={this.handleChange} autoComplete='off' placeholder='End:'/>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <button className="btn btn-block btn-outline-success btn-login-from"  id='payment_purchase'  onClick={this.handleClick} type="submit">next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className='wrap-border table-col-gui'>
                                        <h6 className="content-title">EXPORT</h6>
                                        <hr/>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <CsvDownload data={this.state.export} target="_parent" filename={"export-voip.csv"}  className="btn btn-block btn-success btn-login-from" >{(this.state.payment)?'EXPORT PAYMENT':'EXPORT PURCHASE'} </CsvDownload>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="row">
                        <div className="col-lg-12 mx-auto">

                            <div className={this.state.payment?'wrap-border table-col-gui': 'hidden-ul'} >
                                <h6 className="content-title">PAYMENT</h6>

                                {(this.state.payment && this.state.type === '1')?
                                <ProcessPaymentTable search={this.state.search} data={{
                                    start: this.state.start,
                                    end: this.state.end,
                                    type: this.state.type
                                }}/>
                                :''
                                }

                            </div>

                            <div className={this.state.purchase?'wrap-border table-col-gui': 'hidden-ul'} >
                                <h6 className="content-title">PURCHASE</h6>

                                {(this.state.purchase && this.state.type === '2')?

                                    <ProcessPurchaselTable search={this.state.search} data={{
                                        start: this.state.start,
                                        end: this.state.end,
                                        type: this.state.type
                                    }}/>
                                    :''
                                }
                            </div>

                        </div>
                    </div>

                </section>
            </div>
        )
    }

}

export default withRouter(ProcessPurchasel);