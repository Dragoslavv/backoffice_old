import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {SystemMessageTable} from "../../components/Table/system-message-table";
import {
    createSyMessage,
    destroySyMessage,
    distFieldVsBrand,
    distFieldVsText,
    updateSyMessage
} from "../../components/UserFunctions";
import PubSub from "pubsub-js";
import $ from "jquery";
import {store} from "react-notifications-component";
import {Redirect} from "react-router-dom";

class SystemMessage extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            create: false,
            search: true,
            modal:false,
            modalRemove: false,
            search_sys:false,
            key: '',
            brand: '',
            script: '',
            vsBrand: [],
            vsText: [],
            search_button:'',
            editSMid: '',
            editSMkey: '',
            editSMibrand: '',
            editSMscript: '',
            editSMmessage: '',
            editSMlanguage: '',
            removeSMid: '',
            addKey: '',
            addMessage: '',
            addLand: '',
            addScript: ''
        };


        this.create = this.create.bind(this);
        this.search = this.search.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlleReset = this.handlleReset.bind(this);
        this.editSystemMessage = this.editSystemMessage.bind(this);
        this.removeSystemMessage = this.removeSystemMessage.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleUpdateMessageModal = this.handleUpdateMessageModal.bind(this);
        this.handleRemoveMessageModal = this.handleRemoveMessageModal.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleCreateMessage = this.handleCreateMessage.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen (){
        this.setState({
            search_sys: false
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

    handleCreateMessage = (e) => {
        e.preventDefault();

        createSyMessage(this.state.addKey, this.state.addMessage, this.state.addLand, this.state.addScript).then(result => {
            if(result.status === true) {
                store.addNotification({
                    title: 'System Message',
                    message: 'You have successfully created the message ',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
            }else {
                store.addNotification({
                    title: 'System Message',
                    message: 'message not created (make sure you entered good parameters)! ',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
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

    validate(){

        if(this.state.addKey !== ''  && this.state.addKey.length > 0 && this.state.addMessage !== ''  && this.state.addMessage.length > 0 && this.state.addLand !== ''  && this.state.addLand.length > 0 && this.state.addScript !== ''  && this.state.addScript.length > 0 ){
            return this.state.addKey && this.state.addMessage && this.state.addLand && this.state.addScript;
        }

    }

    handleClear = (e) => {
        e.preventDefault();

        this.setState({
            addKey: '',
            addMessage: '',
            addLand: '',
            addScript: ''
        });
    };

    handleRemoveMessageModal = (e) => {
        e.preventDefault();

        destroySyMessage(this.state.removeSMid).then(result => {

            if(result.status === true) {
                store.addNotification({
                    title: 'System Message',
                    message: 'You have successfully deleted ',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
            }else {
                store.addNotification({
                    title: 'System Message',
                    message: 'No data remove! ',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
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

    handleUpdateMessageModal = (e) => {
        e.preventDefault();

        let record = "{\"key_gui\":\""+ this.state.editSMkey +"\",\"value_gui\":\""+  this.state.editSMmessage +"\",\"lang\":\""+ this.state.editSMlanguage +"\",\"brand\":\""+ this.state.editSMibrand +"\",\"script\":\""+ this.state.editSMscript +"\"}";


        updateSyMessage(this.state.editSMid,record). then(result => {

           if(result.status === true) {
               store.addNotification({
                   title: 'System Message',
                   message: 'You have successfully made the changes ',
                   type: 'success',                         // 'default', 'success', 'info', 'warning'
                   container: 'bottom-right',                // where to position the notifications
                   animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                   animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                   dismiss: {
                       duration: 3000
                   }
               });
           }else {
               store.addNotification({
                   title: 'System Message',
                   message: 'No data changed! ',
                   type: 'warning',                         // 'default', 'success', 'info', 'warning'
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

    handleCloseModal = (e) => {
      e.preventDefault();
        $(this.modal).hide();
        $(this.modalRemove).hide();

    };

    removeSystemMessage(msg,data){
        $(this.modalRemove).show();

        this.setState({
            removeSMid: data['id'][0],
        });
    };

    editSystemMessage (msg,data) {
        $(this.modal).show();


        this.setState({
            editSMid: data['id'],
            editSMkey: data['key'],
            editSMibrand: data['brand'],
            editSMscript: data['script'],
            editSMmessage: data['message'],
            editSMlanguage: data['language'],

        })
    }

    handlleReset = (e) => {
        e.preventDefault();

        this.setState({
            key: '',
            brand: '',
            script: '',
            search_sys:true
        });

    };

    handleChanges =( e ) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };

    create(){
        this.setState({
            create: !this.state.create,
            search: false
        });
    }

    search(){
        this.setState({
            search: !this.state.search,
            create:false
        });
    }

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'search_sys'){

            this.setState({
                search_sys:true
            });

        }
    };

    componentDidMount() {

        $(this.modal).hide();
        $(this.modal).on('hidden.bs.modal', this.editSystemMessage);

        $(this.modal).hide();
        $(this.modal).on('hidden.bs.modal', this.removeSystemMessage);

        PubSub.subscribe('system_message_edit', this.editSystemMessage);

        PubSub.subscribe('system_message_remove', this.removeSystemMessage);


        distFieldVsBrand().then(result => {

            this.setState({
                vsBrand: result.data
            })
        });


        distFieldVsText().then(result => {

            this.setState({
                vsText: result.data
            })

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
        // this.$el.DataTable.destroy(true);
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
                            <li className="breadcrumb-item active" aria-current="page">System Message</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <div className="row mb-4">
                                <div className="col-lg-6 mb-3">
                                    <button className="btn btn-block btn-outline-light" onClick={this.create} type="submit"><i className="fa fa-plus" ></i></button>
                                </div>
                                <div className="col-lg-6">
                                    <button className="btn btn-block btn-outline-light" onClick={this.search} type="submit"><i className="fa fa-search" ></i></button>
                                </div>
                            </div>
                            <div className={this.state.create?'wrap-border': 'hidden-ul'} >
                                <h6 className='content-title'>Create Message</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='text' name='addKey' value={this.state.addKey} onChange={this.handleChanges} autoComplete='off' placeholder='Key'/>
                                    </div>
                                    <div className='form-group'>
                                        <textarea className='input' autoComplete='off' name='addMessage'  value={this.state.addMessage} onChange={this.handleChanges} placeholder='Message:'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='text' autoComplete='off' name='addLand' value={this.state.addLand} onChange={this.handleChanges}  placeholder='language'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='text' autoComplete='off' name='addScript' value={this.state.addScript} onChange={this.handleChanges}  placeholder='Script'/>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleClear} type="submit">Clear</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" disabled={!this.validate()} onClick={this.handleCreateMessage} type="submit">Create</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={this.state.search?'wrap-border':'hidden-ul'} >
                                <h6 className='content-title'>Search Message</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='text' name='key' value={this.state.key} onChange={this.handleChanges} autoComplete='off' placeholder='Key'/>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="brand" value={this.state.brand} onChange={this.handleChanges}>
                                            <option value="">ALL</option>
                                            {this.state.vsBrand.map(function (item) {

                                                return <option key={item.value} value={item.value}>{item.value}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="script" value={this.state.script} onChange={this.handleChanges}>
                                            <option value="">ALL</option>
                                            {this.state.vsText.map(function (item) {

                                                return <option key={item.value} value={item.value}>{item.value}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handlleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleClick} id="search_sys" type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border'>
                                <SystemMessageTable search={this.state.search_sys}  onOpen={this.handleOpen} data={
                                    {
                                        key: this.state.key,
                                        brand: this.state.brand,
                                        script: this.state.script,
                                        search_button: this.state.search_button,
                                    }
                                }>
                                </SystemMessageTable>
                            </div>
                        </div>
                    </div>
                </section>



                <div className="modal" id="PerCostUpdate" ref={modal => this.modal = modal} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">

                                        <form method="post">
                                            <div className='form-group'>
                                                <input className='input' type='text' name='editSMkey' value={this.state.editSMkey} onChange={this.handleChanges} autoComplete='off' placeholder='Key'/>
                                            </div>
                                            <div className='form-group'>
                                                <input className='input' type='text' name='editSMmessage' value={this.state.editSMmessage} onChange={this.handleChanges} autoComplete='off' placeholder='Key'/>
                                            </div>
                                            <div className='form-group'>
                                                <input className='input' type='text' name='editSMlanguage' value={this.state.editSMlanguage} onChange={this.handleChanges} autoComplete='off' placeholder='Key'/>
                                            </div>
                                            <div className='form-group'>
                                                <select className="input " name="editSMibrand" value={this.state.editSMibrand} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    {this.state.vsBrand.map(function (item) {

                                                        return <option key={item.value} value={item.value}>{item.value}</option>

                                                    })
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group'>
                                                <select className="input " name="editSMscript" value={this.state.editSMscript} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    {this.state.vsText.map(function (item) {

                                                        return <option key={item.value} value={item.value}>{item.value}</option>

                                                    })
                                                    }
                                                </select>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal" onClick={this.handleUpdateMessageModal}  >YES
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}
                                        data-dismiss="modal" >NO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal" id="PerCostUpdate" ref={modalRemove => this.modalRemove = modalRemove} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h6 className='color-white'> Are you sure you want to delete the message id : [ {this.state.removeSMid} ]</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal" onClick={this.handleRemoveMessageModal} >YES
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={this.handleCloseModal}
                                        data-dismiss="modal" >NO
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default withRouter(SystemMessage);