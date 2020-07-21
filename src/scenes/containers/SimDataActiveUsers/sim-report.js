import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {SimReportTable} from "../../components/Table/sim-report-table";
import {Redirect} from "react-router-dom";
import PubSub from "pubsub-js";
import {store} from "react-notifications-component";
import {cancel_reservation, voip_api} from "../../components/UserFunctions";

class SimReport extends Component {
    constructor(props){
        super(props);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            start: today + 'T00:00',
            end: today + 'T23:59',
            data_type: '',
            cash_type: '',
            msisdn: '',
            search:'',
            id_from_sim_report:'',
            search_report:false,
            reservations_number:'',
            voip_id:'',
            check_voip:''
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.mySubscriberReport = this.mySubscriberReport.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCancelSimReservation = this.handleCancelSimReservation.bind(this);
        this.VoipIdReport = this.VoipIdReport.bind(this);

    }

    handleCancelSimReservation = (e) => {
      e.preventDefault();

      if(this.state.reservations_number !== '' && sessionStorage.getItem('role') !== '' && sessionStorage.getItem('role') !== 'USER'){

          cancel_reservation(this.state.reservations_number, sessionStorage.getItem('role')).then(result => {

              if(result['status'] === true){
                  store.addNotification({
                      title: 'Cancel sim Reservation',
                      message: result['message'],
                      type: 'success',                         // 'default', 'success', 'info', 'warning'
                      container: 'top-right',                // where to position the notifications
                      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                      dismiss: {
                          duration: 3000
                      }
                  })
              } else {
                  store.addNotification({
                      title: 'Cancel sim Reservation',
                      message: result['message'],
                      type: 'info',                         // 'default', 'success', 'info', 'warning'
                      container: 'top-right',                // where to position the notifications
                      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                      dismiss: {
                          duration: 3000
                      }
                  })
              }
          });

      }else{
          store.addNotification({
              title: 'Cancel sim Reservation',
              message: 'Parameter missing!',
              type: 'info',                         // 'default', 'success', 'info', 'warning'
              container: 'top-right',                // where to position the notifications
              animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
              dismiss: {
                  duration: 3000
              }
          })
      }
    };

    handleOpen (){
        this.setState({
            search_report: false
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

    handleReset = (e) => {
        e.preventDefault();

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.setState({
            start: today + 'T00:00',
            end: today + 'T23:59',
            data_type: '',
            cash_type: '',
            msisdn: '',
            search:'',
            check_voip:'',
            search_report: true,
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        this.setState({
            search_report: true,
        });
    };

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
           [e.target.name] : e.target.value
        });
    };

    mySubscriberReport(msg,dataSet) {

        this.setState({
            id_from_sim_report: dataSet
        })
    };

    VoipIdReport(msg,dataSet) {

        voip_api(dataSet,sessionStorage.getItem('username'),'true','voice').then(result => {

            if(result.status === true){
                this.setState({
                    voip_id: dataSet
                })
            } else {
                this.setState({
                    voip_id: ''
                })

                store.addNotification({
                    title: 'Setting up user on voip',
                    message: result.message,
                    type: 'info',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
            }

        });
    };


    componentDidMount() {
        PubSub.subscribe('id_from_sim_report', this.mySubscriberReport);
        PubSub.subscribe('get_voip_id', this.VoipIdReport);
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

        if(this.state.voip_id){
            return <Redirect to={'/customer-billing'} />

        }


        if(this.state.id_from_sim_report){
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
                            <li className="breadcrumb-item active" aria-current="page">Sim Report</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">Sim Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-4'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='start' value={this.state.start} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='end' value={this.state.end} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
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
                                    <div className='col-lg-4'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <select className="input" name="data_type" value={this.state.data_type} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value=" = 0">data = 0</option>
                                                    <option value="<= 4000000000">10 MB - data - 4GB </option>
                                                    <option value=">= 8000000000">data - 8GB</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input" name="cash_type" value={this.state.cash_type} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value=" = 0">cash = 0</option>
                                                    <option value=" <= 5000000">0 - cash - 50 </option>
                                                    <option value="> 5000000">cash - 50</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='msisdn' value={this.state.msisdn} onChange={this.handleChanges} autoComplete='off' placeholder='MSISDN:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input" name="check_voip" value={this.state.check_voip} onChange={this.handleChanges}>
                                                    <option value="">Voip</option>
                                                    <option value="TRUE">TRUE</option>
                                                    <option value="FALSE">FALSE</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>

                                    <div className='col-lg-4'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <label className='content-title' htmlFor='number_cancel_sim'>Cancel sim reservation</label>
                                                <input className='input' type='number' id='number_cancel_sim' name='reservations_number' value={this.state.reservations_number} onChange={this.handleChanges} autoComplete='off' placeholder='Number:'/>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-danger btn-login-from" onClick={this.handleCancelSimReservation} type="submit">Cancel Reservation</button>
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
                                <SimReportTable search={this.state.search_report} onOpen={this.handleOpen} data={
                                    {
                                        start_log: this.state.start,
                                        end_log: this.state.end,
                                        cash_type: this.state.cash_type,
                                        data_type: this.state.data_type,
                                        msisdn: this.state.msisdn,
                                        voip: this.state.check_voip,
                                        search: this.state.search
                                    }
                                }>
                                </SimReportTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(SimReport);