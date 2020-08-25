import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {CardTransactionTable} from "../../components/Table/card-transaction-table";
import {CardTransactionsCall} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";
import PubSub from "pubsub-js";

class CardTransaction extends Component {
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
            cardStatus:'',
            userId:'',
            cardTrans:[],
            td_transactions:''
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.mySubscriberTransactions = this.mySubscriberTransactions.bind(this);

    }

    mySubscriberTransactions(msg,dataSet) {

        this.setState({
            td_transactions: dataSet
        })
    };

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

        this.state = {
            redirect: false,
            startLog: today+'T00:00',
            endLog: today+'T23:59',
            cardStatus:'',
            userId:'',
            cardTrans:[]
        };


        CardTransactionsCall(this.state.startLog, this.state.endLog, '', '').then(result => {
            this.setState({
                cardTrans:result.data
            });
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        CardTransactionsCall(this.state.startLog, this.state.endLog, this.state.cardStatus, this.state.userId).then(result => {
           this.setState({
               cardTrans:result.data
           });
        });


    };

    componentDidMount() {

        PubSub.subscribe('cardTransactions', this.mySubscriberTransactions);


        CardTransactionsCall(this.state.startLog, this.state.endLog, this.state.cardStatus, this.state.userId).then(result => {
            this.setState({
                cardTrans:result.data
            });
        });

    }

    sessionGet = (key) => {
        let stringValue = window.sessionStorage.getItem(key);
        if (stringValue !== null) {
            let value = JSON.parse(stringValue);
            let expirationDate = new Date(value.expirationDate);
            if (value.value) {
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

        if(this.state.td_transactions){
            return <Redirect to={'/customer-billing'} />

        }

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        const dataTable = this.state.cardTrans.map(function (item) {

            return item;

        });

        function TableCard() {
            if(dataTable.length > 0){
                return <CardTransactionTable data={dataTable} />;
            } else {
                return <CardTransactionTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Card Transaction</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border  table-col-gui'>
                                <h6 className="content-title">Card Payment Search</h6>
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
                                                <select className="input form-control" name="cardStatus" value={this.state.cardStatus} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="WAIT BANT RESPONSE">WAIT BANT RESPONSE</option>
                                                    <option value="SUCCESS">SUCCESS</option>
                                                    <option value="REJECTEDED">REJECTEDED</option>
                                                    <option value="BEGIN">BEGIN</option>
                                                    <option value="ERROR">ERROR</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='userId' value={this.state.userId} onChange={this.handleChanges} autoComplete='off' placeholder='User Id:'/>
                                            </div>
                                            <div className="form-group billing-input">
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
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='wrap-border table-col-gui'>
                                <TableCard/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(CardTransaction);