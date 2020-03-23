import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PaymentTransactionTwoTable} from "../../components/Table/payment-transaction-two";
import {paymentOrders} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";
import PubSub from "pubsub-js";

class PaymentTransaction extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            startDayT: today+'T00:00',
            endDayT: today+'T23:59',
            userId:'',
            paymentStatus:'',
            paymentType:'',
            paymentData:'',
            billingId:'',
            ordersTransactions:[],
            ud_transactions:''
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.mySubscriberTransactions = this.mySubscriberTransactions.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleReset = (e) => {
        e.preventDefault();

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.setState( {
            redirect: false,
            startDayT: today+'T00:00',
            endDayT: today+'T23:59',
            userId:'',
            paymentStatus:'',
            paymentType:'',
            paymentData:'',
            billingId:'',
            ordersTransactions:[],
            ud_transactions:''
        });

        paymentOrders(this.state.startDayT, this.state.endDayT, '', '', '', '', '').then(result => {
            this.setState({
                ordersTransactions: result.data
            });
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        paymentOrders(this.state.startDayT, this.state.endDayT, this.state.userId, this.state.paymentStatus, this.state.paymentType, this.state.paymentData, this.state.billingId).then(result => {
           this.setState({
               ordersTransactions: result.data
           });
        });
    };

    mySubscriberTransactions(msg,dataSet) {

        this.setState({
            ud_transactions: dataSet
        })
    };

    componentDidMount() {

        PubSub.subscribe('paymentTransactions', this.mySubscriberTransactions);


        paymentOrders(this.state.startDayT, this.state.endDayT, this.state.userId, this.state.paymentStatus, this.state.paymentType, this.state.paymentData, this.state.billingId).then(result => {
            this.setState({
                ordersTransactions: result.data
            });
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

        if(this.state.ud_transactions){
            return <Redirect to={'/customer-billing'} />

        }

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        const dataTable = this.state.ordersTransactions.map(function (item) {

            return item;

        });

        function TablePayment() {
            if(dataTable.length > 0){
                return <PaymentTransactionTwoTable data={dataTable} />;
            } else {
                return <PaymentTransactionTwoTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Payment Transaction</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <h6 className="content-title">Transaction Payment Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='startDayT' value={this.state.startDayT} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='endDayT' value={this.state.endDayT} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='userId' value={this.state.userId} onChange={this.handleChanges} autoComplete='off' placeholder='User ID:'/>
                                            </div>
                                            <div className="form-group billing-input">
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
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="paymentStatus" value={this.state.paymentStatus} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Finished">Finished</option>
                                                    <option value="Error">Error</option>
                                                    <option value="Canceled">Canceled</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="paymentType" value={this.state.paymentType} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="GooglePlay">GooglePlay</option>
                                                    <option value="iTunes">iTunes</option>
                                                    <option value="PayPal">PayPal</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='paymentData' value={this.state.paymentData} onChange={this.handleChanges} autoComplete='off' placeholder='Payment Data:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='billingId' value={this.state.billingId} onChange={this.handleChanges} autoComplete='off' placeholder='Billing ID:'/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='wrap-border'>
                                <TablePayment/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(PaymentTransaction);