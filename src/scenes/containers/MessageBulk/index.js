import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {store} from "react-notifications-component";
import {MessageBulkTable} from "../../components/Table/message-bulk-table";
import PubSub from "pubsub-js";
import $ from "jquery";
import {create_bulk, destroy_bulk_message_api, select_bulk} from "../../components/UserFunctions";

class MessageBulk extends Component {
    constructor(props){
        super(props);

        this.state = {
            bulk_name:'',
            provider_name:'',
            provide_name_create:'',
            bulk_name_create:'',
            search_bulk:false,
            modal:false,
            data:{
                user: '',
                id: '',
                bulk_name: '',
                provider_id: '',
                provider_name: '',
            },
            select_bulk:[]
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);
        this.handleSearchBulk = this.handleSearchBulk.bind(this);
        this.handleMessageBulkRemove = this.handleMessageBulkRemove.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAddBulk = this.handleAddBulk.bind(this);
        this.handleClear = this.handleClear.bind(this);

    }

    handleAddBulk = (e) => {
        e.preventDefault();

        if(this.state.bulk_name_create !== '' && this.state.provide_name_create !== '' && sessionStorage.getItem('username') !== '' && sessionStorage.getItem('role') !== ''&& sessionStorage.getItem('role') !== 'USER' ){

            create_bulk(this.state.bulk_name_create, this.state.provide_name_create, sessionStorage.getItem('username'), sessionStorage.getItem('role')).then(result => {

                if(result['status'] === true){
                    store.addNotification({
                        title: 'Message Bulk',
                        message: result['message'],
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                }else {
                    store.addNotification({
                        title: 'Message Bulk',
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

        } else {
            store.addNotification({
                title: 'Message Bulk',
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


    handleClear = (e) => {
        e.preventDefault();

        this.setState({
            provide_name_create:'',
            bulk_name_create:'',
        });
    };

    handleSave = (e) => {
        e.preventDefault();

        if(this.state.data.user !== '' && this.state.data.id[0] !== '' && this.state.data.bulk_name[0] !== '' && this.state.data.provider_id[0] &&
            this.state.data.provider_name[0] !== ''
        ){
            destroy_bulk_message_api(this.state.data.id[0], this.state.data.bulk_name[0], this.state.data.provider_id[0], this.state.data.user ).then(result =>{
               if(result['status'] === true){
                   store.addNotification({
                       title: 'Message Bulk',
                       message: 'Deleted',
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
                       title: 'Message Bulk',
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

        }else {
            store.addNotification({
                title: 'Message Bulk',
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

    handleSearchBulk =(e)=> {
        e.preventDefault();

        if(e.target.id === 'search_bulk'){

            this.setState({
                search_bulk:true
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
            search_bulk:true
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

    handleMessageBulkRemove (msg,dataSet){
        $(this.modal).show();

        this.setState({
            data:{
                user: sessionStorage.getItem('username'),
                id: dataSet['id_bulk'],
                bulk_name: dataSet['name_bulk'],
                provider_id: dataSet['provider_id_bulk'],
                provider_name: dataSet['provider_name_bulk'],
            }
        })
    }

    handleCancel = (e) => {
        e.preventDefault();
        $(this.modal).hide();
    };



    componentDidMount() {
        PubSub.subscribe('message_bulk', this.handleMessageBulkRemove);

        select_bulk().then(result => {
           this.setState({
              select_bulk: result.data
           });
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
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Message Bulk</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border table-col-gui'>
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
                                                <button className="btn btn-block btn-outline-info" onClick={this.handleClickReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" id='search_bulk' onClick={this.handleSearchBulk} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">Add Bulk</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <select className="input " name="provide_name_create" value={this.state.provide_name_create} onChange={this.handleChanges}>
                                            <option value="">Provider Name:</option>
                                            {this.state.select_bulk.map(function (item) {

                                                return <option key={item.id} value={item.id}>{item.name}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='bulk_name_create' value={this.state.bulk_name_create} onChange={this.handleChanges} autoComplete='off' placeholder='Bulk Name:'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info" onClick={this.handleClear}  type="submit">Clear</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" onClick={this.handleAddBulk}  type="submit">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='wrap-border table-col-gui'>
                                <MessageBulkTable search={this.state.search_bulk} onOpen={this.handleOpen} data={{
                                    bulk_name: this.state.bulk_name,
                                    provider_name: this.state.provider_name,
                                }}/>
                            </div>
                        </div>
                    </div>



                    <div className="modal" id="modal2" ref={modal => this.modal = modal} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row mb-3">
                                        <div className="col-lg-12">
                                            <h6 className="color-white"> Are you sure you want to delete the bulk id
                                                : {this.state.data.id?this.state.data.id:''}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-light"
                                            data-dismiss="modal" onClick={this.handleCancel} >Cancel
                                    </button>
                                    <button type="button" className="btn btn-outline-light"
                                            data-dismiss="modal" onClick={this.handleSave} >Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>



                </section>
            </div>
        )
    }

}

export default withRouter(MessageBulk);