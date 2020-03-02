import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {RatesTable} from "../../components/Table/rates-table";
import {country, RatesUpdate} from "../../components/UserFunctions";
import PubSub from "pubsub-js";
import $ from "jquery";
import localForages from "localforage";
import {store} from "react-notifications-component";
import {Redirect} from "react-router-dom";

class Rates extends Component {
    constructor(props){
        super(props);


        this.state = {
            redirect: false,
            destination : '',
            prefix : '',
            brand : '',
            country : [],
            modal:false,
            PerCostId:'',
            perCostMin:'',
            perCostDestination:'',
            role:''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRest = this.handleRest.bind(this);
        this.handleUpdatePerCosts = this.handleUpdatePerCosts.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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
                window.sessionStorage.removeItem(key)
            }
        }
        return null
    };

    handleUpdatePerCosts(msg,dataSet) {
        $(this.modal).show();

        this.setState({
            PerCostId: dataSet['id'],
            perCostMin: dataSet['perCost'],
            perCostDestination: dataSet['destination']
        });
    };

    handleUpdate = (e) => {
        e.preventDefault();

        RatesUpdate(this.state.role, this.state.perCostMin[0], this.state.PerCostId[0]).then(result => {

           if(result.success === true){
               store.addNotification({
                   title: 'Update / rates',
                   message: 'You have successfully made the changes',
                   type: 'success',                         // 'default', 'success', 'info', 'warning'
                   container: 'bottom-right',                // where to position the notifications
                   animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                   animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                   dismiss: {
                       duration: 3000
                   }
               });
           } else {
               store.addNotification({
                   title: 'Update / rates',
                   message: 'No data changed!',
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

    handleClose = (e) =>{
        e.preventDefault();
        $(this.modal).hide();
    };

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };

    handleRest = (e) => {
        e.preventDefault();

        this.setState({
            destination: '',
            prefix: '',
            brand: ''
        });
    };

    componentDidMount() {

        country().then(result => {
           this.setState({
               country: result['data']
           });
        });

        const role = localForages.getItem('role', function (err, value) {
            return value;
        });

        role.then(value => {
            this.setState({
                role: value
            })
        });

        $(this.modal).hide();
        $(this.modal).on('hidden.bs.modal', this.handleUpdatePerCosts);

        PubSub.subscribe('perCostUpdate', this.handleUpdatePerCosts);
    }

    componentWillUnmount() {
        //ToDo
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
                            <li className="breadcrumb-item active" aria-current="page">Rates</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className='col-lg-12'>
                            <form method="post">
                                <div className='form-group'>
                                    <select className="input " name="destination" value={this.state.destination} onChange={this.handleChange}>
                                        {this.state.country.map(function (item) {
                                            return <option key={item['display']} value={item['display'] === 'ALL'?'':item['display']}>{item['display']}</option>;
                                        })}
                                    </select>
                                </div>
                                <div className='form-group'>
                                    <input className='input' type='text' name='prefix' value={this.state.prefix} onChange={this.handleChange} autoComplete='off' placeholder='Prefix'/>
                                </div>
                                <div className='form-group'>
                                    <select className="input " name="brand" value={this.state.brand} onChange={this.handleChange}>
                                        <option value="">ALL</option>
                                        <option value="globaltel">globaltel</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <button className="btn btn-block btn-outline-dark" onClick={this.handleRest} type="submit">Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <RatesTable data={{
                                    destination: this.state.destination,
                                    prefix: this.state.prefix,
                                    brand: this.state.brand
                                }}>
                                </RatesTable>
                            </div>
                        </div>
                    </div>

                    <div className="modal" id="PerCostUpdate" ref={modal => this.modal = modal} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className='form-group'>
                                                <input type='text' name='perCostDestination' id='Destination' readOnly="readonly" value={this.state.perCostDestination} onChange={this.handleChange}/>
                                            </div>
                                            <div className='form-group'>
                                                <input type='text' name='id' id='costId' readOnly="readonly" value={this.state.PerCostId} onChange={this.handleChange}/>
                                            </div>
                                            <div className='form-group'>
                                                <input type='text' name='perCostMin' id='perCostMin' value={this.state.perCostMin} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.handleUpdate}
                                            data-dismiss="modal" >Update
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClose}
                                            data-dismiss="modal" >Close
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

export default withRouter(Rates);