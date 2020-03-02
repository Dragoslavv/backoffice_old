import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {MessageLogTable} from "../../components/Table/message-log-table";
import {Redirect} from "react-router-dom";

class MessageLog extends Component {
    constructor(props){
        super(props);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            startLog: today + 'T00:00',
            endLog: today + 'T23:59',
            fromNo: '',
            toNo: '',
            type: '',
            search:''
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'message-log'){

            this.setState({
                search:'click'
            });

        }

    };

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

    componentWillMount() {
        if(this.sessionGet('token')){
            console.log('Call User Feed');
        } else {
            this.setState({
                redirect:true
            });
        }
    }

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" } >
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Message Log</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <h6 className="content-title">Message Log Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='startLog' value={this.state.startLog} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='endLog' value={this.state.endLog} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-dark" type="submit">Reset</button>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-success" onClick={this.handleClick} id='message-log' type="submit">Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='fromNo' value={this.state.fromNo} onChange={this.handleChanges} autoComplete='off' placeholder='From No:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='toNo' value={this.state.toNo} onChange={this.handleChanges} autoComplete='off' placeholder='To No:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="type" value={this.state.type} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="2">Incoming sms</option>
                                                    <option value="1">Outgoing sms</option>
                                                    <option value="0">app2app</option>
                                                </select>
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
                                <MessageLogTable search={this.state.search} data={{
                                    startLog: this.state.startLog,
                                    endLog: this.state.endLog,
                                    fromNo: this.state.fromNo,
                                    toNo: this.state.toNo,
                                    type: this.state.type
                                }} />

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(MessageLog);