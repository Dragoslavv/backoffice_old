import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PaymentTransactionTwoTable} from "../../components/Table/payment-transaction-two";
import {paymentOrders} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

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
            ordersTransactions:[]
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
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

    componentDidMount() {

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
                window.sessionStorage.removeItem(key)
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
                        <ol className="breadcrumb head-pages">
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
                                                        <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
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