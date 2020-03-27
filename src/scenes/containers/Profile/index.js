import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {ProfileTable} from "../../components/Table/profile-table";
import {createUsers, readUsers, readUsersById, updateUsers} from "../../components/UserFunctions";
import './../../stayles/profile.css';
import $ from 'jquery';
import PubSub from 'pubsub-js'
import {Redirect} from "react-router-dom";

class Profile extends Component {

    constructor(props){
        super(props);


        this.state = {
            redirect: false,
            create: false,
            createError:true,
            updateSuccess:false,
            updateError:false,
            cancel: false,
            tableData: [],
            defaultValue:[],
            idUp:'',
            usernameUpdate:'',
            passwordUpdate:'',
            firstNameUpdate:'',
            lastNameUpdate:'',
            emailUpdate:'',
            roleUpdate:'',
            phoneUpdate:'',
            username : '',
            password: '',
            firstName : '',
            lastName : '',
            email : '',
            role : 'USER',
            phone: '',
            check:{
                username: /(?!^.*[A-Z]{2,}.*$)^[A-Za-z0-9]*$/,
                password: /(?!^.*[A-Z]{2,}.*$)^[A-Za-z0-9]*$/,
                firstName: /(?!^.*[A-Z]{2,}.*$)^[A-Za-z0-9]*$/,
                lastName: /(?!^.*[A-Z]{2,}.*$)^[A-Za-z0-9]*$/,
                phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },

        };


        this.dropdownClick = this.dropdownClick.bind(this);
        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChangeUpdate = this.handleChangeUpdate.bind(this);
        this.handleCreateUsers = this.handleCreateUsers.bind(this);
        this.mySubscriber = this.mySubscriber.bind(this);
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

    validate(){
        return ( this.state.username !== ''  && this.state.username.length > 0 &&  this.state.password !== ''  && this.state.password.length >= 4
            && this.state.firstName !== ''  && this.state.firstName.length > 0 && this.state.lastName !== ''  && this.state.lastName.length > 0
            && this.state.check.username.test( this.state.username ) && this.state.check.password.test( this.state.password )
            && this.state.check.firstName.test( this.state.firstName ) && this.state.check.lastName.test( this.state.lastName )
        )
            ? this.state.username && this.state.password && this.state.firstName && this.state.lastName : false;
    }

    mySubscriber(msg,dataSet) {

        readUsersById(dataSet).then(data=>{

            this.setState({
                defaultValue:data.data[0],
                usernameUpdate : data.data[0].username,
                passwordUpdate : data.data[0].password,
                firstNameUpdate : data.data[0].firstName,
                lastNameUpdate : data.data[0].lastName,
                emailUpdate : data.data[0].email,
                roleUpdate : data.data[0].role,
                phoneUpdate : data.data[0].phone,
                idUp:dataSet
            })

        });
    };

    componentDidMount() {

        readUsers().then(tableData =>

            this.setState({
                tableData: tableData.data
            })

        );

        PubSub.subscribe('cid', this.mySubscriber);

    }

    componentWillUnmount() {
        //ToDo
    }

    dropdownClick = (e) => {
        e.preventDefault();
        this.setState(state => {
            return {
                open: !state.open
            };
        });
    };

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value,

            }
        );
    };

    handleClear = (e) => {
        e.preventDefault();

        this.setState({
            username : '',
            password: '',
            firstName : '',
            lastName : '',
            email : '',
            role : '',
            phone: '',
            create: false
        });
    };

    handleCancel = (e) => {
        e.preventDefault();

        $('#usersUpdate').addClass('hidden-ul');
        $('#insertTable').removeClass('hidden-ul');
    };

    handleChangeUpdate = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    };

    handleUpdate = (e) => {
        e.preventDefault();

        if(this.state.idUp !== ''){

            const data = [];

            (this.state.usernameUpdate !== this.state.defaultValue.username )?data.push('{"property":"username","value":"'+this.state.usernameUpdate+'"}'):false;
            (this.state.passwordUpdate !== this.state.defaultValue.password )?data.push('{"property":"password","value":"'+this.state.passwordUpdate+'"}'):false;
            (this.state.firstNameUpdate !== this.state.defaultValue.firstName )?data.push('{"property":"firstName","value":"'+this.state.firstNameUpdate+'"}'):false;
            (this.state.lastNameUpdate !== this.state.defaultValue.lastName )?data.push('{"property":"lastName","value":"'+this.state.lastNameUpdate+'"}'):false;
            (this.state.emailUpdate !== this.state.defaultValue.email )?data.push('{"property":"email","value":"'+this.state.emailUpdate+'"}'):false;
            (this.state.phoneUpdate !== this.state.defaultValue.phone )?data.push('{"property":"phone","value":"'+this.state.phoneUpdate+'"}'):false;
            (this.state.roleUpdate !== this.state.defaultValue.role )?data.push('{"property":"role","value":"'+this.state.roleUpdate+'"}'):false;

            const id = '{"property":"id","value":"'+this.state.idUp+'"},';

            const param = "[" + id + "" + data.toString() + "]";

            if(data.toString() !== ''){

                updateUsers(param).then(data => {
                    if(data.status === true){

                        this.setState({
                            updateSuccess:data.status,
                            updateError:false
                        });

                        window.scrollTo({
                            top: 0
                        });

                        setInterval(function(){
                            window.location.reload();
                        }, 500);
                    }
                });
            } else {

                this.setState({
                    updateError:true,
                    updateSuccess:false
                });
                window.scrollTo({
                    top: 0
                });
            }

        } else {
            $('#usersUpdate').addClass('hidden-ul');
            $('#insertTable').removeClass('hidden-ul');
        }

    };

    handleCreateUsers = (e) => {
        e.preventDefault();

        if(this.state.username !== '' && this.state.check.username.test( this.state.username ) &&
            this.state.password !== '' && this.state.check.password.test( this.state.password ) &&
             this.state.firstName !== '' && this.state.check.firstName.test( this.state.firstName ) &&
            this.state.lastName !== '' && this.state.check.lastName.test( this.state.lastName ) &&
            this.state.role !== ''
        ){

            const role = this.state.role === 'ADMIN' || this.state.role === 'USER'? this.state.role : false;
            const phone = this.state.check.phone.test( this.state.phone )? this.state.phone : false;
            const email = this.state.check.email.test( this.state.email )? this.state.email : false;

            createUsers(this.state.username,this.state.password,role,this.state.firstName
                ,this.state.lastName,email,phone).then(data =>

                {
                    if(data.status === true){
                        this.setState({
                            create: data.status
                        })
                    } else {
                        this.setState({
                            createError: data.status
                        })
                    }

                }
            )
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

        const dataTable = this.state.tableData.map(function (item) {

                return item;

        });

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" ref={el => (this.container = el)} >

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Profile</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <div id='usersUpdate' className='wrap-border-update wrap-border hidden-ul mb-5' >
                                {this.state.updateSuccess ?
                                    <div className="form-group row alert mod-margin alert-success text-center" role="alert">
                                        Success
                                    </div> :""}
                                {this.state.updateError ?
                                    <div className="form-group row alert mod-margin alert-warning text-center" role="alert">
                                        Warning
                                    </div> :""}
                                <h6 className='content-title'>Update Users</h6>
                                <hr/>
                                <form>
                                    <div className='form-group billing-input'>
                                        <input className='input input-update' type='text' name='usernameUpdate' value={this.state.usernameUpdate} autoComplete='off' onChange={this.handleChangeUpdate} placeholder='Username'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input input-update' type='password' autoComplete='off' value={this.state.passwordUpdate} onChange={this.handleChangeUpdate} name='passwordUpdate' placeholder='Password'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update " name="roleUpdate" value={this.state.roleUpdate} onChange={this.handleChangeUpdate}>
                                            <option>USER</option>
                                            <option>ADMIN</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input input-update' type='text' autoComplete='off' value={this.state.firstNameUpdate} onChange={this.handleChangeUpdate} name='firstNameUpdate'  placeholder='First Name'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input input-update' type='text' autoComplete='off' value={this.state.lastNameUpdate} onChange={this.handleChangeUpdate} name='lastNameUpdate'  placeholder='Last Name'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input input-update' type='text' autoComplete='off' value={this.state.emailUpdate} onChange={this.handleChangeUpdate} name='emailUpdate'  placeholder='Email'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input input-update' type='text' autoComplete='off' value={this.state.phoneUpdate} onChange={this.handleChangeUpdate} name='phoneUpdate'  placeholder='Phone'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" onClick={this.handleUpdate} type="submit">Update</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info" onClick={this.handleCancel} type="submit">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={'wrap-border'} id='insertTable'>
                                {this.state.create ?
                                    <div className="form-group row alert mod-margin alert-success text-center" role="alert">
                                        Success
                                    </div> :""}
                                {!this.state.createError ?
                                    <div className="form-group row alert mod-margin alert-warning text-center" role="alert">
                                        Error
                                    </div> :""}
                                <h6 className='content-title'>Add Users</h6>
                                <hr/>
                                <form>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='username' value={this.state.username} onChange={this.handleChange} autoComplete='off' placeholder='Username'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='password' autoComplete='off' value={this.state.password} name='password' onChange={this.handleChange} placeholder='Password'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input form-control" value={this.state.role} onChange={this.handleChange} name="role">
                                            <option>USER</option>
                                            <option>ADMIN</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.firstName} name='firstName' onChange={this.handleChange}  placeholder='First Name'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.lastName} name='lastName' onChange={this.handleChange}  placeholder='Last Name'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.email} name='email' onChange={this.handleChange}  placeholder='Email'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.phone} name='phone' onChange={this.handleChange}  placeholder='Phone'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info" onClick={this.handleClear} type="submit">Clear</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" disabled={!this.validate()} onClick={this.handleCreateUsers}  type="submit">Create</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border table-col-gui'>
                                {dataTable.length > 0  ?
                                    <ProfileTable data={ dataTable } >
                                    </ProfileTable>
                                : false }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default withRouter(Profile);