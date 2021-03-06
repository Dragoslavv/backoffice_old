import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PhoneNumbersTable} from "../../components/Table/phone-numbers-table";
import {Redirect} from "react-router-dom";
import PubSub from "pubsub-js";
import localForages from "localforage";
import {SwitchToSimNumber} from "../../components/UserFunctions";
import {store} from "react-notifications-component";
import Cookies from "universal-cookie";

class PhoneNumbers extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.SwitchToSim = this.SwitchToSim.bind(this);

    }

    SwitchToSim(msg,dataSet) {

        const cookies = new Cookies();

        const userId = cookies.get('user_id_for_phone_numbers');

        // userId.then(value => {

            SwitchToSimNumber(userId, dataSet).then( result => {

                if(result.msg === "OK") {

                    store.addNotification({
                        title: 'Switch To Sim',
                        message: 'Successfully!',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });

                } else {

                    store.addNotification({
                        title: 'Switch To Sim',
                        message: 'Call does not work!!',
                        type: 'warning',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });

                }

            });

        // });

    };

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

    componentDidMount() {
        PubSub.subscribe('switch_to_sim', this.SwitchToSim);

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

        const cookies = new Cookies();

        if(!cookies.get('tokens')){
            return <Redirect to={'/'} />
        }


        return (
            <div id="wrapper" className={ cookies.get('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Phone Numbers</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='wrap-border table-col-gui border-table-smt'>
                                <PhoneNumbersTable/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(PhoneNumbers);