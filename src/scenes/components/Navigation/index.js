import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logout} from "../UserFunctions";
import './../../stayles/Navigation.css';
import localForages from "localforage";
import logo from "../../images/logo-white.png";
// import {Redirect} from "react-router-dom";

class Navigation extends Component {

    constructor(props){
        super(props);

        this.state = {
            isActive:false,
            billing:false,
            payment:false,
            cdr:false,
            messaging:false,
            numbers:false,
            parking:false,
            package:false,
            simDataActive:false,
            mastercard:false,
            mostcommoncases:false,
            messagebulk:false,
            role:''
        };

        this.logOut = this.logOut.bind(this);
        this.Collapsible = this.Collapsible.bind(this);
        this.Billing = this.Billing.bind(this);
        this.Payment = this.Payment.bind(this);
        this.Cdr = this.Cdr.bind(this);
        this.Messaging = this.Messaging.bind(this);
        this.Numbers = this.Numbers.bind(this);
        this.Parking = this.Parking.bind(this);
        this.Package = this.Package.bind(this);
        this.SimDataActive = this.SimDataActive.bind(this);
        this.Mastercard = this.Mastercard.bind(this);
        this.Mostcommoncases = this.Mostcommoncases.bind(this);
        this.messageBulk = this.messageBulk.bind(this);
    }

    componentDidMount() {

        const role = localForages.getItem('role', function (err, value) {
            return value;
        });

        role.then(value => {
            this.setState({
                role: value
            });
        });
    }

    componentWillUnmount() {
        //ToDo
    }


    Collapsible = (e) =>{
        e.preventDefault();

        this.setState( {
            isActive : !this.state.isActive,
            payment: false,
            cdr: false,
            messaging: false,
            numbers: false,
            parking: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            billing: false,
            messagebulk:false

        });
        localStorage.setItem("active", this.state.isActive);
    };

    Billing = (e) =>{
        e.preventDefault();

        this.setState( {
            billing : !this.state.billing,
            payment: false,
            cdr: false,
            messaging: false,
            numbers: false,
            parking: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Payment = (e) =>{
        e.preventDefault();

        this.setState( {
            payment : !this.state.payment,
            billing: false,
            cdr: false,
            messaging: false,
            numbers: false,
            parking: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Cdr = (e) =>{
        e.preventDefault();

        this.setState( {
            cdr : !this.state.cdr,
            billing: false,
            payment: false,
            messaging: false,
            numbers: false,
            parking: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Messaging = (e) =>{
        e.preventDefault();

        this.setState( {
            messaging : !this.state.messaging,
            billing: false,
            payment: false,
            cdr: false,
            numbers: false,
            parking: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Numbers = (e) =>{
        e.preventDefault();

        this.setState( {
            numbers : !this.state.numbers ,
            billing: false,
            payment: false,
            cdr: false,
            messaging: false,
            parking: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Parking = (e) =>{
        e.preventDefault();

        this.setState( {
            parking : !this.state.parking,
            billing: false,
            payment: false,
            cdr: false,
            messaging: false,
            numbers: false,
            package: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Package = (e) =>{
        e.preventDefault();

        this.setState( {
            package : !this.state.package,
            billing: false,
            payment: false,
            cdr: false,
            messaging: false,
            parking:false,
            numbers: false,
            simDataActive: false,
            mastercard: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    SimDataActive = (e) =>{
        e.preventDefault();

        this.setState( {
            simDataActive : !this.state.simDataActive ,
            billing: false,
            payment: false,
            cdr: false,
            messaging: false,
            numbers: false,
            package:false,
            mastercard: false,
            parking: false,
            mostcommoncases: false,
            messagebulk:false


        });
    };
    Mastercard = (e) =>{
        e.preventDefault();

        this.setState( {
            mastercard : !this.state.mastercard,
            billing: false,
            payment: false,
            cdr: false,
            messaging: false,
            numbers: false,
            package:false,
            simDataActive: false,
            parking:false,
            mostcommoncases: false,
            messagebulk:false

        });
    };
    Mostcommoncases = (e) => {
      e.preventDefault();

      this.setState({
          mostcommoncases: !this.state.mostcommoncases,
          billing: false,
          payment: false,
          cdr: false,
          messaging: false,
          numbers: false,
          package:false,
          simDataActive: false,
          parking:false,
          mastercard:false,
          messagebulk:false
      });
    };

    messageBulk =(e)=>{
        e.preventDefault();
        this.setState({
            messagebulk: !this.state.messagebulk,
            mostcommoncases: false,
            billing: false,
            payment: false,
            cdr: false,
            messaging: false,
            numbers: false,
            package:false,
            simDataActive: false,
            parking:false,
            mastercard:false
        });
    };

    logOut = (e) => {
        e.preventDefault();

        logout().then(data => {

            if(data.status === true && data.tokens === null) {
                sessionStorage.setItem('token','');
                sessionStorage.removeItem('token');

                localForages.setItem('role', '');
                sessionStorage.setItem('firstName', '');
                sessionStorage.setItem('lastName', '');
                sessionStorage.removeItem('lastName');
                sessionStorage.removeItem('firstName');
                sessionStorage.removeItem('role');


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


                localForages.setItem('username', '');
                localForages.clear();
                sessionStorage.clear();

                this.props.history.push('/');
            }
        });

    };

    render() {

        const userLink = (

            <div>
                <div id="wrapper" className={ this.state.isActive ? "toggled" :"" }>
                    <aside id="sidebar-wrapper">
                        <div className="sidebar-brand ">
                            <img src={logo} alt='globaltel-logo'/>
                        </div>
                        <ul className="sidebar-nav">
                            <div className=" card-login ribbon4">
                                <p className="centered">
                                    <Link className="" to="/profile">
                                        <i className="fa fa-user"></i>
                                    </Link>
                                </p>
                                <h5 className="centered">{sessionStorage.getItem('firstName') !=='' && sessionStorage.getItem('lastName') !==''? sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName'): ''}</h5>
                                <h6 className="centered da">{sessionStorage.getItem('role') !==''? sessionStorage.getItem('role') : ''}</h6>
                            </div>
                            <li className={ this.state.billing  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Billing" onClick={this.Billing} ><i className="fa fa-angle-right" ></i>Billing</Link>
                                <ul className={ this.state.billing ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to='/customer-billing' >Customer Billing</Link></li>
                                    <li className='shadow'><Link to='/customer-payment' >Customer Payment</Link></li>
                                    <li className='shadow'><Link to="/charge-log" >Charge Log</Link></li>
                                    <li className='shadow'><Link to="/charge-data-log" >Charge Data Log</Link></li>
                                    <li className='shadow'><Link to="/phone-numbers" >Phone Numbers</Link></li>
                                    <li className='shadow'><Link to="/devices" >Devices</Link></li>
                                    <li className='shadow'><Link to="/cdr-outbound" >Cdr Outbound</Link></li>
                                    <li className='shadow'><Link to="/cdr-inbound" >Cdr InBound</Link></li>
                                    <li className='shadow'><Link to="/package" >Package</Link></li>
                                    <li className='shadow'><Link to="/sim-details" >SIM details</Link></li>
                                    <li className='shadow'><Link to="/pin-verification" >Pin Verification</Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.payment  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Payment" onClick={this.Payment}><i className="fa fa-angle-right" ></i>Payment</Link>
                                <ul className={ this.state.payment  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/transaction" >Transaction</Link></li>
                                    <li className='shadow'><Link to="/statistic" >Statistic</Link></li>
                                    <li className='shadow'><Link to="/payment-transaction" >Payment Transaction</Link></li>
                                    <li className='shadow'><Link to="/topup-transaction" >Topup Transaction</Link></li>
                                    <li className='shadow'><Link to="/card-transaction" >Card Transaction</Link></li>
                                    <li className='shadow'><Link to="/ipay-transaction" >iPay Transaction</Link></li>
                                </ul>
                            </li>
                            <li className='shadow'>
                                <Link to="/cdr-log" title="Cdr Log" ><i className="fa fa-angle-right" ></i>Cdr Log</Link>
                            </li>
                            <li className='shadow'>
                                <Link to="/message-log" title="Message Log"><i className="fa fa-angle-right" ></i>Message Log</Link>
                            </li>
                            <li className={ this.state.cdr ? "active shadow" :"shadow" }>
                                <Link to="#" title="Cdr" onClick={this.Cdr} ><i className="fa fa-angle-right" ></i>Cdr</Link>
                                <ul className={ this.state.cdr ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/daily-statistic" >Daily Statistic</Link></li>
                                    <li className='shadow'><Link to="/hourly-statistic" >Hourly Statistic</Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.messaging ? "active shadow" :"shadow" }>
                                <Link to="#" title="Messaging" onClick={this.Messaging} ><i className="fa fa-angle-right"></i>Messaging</Link>
                                <ul className={ this.state.messaging  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/hourly" >Hourly </Link></li>
                                    <li className='shadow'><Link to="/daily" >Daily </Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.numbers  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Numbers" onClick={this.Numbers}><i className="fa fa-angle-right" ></i>Numbers</Link>
                                <ul className={ this.state.numbers ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/numbers" >Numbers </Link></li>
                                    <li className='shadow'><Link to="/statistic-numbers" >Statistic </Link></li>
                                    <li className='shadow'><Link to="/special-offer-numbers" >Special Offer Numbers</Link></li>
                                </ul>
                            </li>
                            <li className='shadow'>
                                <Link to="/routes" title="Routes"><i className="fa fa-angle-right"></i>Routes</Link>
                            </li>
                            <li className='shadow'>
                                <Link to="/rates" title="Rates"><i className="fa fa-angle-right"></i>Rates</Link>
                            </li>
                            <li className={ this.state.parking? "active shadow" :"shadow" }>
                                <Link to="#" title="Parking" onClick={this.Parking}><i className="fa fa-angle-right" ></i>Parking</Link>
                                <ul className={ this.state.parking ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/parking-service" >Parking Service </Link></li>
                                    <li className='shadow'><Link to="/parking-stat" >Parking Stat </Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.package  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Package" onClick={this.Package} ><i className="fa fa-angle-right" ></i>Package</Link>
                                <ul className={ this.state.package? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/package-default" >Package</Link></li>
                                    <li className='shadow'><Link to="/package-group" >Package Group</Link></li>
                                    <li className='shadow'><Link to="/package-stat" >Package Stat</Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.simDataActive ? "active shadow" :"shadow" }>
                                <Link to="#" title="Sim,Data & Active Users" onClick={this.SimDataActive}><i className="fa fa-angle-right" ></i>Sim,Data & Active</Link>
                                <ul className={ this.state.simDataActive  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/sim-report" >Sim Report</Link></li>
                                    <li className='shadow'><Link to="/sim-daily" >Sim Daily</Link></li>
                                    <li className='shadow'><Link to="/sim-hourly" >Sim Hourly</Link></li>
                                    <li className='shadow'><Link to="/active-users" >Active users</Link></li>
                                    <li className='shadow'><Link to="/data-consumption" >Data</Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.mastercard  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Mastercard" onClick={this.Mastercard} ><i className="fa fa-angle-right" ></i>Mastercard</Link>
                                <ul className={ this.state.mastercard  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/daily-activation-statistic" >Daily Activation Statistic</Link></li>
                                    <li className='shadow'><Link to="/hourly-activation-statistic" >Hourly Activation Statistic</Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.mostcommoncases  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Most common cases" onClick={this.Mostcommoncases} ><i className="fa fa-angle-right" ></i>Most common cases</Link>
                                <ul className={ this.state.mostcommoncases  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/most-common-cases" >Cases</Link></li>
                                </ul>
                            </li>
                            <li className='shadow'>
                                <Link to="/system-message" title="System Message"><i className="fa fa-angle-right" ></i>System Message</Link>
                            </li>
                            <li className={ this.state.messagebulk  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Most common cases" onClick={this.messageBulk} ><i className="fa fa-angle-right" ></i>Message Bulk</Link>
                                <ul className={ this.state.messagebulk  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow'><Link to="/message-bulk" >Message Bulk</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </aside>

                    <div id="navbar-wrapper">
                        <nav className="navbar navbar-inverse">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a href="#" className="navbar-brand" onClick={this.Collapsible} ><i className="fa fa-bars"></i></a>
                                </div>
                                <div className="navbar-header float-lg-right">
                                    <a href="#" className="navbar-brand"  onClick={this.logOut} ><i className="fa fa-power-off"></i></a>
                                </div>
                            </div>
                        </nav>
                    </div>

                    {/*Todo*/}
                </div>
            </div>

        );
        return (
            <div>
                {sessionStorage.token ? userLink : ''}
            </div>
        )
    }

}

export default withRouter(Navigation);