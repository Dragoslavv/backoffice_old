import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {ChargeLogTable} from "../../components/Table/charge-log-table";
import localForages from "localforage";
import {ChargeLogTrans} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class ChargeLog extends Component {
    constructor(props){
        super(props);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            start_log: today + 'T00:00',
            end_log: today + 'T23:59:59',
            type_log:'ALL',
            chargeLog:[],
            redirect:false

        };

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.onClickChargeLog = this.onClickChargeLog.bind(this);
        this.sessionGet = this.sessionGet.bind(this);

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

    validate(){

        if(this.state.start_log !== ''  && this.state.start_log.length > 0 &&
            this.state.end_log !== ''  && this.state.end_log.length > 0
        ){
            return this.state.start_log && this.state.end_log && this.state.type_log;
        }

    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    onClickChargeLog = (e) => {
        e.preventDefault();


        const billing_id = localForages.getItem('billing_id_api', function (err, value) {
            return value;
        });

        billing_id.then(value => {

            if(value !== ''){
                ChargeLogTrans(value, this.state.start_log, this.state.end_log, this.state.type_log).then(result => {
                    this.setState({
                        chargeLog: result.data,
                    })
                });

            }
        });
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


    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        const dataTable = this.state.chargeLog.map(function (item) {

            return item;

        });

        function Table() {
            if(dataTable.length > 0){
                return <ChargeLogTable data={dataTable} />
            } else {
                return <ChargeLogTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Charge Log</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='datetime-local' min="1000-01-01" value={this.state.start_log} onChange={this.handleChange} name='start_log' id='start_log' autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='datetime-local' min="1000-01-01" value={this.state.end_log} onChange={this.handleChange} autoComplete='off' name='end_log' id='end_log'  placeholder='End:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update" name="type_log" id='type_log' value={this.state.type_log} onChange={this.handleChange}>
                                            <option value="ALL">ALL</option>
                                            <option value="api">api</option>
                                            <option value="auction">auction</option>
                                            <option value="BonusCredit">BonusCredit</option>
                                            <option value="Diameter Data">Diameter Data</option>
                                            <option value="DIDWW">DIDWW</option>
                                            <option value="iPay">iPay</option>
                                            <option value="mintanance">mintanance</option>
                                            <option value="PayPinkAik">PayPinkAik</option>
                                            <option value="proba">proba</option>
                                            <option value="PromoBox">PromoBox</option>
                                            <option value="PromoBoxZero">PromoBoxZero</option>
                                            <option value="Recommendation">Recommendation</option>
                                            <option value="RegisterSim Migration">RegisterSim Migration</option>
                                            <option value="registration">registration</option>
                                            <option value="SPOfferOrder">SPOfferOrder</option>
                                            <option value="test">test</option>
                                            <option value="Transfer credit">Transfer credit</option>
                                            <option value="TransferCredit">TransferCredit</option>
                                            <option value="vas">vas</option>
                                            <option value="VasServices">VasServices</option>
                                            <option value="voice">voice</option>
                                            <option value="voice_old">voice_old</option>
                                            <option value="WalletTransfer">WalletTransfer</option>
                                            <option value="WSPay">WSPay</option>
                                        </select>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" disabled={!this.validate()} onClick={this.onClickChargeLog} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border'>
                                <Table/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(ChargeLog);