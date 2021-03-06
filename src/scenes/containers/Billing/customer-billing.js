import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './../../stayles/billing.css';
import {
    activate_package,
    activate_subscription,
    activationAndDeactivation,
    addCredit,
    addReplaceTransfer,
    billingCustomerSearch, checking_voip,
    currently_active_users,
    distDuration,
    distPack,
    issue_masterCard,
    mastercard_registration, read_student,
    read_vs_active,
    transactionWallet, update_voip, voip_api, vs_student
} from "../../components/UserFunctions";
import  "../Login/index";
import localForages from "localforage";
import $ from 'jquery';
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import LoadingSpinner from 'react-loader-spinner';
import {Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';

class CustomerBilling extends Component {
    constructor(props){
        super(props);

        let currently = new Date();
        let dd = String(currently.getDate()).padStart(2, '0') -1;
        let mm = String(currently.getMonth() + 1).padStart(2, '0');
        let yyyy = currently.getFullYear();

        currently = yyyy + '-' + mm + '-' + dd;

        this.state = {
            auto_renew:false,
            redirect:false,
            number: '',
            email: '',
            userId:'',
            billingId:'',
            iccid:'',
            check:{
                iccid: /^[0-9A-Za-z]+$/,
                billingId: /^[0-9]+$/,
                userId: /^[0-9]+$/,
                number: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,10}$/,
                email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
            searchData:[{
                active:'',
                balances:'',
                billing_id:'',
                brand:'',
                created:'',
                email:'',
                force_app:'',
                name:'',
                reservations:'',
                user_id:'',
                user_type:'',
                wallet_id:'',
                sim_type:''
            }],
            roleUser:'',
            UsersLogin:'',
            modalForWallet:false,
            modal2:false,
            modal3:false,
            modal4:false,
            modalForMessage:'',
            modalDataWallet:'',
            amount:'',
            account:'',
            password_credit:'',
            infoCredit:'',
            activeAndDeactivation: false,
            checking_voip:false,
            password_active:'',
            loading:false,
            subscription: '',
            plan: '',
            dist_pack:[],
            dist_duration:[],
            package_du_active:'',
            duration_active:false,
            duration_select:'',
            active_sim_pack:false,
            action_add: '',
            new_number: '',
            day_active:currently,
            active_users_currently:[],
            select_voip:'',
            student_number:'',
            active_student:false,

        };


        this.validate = this.validate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeData = this.handleChangeData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleWalletTransaction = this.handleWalletTransaction.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleAddRemoveCredit = this.handleAddRemoveCredit.bind(this);
        this.handleActiveAndDeactivation = this.handleActiveAndDeactivation.bind(this);
        this.handleShowModalActive = this.handleShowModalActive.bind(this);
        // this.sessionGet = this.sessionGet.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleAddReplaceTransfer = this.handleAddReplaceTransfer.bind(this);
        this.handleActivatePackage = this.handleActivatePackage.bind(this);
        this.handleNortifyUser = this.handleNortifyUser.bind(this);
        this.handleVerifyMasterCard = this.handleVerifyMasterCard.bind(this);
        this.handleIssue = this.handleIssue.bind(this);
        this.handleIssueMasterCard = this.handleIssueMasterCard.bind(this);
        this.handleVoip = this.handleVoip.bind(this);
        this.handleStudent = this.handleStudent.bind(this);

    };

    handleStudent = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        vs_student(this.state.number, this.state.active_student, cookies.get('username')).then(result => {

            if(result.status === true) {

                store.addNotification({
                    title: 'Add Student',
                    message: result.message,
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })

            } else {

                store.addNotification({
                    title: 'Add Student',
                    message: result.message,
                    type: 'info',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                })

            }
        });
    };

    handleVoip = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        if(cookies.get('role') === 'ADMIN') {

            if( this.state.checking_voip === 'true' && this.state.select_voip !== '' ){

                voip_api(this.state.searchData[0].user_id,cookies.get('username'), this.state.checking_voip, this.state.select_voip).then(result => {

                    if(result.status === true){

                        store.addNotification({
                            title: 'Setting up user on voip',
                            message: 'You have added a user to the table voip',
                            type: 'success',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        })

                    } else {

                        store.addNotification({
                            title: 'Setting up user on voip',
                            message: result.message,
                            type: 'info',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        })
                    }

                });

            } else {

                if(this.state.select_voip !== ''){

                    update_voip(this.state.searchData[0].user_id,cookies.get('username'),this.state.searchData[0].billing_id, this.state.checking_voip , this.state.select_voip).then(result => {

                        if(result.status === true) {
                            store.addNotification({
                                title: 'Setting up user on voip',
                                message: 'Founds were successfully returned',
                                type: 'info',                         // 'default', 'success', 'info', 'warning'
                                container: 'top-right',                // where to position the notifications
                                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                                dismiss: {
                                    duration: 3000
                                }
                            });
                        } else {
                            store.addNotification({
                                title: 'Setting up user on voip',
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
                        title: 'Setting up user on voip',
                        message: 'Please, select your actions',
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                }

            }

        } else {
            store.addNotification({
                title: 'Setting up user on voip',
                message: 'Not login as ADMIN ',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            })
        }

    };

    handleNortifyUser = (e) => {
        e.preventDefault();
        $(this.modal3).show();
    };

    handleIssue = (e) => {
        e.preventDefault();
        $(this.modal4).show();
    };

    handleIssueMasterCard = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        if(this.state.searchData[0].user_id !== '' && cookies.get('role') !== 'USER' && cookies.get('username') !== ''
            && cookies.get('number') !== ''){

            issue_masterCard(cookies.get('username'), this.state.searchData[0].user_id, cookies.get('number')).then(result => {
                if(result['status'] === true){
                    store.addNotification({
                        title: 'Issue MasterCard',
                        message: 'You have successfully executed the command (Issue MasterCard)',
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                } else {
                    store.addNotification({
                        title: 'Issue MasterCard',
                        message: result['message'],
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                }
            });

        } else {
            store.addNotification({
                title: 'Issue MasterCard',
                message: 'Parameter missing!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            })
        }
    };

    handleVerifyMasterCard = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        if(this.state.searchData[0].user_id !== '' && cookies.get('role') !== 'USER') {

            mastercard_registration(this.state.searchData[0].user_id).then(result =>{

                if(result['status'] === true){
                    store.addNotification({
                        title: 'MasterCard Registration',
                        message: result['message'],
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                } else {
                    store.addNotification({
                        title: 'MasterCard Registration',
                        message: result['message'],
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                }

            });

        } else {
            store.addNotification({
                title: 'MasterCard Registration',
                message: 'Parameter missing!',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            })
        }
    };

    componentDidMount() {
        const cookies = new Cookies();

        currently_active_users(this.state.day_active).then(result => {
            this.setState({
                active_users_currently: result.data
            })
        });

        // const username = localForages.getItem('username', function (err, value) {
        //     return value;
        // });

        // username.then(value => {
            this.setState({
                UsersLogin: cookies.get('username')
            });
        // });

        $(this.modal).hide();
        $(this.modal).on('hidden.bs.modal', this.handleWalletTransaction);

        $(this.modal2).hide();
        $(this.modal3).hide();

        $(this.modal2).on('hidden.bs.modal', this.handleShowModalActive);

        distPack().then(result => {
           this.setState({
              dist_pack:  result.data
           });
        });

        distDuration().then(result => {
            this.setState({
                dist_duration:  result.data
            });
        });
    }

    handleSubscription = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        const userId = cookies.get('user_id_for_phone_numbers');

        const role = cookies.get('role');

        const billingId = cookies.get('billing_id_api');


        if( userId !== '' &&  role !==''  &&  billingId !=='') {

            activate_subscription(userId, this.state.subscription, this.state.plan, role, billingId).then(result => {
                if(result.status === true){
                    store.addNotification({
                        title: 'Activation Subscription',
                        message: result.data,
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                } else {
                    store.addNotification({
                        title: 'Activation Subscription',
                        message: result.data,
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    })
                }
            });

        }


    };

    sessionGet = (key) => {
        let stringValue = window.sessionStorage.getItem(key);
        if (stringValue !== null) {
            let value = JSON.parse(stringValue);
            let expirationDate = new Date(value.expirationDate);
            // if (expirationDate > new Date()) {
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

    componentWillMount() {
        const cookies = new Cookies();

        if(cookies.get('billing_user_id') !== ''){

            read_vs_active(cookies.get('billing_user_id')).then(result => {
                // sessionStorage.setItem("vs_active",result['data']);
                cookies.set('vs_active',result['data'])

                this.setState({
                    activeAndDeactivation: cookies.get("vs_active")
                });

            });

            checking_voip(cookies.get('billing_user_id')).then(result => {
                // sessionStorage.setItem("vs_active_voip",result['status']);
                cookies.set('vs_active_voip',result['status'])

                this.setState({
                    checking_voip: cookies.get("vs_active_voip")
                });

            });

        } else {
            this.setState({
                activeAndDeactivation: false,
                checking_voip:false
            });
        }

        this.setState({
            number: (cookies.get('number'))?cookies.get('number'):'',
            email: (cookies.get('email'))?cookies.get('email'):'',
            userId: (cookies.get('userId'))?cookies.get('userId'):'',
            billingId: (cookies.get('billingId'))?cookies.get('billingId'):'',
            iccid: (cookies.get('iccid'))?cookies.get('iccid'):'',

        });

        this.setState({
            searchData:[{
                active: (cookies.get('billing_active'))?cookies.get('billing_active'):'',
                balances: (cookies.get('billing_balances'))?cookies.get('billing_balances'):'',
                billing_id: (cookies.get('billing_id'))?cookies.get('billing_id'):'',
                brand: (cookies.get('billing_brand'))?cookies.get('billing_brand'):'',
                created: (cookies.get('billing_created'))?cookies.get('billing_created'):'',
                email: (cookies.get('billing_email'))?cookies.get('billing_email'):'',
                force_app: (cookies.get('billing_force_app'))?cookies.get('billing_force_app'):'',
                name: (cookies.get('billing_name'))?cookies.get('billing_name'):'',
                reservations: (cookies.get('billing_reservations'))?cookies.get('billing_reservations'):'',
                user_id: (cookies.get('billing_user_id'))?cookies.get('billing_user_id'):'',
                user_type: (cookies.get('billing_user_type'))?cookies.get('billing_user_type'):'',
                wallet_id: (cookies.get('billing_wallet_id'))?cookies.get('billing_wallet_id'):'',
                sim_type: (cookies.get('billing_sim_type'))?cookies.get('billing_sim_type'):'',

            }],
        });

        const sim_report = cookies.get('id_from_sim_report');

        const voip_id = cookies.get('get_voip_id');

        const ud_transactions = cookies.get('paymentTransactions');

        const ud_card_transactions = cookies.get('cardTransactions');

        const ud_iPay_transactions = cookies.get('iPayTransactions');

        if( ud_iPay_transactions !== ''  &&  ud_iPay_transactions !== null){
            const data = [];

            this.setState({
                userId: ud_iPay_transactions
            });

            if( ud_iPay_transactions !== ''  ){
                data.push('{"property":"userId","value":"'+ud_iPay_transactions+'"}')
            }

            const param = "[" + data.toString() + "]";

            if(data.toString() !== '') {

                billingCustomerSearch(param).then(filter => {

                    if(filter.data[0] !== undefined){

                        cookies.set('billing_active',filter.data[0].active);
                        cookies.set('billing_balances',filter.data[0].balances);
                        cookies.set('billing_id',filter.data[0].billing_id);
                        cookies.set('billing_brand',filter.data[0].brand);
                        cookies.set('billing_created',filter.data[0].created);
                        cookies.set('billing_email',filter.data[0].email);
                        cookies.set('billing_force_app',filter.data[0].force_app);
                        cookies.set('billing_name',filter.data[0].name);
                        cookies.set('billing_reservations',filter.data[0].reservations);
                        cookies.set('billing_user_id',filter.data[0].user_id);
                        cookies.set('billing_user_type',filter.data[0].user_type);
                        cookies.set('billing_wallet_id',filter.data[0].wallet_id);
                        cookies.set('billing_sim_type',filter.data[0].sim_type);

                        this.setState({
                            searchData:[{
                                active: (filter.data[0].active)?cookies.get('billing_active'):'',
                                balances: (filter.data[0].balances)?cookies.get('billing_balances'):'',
                                billing_id: (filter.data[0].billing_id)?cookies.get('billing_id'):'',
                                brand: (filter.data[0].brand)?cookies.get('billing_brand'):'',
                                created: (filter.data[0].created)?cookies.get('billing_created'):'',
                                email: (filter.data[0].email)?cookies.get('billing_email'):'',
                                force_app: (filter.data[0].force_app)?cookies.get('billing_force_app'):'',
                                name: (filter.data[0].name)?cookies.get('billing_name'):'',
                                reservations: (filter.data[0].reservations)?cookies.get('billing_reservations'):'',
                                user_id: (filter.data[0].user_id)?cookies.get('billing_user_id'):'',
                                user_type: (filter.data[0].user_type)?cookies.get('billing_user_type'):'',
                                wallet_id: (filter.data[0].wallet_id)?cookies.get('billing_wallet_id'):'',
                                sim_type: (filter.data[0].sim_type)?cookies.get('billing_sim_type'):'',
                            }],
                        });


                        cookies.set('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                        cookies.set('billing_id_api', this.state.searchData[0].billing_id);

                    } else {
                        store.addNotification({
                            title: 'Customer Search',
                            message: 'Data from input field does not exits!',
                            type: 'info',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });
                        window.scrollTo({
                            top: 0
                        });
                    }

                });
            }
        }

        if( ud_card_transactions !== ''  &&  ud_card_transactions !== null){
            const data = [];

            this.setState({
                userId: ud_card_transactions
            });

            if( ud_card_transactions !== ''  ){
                data.push('{"property":"userId","value":"'+ud_card_transactions+'"}')
            }

            const param = "[" + data.toString() + "]";

            if(data.toString() !== '') {

                billingCustomerSearch(param).then(filter => {

                    if(filter.data[0] !== undefined){

                        cookies.set('billing_active',filter.data[0].active);
                        cookies.set('billing_balances',filter.data[0].balances);
                        cookies.set('billing_id',filter.data[0].billing_id);
                        cookies.set('billing_brand',filter.data[0].brand);
                        cookies.set('billing_created',filter.data[0].created);
                        cookies.set('billing_email',filter.data[0].email);
                        cookies.set('billing_force_app',filter.data[0].force_app);
                        cookies.set('billing_name',filter.data[0].name);
                        cookies.set('billing_reservations',filter.data[0].reservations);
                        cookies.set('billing_user_id',filter.data[0].user_id);
                        cookies.set('billing_user_type',filter.data[0].user_type);
                        cookies.set('billing_wallet_id',filter.data[0].wallet_id);
                        cookies.set('billing_sim_type',filter.data[0].sim_type);

                        this.setState({
                            searchData:[{
                                active: (filter.data[0].active)?cookies.get('billing_active'):'',
                                balances: (filter.data[0].balances)?cookies.get('billing_balances'):'',
                                billing_id: (filter.data[0].billing_id)?cookies.get('billing_id'):'',
                                brand: (filter.data[0].brand)?cookies.get('billing_brand'):'',
                                created: (filter.data[0].created)?cookies.get('billing_created'):'',
                                email: (filter.data[0].email)?cookies.get('billing_email'):'',
                                force_app: (filter.data[0].force_app)?cookies.get('billing_force_app'):'',
                                name: (filter.data[0].name)?cookies.get('billing_name'):'',
                                reservations: (filter.data[0].reservations)?cookies.get('billing_reservations'):'',
                                user_id: (filter.data[0].user_id)?cookies.get('billing_user_id'):'',
                                user_type: (filter.data[0].user_type)?cookies.get('billing_user_type'):'',
                                wallet_id: (filter.data[0].wallet_id)?cookies.get('billing_wallet_id'):'',
                                sim_type: (filter.data[0].sim_type)?cookies.get('billing_sim_type'):'',

                            }],
                        });


                        cookies.set('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                        cookies.set('billing_id_api', this.state.searchData[0].billing_id);

                    } else {
                        store.addNotification({
                            title: 'Customer Search',
                            message: 'Data from input field does not exits!',
                            type: 'info',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });
                        window.scrollTo({
                            top: 0
                        });
                    }

                });
            }
        }

        if( ud_transactions !== ''  &&  ud_transactions !== null){
            const data = [];

            this.setState({
                userId: ud_transactions
            });

            if( ud_transactions !== ''  ){
                data.push('{"property":"userId","value":"'+ud_transactions+'"}')
            }

            const param = "[" + data.toString() + "]";

            if(data.toString() !== '') {

                billingCustomerSearch(param).then(filter => {

                    if(filter.data[0] !== undefined){

                        cookies.set('billing_active',filter.data[0].active);
                        cookies.set('billing_balances',filter.data[0].balances);
                        cookies.set('billing_id',filter.data[0].billing_id);
                        cookies.set('billing_brand',filter.data[0].brand);
                        cookies.set('billing_created',filter.data[0].created);
                        cookies.set('billing_email',filter.data[0].email);
                        cookies.set('billing_force_app',filter.data[0].force_app);
                        cookies.set('billing_name',filter.data[0].name);
                        cookies.set('billing_reservations',filter.data[0].reservations);
                        cookies.set('billing_user_id',filter.data[0].user_id);
                        cookies.set('billing_user_type',filter.data[0].user_type);
                        cookies.set('billing_wallet_id',filter.data[0].wallet_id);
                        cookies.set('billing_sim_type',filter.data[0].sim_type);

                        this.setState({
                            searchData:[{
                                active: (filter.data[0].active)?cookies.get('billing_active'):'',
                                balances: (filter.data[0].balances)?cookies.get('billing_balances'):'',
                                billing_id: (filter.data[0].billing_id)?cookies.get('billing_id'):'',
                                brand: (filter.data[0].brand)?cookies.get('billing_brand'):'',
                                created: (filter.data[0].created)?cookies.get('billing_created'):'',
                                email: (filter.data[0].email)?cookies.get('billing_email'):'',
                                force_app: (filter.data[0].force_app)?cookies.get('billing_force_app'):'',
                                name: (filter.data[0].name)?cookies.get('billing_name'):'',
                                reservations: (filter.data[0].reservations)?cookies.get('billing_reservations'):'',
                                user_id: (filter.data[0].user_id)?cookies.get('billing_user_id'):'',
                                user_type: (filter.data[0].user_type)?cookies.get('billing_user_type'):'',
                                wallet_id: (filter.data[0].wallet_id)?cookies.get('billing_wallet_id'):'',
                                sim_type: (filter.data[0].sim_type)?cookies.get('billing_sim_type'):'',

                            }],
                        });


                        cookies.set('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                        cookies.set('billing_id_api', this.state.searchData[0].billing_id);

                    } else {
                        store.addNotification({
                            title: 'Customer Search',
                            message: 'Data from input field does not exits!',
                            type: 'info',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });
                        window.scrollTo({
                            top: 0
                        });
                    }

                });
            }

        }

        //Voip

        if( voip_id !== ''  &&  voip_id !== null){

            const data = [];

            this.setState({
                userId: voip_id
            });

            if( voip_id !== ''  ){
                data.push('{"property":"userId","value":"'+voip_id+'"}')
            }

            const param = "[" + data.toString() + "]";

            if(data.toString() !== '') {

                billingCustomerSearch(param).then(filter => {

                    if(filter.data[0] !== undefined){

                        cookies.set('billing_active',filter.data[0].active);
                        cookies.set('billing_balances',filter.data[0].balances);
                        cookies.set('billing_id',filter.data[0].billing_id);
                        cookies.set('billing_brand',filter.data[0].brand);
                        cookies.set('billing_created',filter.data[0].created);
                        cookies.set('billing_email',filter.data[0].email);
                        cookies.set('billing_force_app',filter.data[0].force_app);
                        cookies.set('billing_name',filter.data[0].name);
                        cookies.set('billing_reservations',filter.data[0].reservations);
                        cookies.set('billing_user_id',filter.data[0].user_id);
                        cookies.set('billing_user_type',filter.data[0].user_type);
                        cookies.set('billing_wallet_id',filter.data[0].wallet_id);
                        cookies.set('billing_sim_type',filter.data[0].sim_type);

                        this.setState({
                            searchData:[{
                                active: (filter.data[0].active)?cookies.get('billing_active'):'',
                                balances: (filter.data[0].balances)?cookies.get('billing_balances'):'',
                                billing_id: (filter.data[0].billing_id)?cookies.get('billing_id'):'',
                                brand: (filter.data[0].brand)?cookies.get('billing_brand'):'',
                                created: (filter.data[0].created)?cookies.get('billing_created'):'',
                                email: (filter.data[0].email)?cookies.get('billing_email'):'',
                                force_app: (filter.data[0].force_app)?cookies.get('billing_force_app'):'',
                                name: (filter.data[0].name)?cookies.get('billing_name'):'',
                                reservations: (filter.data[0].reservations)?cookies.get('billing_reservations'):'',
                                user_id: (filter.data[0].user_id)?cookies.get('billing_user_id'):'',
                                user_type: (filter.data[0].user_type)?cookies.get('billing_user_type'):'',
                                wallet_id: (filter.data[0].wallet_id)?cookies.get('billing_wallet_id'):'',
                                sim_type: (filter.data[0].sim_type)?cookies.get('billing_sim_type'):'',

                            }],
                        });


                        cookies.set('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                        cookies.set('billing_id_api', this.state.searchData[0].billing_id);

                    } else {
                        store.addNotification({
                            title: 'Customer Search',
                            message: 'Data from input field does not exits!',
                            type: 'info',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });
                        window.scrollTo({
                            top: 0
                        });
                    }

                });
            }
        }



        if( sim_report !== ''  &&  sim_report !== null){

            const data = [];

            this.setState({
                userId: sim_report
            });

            if( sim_report !== ''  ){
                data.push('{"property":"userId","value":"'+sim_report+'"}')
            }

            const param = "[" + data.toString() + "]";

            if(data.toString() !== '') {

                billingCustomerSearch(param).then(filter => {

                    if(filter.data[0] !== undefined){

                        cookies.set('billing_active',filter.data[0].active);
                        cookies.set('billing_balances',filter.data[0].balances);
                        cookies.set('billing_id',filter.data[0].billing_id);
                        cookies.set('billing_brand',filter.data[0].brand);
                        cookies.set('billing_created',filter.data[0].created);
                        cookies.set('billing_email',filter.data[0].email);
                        cookies.set('billing_force_app',filter.data[0].force_app);
                        cookies.set('billing_name',filter.data[0].name);
                        cookies.set('billing_reservations',filter.data[0].reservations);
                        cookies.set('billing_user_id',filter.data[0].user_id);
                        cookies.set('billing_user_type',filter.data[0].user_type);
                        cookies.set('billing_wallet_id',filter.data[0].wallet_id);
                        cookies.set('billing_sim_type',filter.data[0].sim_type);

                        this.setState({
                            searchData:[{
                                active: (filter.data[0].active)?cookies.get('billing_active'):'',
                                balances: (filter.data[0].balances)?cookies.get('billing_balances'):'',
                                billing_id: (filter.data[0].billing_id)?cookies.get('billing_id'):'',
                                brand: (filter.data[0].brand)?cookies.get('billing_brand'):'',
                                created: (filter.data[0].created)?cookies.get('billing_created'):'',
                                email: (filter.data[0].email)?cookies.get('billing_email'):'',
                                force_app: (filter.data[0].force_app)?cookies.get('billing_force_app'):'',
                                name: (filter.data[0].name)?cookies.get('billing_name'):'',
                                reservations: (filter.data[0].reservations)?cookies.get('billing_reservations'):'',
                                user_id: (filter.data[0].user_id)?cookies.get('billing_user_id'):'',
                                user_type: (filter.data[0].user_type)?cookies.get('billing_user_type'):'',
                                wallet_id: (filter.data[0].wallet_id)?cookies.get('billing_wallet_id'):'',
                                sim_type: (filter.data[0].sim_type)?cookies.get('billing_sim_type'):'',

                            }],
                        });


                        cookies.set('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                        cookies.set('billing_id_api', this.state.searchData[0].billing_id);

                    } else {
                        store.addNotification({
                            title: 'Customer Search',
                            message: 'Data from input field does not exits!',
                            type: 'info',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });
                        window.scrollTo({
                            top: 0
                        });
                    }

                });
            }
        }

        // if(this.sessionGet('token') ){
        //     console.log('Call User Feed');
        // } else {
        //     this.setState({
        //        redirect:true
        //     });
        // }

    }

    componentWillUnmount() {
        //ToDo
    }

    validate(){

        if(this.state.number !== ''  && this.state.number.length > 0 && this.state.check.number.test( this.state.number )){
            return this.state.number;
        }
        if(this.state.email !== ''  && this.state.email.length > 0 && this.state.check.email.test( this.state.email )) {
            return this.state.email;
        }
        if(this.state.userId !== ''  && this.state.userId.length > 0 && this.state.check.userId.test( this.state.userId )){
            return this.state.userId;
        }
        if(this.state.billingId !== ''  && this.state.billingId.length > 0  && this.state.check.billingId.test( this.state.billingId )){
            return this.state.billingId;
        }
        if(this.state.iccid !== ''  && this.state.iccid.length > 0  && this.state.check.iccid.test( this.state.iccid )){
            return this.state.iccid;
        }

    }

    handleChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        });

        if( e.target.name === "duration_active" ){

            this.setState({
                duration_active : !this.state.duration_active,
            });

        }

        if( e.target.name === 'auto_renew') {

            this.setState({
                auto_renew : !this.state.auto_renew,
            });
        }

    };

    handleChangeData = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    handleShowModalActive = (e) => {
      e.preventDefault();

        if(this.state.password_active !== '' && this.state.searchData[0].user_id !== ''){

            $(this.modal2).show();

        } else {
            store.addNotification({
                title: 'Deactivation / Activation',
                message: 'Parameter is empty',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }

    };

    handleActivatePackage = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        if(this.state.searchData[0].user_id !== '' && cookies.get('role') !== 'USER' && cookies.get('role') !== ''
            && this.state.duration_active !== '' && this.state.package_du_active !== '' && cookies.get('billing_email') !== '' && cookies.get('billing_email') !== null ) {


            activate_package(this.state.searchData[0].user_id, cookies.get('role'), this.state.duration_active, this.state.duration_select, this.state.package_du_active, cookies.get('billing_email'), this.state.auto_renew, cookies.get('username')).then(result => {

                if(result['success'] === true) {

                    store.addNotification({
                        title: 'Package Activation',
                        message: result['message'] + '(' + result['text'] + ')' ,
                        type: 'success',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });

                } else {

                    store.addNotification({
                        title: 'Package Activation',
                        message: result['message'] + '(' + result['text'] + ')' ,
                        type: 'warning',                         // 'default', 'success', 'info', 'warning'
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
                title: 'Package Activation',
                message: 'Parameter missing or invalid',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }

    };

    handleReset = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        this.setState({
            activeAndDeactivation:false,
            checking_voip:false,
            active_student:false
        });


        cookies.set("vs_active",false);
        cookies.set('billing_active','');
        cookies.set('billing_balances','');
        cookies.set('billing_id','');
        cookies.set('billing_brand','');
        cookies.set('billing_created','');
        cookies.set('billing_email','');
        cookies.set('billing_force_app','');
        cookies.set('billing_name','');
        cookies.set('billing_reservations','');
        cookies.set('billing_user_id','');
        cookies.set('billing_user_type','');
        cookies.set('billing_wallet_id','');

        cookies.set('number','');
        cookies.set('email','');
        cookies.set('userId','');
        cookies.set('billingId','');

        cookies.remove('number');
        cookies.remove('email');
        cookies.remove('userId');
        cookies.remove('billingId');

        cookies.remove('billing_active');
        cookies.remove('billing_balances');
        cookies.remove('billing_id');
        cookies.remove('billing_brand');
        cookies.remove('billing_created');
        cookies.remove('billing_email');
        cookies.remove('billing_force_app');
        cookies.remove('billing_name');
        cookies.remove('billing_reservations');
        cookies.remove('billing_user_id');
        cookies.remove('billing_user_type');
        cookies.remove('billing_wallet_id');
        cookies.remove('billing_sim_type');



        this.setState({
            searchData:[{
                active: '',
                balances: '',
                billing_id: '',
                brand: '',
                created: '',
                email: '',
                force_app: '',
                name: '',
                reservations: '',
                user_id: '',
                user_type: '',
                wallet_id: '',
                sim_type:''
            }],
            number: '',
            email: '',
            userId:'',
            billingId:'',
            iccid:'',
            loading:false,
        });

        cookies.set('user_id_for_phone_numbers', '');
        cookies.set('billing_id_api', '');
        cookies.set('id_from_sim_report','');
        cookies.set('paymentTransactions','');
        cookies.set('cardTransactions','');
        cookies.set('iPayTransactions','');
        cookies.set('get_voip_id','');
    };

    handleWalletTransaction = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        this.setState({ loading: true });
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
        transactionWallet(this.state.searchData[0].user_id, cookies.get('role')).then(wallet => {

           if(wallet.status === true){
               this.setState({ loading: false });

               $(this.modal).show();

               this.setState({
                   modalForWallet : true,
                   modalDataWallet : wallet.data,
               });
           }else if(wallet.status === false && wallet.message === "User doesn't have wallet!"){
               this.setState({ loading: false });
               $(this.modal).show();

               this.setState({
                   modalForWallet : false,
                   modalForMessage : [wallet.message],
               });
           }else {
               this.setState({ loading: false });
               $(this.modal).show();

               this.setState({
                   modalForWallet : false,
                   modalForMessage : [wallet.message],
               });
           }

        });

    };

    handleCloseModal = (e) => {
        e.preventDefault();
        $(this.modal).hide();
        $(this.modal2).hide();
        $(this.modal3).hide();
        $(this.modal4).hide();

    };

    handleAddRemoveCredit = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        if(this.state.amount !== '' && this.state.account !== '' && this.state.password_credit !== ''&& this.state.infoCredit !== '' &&
            this.state.searchData[0].billing_id !== '' && this.state.UsersLogin !== '' ){

            addCredit(this.state.searchData[0].billing_id, this.state.amount, this.state.account, this.state.password_credit, this.state.infoCredit, cookies.get('username')).then(data => {

               if(data.success == true){

                   store.addNotification({
                       title: 'Add / Remove Credit',
                       message: 'Successfully Add / Remove Credit',
                       type: 'success',                         // 'default', 'success', 'info', 'warning'
                       container: 'top-right',                // where to position the notifications
                       animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                       animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                       dismiss: {
                           duration: 3000
                       }
                   })
               } else {

                   store.addNotification({
                       title: 'Add / Remove Credit',
                       message: 'UserAccount not found for received id.',
                       type: 'warning',                         // 'default', 'success', 'info', 'warning'
                       container: 'top-right',                // where to position the notifications
                       animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                       animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                       dismiss: {
                           duration: 3000
                       }
                   })
               }
            });
        } else {
            store.addNotification({
                title: 'Add / Remove Credit',
                message: 'Parameter missing',
                type: 'info',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            })
        }

    };

    handleActiveAndDeactivation = (e) =>{
        e.preventDefault();
        const cookies = new Cookies();

        if(this.state.searchData[0].user_id !== ''){

            read_vs_active(this.state.searchData[0].user_id).then(result => {
                cookies.set("vs_active",result['data']);

                this.setState({
                    activeAndDeactivation: cookies.get("vs_active")
                });

                $(this.modal2).hide();

            });


            checking_voip(this.state.searchData[0].user_id).then(result => {
                cookies.set("vs_active_voip",result['status']);

                this.setState({
                    checking_voip: cookies.get("vs_active_voip")
                });

            });

        }else {
            this.setState({
                activeAndDeactivation: false,
                checking_voip:false
            });
            cookies.set("vs_active",false);
            cookies.set("vs_active_voip",false);

        }

        if(this.state.password_active !== '' && this.state.searchData[0].user_id !== ''){

            activationAndDeactivation(this.state.activeAndDeactivation, this.state.searchData[0].user_id, this.state.password_active, cookies.get('username')).then(result => {

                if(result.message !== 'Password is not a valid!'){

                    if(result.success === true){

                        this.setState({
                            password_active:''
                        });

                        store.addNotification({
                            title: 'Deactivation / Activation',
                            message: 'true',
                            type: 'success',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });

                    } else {
                        store.addNotification({
                            title: 'Deactivation / Activation',
                            message: 'false',
                            type: 'warning',                         // 'default', 'success', 'info', 'warning'
                            container: 'top-right',                // where to position the notifications
                            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                            dismiss: {
                                duration: 3000
                            }
                        });
                    }

                } else {
                    store.addNotification({
                        title: 'Deactivation / Activation',
                        message: result.message,
                        type: 'warning',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                }
            })

        } else {
            store.addNotification({
                title: 'Deactivation / Activation',
                message: 'Parameter is empty',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                    duration: 3000
                }
            });
        }
    };

    handleSearch= (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        const data = [];

        cookies.set('number',this.state.number);
        cookies.set('email',this.state.email);
        cookies.set('userId',this.state.userId);
        cookies.set('billingId',this.state.billingId);
        cookies.set('iccid',this.state.iccid);


        read_student(this.state.number).then( result => {
           if(result.success === true){
               this.setState({active_student:true})
           } else {
               this.setState({active_student:false})
           }
        });


        this.setState({
            number: cookies.get('number'),
            email: cookies.get('email'),
            userId: cookies.get('userId'),
            billingId: cookies.get('billingId'),
            iccid: cookies.get('iccid'),
        });


        if( this.state.number !== '' ){
            data.push('{"property":"number","value":"'+this.state.number+'"}')
        }
        if( this.state.email !== '' ) {
            data.push('{"property":"email","value":"'+this.state.email+'"}')
        }
        if( this.state.userId !== ''  ){
            data.push('{"property":"userId","value":"'+this.state.userId+'"}')
        }
        if( this.state.billingId !== '' ){
            data.push('{"property":"billingId","value":"'+this.state.billingId+'"}')
        }
        if( this.state.iccid !== '' ){
            data.push('{"property":"iccid","value":"'+this.state.iccid+'"}')
        }

        const param = "[" + data.toString() + "]";

        if(data.toString() !== '') {

            billingCustomerSearch(param).then(filter => {

                if(filter.data[0] !== undefined && filter.status == true){

                    cookies.set('billing_active',filter.data[0].active);
                    cookies.set('billing_balances',filter.data[0].balances);
                    cookies.set('billing_id',filter.data[0].billing_id);
                    cookies.set('billing_brand',filter.data[0].brand);
                    cookies.set('billing_created',filter.data[0].created);
                    cookies.set('billing_email',filter.data[0].email);
                    cookies.set('billing_force_app',filter.data[0].force_app);
                    cookies.set('billing_name',filter.data[0].name);
                    cookies.set('billing_reservations',filter.data[0].reservations);
                    cookies.set('billing_user_id',filter.data[0].user_id);
                    cookies.set('billing_user_type',filter.data[0].user_type);
                    cookies.set('billing_wallet_id',filter.data[0].wallet_id);
                    cookies.set('billing_sim_type',filter.data[0].sim_type);


                    read_vs_active(filter.data[0].user_id).then(result => {
                        cookies.set("vs_active",result['data']);

                        this.setState({
                            activeAndDeactivation: cookies.get("vs_active")
                        });

                    });

                    checking_voip(filter.data[0].user_id).then(result => {
                        cookies.set("vs_active_voip",result['status']);

                        this.setState({
                            checking_voip: cookies.get("vs_active_voip")
                        });

                    });

                    this.setState({
                        searchData:[{
                            active: (filter.data[0].active)?cookies.get('billing_active'):'',
                            balances: (filter.data[0].balances)?cookies.get('billing_balances'):'',
                            billing_id: (filter.data[0].billing_id)?cookies.get('billing_id'):'',
                            brand: (filter.data[0].brand)?cookies.get('billing_brand'):'',
                            created: (filter.data[0].created)?cookies.get('billing_created'):'',
                            email: (filter.data[0].email)?cookies.get('billing_email'):'',
                            force_app: (filter.data[0].force_app)?cookies.get('billing_force_app'):'',
                            name: (filter.data[0].name)?cookies.get('billing_name'):'',
                            reservations: (filter.data[0].reservations)?cookies.get('billing_reservations'):'',
                            user_id: (filter.data[0].user_id)?cookies.get('billing_user_id'):'',
                            user_type: (filter.data[0].user_type)?cookies.get('billing_user_type'):'',
                            wallet_id: (filter.data[0].wallet_id)?cookies.get('billing_wallet_id'):'',
                            sim_type: (filter.data[0].sim_type)?cookies.get('billing_sim_type'):'',

                        }],
                    });

                    cookies.set('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                    cookies.set('billing_id_api', this.state.searchData[0].billing_id);

                } else {

                    this.setState({
                        searchData:[{
                            active: '',
                            balances: '',
                            billing_id: '',
                            brand: '',
                            created: '',
                            email: '',
                            force_app: '',
                            name: '',
                            reservations: '',
                            user_id: '',
                            user_type: '',
                            wallet_id: '',
                            sim_type: '',
                        }],
                    });

                    cookies.remove('billing_active');
                    cookies.remove('billing_balances');
                    cookies.remove('billing_id');
                    cookies.remove('billing_brand');
                    cookies.remove('billing_created');
                    cookies.remove('billing_email');
                    cookies.remove('billing_force_app');
                    cookies.remove('billing_name');
                    cookies.remove('billing_reservations');
                    cookies.remove('billing_user_id');
                    cookies.remove('billing_user_type');
                    cookies.remove('billing_wallet_id');
                    cookies.remove('billing_sim_type');

                    cookies.remove('iccid');

                    store.addNotification({
                        title: 'Customer Search',
                        message: 'Data from input field does not exits!',
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'top-right',                // where to position the notifications
                        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                        dismiss: {
                            duration: 3000
                        }
                    });
                    window.scrollTo({
                        top: 0
                    });
                }

            });
        }

    };

    handleAddReplaceTransfer = (e) => {
        e.preventDefault();
        const cookies = new Cookies();

        addReplaceTransfer(cookies.get('billing_user_id'), this.state.new_number, this.state.action_add, cookies.get('role')).then(result => {
           console.log(result);
           if(result.success === true) {
               store.addNotification({
                   title: 'Add/Replace/Transfer Number',
                   message: result.message,
                   type: 'success',                         // 'default', 'success', 'info', 'warning'
                   container: 'top-right',                // where to position the notifications
                   animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                   animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                   dismiss: {
                       duration: 3000
                   }
               });
           } else {
               store.addNotification({
                   title: 'Add/Replace/Transfer Number',
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
    };

    render() {
        const cookies = new Cookies();

        if(!cookies.get('tokens')){
            return <Redirect to={'/'} />
        }

        const wallet_transaction = (this.state.searchData[0].user_id)? false : true ;

        return (

            <div id="wrapper" className={ cookies.get('active') === true ? "toggled" :"" }  >

                <section id="content-wrapper" ref={el => (this.container = el)}>

                    <nav aria-label="breadcrumb" >
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Customer Billing</li>
                        </ol>
                    </nav>
                    {cookies.get('phone_number_call_centar') === '381677191096'  || cookies.get('phone_number_call_centar') === '381677230498'  || cookies.get('phone_number_call_centar') === '381677000688'  || cookies.get('phone_number_call_centar') === '381677033075' || cookies.get('phone_number_call_centar') === '381677001006' || cookies.get('phone_number_call_centar') === '381677200400' || cookies.get('phone_number_call_centar') === '381677200909' || cookies.get('phone_number_call_centar') === '381677200900' || cookies.get('phone_number_call_centar') === '381677103003' || cookies.get('phone_number_call_centar') === '381677007100' ? '' :

                        (this.state.active_users_currently !== [] )?
                         this.state.active_users_currently.map(function (item) {

                             return (<div key={0} className='row '>
                                 <div className='col-lg-3 mb-3'>
                                     <div className='wrap-border table-col-gui '>
                                         <div className="box ">
                                             <i className="fa fa-envelope fa-fw bg-primary"></i>
                                             <div className="info">
                                                 <h3>{item.messaging}</h3> <span>Messaging</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className='col-lg-3 mb-3'>
                                     <div className='wrap-border table-col-gui '>
                                         <div className="box ">
                                             <i className="fa fa-file fa-fw bg-info"></i>
                                             <div className="info">
                                                 <h3>{item.data}</h3> <span>Data</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className='col-lg-3 mb-3'>
                                     <div className='wrap-border table-col-gui '>
                                         <div className="box ">
                                             <i className="fa fa-users fa-fw bg-success"></i>
                                             <div className="info">
                                                 <h3>{item.total}</h3> <span>Active Users</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <div className='col-lg-3 mb-3'>
                                     <div className='wrap-border table-col-gui '>
                                         <div className="box ">
                                             <i className="fa fa-microphone fa-fw bg-danger"></i>
                                             <div className="info">
                                                 <h3>{item.voice}</h3> <span>Voice</span>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                             </div>)

                         })
                        :''
                     }

                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Customer Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='number' value={this.state.number} onChange={this.handleChange} autoComplete='off' placeholder='Number:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.email} onChange={this.handleChange} name='email'  placeholder='Email:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.userId} onChange={this.handleChange} name='userId'  placeholder='User ID:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.billingId} onChange={this.handleChange} name='billingId'  placeholder='Billing ID'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.iccid} onChange={this.handleChange} name='iccid'  placeholder='Iccid'/>
                                    </div>
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6 mb-3">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={!this.validate()} onClick={this.handleSearch} type="submit">Search</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info btn-login-from" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Customer Data</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='userId' readOnly={true} value={this.state.searchData[0].user_id} onChange={this.handleChangeData} autoComplete='off' placeholder='User ID:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' readOnly={true} value={this.state.searchData[0].email} onChange={this.handleChangeData} name='email'  placeholder='Email:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' readOnly={true} value={this.state.searchData[0].name} onChange={this.handleChangeData} name='name'  placeholder='Name:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' readOnly={true} value={this.state.searchData[0].user_type} onChange={this.handleChangeData} name='subscription'  placeholder='Subscription:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' readOnly={true} value={this.state.searchData[0].billing_id} onChange={this.handleChangeData} name='walletId'  placeholder='Wallet ID:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' readOnly={true} value={this.state.searchData[0].force_app} onChange={this.handleChangeData} name='appForce'  placeholder='App Force:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' readOnly={true} value={this.state.searchData[0].wallet_id} onChange={this.handleChangeData} name='wallet_id'  placeholder='ID Wallet:'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Billing Details</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' name='billingId' readOnly={true} value={this.state.searchData[0].billing_id} onChange={this.handleChangeData} autoComplete='off' placeholder='Billing ID:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <textarea className='input' autoComplete='off' rows="6" cols="70" onChange={this.handleChangeData} readOnly={true} name='balances' value={this.state.searchData[0].balances} placeholder='Balances:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <textarea className='input' autoComplete='off' rows="4" cols="40" onChange={this.handleChangeData} readOnly={true} name='reservations' value={this.state.searchData[0].reservations} placeholder='Reservations:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' onChange={this.handleChangeData} type='text' name='sim_type' readOnly={true}  value={this.state.searchData[0].sim_type} autoComplete='off' placeholder='sim_type:'/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border billing-wrap'>
                                <h6 className="content-title">Add / Remove Credit</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <input className='input' onChange={this.handleChange} type='number' name='amount' value={this.state.amount} autoComplete='off' placeholder='Amount:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input " onChange={this.handleChange} value={this.state.account}  name="account">
                                            <option value="">choose...</option>
                                            <option value="0">cash</option>
                                            <option value="1">data</option>
                                            <option value="2">voice</option>
                                            <option value="3">sms</option>
                                            <option value="4">roaming1</option>
                                            <option value="5">roaming2</option>
                                            <option value="6">roaming3</option>
                                            <option value="7">roaming4</option>
                                            <option value="8">roaming5</option>
                                            <option value="9">roaming6</option>
                                            <option value="10">roaming7</option>
                                            <option value="11">bus plus</option>
                                            <option value="12">unlimited_voice</option>
                                            <option value="13">voice/sms</option>
                                            <option value="14">data_limit</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='password' onChange={this.handleChange} value={this.state.password_credit} autoComplete='off' name='password_credit' placeholder='Password:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <textarea className='input' autoComplete='off' name='infoCredit' onChange={this.handleChange} value={this.state.infoCredit}  placeholder='Info:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={wallet_transaction} onClick={this.handleAddRemoveCredit} type="submit">Proceed</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border billing-two-row-wrap'>
                                <h6 className="content-title">Deactivation / Activation</h6>
                                <hr/>
                                <form method="post">
                                    {/*<div className="form-group billing-input">*/}
                                        {/*<ul className="unstyled">*/}
                                            {/*<li>*/}
                                                {/*<input className="styled-checkbox input" defaultChecked={this.state.activeAndDeactivation === 'true'?'checked':''}  value={this.state.activeAndDeactivation} onChange={this.handleChange} name='activeAndDeactivation' id="activeAndDeactivation"*/}
                                                       {/*type="checkbox" />*/}
                                                    {/*<label htmlFor="activeAndDeactivation"> Active</label>*/}
                                            {/*</li>*/}
                                        {/*</ul>*/}
                                    {/*</div>*/}
                                    <div className='row'>
                                        <div className='col-lg-7'>
                                            <div className='form-group billing-input'>
                                                <select className={"input  true"}  onChange={this.handleChange} value={this.state.checking_voip} name='checking_voip'>
                                                    <option value="true">true</option>
                                                    <option value="false">false</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-5'>
                                            <p className="content-title">Voip</p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-7'>
                                            <div className='form-group billing-input'>
                                                <select className={"input  true"}  onChange={this.handleChange} value={this.state.select_voip} name='select_voip'>
                                                    <option value="">Select Actions</option>
                                                    <option value="voice">voice</option>
                                                    <option value="sms">sms</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-5'>
                                            <p className="content-title">Type</p>
                                        </div>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={wallet_transaction} onClick={this.handleVoip} type="submit">Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className='row'>
                                        <div className='col-lg-7'>
                                            <div className='form-group billing-input'>
                                                <select className={"input  true"}  onChange={this.handleChange} value={this.state.activeAndDeactivation} name='activeAndDeactivation'>
                                                    <option value="true">true</option>
                                                    <option value="false">false</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-lg-5'>
                                            <p className="content-title">Active</p>
                                        </div>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='password' autoComplete='off' value={this.state.password_active} onChange={this.handleChange} name='password_active'  placeholder='Password:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" data-toggle="modal" data-target="#modal2" disabled={wallet_transaction} onClick={this.handleShowModalActive} type="submit">Proceed</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="col-lg-2 mb-3">
                            <div className='wrap-border billing-two-row-wrap'>
                                <h6 className="content-title">Subscription</h6>
                                <hr/>
                                <form method="post " className='mb-3'>
                                    <div className='form-group billing-input'>
                                        <select className="input " name="subscription" value={this.state.subscription} onChange={this.handleChange}>
                                            <option value="">Subscription</option>
                                            <option value="200">postpaid</option>
                                            <option value="300">prepaid</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input " name="plan" value={this.state.plan} onChange={this.handleChange}>
                                            <option value="">Plan</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={wallet_transaction} onClick={this.handleSubscription} type="submit">Activate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                                <h6 className="content-title">Student</h6>
                                <hr/>

                                <form method='post'>
                                    {/*<div className='form-group billing-input'>*/}
                                    {/*    <input className='input' type='number' autoComplete='off' value={this.state.student_number} onChange={this.handleChange} name='student_number'  placeholder='Number:'/>*/}
                                    {/*</div>*/}

                                    <div className='row'>
                                        <div className='col-lg-7'>
                                            <select className={"input  true"}  onChange={this.handleChange} value={this.state.active_student} name='active_student'>
                                                <option value="true">true</option>
                                                <option value="false">false</option>
                                            </select>
                                        </div>
                                        <div className='col-lg-5'>
                                            <p className="content-title">Active</p>
                                        </div>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={wallet_transaction} onClick={this.handleStudent} type="submit">Add student</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                        <div className="col-lg-2 mb-3">
                            <div className='wrap-border billing-two-row-wrap'>
                                <h6 className="content-title">Package Activation</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <select className="input " name="package_du_active" value={this.state.package_du_active} onChange={this.handleChange}>
                                            <option value="">Package</option>
                                            {this.state.dist_pack.map(function (item) {

                                                return <option key={item.value} value={item.value}>({item.value}) - {item.name}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <ul className="unstyled ">
                                                    <li>
                                                        <input className="styled-checkbox input" name='duration_active' value={this.state.duration_active} onChange={this.handleChange} id="duration_active"
                                                               type="checkbox" />
                                                        <label htmlFor="duration_active"> Duration</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-5">
                                                <select className="input" name="duration_select" disabled={this.state.duration_active?false:true} value={this.state.duration_select} onChange={this.handleChange}>
                                                    <option value=""></option>
                                                    {this.state.dist_duration.map(function (item) {

                                                        return <option key={item.value} value={item.value}>{item.value}</option>

                                                    })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <ul className="unstyled ">
                                                    <li>
                                                        <input className="styled-checkbox input" name='auto_renew' value={this.state.auto_renew} onChange={this.handleChange} id="auto_renew"
                                                               type="checkbox" />
                                                        <label htmlFor="auto_renew"> Auto Renew</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={wallet_transaction} onClick={this.handleActivatePackage} type="submit">Activate</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 mb-3">
                            <div className='wrap-border billing-two-row-wrap'>
                                <h6 className="content-title">Add/Replace/Transfer/Number</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <select className="input" value={this.state.action_add} name="action_add" onChange={this.handleChange}>
                                            <option value="">Select Actions</option>
                                            <option value="add">Add number</option>
                                            <option value="replace">Replace number</option>
                                            <option value="transfer">Transfer number</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='text' autoComplete='off' value={this.state.new_number} name='new_number' onChange={this.handleChange}  placeholder='Number:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" disabled={wallet_transaction} onClick={this.handleAddReplaceTransfer} type="submit">Add/Replace...</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                                <hr/>
                                <h6 className="content-title">Scanned identification statament</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" data-toggle="modal" data-target="#issuemaster" disabled={wallet_transaction} onClick={this.handleIssue} type="submit">Issue MasterCard</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-2 mb-3">
                            <div className='wrap-border billing-two-row-wrap'>
                                <h6 className="content-title">Wallet Transaction</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" data-toggle="modal" data-target="#sessionTimeOut" disabled={wallet_transaction} onClick={this.handleWalletTransaction} type="submit">Transaction</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <hr/>
                                <h6 className="content-title">MasterCard Registration</h6>
                                <p className="content-title"> Verified user ID data </p>
                                <hr/>
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-success btn-login-from" data-toggle="modal" data-target="#verifymaster" disabled={wallet_transaction} onClick={this.handleNortifyUser} type="submit">Nortify user</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {this.state.loading ?   <LoadingSpinner />  :
                    <div className="modal" id="sessionTimeOut" ref={modal => this.modal = modal} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div id='wall-true' className={this.state.modalForWallet?"modal-dialog-true":"modal-dialog"} role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {this.state.modalForWallet?
                                                <div>
                                                 <table className="table table-striped table-bordered table-responsive-lg wallet">
                                                    <thead>
                                                        <tr>
                                                            <th>TID</th>
                                                            <th>Account number</th>
                                                            <th>Amount</th>
                                                            <th>Currency</th>
                                                            <th>Amount Local</th>
                                                            <th>Direction</th>
                                                            <th>Value Date</th>
                                                            <th>Transaction Time</th>
                                                            <th>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {   this.state.modalDataWallet.map(function (item,i) {

                                                                return <tr className={i} key={i}>
                                                                    <td>{item['transaction-id']}</td>
                                                                    <td>{item['account-number']}</td>
                                                                    <td>{item['amount']}</td>
                                                                    <td>{item['currency']}</td>
                                                                    <td>{item['amount-local']}</td>
                                                                    <td>{item['direction'] === 'd'?"Isplata":"Uplata"}</td>
                                                                    <td>{item['value-date']}</td>
                                                                    <td>{item['transaction-time']}</td>
                                                                    <td>{item['description']}</td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                </div>
                                                : <p className='notWallet'> {this.state.modalForMessage} </p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary btn-login-from"
                                            data-dismiss="modal" onClick={this.handleCloseModal}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    <div className="modal" id="modal2" ref={modal2 => this.modal2 = modal2} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <p className="notWallet" >Are you sure?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary btn-login-from"
                                            data-dismiss="modal" onClick={this.handleCloseModal}>No
                                    </button>
                                    <button type="button" className="btn btn-outline-success btn-login-from"
                                            data-dismiss="modal" onClick={this.handleActiveAndDeactivation}>Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal" id="verifymaster" ref={modal3 => this.modal3 = modal3} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <p className="notWallet" >Are you sure?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary btn-login-from"
                                            data-dismiss="modal" onClick={this.handleCloseModal}>No
                                    </button>
                                    <button type="button" className="btn btn-outline-success btn-login-from"
                                            data-dismiss="modal" onClick={this.handleVerifyMasterCard}>Yes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal" id="issuemaster" ref={modal4 => this.modal4 = modal4} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <p className="notWallet" >Are you sure?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary btn-login-from"
                                            data-dismiss="modal" onClick={this.handleCloseModal}>No
                                    </button>
                                    <button type="button" className="btn btn-outline-success btn-login-from"
                                            data-dismiss="modal" onClick={this.handleIssueMasterCard}>Yes
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

export default withRouter(CustomerBilling);