import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {PinTable} from "../../components/Table/pin_table";
import {pin_verification} from "../../components/UserFunctions";

class PinVerification extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            pin_number:'',
            pin_trans:[]
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchPin = this.handleSearchPin.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSearchPin = (e) => {
        e.preventDefault();

        pin_verification(this.state.pin_number).then(result => {
            this.setState({
                pin_trans:result.data
            });
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

    componentWillUnmount() {
        //ToDo
    }


    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        const dataTable = this.state.pin_trans.map(function (item) {

            return item;

        });

        function TablePin() {
            if(dataTable.length > 0){
                return <PinTable data={dataTable} />;
            } else {
                return <PinTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Pin Verification</li>
                        </ol>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <h6 className="content-title">Number Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='number' autoComplete='off' value={this.state.pin_number} name='pin_number' onChange={this.handleChange}  placeholder='Number:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-light" onClick={this.handleSearchPin} type="submit">Add/Replace...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='wrap-border'>
                                <TablePin/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(PinVerification);