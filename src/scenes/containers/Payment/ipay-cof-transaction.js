import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {iPayTransaction} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";
import PubSub from "pubsub-js";
import {IpayConfTransactionsTable} from "../../components/Table/ipay-cof-transactions-table";
import {SystemMessageTable} from "../../components/Table/system-message-table";

class IpayCofTransaction extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            startLog: today+'T00:00',
            endLog: today+'T23:59',
            userId:'',
            cof_sys:false,
            status:'',
            total_amount_per_page:'',
            total_amount:'',
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleOpen = this.handleOpen.bind(this);

    }

    handleOpen (){
        this.setState({
            cof_sys: false
        });
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
            startLog: today+'T00:00',
            endLog: today+'T23:59',
            userId:'',
            cof_sys:true,
            status:''
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'cof_trans'){

            this.setState({
                cof_sys:true
            });

        }
    };

    componentDidMount() {
        PubSub.subscribe('iPayTransactions', this.mySubscriberTransactions);


        iPayTransaction(this.state.startLog, this.state.endLog, this.state.iPayStatus, this.state.userId, this.state.transferType).then(result => {
            this.setState({
                iPayTrans: result.data
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

        if(this.state.iPay_transactions){
            return <Redirect to={'/customer-billing'} />

        }

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">iPay Cof Transaction</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">iPay Cof Payment Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='startLog' value={this.state.startLog} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='endLog' value={this.state.endLog} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='userId' value={this.state.userId} onChange={this.handleChanges} autoComplete='off' placeholder='User ID:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input " onChange={this.handleChanges} value={this.state.status}  name="status">
                                                    <option value="">Status</option>
                                                    <option value="SUCCESS">SUCCESS</option>
                                                    <option value="ERROR">ERROR</option>
                                                </select>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleReset} type="submit">Reset</button>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-success btn-login-from" onClick={this.handleClick} id="cof_trans" type="submit">Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='total_amount' value={this.state.total_amount} onChange={this.handleChanges} autoComplete='off' placeholder='Total Amount:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='total_amount_per_page' value={this.state.total_amount_per_page} onChange={this.handleChanges} autoComplete='off' placeholder='Total Amount Per Page:'/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='wrap-border table-col-gui'>
                                <IpayConfTransactionsTable   search={this.state.cof_sys}  onOpen={this.handleOpen} data={
                                    {
                                        start_log: this.state.startLog,
                                        end_log: this.state.endLog,
                                        user_id: this.state.userId,
                                        status: this.state.status,
                                    }
                                } />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(IpayCofTransaction);