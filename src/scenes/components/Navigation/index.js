import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {logout} from "../UserFunctions";
import './../../stayles/Navigation.css';
import localForages from "localforage";
import logo from "../../images/logo-white.png";

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
            role:'',
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
        localStorage.setItem("active", this.state.isActive);

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
                    <aside id="sidebar-wrapper" ref="_panel">
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
                            <li className={ this.state.billing  ? "active list-group shadow" :"list-group shadow" }>
                                <Link className='list-group-item' to="#" title="Billing" onClick={this.Billing} ><i className="fa fa-home fa-fw " ></i>Billing</Link>
                                <ul className={ this.state.billing ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to='/customer-billing' >Customer Billing</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to='/customer-payment' >Customer Payment</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/charge-log" >Charge Log</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/charge-data-log" >Charge Data Log</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/phone-numbers" >Phone Numbers</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/devices" >Devices</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/cdr-outbound" >Cdr Outbound</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/cdr-inbound" >Cdr InBound</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/package" >Package</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/sim-details" >SIM details</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/pin-verification" >Pin Verification</Link></li>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/data-limit" >Data Limit</Link></li>
                                </ul>
                            </li>
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688'  || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :
                                <li className={this.state.payment ? "active list-group shadow" : " list-group shadow"}>
                                    <Link to="#" className='list-group-item' title="Payment" onClick={this.Payment}><i
                                        className="fa fa-book fa-fw"></i>Payment</Link>

                                    <ul className={this.state.payment ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/transaction">Transaction</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/statistic">Statistic</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/payment-transaction">Payment
                                            Transaction</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/topup-transaction">Topup Transaction</Link>
                                        </li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/card-transaction">Card Transaction</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/ipay-transaction">iPay Transaction</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/ipay-cof-transaction">iPayCof Transaction</Link></li>
                                    </ul>
                                </li>
                            }

                            <li className='shadow list-group'>
                                <Link to="/cdr-log" onClick={ ()=> this.setState({isActive:false})} className='list-group-item' title="Cdr Log"><i className="fa fa-pencil fa-fw"></i>Cdr
                                    Log</Link>
                            </li>
                            <li className='shadow list-group'>
                                <Link to="/message-log" onClick={ ()=> this.setState({isActive:false})} className='list-group-item' title="Message Log"><i className="fa fa-envelope-o fa-fw"></i>Message
                                    Log</Link>
                            </li>
                            <li className='shadow list-group'>
                                <Link to="/process-purchasel" onClick={ ()=> this.setState({isActive:false})} className='list-group-item' title="Process Purchasel Log"><i className="fa fa-sort fa-fw"></i>Process Purchasel</Link>
                            </li>
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className={this.state.cdr ? "active list-group shadow" : "list-group shadow"}>
                                    <Link to="#" className='list-group-item' title="Cdr" onClick={this.Cdr}><i className="fa fa-eye fa-fw"></i>Cdr</Link>
                                    <ul className={this.state.cdr ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/daily-statistic">Daily Statistic</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/hourly-statistic">Hourly Statistic</Link></li>
                                    </ul>
                                </li>
                            }
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className={this.state.messaging ? "active list-group shadow" : "list-group shadow"}>
                                    <Link to="#" title="Messaging" className='list-group-item' onClick={this.Messaging}><i
                                        className="fa fa-envelope-o fa-fw"></i>Messaging</Link>
                                    <ul className={this.state.messaging ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/hourly">Hourly </Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/daily">Daily </Link></li>
                                    </ul>
                                </li>
                            }
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className={this.state.numbers ? "active list-group shadow" : "list-group shadow"}>
                                    <Link to="#" title="Numbers" className='list-group-item' onClick={this.Numbers}><i
                                        className="fa fa-phone-square fa-fw"></i>Numbers</Link>
                                    <ul className={this.state.numbers ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/numbers">Numbers </Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/statistic-numbers">Statistic </Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/special-offer-numbers">Special Offer
                                            Numbers</Link></li>
                                    </ul>
                                </li>
                            }
                            { sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className='shadow list-group'>
                                    <Link to="/routes" onClick={ ()=> this.setState({isActive:false})} className='list-group-item' title="Routes"><i className="fa fa-folder-open-o fa-fw"></i>Routes</Link>
                                </li>
                            }
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className='shadow list-group'>
                                    <Link to="/rates" onClick={ ()=> this.setState({isActive:false})} className='list-group-item' title="Rates"><i className="fa fa-code-fork  fa-fw"></i>Rates</Link>
                                </li>
                            }
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className={this.state.parking ? "active list-group shadow" : "list-group shadow"}>
                                    <Link to="#" title="Parking" className='list-group-item' onClick={this.Parking}><i
                                        className="fa fa-exchange fa-fw"></i>Parking</Link>
                                    <ul className={this.state.parking ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/parking-service">Parking Service </Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/parking-stat">Parking Stat </Link></li>
                                    </ul>
                                </li>
                            }
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className={this.state.package ? "active list-group shadow" : "list-group shadow"}>
                                    <Link to="#" title="Package" className='list-group-item' onClick={this.Package}><i
                                        className="fa fa-cloud-download fa-fw"></i>Package</Link>
                                    <ul className={this.state.package ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/package-default">Package</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/package-group">Package Group</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/package-stat">Package Stat</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/daily-active-packages">Daily Active Packages</Link></li>
                                    </ul>
                                </li>
                            }
                            <li className={ this.state.simDataActive ? "list-group active shadow" :"list-group shadow" }>
                                <Link className='list-group-item' to="#" title="Sim,Data & Active Users" onClick={this.SimDataActive}><i className="fa fa-user fa-fw" ></i>Sim,Data & Active</Link>
                                <ul className={ this.state.simDataActive  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/sim-report" >Sim Report</Link></li>
                                    {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096' || sessionStorage.getItem('phone_number_call_centar') === '381677230498' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/voip">Voip</Link></li>
                                    }
                                    {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498' || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/sim-daily">Sim Daily</Link></li>
                                    }
                                    {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498' || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/sim-hourly">Sim Hourly</Link></li>
                                    }
                                    {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498' || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                        <li className='shadow list-group' ><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/active-users">Active users</Link></li>
                                    }
                                    {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498' || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/data-consumption">Data</Link></li>
                                    }
                                </ul>
                            </li>
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className={this.state.mastercard ? "active list-group shadow" : "list-group shadow"}>
                                    <Link to="#" title="Mastercard" className='list-group-item' onClick={this.Mastercard}><i
                                        className="fa fa-credit-card fa-fw"></i>Mastercard</Link>
                                    <ul className={this.state.mastercard ? "sidebar-nav-second" : "hidden-ul"}>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/daily-activation-statistic">Daily Activation
                                            Statistic</Link></li>
                                        <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/hourly-activation-statistic">Hourly Activation
                                            Statistic</Link></li>
                                    </ul>
                                </li>
                            }
                            <li className={ this.state.mostcommoncases  ? "list-group active shadow" :"list-group shadow" }>
                                <Link to="#" title="Most common cases" className='list-group-item' onClick={this.Mostcommoncases} ><i className="fa fa-comment fa-fw" ></i>Most common cases</Link>
                                <ul className={ this.state.mostcommoncases  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/most-common-cases" >Cases</Link></li>
                                </ul>
                            </li>
                            <li className={ this.state.messagebulk  ? "active shadow" :"shadow" }>
                                <Link to="#" title="Most common cases" className='list-group-item' onClick={this.messageBulk} ><i className="fa fa-envelope-o fa-fw" ></i>Message Bulk</Link>
                                <ul className={ this.state.messagebulk  ? "sidebar-nav-second" :"hidden-ul" }>
                                    <li className='shadow list-group'><Link className='list-group-item' onClick={ ()=> this.setState({isActive:false})} to="/message-bulk" >Message Bulk</Link></li>
                                </ul>
                            </li>
                            {sessionStorage.getItem('username') === 'preda' || sessionStorage.getItem('phone_number_call_centar') === '381677191096'  || sessionStorage.getItem('phone_number_call_centar') === '381677230498'  || sessionStorage.getItem('phone_number_call_centar') === '381677000688' || sessionStorage.getItem('phone_number_call_centar') === '381677033075' || sessionStorage.getItem('phone_number_call_centar') === '381677001006' || sessionStorage.getItem('phone_number_call_centar') === '381677200400' || sessionStorage.getItem('phone_number_call_centar') === '381677200909' || sessionStorage.getItem('phone_number_call_centar') === '381677200900' || sessionStorage.getItem('phone_number_call_centar') === '381677103003' || sessionStorage.getItem('phone_number_call_centar') === '381677007100' ? '' :

                                <li className='shadow list-group'>
                                    <Link to="/system-message" onClick={ ()=> this.setState({isActive:false})} className='list-group-item' title="System Message"><i
                                        className="fa fa-cog fa-fw"></i>System Message</Link>
                                </li>
                            }
                        </ul>
                    </aside>

                    <div id="navbar-wrapper" >
                        <nav className="navbar navbar-inverse wrap-border">
                            <div className="container-fluid">
                                <div className="navbar-header" ref="_menu">
                                    <a href="#" className="navbar-brand" id="callapsible-nav" onClick={this.Collapsible} ><i className="fa fa-bars"></i></a>
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