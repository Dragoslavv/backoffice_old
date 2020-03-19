import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {store} from "react-notifications-component";
import {MessageBulkTable} from "../../components/Table/message-bulk-table";

class MessageBulk extends Component {
    constructor(props){
        super(props);

        this.state = {
            bulk_name:'',
            provider_name:'',
            provide_name_create:'',
            bulk_name_create:'',
            search_bulk:false
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);
        this.handleSearchBulk = this.handleSearchBulk.bind(this);
    }

    handleSearchBulk =(e)=> {
        e.preventDefault();
console.log(this.state.bulk_name);
        console.log(this.state.provider_name);

        console.log(e.target.id);
        if(e.target.id === 'search_bulk'){

            this.setState({
                search_routes:true
            });

        }
    };

    handleOpen (){
        this.setState({
            search_bulk: false
        });
    }

    handleClickReset = (e) => {
        e.preventDefault();

        this.setState({
            bulk_name:'',
            provider_name:'',
        });
    };


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
                            <li className="breadcrumb-item active" aria-current="page">Message Bulk</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Search Bulk</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='bulk_name' value={this.state.bulk_name} onChange={this.handleChanges} autoComplete='off' placeholder='Bulk Name:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='provider_name' value={this.state.provider_name} onChange={this.handleChanges} autoComplete='off' placeholder='Provider Name:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleClickReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" id='search_bulk' onClick={this.handleSearchBulk} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border'>
                                <h6 className="content-title">Add Bulk</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='provide_name_create' value={this.state.provide_name_create} onChange={this.handleChanges} autoComplete='off' placeholder='Provider Name:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='bulk_name_create' value={this.state.bulk_name_create} onChange={this.handleChanges} autoComplete='off' placeholder='Bulk Name:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-light"  type="submit">Add</button>
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
                                <MessageBulkTable search={this.state.search_bulk} onOpen={this.handleOpen} data={{
                                    bulk_name: this.state.bulk_name,
                                    provider_name: this.state.provider_name,
                                }}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(MessageBulk);