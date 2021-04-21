import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {RoutesTable} from "../../components/Table/routes-table";
import {Redirect} from "react-router-dom";
import {addRoutes, updateRoutes} from "../../components/UserFunctions";
import {store} from "react-notifications-component";
import $ from 'jquery';
import PubSub from "pubsub-js";
import Cookies from "universal-cookie";

class Routes extends Component {
    constructor(props){
        super(props);


        this.state = {
            redirect:false,
            create:false,
            search:true,
            routes_name : '',
            direction : '',
            active : '',
            search_routes:false,
            route_name_add:'',
            host_add:'',
            activation:false,
            inbound:false,
            outbound:false,
            ip:'',
            modal:false,
            id_edit_routes: '',
            active_edit_routes: '',
            host_edit_routes: '',
            inbound_edit_routes: '',
            ip_edit_routes: '',
            outbound_edit_routes: '',
            route_name_edit_routes: '',
        };

        this.create = this.create.bind(this);
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickReset = this.handleClickReset.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClearRoute = this.handleClearRoute.bind(this);
        this.handleAddRoutes = this.handleAddRoutes.bind(this);
        this.handleRoutesEdit = this.handleRoutesEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
           [e.target.name] : e.target.value,
        });

        switch (e.target.name) {
            case 'activation':
                this.setState({
                    activation : !this.state.activation,
                });
                break;
            case 'inbound':
                this.setState({
                    inbound : !this.state.inbound,
                });
                break;
            case 'outbound':
                this.setState({
                    outbound : !this.state.outbound,
                });
                break;
            case 'outbound_edit_routes':
                this.setState({
                    outbound_edit_routes : !this.state.outbound_edit_routes,
                });
                break;
            case 'inbound_edit_routes':
                this.setState({
                    inbound_edit_routes : !this.state.inbound_edit_routes,
                });
                break;
            case 'active_edit_routes':
                this.setState({
                    active_edit_routes : !this.state.active_edit_routes,
                });
                break;
        }

    };

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'search_routes'){

            this.setState({
                search_routes:true
            });

        }
    };

    handleClickReset = (e) => {
        e.preventDefault();

        this.setState({
            routes_name : '',
            direction : '',
            active : '',
        });
    };

    create(){
        this.setState({
            create:!this.state.create,
            search:false
        });
    }

    search(){
        this.setState({
            search:!this.state.search,
            create:false
        });
    }

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

    handleRoutesEdit(msg,dataSet){
        $(this.modal).show();

        this.setState({
           id_edit_routes: dataSet['id'],
           active_edit_routes: dataSet['active'],
           host_edit_routes: dataSet['host'],
           inbound_edit_routes: dataSet['inbound'],
           ip_edit_routes: dataSet['ip'],
           outbound_edit_routes: dataSet['outbound'],
           route_name_edit_routes: dataSet['route_name'],
        });
    }

    handleCancel = (e) => {
        e.preventDefault();
        $(this.modal).hide();
    };

    handleSave = (e) => {
        e.preventDefault();

        const id = this.state.id_edit_routes? parseInt(this.state.id_edit_routes) : " ";
        const active = this.state.active_edit_routes? this.state.active_edit_routes : " ";
        const host = this.state.host_edit_routes? this.state.host_edit_routes : " ";
        const inbound = this.state.inbound_edit_routes? this.state.inbound_edit_routes : " ";
        const outbound = this.state.outbound_edit_routes? this.state.outbound_edit_routes : " ";
        const ip = this.state.ip_edit_routes? this.state.ip_edit_routes[0] : " ";
        const route_name = this.state.route_name_edit_routes? this.state.route_name_edit_routes : " ";


        let record = "{\"id\":\""+ id +"\",\"active\":\""+ active +"\",\"host\":\""+ host +"\",\"inbound\":\""+ inbound +"\",\"outbound\":\""+ outbound +"\",\"ip\":\""+ ip +"\",\"route_name\":\""+ route_name+"\"}";


        updateRoutes(record).then(result => {
            console.log(result);
        });

    };

    componentDidMount() {

        PubSub.subscribe('id_routes-edit', this.handleRoutesEdit);

        $(this.modal).hide();
        $(this.modal).on('hidden.bs.modal', this.handleRoutesEdit);
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

    handleOpen (){
        this.setState({
            search_routes: false
        });
    }

    handleClearRoute = (e) => {
        e.preventDefault();

        this.setState({
            route_name_add:'',
            host_add:'',
            activation:false,
            inbound:false,
            outbound:false,
            ip:''
        });
    };

    handleAddRoutes = (e) => {
        e.preventDefault();

        addRoutes(this.state.route_name_add, this.state.host_add, this.state.activation, this.state.inbound, this.state.outbound, this.state.ip).then(result =>{

            if(result.success === true){

                store.addNotification({
                    title: 'Routes Add',
                    message: 'Successfully Added',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
            } else {
                store.addNotification({
                    title: 'Routes',
                    message: 'Error! '+ result['message'],
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })
            }
        });

    };

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
                            <li className="breadcrumb-item active" aria-current="page">Routes</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-3  mb-3">
                            <div className="row mb-4">
                                <div className="col-lg-6">
                                    <button className="btn btn-block btn-outline-success" onClick={this.create} type="submit"><i className="fa fa-plus" ></i></button>
                                </div>
                                <div className="col-lg-6">
                                    <button className="btn btn-block btn-outline-info" onClick={this.search} type="submit"><i className="fa fa-search" ></i></button>
                                </div>
                            </div>
                            <div className={this.state.search?'wrap-border table-col-gui': 'hidden-ul'} >
                                <h6 className="content-title">Routes Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='text' name='routes_name' value={this.state.routes_name} onChange={this.handleChange} autoComplete='off' placeholder='Routes Name'/>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="direction" value={this.state.direction} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="Inbound">Inbound</option>
                                            <option value="Outbound">Outbound</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="active" value={this.state.active} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="TRUE">TRUE</option>
                                            <option value="FALSE">FALSE</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleClickReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success btn-login-from" id='search_routes' onClick={this.handleClick} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={this.state.create?'wrap-border table-col-gui':'hidden-ul'} >
                                <h6 className="content-title">Routes Add</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <p className="content-title">Route Name</p>
                                        <hr/>
                                        <input className='input' type='text' name='route_name_add' value={this.state.route_name_add} onChange={this.handleChange} autoComplete='off' placeholder='Route Name'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='text' autoComplete='off' name='host_add' value={this.state.host_add} onChange={this.handleChange} placeholder='Host'/>
                                    </div>
                                    <div className='form-group text-left'>
                                        <p className="content-title">Activation</p>
                                        <hr/>
                                        <ul className="unstyled centered">
                                            <li>
                                                <input className="styled-checkbox input" checked={this.state.activation}  onChange={this.handleChange} name='activation' id="activation"
                                                       type="checkbox" />
                                                <label htmlFor="activation"> Active</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='form-group text-left'>
                                        <p className="content-title">Call Direction</p>
                                        <hr/>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <ul className="unstyled centered">
                                                    <li>
                                                        <input className="styled-checkbox input" checked={this.state.inbound}  onChange={this.handleChange} name='inbound' id="inbound"
                                                               type="checkbox" />
                                                        <label htmlFor="inbound"> Inbound</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='col-lg-6'>
                                                <ul className="unstyled centered">
                                                    <li>
                                                        <input className="styled-checkbox input" checked={this.state.outbound}  onChange={this.handleChange} name='outbound' id="outbound"
                                                               type="checkbox" />
                                                        <label htmlFor="outbound"> Outbound</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <textarea className='input' autoComplete='off' name='ip'  value={this.state.ip} onChange={this.handleChange}  placeholder='IP'/>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleClearRoute} type="submit">Clear</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success btn-login-from" onClick={this.handleAddRoutes} type="submit">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border table-col-gui'>
                                <RoutesTable search={this.state.search_routes} onOpen={this.handleOpen} data={{
                                    routes_name: this.state.routes_name,
                                    direction: this.state.direction,
                                    active: this.state.active
                                }}>
                                </RoutesTable>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="modal" id="modal2" ref={modal => this.modal = modal} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            </div>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label htmlFor='rote_name_edit' className="content-title">Route Name</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input className='input' type='text' autoComplete='off' value={this.state.route_name_edit_routes} onChange={this.handleChange} name='route_name_edit_routes' id='rote_name_edit' placeholder='Route Name'/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label htmlFor='host_edit' className="content-title text-left">Host</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <input className='input' type='text' autoComplete='off' value={this.state.host_edit_routes} onChange={this.handleChange} name='host_edit_routes' id='host_edit' placeholder='Host'/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label htmlFor='ip_edit' className="content-title text-left">Ip</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <textarea className='input' autoComplete='off' name='ip_edit_routes' value={this.state.ip_edit_routes} onChange={this.handleChange} id='ip_edit' placeholder='IP'/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label htmlFor='activation_edit' className="content-title text-left">Activation</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <ul className="unstyled centered">
                                            <li>
                                                <input className="styled-checkbox input" checked={this.state.active_edit_routes} onChange={this.handleChange} name='active_edit_routes' id="active_edit_routes"
                                                       type="checkbox" />
                                                <label htmlFor="active_edit_routes"> Active</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-lg-4">
                                        <label htmlFor='activation_edit' className="content-title text-left">Call Direction</label>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <ul className="unstyled centered">
                                                    <li>
                                                        <input className="styled-checkbox input" checked={this.state.inbound_edit_routes} onChange={this.handleChange} name='inbound_edit_routes' id="inbound_edit_routes"
                                                               type="checkbox" />
                                                        <label htmlFor="inbound_edit_routes"> Inbound</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='col-lg-6'>
                                                <ul className="unstyled centered">
                                                    <li>
                                                        <input className="styled-checkbox input" checked={this.state.outbound_edit_routes} onChange={this.handleChange} name='outbound_edit_routes' id="outbound_edit_routes"
                                                               type="checkbox" />
                                                        <label htmlFor="outbound_edit_routes"> OutBound</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-info btn-login-from"
                                        data-dismiss="modal" onClick={this.handleCancel} >Cancel
                                </button>
                                <button type="button" className="btn btn-outline-success btn-login-from"
                                        data-dismiss="modal" onClick={this.handleSave} >Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Routes);