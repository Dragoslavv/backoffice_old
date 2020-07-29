import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {ProcessPaymentTable} from "../../components/Table/ProcessPaymentTable";
import {ProcessPurchaselTable} from "../../components/Table/ProcessPurchaselTable";

class ProcessPurchasel extends Component {
    constructor(props){
        super(props);


        this.state = {
            redirect: false,
            payment : false,
            purchase: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.purchase = this.purchase.bind(this);
        this.payment = this.payment.bind(this);

    }

    payment = (e) => {
        e.preventDefault();

        this.setState({
            payment: true,
            purchase:false
        });
    };

    purchase = (e) => {
        e.preventDefault();

        this.setState({
            purchase: true,
            payment:false
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

                    <div className="row">
                        <div className="col-lg-12 mx-auto">

                            <div className={this.state.payment?'wrap-border table-col-gui': 'hidden-ul'} >
                                <h6 className="content-title">payment</h6>

                                <ProcessPaymentTable/>

                            </div>

                            <div className={this.state.purchase?'wrap-border table-col-gui': 'hidden-ul'} >
                                <h6 className="content-title">purchase</h6>

                                <ProcessPurchaselTable/>

                            </div>

                        </div>
                    </div>

                </section>
            </div>
        )
    }

}

export default withRouter(ProcessPurchasel);