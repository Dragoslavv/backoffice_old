import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {VoipTable} from "../../components/Table/voip-table";
import CsvDownload from 'react-json-to-csv';
import {exportVoip} from "../../components/UserFunctions";
import Cookies from "universal-cookie";

class ReadVoip extends Component {
    constructor(props){
        super(props);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        let dt = new Date();
        let dd1 = String(dt.getDate()  - 1).padStart(2, '0');
        let mm1 = String(dt.getMonth() + 1).padStart(2, '0');

        let yyyy1 = dt.getFullYear();

        dt = yyyy1 + '-' + mm1 + '-' + dd1;

        this.state = {
            redirect: false,
            start:dt,
            end:today,
            user_id:"",
            active:"",
            voip:"",
            search:'',
            export:[]
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'voip_click'){

            this.setState({
                search:'click'
            });

            exportVoip(this.state.start, this.state.end, this.state.user_id, this.state.active, this.state.voip).then(result => {
                if(result.status === true){

                    this.setState({
                        export: result.data
                    });
                }
            });

        }

    };

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

    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    componentDidMount(){

        exportVoip(this.state.start, this.state.end, this.state.user_id, this.state.active, this.state.voip).then(result => {
            if(result.status === true){

                this.setState({
                    export: result.data
                });
            }
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
                            <li className="breadcrumb-item active" aria-current="page">Voip</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border table-col-gui'>
                                <h6 className="content-title">Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='start' value={this.state.start} onChange={this.handleChanges} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='date' name='end' value={this.state.end} onChange={this.handleChanges} autoComplete='off' placeholder='End:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='user_id' value={this.state.user_id} onChange={this.handleChanges} autoComplete='off' placeholder='User id:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input form-control" name="active" id='active' placeholder='Active' value={this.state.active} onChange={this.handleChanges}>
                                            <option value="">Active</option>
                                            <option value="true">TRUE</option>
                                            <option value="false">FALSE</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input form-control" name="voip" id='voip' placeholder='voip' value={this.state.voip} onChange={this.handleChanges}>
                                            <option value="">Voip</option>
                                            <option value="voice">VOICE</option>
                                            <option value="sms">SMS</option>
                                        </select>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button className="btn btn-block btn-outline-success btn-login-from"  id='voip_click'  onClick={this.handleClick} type="submit">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border table-col-gui'>
                                <div className="row">
                                    <div className="col-lg-2">
                                        <CsvDownload data={this.state.export} target="_parent" filename={"export-voip.csv"}  className="btn btn-block btn-success btn-login-from" > Export Voip </CsvDownload>
                                    </div>
                                </div>
                                <VoipTable search={this.state.search} data={{
                                    start: this.state.start,
                                    end: this.state.end,
                                    user_id: this.state.user_id,
                                    active: this.state.active,
                                    voip: this.state.voip
                                }}> </VoipTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(ReadVoip);