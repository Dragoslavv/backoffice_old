import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {read_shopping_cart_id} from "../../components/UserFunctions";
import {store} from "react-notifications-component";

class MostCommonCases extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            cart_id : '',
            special_number: '',
            sim_type: ''
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.handleSearchCartId = this.handleSearchCartId.bind(this);
    }

    handleChanges =( e ) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
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

    componentDidUpdate() {
        // console.log(localStorage.getItem('active'));
    }

    handleSearchCartId = (e) => {
        e.preventDefault();

        read_shopping_cart_id(this.state.cart_id).then(result => {
            if(result['success'] === true){
                this.setState({
                    special_number: result['data']['special_number'],
                    sim_type: result['data']['sim_type']
                });
            } else {
                this.setState({
                    special_number: '',
                    sim_type: ''
                });
                store.addNotification({
                    title: 'Search by shopping cart id',
                    message: 'Cart id is not a valid!',
                    type: 'info',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
            }
        });

    };

    componentDidMount() {

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
                            <li className="breadcrumb-item active" aria-current="page">Most common cases</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Search by shopping cart id</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='cart_id' value={this.state.cart_id} onChange={this.handleChanges} autoComplete='off' placeholder='Shopping cart id:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleSearchCartId} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Info shopping cart id</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='special_number' value={this.state.special_number} readOnly={true} onChange={this.handleChanges}  autoComplete='off' placeholder='Special number'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='sim_type' value={this.state.sim_type} readOnly={true} onChange={this.handleChanges} autoComplete='off' placeholder='Sim type'/>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Send email for eSim</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='send_number' autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" type="submit">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Changes email for eSim</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='change_email' autoComplete='off' placeholder='Email'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='change_number' autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" type="submit">Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Transfer Number</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='start' autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='start' autoComplete='off' placeholder='Transfer number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" type="submit">Transfer</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Changes email for Mastercard</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='start' autoComplete='off' placeholder='User id'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='start' autoComplete='off' placeholder='Email'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" type="submit">Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Resend email for Mastercard</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='start' autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" type="submit">Resend</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Reset Mastercard</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='start' autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(MostCommonCases);