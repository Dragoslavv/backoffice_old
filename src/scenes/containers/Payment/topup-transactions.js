import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {TopUpTransactionTable} from "../../components/Table/top-up-transaction-table";
import {TopUpTransactions} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class TopupTransaction extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect:false,
            startLog: today+'T00:00',
            endLog: today+'T23:59',
            msisdn:'',
            toPupStatus:'',
            transactionId:'',
            TopUpTranactionsDetails:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleClick = (e) => {
        e.preventDefault();

        TopUpTransactions(this.state.startLog, this.state.endLog, this.state.msisdn, this.state.transactionId, this.state.toPupStatus).then(result => {
            this.setState({
                TopUpTranactionsDetails: result.data
            });
        });
    };

    componentDidMount() {
        console.log(this.state);

        TopUpTransactions(this.state.startLog, this.state.endLog, this.state.msisdn, this.state.transactionId, this.state.toPupStatus).then(result => {
            this.setState({
                TopUpTranactionsDetails: result.data
            });
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


        const dataTable = this.state.TopUpTranactionsDetails.map(function (item) {

            return item;

        });

        function TableTopUp() {
            if(dataTable.length > 0){
                return <TopUpTransactionTable data={dataTable} />;
            } else {
                return <TopUpTransactionTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">TopUp Transaction</li>
                        </ol>
                    </nav>
                    <div className="row mb-4">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <h6 className="content-title">TopUp Payment Search</h6>
                                <hr/>
                                <div className='row mb-4'>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='startLog' value={this.state.startLog} onChange={this.handleChange} autoComplete='off' placeholder='Start:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='datetime-local' name='endLog' value={this.state.endLog} onChange={this.handleChange} autoComplete='off' placeholder='End:'/>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='msisdn' value={this.state.msisdn} onChange={this.handleChange} autoComplete='off' placeholder='MSISDN:'/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className='col-lg-6'>
                                        <form method="post">
                                            <div className='form-group billing-input'>
                                                <select className="input input-update" name="toPupStatus" value={this.state.toPupStatus} onChange={this.handleChange} >
                                                    <option value="">ALL</option>
                                                    <option value="started">started</option>
                                                    <option value="finished">finished</option>
                                                    <option value="error">error</option>
                                                </select>
                                            </div>
                                            <div className='form-group billing-input'>
                                                <input className='input' type='text' name='transactionId'  value={this.state.transactionId} onChange={this.handleChange} autoComplete='off' placeholder='Transaction Id:'/>
                                            </div>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-dark" type="submit">Reset</button>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <button className="btn btn-block btn-outline-success" onClick={this.handleClick} type="submit">Search</button>
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
                                <TableTopUp/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(TopupTransaction);