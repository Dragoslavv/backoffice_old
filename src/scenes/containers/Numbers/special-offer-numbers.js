import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {SpecialOfferNumbersTable} from "../../components/Table/special-offer-numbers";
import {SpecialOfferNumbersErrorsTable} from "../../components/Table/special-offer-numbers-errors-table";
import {NumberTypeTable} from "../../components/Table/number-type-table";
import {Redirect} from "react-router-dom";

class SpecialOfferNumbers extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect:false,
            quarantine: today + 'T23:59',
            number:'',
            provider:'',
            type:'',
            brand:'',
            reserved:'',
            condition:'',
            numbers: true,
            error: false,
            search:''
        };

        this.numbers = this.numbers.bind(this);
        this.error = this.error.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
           [e.target.name] : e.target.value
        });

    };

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'offer-number'){

            this.setState({
                search:'click'
            });

        }

    };

    numbers(){
        this.setState({
            numbers: !this.state.numbers,
            error: false
        });
    }

    error(){
        this.setState({
            numbers: false,
            error: !this.state.error
        });
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
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Special Offer Numbers</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-6">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Numbers Filter</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='number' value={this.state.number} onChange={this.handleChange} autoComplete='off' placeholder='Number:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='provider' value={this.state.provider} onChange={this.handleChange} autoComplete='off' placeholder='Provider:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="type" value={this.state.type} onChange={this.handleChange}>
                                                    <option value="">ALL</option>
                                                    <option value="regular">regular</option>
                                                    <option value="trial">trial</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="brand" value={this.state.brand} onChange={this.handleChange}>
                                                    <option value="">ALL</option>
                                                    <option value="Big River">Big River</option>
                                                    <option value="EASY SIM">EASY SIM</option>
                                                    <option value="globaltel">globaltel</option>
                                                    <option value="onlime">onlime</option>
                                                    <option value="Pink MOBILE">Pink MOBILE</option>
                                                    <option value="Virutal SIM">Virutal SIM</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' value={this.state.reserved} onChange={this.handleChange} name='reserved' autoComplete='off' placeholder='Reserved:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className='wrap-border mb-2'>
                                            <h6 className="content-title">Quarantine</h6>
                                            <hr/>
                                            <form method="post">
                                                <div className='form-group billing-input'>
                                                    <input className='input' type='datetime-local'  name='quarantine' value={this.state.quarantine} onChange={this.handleChange} autoComplete='off' placeholder='Time:'/>
                                                </div>
                                                <div className='form-group billing-input'>
                                                    <select className="input input-update" name="condition" value={this.state.condition} onChange={this.handleChange}>
                                                        <option value="">ALL</option>
                                                        <option value=">">YES</option>
                                                        <option value="<">NO</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <button className="btn btn-block btn-outline-light" type="submit">Reset</button>
                                                </div>
                                                <div className="col-lg-6">
                                                    <button className="btn btn-block btn-outline-light" onClick={this.handleClick} id='offer-number' type="submit">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Numbers Upload</h6>
                                <hr/>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='start' autoComplete='off' placeholder='Numbers:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='end' autoComplete='off' placeholder='Spec Offer Regions:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='end' autoComplete='off' placeholder='Type:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='end' autoComplete='off' placeholder='Quarantine:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='start' autoComplete='off' placeholder='Brand:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='end' autoComplete='off' placeholder='Provider:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='end' autoComplete='off' placeholder='Price:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='end' autoComplete='off' placeholder='Spec Offer Cities:'/>
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
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-6">
                            <button type='submit' onClick={this.numbers} className="btn btn-block btn-light">Numbers</button>
                            {this.state.numbers ?<hr className="hr-border-color "/> : ''}
                        </div>
                        <div className="col-lg-6">
                            <button type='submit' onClick={this.error} className="btn btn-block btn-light">Errors</button>
                            {this.state.error ?<hr className="hr-border-color "/> : ''}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className={this.state.numbers? 'wrap-border' : 'hidden-ul'}>
                                <SpecialOfferNumbersTable search={this.state.search} data={{
                                    quarantine: this.state.quarantine,
                                    number: this.state.number,
                                    provider: this.state.provider,
                                    type: this.state.type,
                                    brand: this.state.brand,
                                    reserved: this.state.reserved,
                                    condition:this.state.condition
                                }}>
                                </SpecialOfferNumbersTable>
                            </div>
                            <div className={this.state.error? 'wrap-border' : 'hidden-ul'}>
                                <button type='submit' className="btn btn-block btn-light" disabled={true}>Clear Old Data</button>
                                <SpecialOfferNumbersErrorsTable data=''>
                                </SpecialOfferNumbersErrorsTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(SpecialOfferNumbers);