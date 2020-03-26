import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Redirect} from "react-router-dom";
import {DataLimitTable} from "../../components/Table/data-limit-table";
import {data_limits} from "../../components/UserFunctions";
import {store} from "react-notifications-component";

class DataLimit extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect:false,
            data_number:'',
            data_limit:[]
        };

        this.sessionGet = this.sessionGet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchData = this.handleSearchData.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSearchData = (e) =>{
      e.preventDefault();

      if(this.state.data_number !== ''){
          data_limits(this.state.data_number).then(result => {
              if(result['status'] === true){
                  this.setState({
                      data_limit:result.data
                  });
              } else {
                  store.addNotification({
                      title: 'Data Limit',
                      message: result.message,
                      type: 'info',                         // 'default', 'success', 'info', 'warning'
                      container: 'top-right',                // where to position the notifications
                      animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                      animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                      dismiss: {
                          duration: 3000
                      }
                  });
              }
          });
      } else {
          store.addNotification({
              title: 'Data Limit',
              message: 'Enter the number!',
              type: 'info',                         // 'default', 'success', 'info', 'warning'
              container: 'top-right',                // where to position the notifications
              animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
              dismiss: {
                  duration: 3000
              }
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

        const dataTable = this.state.data_limit.map(function (item) {

            return item;

        });

        function TableData() {
            if(dataTable.length > 0){
                return <DataLimitTable data={dataTable} />;
            } else {
                return <DataLimitTable data='' />
            }
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Data Limit</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-4 mb-3">
                            <div className='wrap-border table-col-gui '>
                                <div className='wrap-border table-col-gui'>
                                    <h6 className="content-title">Number Search</h6>
                                    <hr/>
                                    <form method="post">
                                        <div className='form-group billing-input'>
                                            <input className='input' type='number' autoComplete='off' value={this.state.data_number} name='data_number' onChange={this.handleChange}  placeholder='Number:'/>
                                        </div>
                                        <div className='form-group billing-input'>
                                            <div className="form-group billing-input">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <button className="btn btn-block btn-outline-success" onClick={this.handleSearchData} type="submit">Search</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className='wrap-border table-col-gui '>
                                <TableData/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(DataLimit);