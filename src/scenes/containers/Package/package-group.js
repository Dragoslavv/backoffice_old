import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PackageGroupFirstTable} from "../../components/Table/package-group-first-table";
import {PackageGroupOtherTable} from "../../components/Table/package-group-other-table";
import {Redirect} from "react-router-dom";

class PackageGroup extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false
        }

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
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Package Group</li>
                        </ol>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <div className='wrap-border mb-5'>
                                <h6>Package Group Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='text' name='username' autoComplete='off' placeholder='Group Name:'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='password' autoComplete='off' name='password'  placeholder='Group Id'/>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-dark" type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='wrap-border'>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h6>Add New Package</h6>
                                            <hr/>
                                            <button className="btn btn-block btn-outline-dark" type="submit">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border'>
                                <button className="btn btn-block btn-outline-dark" type="submit">Copy Group</button>

                                <PackageGroupFirstTable data=''>
                                </PackageGroupFirstTable>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-6">
                            <button type='submit' disabled={true} className="btn btn-block btn-light">Add Package Group Lang</button>
                        </div>
                        <div className="col-lg-6">
                            <button type='submit' disabled={true} className="btn btn-block btn-light">Copy Lang Package Group</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <PackageGroupOtherTable data=''>
                                </PackageGroupOtherTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(PackageGroup);