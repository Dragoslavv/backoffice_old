import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {
    changing_email_eSim, changing_email_mastercard,
    read_shopping_cart_id, resend_email_mastercard, reset_mastercard, send_SMS,
    sending_email_eSim,
    transfer_number
} from "../../components/UserFunctions";
import {store} from "react-notifications-component";

class MostCommonCases extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            cart_id : '',
            special_number: '',
            sim_type: '',
            send_email_esim:'',
            changing_email_esim:'',
            changing_number_esim:'',
            transfer_number:'',
            transfer_number_to:'',
            changing_userId_mastercard:'',
            changing_email_mastercard:'',
            resend_number:'',
            reset_mastercard:'',
            send_number: '',
            send_userID: '',
            send_message: ''
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.handleSearchCartId = this.handleSearchCartId.bind(this);
        this.handleSendEsim = this.handleSendEsim.bind(this);
        this.handleChangingEmaileSim = this.handleChangingEmaileSim.bind(this);
        this.handleTransferNumber = this.handleTransferNumber.bind(this);
        this.handleChangingMastercard = this.handleChangingMastercard.bind(this);
        this.handleResend = this.handleResend.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);

    }

    handleChanges =( e ) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };

    handleSendMessage = (e) => {
        e.preventDefault();

        send_SMS(this.state.send_number, this.state.send_message).then(result => {
            store.addNotification({
                title: 'Send SMS',
                message: result['message'],
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
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

    componentDidUpdate() {
        // console.log(localStorage.getItem('active'));
    }

    handleReset = (e) => {
        e.preventDefault();

        if(this.state.reset_mastercard !== '') {

            reset_mastercard(this.state.reset_mastercard).then(result => {
                if(result['success'] === true) {
                    store.addNotification({
                        title: 'Reset Mastercard',
                        message: 'You have successfully reset mastercard',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                } else {
                    store.addNotification({
                        title: 'Reset Mastercard',
                        message: result['message'],
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                }
            })

        } else {
            store.addNotification({
                title: 'Reset Mastercard',
                message: 'Please enter your number!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }
    };

    handleResend = (e) => {
      e.preventDefault();

        if(this.state.resend_number !== '') {

            resend_email_mastercard(this.state.resend_number).then(result => {
                if(result['success'] === true) {
                    store.addNotification({
                        title: 'Resend email on Mastercard',
                        message: 'You have successfully changing the email',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                } else {
                    store.addNotification({
                        title: 'Resend email on Mastercard',
                        message: result['message'],
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

        } else {
            store.addNotification({
                title: 'Resend email on Mastercard',
                message: 'Please enter your number!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }

    };

    handleChangingMastercard = (e) => {
      e.preventDefault();

      if(this.state.changing_email_mastercard !== '' && this.state.changing_userId_mastercard !== '' ) {

          changing_email_mastercard(this.state.changing_userId_mastercard, this.state.changing_email_mastercard).then(result => {
              if(result['success'] === true) {
                  store.addNotification({
                      title: 'Changing emails on Mastercard',
                      message: 'You have successfully changing the email',
                      type: 'success',                         // 'default', 'success', 'info', 'warning'
                      container: 'bottom-right',                // where to position the notifications
                      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                      dismiss: {
                          duration: 3000
                      }
                  });
              } else {
                  store.addNotification({
                      title: 'Changing emails on Mastercard',
                      message: result['message'],
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

      } else {
          store.addNotification({
              title: 'Changing emails on Mastercard',
              message: 'Please enter your userID and email!',
              type: 'info',                         // 'default', 'success', 'info', 'warning'
              container: 'bottom-right',                // where to position the notifications
              animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
              dismiss: {
                  duration: 3000
              }
          });
      }

    };

    handleTransferNumber = (e) => {
        e.preventDefault();

        if(this.state.transfer_number !== '' && this.state.transfer_number_to !== '' ) {

            transfer_number(this.state.transfer_number, this.state.transfer_number_to).then(result => {

                if(result['success'] === true) {
                    store.addNotification({
                        title: 'Transfer number',
                        message: 'You have successfully transfer number',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                } else {
                    store.addNotification({
                        title: 'Transfer number',
                        message: result['message'],
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

        } else {
            store.addNotification({
                title: 'Transfer number',
                message: 'Please enter your number and transfer number!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }

    };

    handleChangingEmaileSim = (e) => {
        e.preventDefault();

        if(this.state.changing_email_esim !== '' && this.state.changing_number_esim !== '') {

            changing_email_eSim(this.state.changing_email_esim, this.state.changing_number_esim).then(result => {

                if(result['success'] === true) {
                    store.addNotification({
                        title: 'Changing emails on eSim',
                        message: 'You have successfully changing the email',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                } else {
                    store.addNotification({
                        title: 'Changing emails on eSim',
                        message: result['message'],
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

        } else {
            store.addNotification({
                title: 'Changing emails on eSim',
                message: 'Please enter your number and email!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }

    };

    handleSendEsim = (e) => {
        e.preventDefault();

        if(this.state.send_email_esim !== '') {

            sending_email_eSim(this.state.send_email_esim).then(result => {

                if(result['success'] === true){
                    store.addNotification({
                        title: 'Sending an email to eSim',
                        message: 'You have successfully sent the email',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                } else {
                    store.addNotification({
                        title: 'Sending an email to eSim',
                        message: result['message'],
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

        } else {
            store.addNotification({
                title: 'Sending an email to eSim',
                message: 'Please enter your number!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'bottom-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }
    };

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
                                <h6 className="content-title">Sending an email to eSim</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='number' name='send_email_esim' value={this.state.send_email_esim} onChange={this.handleChanges} autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleSendEsim} type="submit">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Changing emails on eSim</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='changing_email_esim' value={this.state.changing_email_esim} onChange={this.handleChanges} autoComplete='off' placeholder='Email'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='number' name='changing_number_esim' value={this.state.changing_number_esim} onChange={this.handleChanges} autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleChangingEmaileSim} type="submit">Changes</button>
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
                                        <input className='input' type='number' name='transfer_number' value={this.state.transfer_number} onChange={this.handleChanges} autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='number' name='transfer_number_to' value={this.state.transfer_number_to} onChange={this.handleChanges} autoComplete='off' placeholder='Transfer number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleTransferNumber} type="submit">Transfer</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Changing emails on Mastercard</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='number' name='changing_userId_mastercard' value={this.state.changing_userId_mastercard} onChange={this.handleChanges} autoComplete='off' placeholder='User id'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='changing_email_mastercard' value={this.state.changing_email_mastercard} onChange={this.handleChanges} autoComplete='off' placeholder='Email'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleChangingMastercard} type="submit">Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Resend email on Mastercard</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='resend_number' value={this.state.resend_number} onChange={this.handleChanges} autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleResend} type="submit">Resend</button>
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
                                        <input className='input' type='text' name='reset_mastercard' value={this.state.reset_mastercard} onChange={this.handleChanges} autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-12 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Send SMS</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='send_number' value={this.state.send_number} onChange={this.handleChanges} autoComplete='off' placeholder='Number'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <textarea className='input' autoComplete='off' rows="4" cols="50" onChange={this.handleChanges} name='send_message' value={this.state.send_message} placeholder='Text:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleSendMessage} type="submit">SEND</button>
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