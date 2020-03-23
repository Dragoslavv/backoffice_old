import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {TransactionPaymentTable} from "../../components/Table/transaction-payment-table";
import { PaymentTransactionsTable, PaymentTransactionsTotal} from "../../components/UserFunctions";
import {store} from "react-notifications-component";
import CsvDownload from 'react-json-to-csv';
import {Redirect} from "react-router-dom";

class Transaction extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            start_log: today + 'T00:00',
            end_log: today + 'T23:59',
            paymentType:'',
            billingType:'',
            totalTransactions:[{
                googlePlay:'',
                iTunes:'',
                WSPay:'',
                TopUp:'',
                totalPayment:'',
                guiTotal:'',
                callCenter:'',
                promoBox:'',
                walletTransfer:'',
                telekom:'',
                messaging:'',
                voice:'',
                didWw:'',
            }],
            tableTransactions:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.onClickTransaction = this.onClickTransaction.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    componentDidMount() {
        const type = this.state.billingType || this.state.paymentType ;

        PaymentTransactionsTable(this.state.start_log, this.state.end_log, type).then(result => {
            this.setState({
                tableTransactions: result.data
            });
        });

        PaymentTransactionsTotal(this.state.start_log, this.state.end_log).then(result => {
            if(result.data !== '' && result.status === true && this.state.start_log !== '' && this.state.end_log !== ''){
                this.setState({
                    totalTransactions:[{
                        googlePlay:(result.data.GooglePlay)?result.data.GooglePlay:'',
                        iTunes:(result.data.iTunes)?result.data.iTunes:'',
                        WSPay:(result.data.WSPay)?result.data.WSPay:'',
                        TopUp:(result.data.TopUp)?result.data.TopUp:'',
                        totalPayment:(result.data.totalpayment)?result.data.totalpayment:'',
                        guiTotal:(result.data.gui)?result.data.gui:'0',
                        callCenter:(result.data.callcentar)?result.data.callcentar:'',
                        promoBox:(result.data.PromoBox)?result.data.PromoBox:'',
                        walletTransfer:(result.data.WallletTransfer)?result.data.WallletTransfer:'',
                        telekom:(result.data.Telekom)?result.data.Telekom:'',
                        messaging:(result.data.messaging)?result.data.messaging:'',
                        voice:(result.data.voice)?result.data.voice:'',
                        didWw:(result.data.DIDWW)?result.data.DIDWW:'',
                    }],
                });

            } else {
                store.addNotification({
                    title: 'Transaction Type',
                    message: 'Parameter is empty!',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
                window.scrollTo({
                    top: 0
                });
            }
        });
    }

    componentWillUnmount() {
        //ToDo
    }

    handleReset = (e) => {
        e.preventDefault();

        this.state = {
            start_log_reset: '2020-01-08T00:00',
            end_log_reset: '2020-01-08T23:59',
            paymentTypeReset:'',
            billingTypeReset:'',
        };

        const type = this.state.billingTypeReset || this.state.paymentTypeReset ;

        PaymentTransactionsTable(this.state.start_log_reset, this.state.end_log_reset, type).then(result => {
            this.setState({
                tableTransactions: result.data
            });
        });

        PaymentTransactionsTotal(this.state.start_log_reset, this.state.end_log_reset).then(result => {
            if(result.data !== '' && result.status === true && this.state.start_log !== '' && this.state.end_log !== ''){
                this.setState({
                    totalTransactions:[{
                        googlePlay:(result.data.GooglePlay)?result.data.GooglePlay:'',
                        iTunes:(result.data.iTunes)?result.data.iTunes:'',
                        WSPay:(result.data.WSPay)?result.data.WSPay:'',
                        TopUp:(result.data.TopUp)?result.data.TopUp:'',
                        totalPayment:(result.data.totalpayment)?result.data.totalpayment:'',
                        guiTotal:(result.data.gui)?result.data.gui:'0',
                        callCenter:(result.data.callcentar)?result.data.callcentar:'',
                        promoBox:(result.data.PromoBox)?result.data.PromoBox:'',
                        walletTransfer:(result.data.WallletTransfer)?result.data.WallletTransfer:'',
                        telekom:(result.data.Telekom)?result.data.Telekom:'',
                        messaging:(result.data.messaging)?result.data.messaging:'',
                        voice:(result.data.voice)?result.data.voice:'',
                        didWw:(result.data.DIDWW)?result.data.DIDWW:'',
                    }],
                });

            } else {
                store.addNotification({
                    title: 'Transaction Type',
                    message: 'Parameter is empty!',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
                window.scrollTo({
                    top: 0
                });
            }
        });
    };

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

        let payment = e.target.name === 'paymentType';
        let billing = e.target.name === 'billingType';

        if( billing ){
            this.setState({
                paymentType:''
            });
        } else if(payment){
            this.setState({
                billingType:''
            });
        }
    };

    onClickTransaction = (e) => {
        e.preventDefault();

        const type = this.state.billingType || this.state.paymentType ;

        PaymentTransactionsTable(this.state.start_log, this.state.end_log, type).then(result => {
            this.setState({
                tableTransactions: result.data
            });
        });

        PaymentTransactionsTotal(this.state.start_log, this.state.end_log).then(result => {
            if(result.data !== '' && result.status === true && this.state.start_log !== '' && this.state.end_log !== ''){
                this.setState({
                    totalTransactions:[{
                        googlePlay:(result.data.GooglePlay)?result.data.GooglePlay:'',
                        iTunes:(result.data.iTunes)?result.data.iTunes:'',
                        WSPay:(result.data.WSPay)?result.data.WSPay:'',
                        TopUp:(result.data.TopUp)?result.data.TopUp:'',
                        totalPayment:(result.data.totalpayment)?result.data.totalpayment:'',
                        guiTotal:(result.data.gui)?result.data.gui:'0',
                        callCenter:(result.data.callcentar)?result.data.callcentar:'',
                        promoBox:(result.data.PromoBox)?result.data.PromoBox:'',
                        walletTransfer:(result.data.WallletTransfer)?result.data.WallletTransfer:'',
                        telekom:(result.data.Telekom)?result.data.Telekom:'',
                        messaging:(result.data.messaging)?result.data.messaging:'',
                        voice:(result.data.voice)?result.data.voice:'',
                        didWw:(result.data.DIDWW)?result.data.DIDWW:'',
                    }],
                });

            } else {
                store.addNotification({
                    title: 'Transaction Type',
                    message: 'Parameter is empty!',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
                window.scrollTo({
                    top: 0
                });
            }
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


        const dataTable = this.state.tableTransactions.map(function (item) {

            return item;

        });

        function Table() {
            if(dataTable.length > 0){
                return <TransactionPaymentTable data={dataTable} />;
            } else {
                return <TransactionPaymentTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Transaction</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-4">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Transaction Type Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='datetime-local' min="1000-01-01" value={this.state.start_log} onChange={this.handleChange} name='start_log' id='start_log' autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='datetime-local' min="1000-01-01" value={this.state.end_log} onChange={this.handleChange} autoComplete='off' name='end_log' id='end_log'  placeholder='End:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="paymentType" id='paymentType' placeholder='Payment Type' value={this.state.paymentType} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="6">Google Play</option>
                                            <option value="7">iTunes</option>
                                            <option value="8">PayPal</option>
                                            <option value="9">PayPalWeb</option>
                                            <option value="32">PayPinkAik</option>
                                            <option value="37">WSPay</option>
                                            <option value="23">TopUp</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="billingType" id='billingType' placeholder='Billing Type' value={this.state.billingType} onChange={this.handleChange}>
                                            <option value="">Billing Type</option>
                                            <option value="12">Messaging</option>
                                            <option value="4">Gui</option>
                                            <option value="25">Calls</option>
                                            <option value="14">DIDWW</option>
                                            <option value="26">Data</option>
                                            <option value="33">PromoBox Data</option>
                                            <option value="333">PromoBox Cash</option>
                                            <option value="26">Data</option>
                                            <option value="27">CallCentar</option>

                                        </select>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info" onClick={this.handleReset}  type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" onClick={this.onClickTransaction} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Total</h6>
                                <hr/>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='googlePlayTotal' value={this.state.totalTransactions[0].googlePlay} onChange={this.handleChange} autoComplete='off' placeholder='GooglePlay Total::'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='iTunesTotal' value={this.state.totalTransactions[0].iTunes} onChange={this.handleChange} autoComplete='off' placeholder='iTunes Total:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='WSPay' value={this.state.totalTransactions[0].WSPay} onChange={this.handleChange} autoComplete='off' placeholder='WSPay Total'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='TopUpTotal' value={this.state.totalTransactions[0].TopUp} onChange={this.handleChange} autoComplete='off' placeholder='TopUp Total'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='totalPayment' value={this.state.totalTransactions[0].totalPayment} onChange={this.handleChange} autoComplete='off' placeholder='TOTAL PAYMENT'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-4">
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='guiTotal' value={this.state.totalTransactions[0].guiTotal} onChange={this.handleChange} autoComplete='off' placeholder='GUI Total:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='callCentar' value={this.state.totalTransactions[0].callCenter} onChange={this.handleChange} autoComplete='off' placeholder='Call Center:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='promoBox' autoComplete='off' value={this.state.totalTransactions[0].promoBox} onChange={this.handleChange} placeholder='Promo Box'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='walletTransfer' autoComplete='off' value={this.state.totalTransactions[0].walletTransfer} onChange={this.handleChange} placeholder='Wallet Transfer'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='telekom' autoComplete='off' value={this.state.totalTransactions[0].telekom} onChange={this.handleChange} placeholder='Telekom'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-4">
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='messaging' autoComplete='off' value={this.state.totalTransactions[0].messaging} onChange={this.handleChange} placeholder='Messaging Total:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='vice' autoComplete='off' value={this.state.totalTransactions[0].voice} onChange={this.handleChange} placeholder='Call Total:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='DIDWW' autoComplete='off' value={this.state.totalTransactions[0].didWw} onChange={this.handleChange} placeholder='DIDWW Total'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <CsvDownload data={this.state.totalTransactions} target="_parent" filename={"export-payment.csv"}  className="btn btn-block btn-outline-success" > Export Payment </CsvDownload>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='wrap-border table-col-gui border-table-smt'>
                                <Table/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(Transaction);