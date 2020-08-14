import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import './../../stayles/Login.css';
import {login, verify_number} from "../../components/UserFunctions";
import localForages from "localforage";
import logo from "../../images/logo-blue.png";
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        let session = localStorage.getItem("token");

        if(session === null){
            this.props.history.push("/");
        } else {
            this.props.history.push("/customer-billing");
        }

        this.state = {
            form: {
                textAlign: 'center'
            },
            verify_login:true,
            verify_pin:'',
            username : '',
            number : '',
            password : '',
            re : {
                'username' : /(?!^.*[A-Z]{2,}.*$)^[A-Za-z0-9]*$/,
                'number' : /^[0-9]+$/,
                'verify_pin' : /^[0-9]+$/,
                'password'   : /^[a-zA-Z0-9]+$/ //At least one upper case English letter, (?=.*?[A-Z]),
                                                                                                //At least one lower case English letter, (?=.*?[a-z]),
                                                                                                //At least one digit, (?=.*?[0-9])
                                                                                                //At least one special character, (?=.*?[#?!@$%^&*-])
                                                                                                //Minimum eight in length .{8,} (with the anchors)
            },
            login_data:{
                verify_tokens: '',
                phone_number: '',
                role: '',
                firstName: '',
                lastName: '',
                username: '',
                token: ''
            },
            redirect:false,
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
        this.validatePin = this.validatePin.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.handleClickVerify = this.handleClickVerify.bind(this);
        this.sessionSet = this.sessionSet.bind(this);
    }

    validate(){
        return (this.state.username !== ''  && this.state.username.length > 0 && this.state.number !== ''  && this.state.number.length > 0  && this.state.password !== ''  && this.state.password.length >= 4 &&
            this.state.re.username.test( this.state.username ) && this.state.re.number.test( this.state.number ) && this.state.re.password.test( this.state.password ) ) ? this.state.username && this.state.number && this.state.password : false;
    }

    validatePin(){
        return (this.state.verify_pin.length === 4 && this.state.re.verify_pin.test( this.state.verify_pin ))? this.state.verify_pin : false ;
    }

    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );

        if(e.target.name === 'username'){
            if(e.target.value ==='' || e.target.value ===null || !this.state.re.username.test( e.target.value  ) ){
                this.setState({
                    usernameError:true
                })
            } else {
                this.setState({
                    usernameError:false,
                    username:e.target.value
                })
            }

        }

        if(e.target.name === 'password'){
            if(e.target.value ==='' || e.target.value ===null || !this.state.re.password.test( e.target.value  ) || !e.target.value.length >=6 ) {
                this.setState({
                    passwordError:true
                })
            } else {
                this.setState({
                    passwordError:false,
                    password:e.target.value
                })
            }
        }

        if(e.target.name === 'number'){
            if(e.target.value ==='' || e.target.value ===null || !this.state.re.number.test( e.target.value  ) ){
                this.setState({
                    numberError:true
                })
            } else {
                this.setState({
                    numberError:false,
                    number:e.target.value
                })
            }

        }

        if(e.target.name === 'verify_pin'){
            if(e.target.value ==='' || e.target.value ===null || !this.state.re.verify_pin.test( e.target.value  ) ){
                this.setState({
                    verify_pinError:true
                })
            } else {
                this.setState({
                    verify_pinError:false,
                    verify_pin:e.target.value
                })
            }

        }
    };

    submitForm = (e) => {
        e.preventDefault();

        this.setState({
            message: '',
            messageShow: false
        });

        login(this.state.username, this.state.password, this.state.number).then(data =>{

            this.setState({
                verify_login: true
            });

            if(data.status === true){

                this.setState({
                    verify_login: false
                });
                sessionStorage.setItem('phone_number_call_centar', data['phone_number']);

                this.setState({
                    login_data:{
                        verify_tokens: data['verify_tokens'],
                        phone_number: data['phone_number'],
                        role: data['data']['role'],
                        firstName: data['data']['first_name'],
                        lastName: data['data']['last_name'],
                        username: data['data']['username'],
                        token: data['tokens']
                    }
                });

            } else {

                this.setState({
                    verify_login: true
                });

                this.setState({
                    message: data.message,
                    messageShow: true,
                    passwordError:true,
                    usernameError:true,
                    numberError:true
                });
            }
        })
    };

    sessionSet = (key, value, expirationInMin = 1000) => {
        let expirationDate = new Date(new Date().getTime() + (9600 * expirationInMin));

        let newValue = {
            value: value,
            expirationDate: expirationDate.toISOString()
        };
        window.sessionStorage.setItem(key, JSON.stringify(newValue))
    };

    handleClickVerify = (e) => {
        e.preventDefault();

        if(this.state.login_data.verify_tokens !== '' && this.state.login_data.phone_number !== '' && this.state.verify_pin !== '') {

            verify_number(this.state.login_data.verify_tokens, this.state.login_data.phone_number, this.state.verify_pin).then(result => {

                if(result.status === true){

                    localForages.setItem('role', this.state.login_data.role);
                    sessionStorage.setItem('role', this.state.login_data.role);
                    sessionStorage.setItem('firstName', this.state.login_data.firstName);
                    sessionStorage.setItem('lastName', this.state.login_data.lastName);
                    sessionStorage.setItem('username', this.state.login_data.username);
                    localForages.setItem('username', this.state.login_data.username);

                    this.sessionSet('token', this.state.login_data.token);

                    // sessionStorage.setItem('token', this.state.login_data.token);

                    this.setState({
                        redirect: true
                    });

                } else {
                    this.setState({
                        verify_login: true,
                        message: result.message,
                        messageShow: true,
                        verify_pinError:true,
                        verify_pin:true,
                        passwordError:true,
                        usernameError:true,
                        numberError:true
                    });
                }
            });

        }
    };

    render() {

        if(this.state.redirect){

            return <Redirect  to={'/customer-billing'}/>

        }

        if(sessionStorage.getItem('token')){

            return <Redirect  to={'/customer-billing'}/>

        }
        return (
            <div className='container-fluid' >
                <div className='col-md-3 mx-auto m-3 '>
                    <div className='margin-top'>
                        <div className='login-box mb-3'>
                            <img src={logo} alt='globaltel-logo' width='180' />
                        </div>
                        { this.state.verify_login?
                            <div className='login-box '>
                                <form noValidate style={this.state.from} className='m-3'>
                                    {this.state.messageShow ?
                                    <div className="form-group row alert alert-warning" role="alert">
                                        {this.state.message}
                                    </div> :""}
                                    <div className={this.state.usernameError ? 'form-group row error' : 'form-group row'} >
                                        <input className='input-login' type='text' name='username' autoComplete='off' value={this.state.username} onChange={this.handleChange} placeholder='Username'/>
                                        {this.state.usernameError ? <div className="error-message">Username is a required field.</div> : ''}
                                    </div>
                                    <div className={this.state.passwordError ? 'form-group row error' : 'form-group row'}>
                                        <input className='input-login' type='password' autoComplete='off' name='password' value={this.state.password} onChange={this.handleChange}  placeholder='Password'/>
                                        {this.state.passwordError ? <div className="error-message">Password is a required field.</div> : ''}
                                    </div>
                                    <div className={this.state.numberError ? 'form-group row error' : 'form-group row'} >
                                        <input className='input-login' type='text' name='number' autoComplete='off' value={this.state.number} onChange={this.handleChange} placeholder='Phone Number (381677...)'/>
                                        {this.state.numberError ? <div className="error-message">Phone Number is a required field.</div> : ''}
                                    </div>
                                    <div className='form-group row'>
                                        <button className='btn btn-block btn-outline-success btn-login-from' disabled={!this.validate()} type='submit' onClick={this.submitForm} >Log In</button>
                                    </div>
                                </form>
                            </div>
                        :
                            <div className='login-box wrap-border'>
                                <form noValidate style={this.state.from} className='m-3'>
                                    <div className={this.state.verify_pinError ? 'form-group row error' : 'form-group row'} >
                                        <input className='input-login' type='number' name='verify_pin' autoComplete='off' value={this.state.verify_pin} onChange={this.handleChange} placeholder='Verify pin (*****)'/>
                                        {this.state.verify_pinError ? <div className="error-message">Phone Number is a required field.</div> : ''}
                                    </div>
                                    <div className='form-group row'>
                                        <button className='btn btn-block btn-outline-success btn-login-from' disabled={!this.validatePin()} onClick={this.handleClickVerify} type='submit' >Verify</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);