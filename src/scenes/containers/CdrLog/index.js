import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {CdrLogTable} from "../../components/Table/cdr-log-table";
import PubSub from "pubsub-js";
import {Redirect} from "react-router-dom";

class CdrLog extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            startLog: today+'T00:00',
            endLog: today+'T23:59',
            brand:'',
            totalMinutes:'',
            disposition:'',
            route:'',
            call_type:'',
            user_id:'',
            user_id_b:'',
            source:'',
            destination:'',
            cdrLogTrans:[],
            clickButton:''

        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.mySubscriber = this.mySubscriber.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });

    };

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'cdrLogSearch'){

            this.setState({
                clickButton:'click'
            });

        }

    };

    mySubscriber(msg,dataSet) {

        this.setState({
            totalMinutes:dataSet,
        });
    };

    componentDidMount() {

        PubSub.subscribe('billsec', this.mySubscriber);

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
                            <li className="breadcrumb-item active" aria-current="page">Cdr Log</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <h6 className="content-title">Cdr Log Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-4'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='startLog' value={this.state.startLog} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='endLog' value={this.state.endLog} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="brand" value={this.state.brand} onChange={this.handleChanges}>
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
                                                <input className='input' type='text' name='totalMinutes' value={this.state.totalMinutes} onChange={this.handleChanges} autoComplete='off' placeholder='Total Minutes:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-4'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="disposition" value={this.state.disposition} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="ABANDOM">ABANDOM</option>
                                                    <option value="ABORT">ABORT</option>
                                                    <option value="ANS_BILL_ERR">ANS_BILL_ERR</option>
                                                    <option value="ANS_CONT_ERR">ANS_CONT_ERR</option>
                                                    <option value="ANSWERED">ANSWERED</option>
                                                    <option value="BUSY">BUSY</option>
                                                    <option value="CANCEL">CANCEL</option>
                                                    <option value="CONGESTION">CONGESTION</option>
                                                    <option value="DECLINE">DECLINE</option>
                                                    <option value="END">END</option>
                                                    <option value="FAILED">FAILED</option>
                                                    <option value="IDP">IDP</option>
                                                    <option value="INVITE">INVITE</option>
                                                    <option value="NOANSWER">NOANSWER</option>
                                                    <option value="NO ANSWER">NO ANSWER</option>
                                                    <option value="NOCREDIT">NOCREDIT</option>
                                                    <option value="ROUTE_FAILURE">ROUTE_FAILURE</option>
                                                    <option value="UNREACHABLE">UNREACHABLE</option>
                                                    <option value="UNREACHABLE-2">UNREACHABLE-2</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="route" value={this.state.route} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="aws_asterisk">aws_asterisk</option>
                                                    <option value="bahrein">bahrein</option>
                                                    <option value="BigRivercom">BigRivercom</option>
                                                    <option value="Call Center">Call Center</option>
                                                    <option value="didww">didww</option>
                                                    <option value="didx">didx</option>
                                                    <option value="H3NET">H3NET</option>
                                                    <option value="kamailio">kamailio</option>
                                                    <option value="local">local</option>
                                                    <option value="MissedCall">MissedCall</option>
                                                    <option value="NOVATEL">NOVATEL</option>
                                                    <option value="novatel-lebanon">novatel-lebanon</option>
                                                    <option value="old_virtualsim">old_virtualsim</option>
                                                    <option value="ONLIME">ONLIME</option>
                                                    <option value="ONLIMEWW">ONLIMEWW</option>
                                                    <option value="smartroute">smartroute</option>
                                                    <option value="telekom_076">telekom_076</option>
                                                    <option value="tyntec">tyntec</option>
                                                    <option value="vip">vip</option>
                                                    <option value="virtualphoneline">virtualphoneline</option>
                                                    <option value="voxbeam">voxbeam</option>
                                                    <option value="voxbone">voxbone</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="call_type" value={this.state.call_type} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    <option value="app2app">app2app</option>
                                                    <option value="app2tel">app2tel</option>
                                                    <option value="tel2app">tel2app</option>
                                                    <option value="AUTH">AUTH</option>
                                                    <option value="SIM">SIM</option>
                                                    <option value="unknown">unknown</option>
                                                    <option value="call-centre">call-centre</option>
                                                    <option value="tvlive">tvlive</option>
                                                    <option value="app2sim">app2sim</option>
                                                    <option value="app2app_sim">app2app_sim</option>
                                                    <option value="tel2app_sim">tel2app_sim</option>
                                                    <option value="sim2app">sim2app</option>
                                                    <option value="sim2app_sim">sim2app_sim</option>
                                                    <option value="app_sim2app">app_sim2app</option>
                                                    <option value="app_sim2tel">app_sim2tel</option>
                                                    <option value="app_sim2sim">app_sim2sim</option>
                                                    <option value="app_sim2app_sim">app_sim2app_sim</option>
                                                    <option value="allip-3d">allip-3d</option>
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-4'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='user_id' value={this.state.user_id} onChange={this.handleChanges} autoComplete='off' placeholder='User ID:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='user_id_b' value={this.state.user_id_b} onChange={this.handleChanges} autoComplete='off' placeholder='User ID B:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='source' value={this.state.source} onChange={this.handleChanges} autoComplete='off' placeholder='Source:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='destination' value={this.state.destination} onChange={this.handleChanges} autoComplete='off' placeholder='Destination:'/>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-dark" type="submit">Reset</button>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-success" id="cdrLogSearch" onClick={this.handleClick} type="submit">Search</button>
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
                                <CdrLogTable search={this.state.clickButton} data={{
                                    startLog: this.state.startLog,
                                    endLog: this.state.endLog,
                                    source: this.state.source,
                                    destination: this.state.destination,
                                    user_id: this.state.user_id,
                                    user_id_b: this.state.user_id_b,
                                    call_type: this.state.call_type,
                                    brand: this.state.brand,
                                    route: this.state.route,
                                    disposition: this.state.disposition
                                }}/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(CdrLog);