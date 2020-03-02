import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {NumberTypeTable} from "../../components/Table/number-type-table";
import {Redirect} from "react-router-dom";

class Numbers extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect:false,
            start_log : today + 'T00:00',
            end_log : today + 'T23:59:59',
            expiration_date : today + 'T23:59:59',
            user_id : '',
            number : '',
            type : '',
            brand : '',
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleChange (e) {
        this.setState({
           [e.target.name] : e.target.value
        });
    }

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'numbers-search'){

            this.setState({
                search:'click'
            });

        }

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

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Numbers</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <h6 className="content-title">Number Type Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='user_id' value={this.state.user_id} onChange={this.handleChange} autoComplete='off' placeholder='User ID:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='number' value={this.state.number } onChange={this.handleChange} autoComplete='off' placeholder='Number:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='type' value={this.state.type} onChange={this.handleChange} autoComplete='off' placeholder='Number Type:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='expiration_date' value={this.state.expiration_date} onChange={this.handleChange} autoComplete='off' placeholder='Expire Date:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <form method="post">
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
                                                <input className='input' type='datetime-local' name='start_log' value={this.state.start_log} onChange={this.handleChange} autoComplete='off' placeholder='Start Created:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='end_log' value={this.state.end_log} onChange={this.handleChange} autoComplete='off' placeholder='End Created:'/>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-dark" type="submit">Reset</button>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-success" id='numbers-search' onClick={this.handleClick} type="submit">Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='wrap-border'>
                                <NumberTypeTable search={this.state.search} data={{
                                    expiration_date: this.state.expiration_date,
                                    start_log: this.state.start_log,
                                    end_log: this.state.end_log,
                                    number: this.state.number,
                                    user_id: this.state.user_id,
                                    type: this.state.type,
                                    brand: this.state.brand
                                }}>
                                </NumberTypeTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(Numbers);