import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import './../../stayles/billing.css';
import {
    activate_subscription,
    activationAndDeactivation,
    addCredit, addReplaceTransfer,
    billingCustomerSearch, distDuration, distPack,
    transactionWallet
} from "../../components/UserFunctions";
import  "../Login/index";
import localForages from "localforage";
import $ from 'jquery';
import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import LoadingSpinner from 'react-loader-spinner';
import {Redirect} from "react-router-dom";

class CustomerBilling extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirect:false,
            number: '',
            email: '',
            userId:'',
            billingId:'',
            check:{
                billingId: /^[0-9]+$/,
                userId: /^[0-9]+$/,
                number: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
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
            }],
            roleUser:'',
            UsersLogin:'',
            modalForWallet:false,
            modal2:false,
            modalForMessage:'',
            modalDataWallet:'',
            amount:'',
            account:'',
            password_credit:'',
            infoCredit:'',
            activeAndDeactivation: true,
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
            new_number: ''
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
        this.sessionGet = this.sessionGet.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleAddReplaceTransfer = this.handleAddReplaceTransfer.bind(this);
    };


    componentDidMount() {

        const role = localForages.getItem('role', function (err, value) {
            return value;
        });

        const username = localForages.getItem('username', function (err, value) {
            return value;
        });

        username.then(value => {
            this.setState({
                UsersLogin: value
            });
        });

        role.then(value => {
            this.setState({
                roleUser: value
            });
        });

        $(this.modal).hide();
        $(this.modal).on('hidden.bs.modal', this.handleWalletTransaction);

        $(this.modal2).hide();
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

        const userId = localForages.getItem('user_id_for_phone_numbers', function (item,value) {
           if(value !== ''){
               return value;
           }
        });

        const role = localForages.getItem('role', function (item,value) {
            if(value !== ''){
                return value;
            }
        });

        const billingId = localForages.getItem('billing_id_api', function (item,value) {
            if(value !== ''){
                return value;
            }
        });


        userId.then(id => {
            role.then(rolee => {
                billingId.then(bilId => {
                    activate_subscription(id, this.state.subscription, this.state.plan, rolee, bilId).then(result => {
                       if(result.status === true){
                           store.addNotification({
                               title: 'Activation Subscription',
                               message: result.data,
                               type: 'success',                         // 'default', 'success', 'info', 'warning'
                               container: 'bottom-right',                // where to position the notifications
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
                               container: 'bottom-right',                // where to position the notifications
                               animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                               animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                               dismiss: {
                                   duration: 3000
                               }
                           })
                       }
                    });
                });
            });
        });

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

        this.setState({
            number: (sessionStorage.getItem('number'))?sessionStorage.getItem('number'):'',
            email: (sessionStorage.getItem('email'))?sessionStorage.getItem('email'):'',
            userId: (sessionStorage.getItem('userId'))?sessionStorage.getItem('userId'):'',
            billingId: (sessionStorage.getItem('billingId'))?sessionStorage.getItem('billingId'):'',
        });


        this.setState({
            searchData:[{
                active: (sessionStorage.getItem('billing_active'))?sessionStorage.getItem('billing_active'):'',
                balances: (sessionStorage.getItem('billing_balances'))?sessionStorage.getItem('billing_balances'):'',
                billing_id: (sessionStorage.getItem('billing_id'))?sessionStorage.getItem('billing_id'):'',
                brand: (sessionStorage.getItem('billing_brand'))?sessionStorage.getItem('billing_brand'):'',
                created: (sessionStorage.getItem('billing_created'))?sessionStorage.getItem('billing_created'):'',
                email: (sessionStorage.getItem('billing_email'))?sessionStorage.getItem('billing_email'):'',
                force_app: (sessionStorage.getItem('billing_force_app'))?sessionStorage.getItem('billing_force_app'):'',
                name: (sessionStorage.getItem('billing_name'))?sessionStorage.getItem('billing_name'):'',
                reservations: (sessionStorage.getItem('billing_reservations'))?sessionStorage.getItem('billing_reservations'):'',
                user_id: (sessionStorage.getItem('billing_user_id'))?sessionStorage.getItem('billing_user_id'):'',
                user_type: (sessionStorage.getItem('billing_user_type'))?sessionStorage.getItem('billing_user_type'):'',
                wallet_id: (sessionStorage.getItem('billing_wallet_id'))?sessionStorage.getItem('billing_wallet_id'):'',
            }],
        });

        const sim_report = localForages.getItem('id_from_sim_report', function (err, value) {
            return value;
        });

        sim_report.then(value => {

            if( value !== ''  &&  value !== null){

                const data = [];

                this.setState({
                    userId: value
                });

                if( value !== ''  ){
                    data.push('{"property":"userId","value":"'+value+'"}')
                }

                const param = "[" + data.toString() + "]";

                if(data.toString() !== '') {

                    billingCustomerSearch(param).then(filter => {

                        if(filter.data[0] !== undefined){

                            sessionStorage.setItem('billing_active',filter.data[0].active);
                            sessionStorage.setItem('billing_balances',filter.data[0].balances);
                            sessionStorage.setItem('billing_id',filter.data[0].billing_id);
                            sessionStorage.setItem('billing_brand',filter.data[0].brand);
                            sessionStorage.setItem('billing_created',filter.data[0].created);
                            sessionStorage.setItem('billing_email',filter.data[0].email);
                            sessionStorage.setItem('billing_force_app',filter.data[0].force_app);
                            sessionStorage.setItem('billing_name',filter.data[0].name);
                            sessionStorage.setItem('billing_reservations',filter.data[0].reservations);
                            sessionStorage.setItem('billing_user_id',filter.data[0].user_id);
                            sessionStorage.setItem('billing_user_type',filter.data[0].user_type);
                            sessionStorage.setItem('billing_wallet_id',filter.data[0].wallet_id);

                            this.setState({
                                searchData:[{
                                    active: (filter.data[0].active)?sessionStorage.getItem('billing_active'):'',
                                    balances: (filter.data[0].balances)?sessionStorage.getItem('billing_balances'):'',
                                    billing_id: (filter.data[0].billing_id)?sessionStorage.getItem('billing_id'):'',
                                    brand: (filter.data[0].brand)?sessionStorage.getItem('billing_brand'):'',
                                    created: (filter.data[0].created)?sessionStorage.getItem('billing_created'):'',
                                    email: (filter.data[0].email)?sessionStorage.getItem('billing_email'):'',
                                    force_app: (filter.data[0].force_app)?sessionStorage.getItem('billing_force_app'):'',
                                    name: (filter.data[0].name)?sessionStorage.getItem('billing_name'):'',
                                    reservations: (filter.data[0].reservations)?sessionStorage.getItem('billing_reservations'):'',
                                    user_id: (filter.data[0].user_id)?sessionStorage.getItem('billing_user_id'):'',
                                    user_type: (filter.data[0].user_type)?sessionStorage.getItem('billing_user_type'):'',
                                    wallet_id: (filter.data[0].wallet_id)?sessionStorage.getItem('billing_wallet_id'):'',
                                }],
                            });


                            localForages.setItem('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                            localForages.setItem('billing_id_api', this.state.searchData[0].billing_id);

                        } else {
                            store.addNotification({
                                title: 'Customer Search',
                                message: 'Data from input field does not exits!',
                                type: 'info',                         // 'default', 'success', 'info', 'warning'
                                container: 'bottom-right',                // where to position the notifications
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
        });

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


    }

    handleChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value
        });

        if( e.target.name === "activeAndDeactivation" ){

            this.setState({
                activeAndDeactivation : !this.state.activeAndDeactivation,
            });

        }


        this.setState({
            duration_active: !this.state.duration_active,
            active_sim_pack: !this.state.active_sim_pack
        });
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
                container: 'bottom-right',                // where to position the notifications
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
            }],
            number: '',
            email: '',
            userId:'',
            billingId:'',
            loading:false,
        });

        localForages.setItem('user_id_for_phone_numbers', '');
        localForages.setItem('billing_id_api', '');
        localForages.setItem('id_from_sim_report','');
    };

    handleWalletTransaction = (e) => {
        e.preventDefault();

        this.setState({ loading: true });
        transactionWallet(this.state.searchData[0].user_id, this.state.roleUser).then(wallet => {

           if(wallet.status === true){
               this.setState({ loading: false });

               $(this.modal).show();

               this.setState({
                   modalForWallet : true,
                   modalDataWallet : wallet.data,
               });
           }else if(wallet.status === false && wallet.message === "User hasn't got wallet!"){
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
                   modalForMessage : 'You must be logged in as admin',
               });
           }

        });

    };

    handleCloseModal = (e) => {
        e.preventDefault();
        $(this.modal).hide();
        $(this.modal2).hide();
    };

    handleAddRemoveCredit = (e) => {
        e.preventDefault();

        if(this.state.amount !== '' && this.state.account !== '' && this.state.password_credit !== ''&& this.state.infoCredit !== '' &&
            this.state.searchData[0].billing_id !== '' && this.state.UsersLogin !== '' ){

            addCredit(this.state.searchData[0].billing_id, this.state.amount, this.state.account, this.state.password_credit, this.state.infoCredit, this.state.UsersLogin).then(data => {

               if(data.success == true){

                   store.addNotification({
                       title: 'Add / Remove Credit',
                       message: 'Successfully Add / Remove Credit',
                       type: 'success',                         // 'default', 'success', 'info', 'warning'
                       container: 'bottom-right',                // where to position the notifications
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
                       container: 'bottom-right',                // where to position the notifications
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
                container: 'bottom-right',                // where to position the notifications
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

        if(this.state.password_active !== '' && this.state.searchData[0].user_id !== ''){

            activationAndDeactivation(this.state.activeAndDeactivation, this.state.searchData[0].user_id, this.state.password_active).then(result => {

                if(result.message !== 'Password is not a valid!'){

                    if(result.success === true){

                        store.addNotification({
                            title: 'Deactivation / Activation',
                            message: 'true',
                            type: 'warning',                         // 'default', 'success', 'info', 'warning'
                            container: 'bottom-right',                // where to position the notifications
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
                            container: 'bottom-right',                // where to position the notifications
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
                        container: 'bottom-right',                // where to position the notifications
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
                container: 'bottom-right',                // where to position the notifications
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

        const data = [];

        sessionStorage.setItem('number',this.state.number);
        sessionStorage.setItem('email',this.state.email);
        sessionStorage.setItem('userId',this.state.userId);
        sessionStorage.setItem('billingId',this.state.billingId);


        this.setState({
            number: sessionStorage.getItem('number'),
            email: sessionStorage.getItem('email'),
            userId: sessionStorage.getItem('userId'),
            billingId: sessionStorage.getItem('billingId'),
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

        const param = "[" + data.toString() + "]";

        if(data.toString() !== '') {

            billingCustomerSearch(param).then(filter => {

                if(filter.data[0] !== undefined){

                    sessionStorage.setItem('billing_active',filter.data[0].active);
                    sessionStorage.setItem('billing_balances',filter.data[0].balances);
                    sessionStorage.setItem('billing_id',filter.data[0].billing_id);
                    sessionStorage.setItem('billing_brand',filter.data[0].brand);
                    sessionStorage.setItem('billing_created',filter.data[0].created);
                    sessionStorage.setItem('billing_email',filter.data[0].email);
                    sessionStorage.setItem('billing_force_app',filter.data[0].force_app);
                    sessionStorage.setItem('billing_name',filter.data[0].name);
                    sessionStorage.setItem('billing_reservations',filter.data[0].reservations);
                    sessionStorage.setItem('billing_user_id',filter.data[0].user_id);
                    sessionStorage.setItem('billing_user_type',filter.data[0].user_type);
                    sessionStorage.setItem('billing_wallet_id',filter.data[0].wallet_id);

                    this.setState({
                        searchData:[{
                            active: (filter.data[0].active)?sessionStorage.getItem('billing_active'):'',
                            balances: (filter.data[0].balances)?sessionStorage.getItem('billing_balances'):'',
                            billing_id: (filter.data[0].billing_id)?sessionStorage.getItem('billing_id'):'',
                            brand: (filter.data[0].brand)?sessionStorage.getItem('billing_brand'):'',
                            created: (filter.data[0].created)?sessionStorage.getItem('billing_created'):'',
                            email: (filter.data[0].email)?sessionStorage.getItem('billing_email'):'',
                            force_app: (filter.data[0].force_app)?sessionStorage.getItem('billing_force_app'):'',
                            name: (filter.data[0].name)?sessionStorage.getItem('billing_name'):'',
                            reservations: (filter.data[0].reservations)?sessionStorage.getItem('billing_reservations'):'',
                            user_id: (filter.data[0].user_id)?sessionStorage.getItem('billing_user_id'):'',
                            user_type: (filter.data[0].user_type)?sessionStorage.getItem('billing_user_type'):'',
                            wallet_id: (filter.data[0].wallet_id)?sessionStorage.getItem('billing_wallet_id'):'',
                        }],
                    });

                    localForages.setItem('user_id_for_phone_numbers', this.state.searchData[0].user_id);
                    localForages.setItem('billing_id_api', this.state.searchData[0].billing_id);

                } else {
                    store.addNotification({
                        title: 'Customer Search',
                        message: 'Data from input field does not exits!',
                        type: 'info',                         // 'default', 'success', 'info', 'warning'
                        container: 'bottom-right',                // where to position the notifications
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

        addReplaceTransfer(sessionStorage.getItem('billing_user_id'), this.state.new_number, this.state.action_add, sessionStorage.getItem('role')).then(result => {
           console.log(result);
           if(result.success === true) {
               store.addNotification({
                   title: 'Add/Replace/Transfer Number',
                   message: result.message,
                   type: 'success',                         // 'default', 'success', 'info', 'warning'
                   container: 'bottom-right',                // where to position the notifications
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
                   container: 'bottom-right',                // where to position the notifications
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
        // function checkFirstVisit() {
        //
        //     // localForages.setItem('user_id_for_phone_numbers', '');
        //     // localForages.setItem('billing_id_api', '');
        //     localForages.setItem('id_from_sim_report', '');
        // }

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }


        const wallet_transaction = (this.state.searchData[0].user_id)? false : true ;

        return (

            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }  >

                <section id="content-wrapper" ref={el => (this.container = el)}>

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Customer Billing</li>
                        </ol>
                    </nav>

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
                                    <div className="form-group billing-input">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                    <button className="btn btn-block btn-outline-light" disabled={!this.validate()} onClick={this.handleSearch} type="submit">Search</button>
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
                                        <textarea className='input' autoComplete='off' rows="4" cols="50" onChange={this.handleChangeData} readOnly={true} name='balances' value={this.state.searchData[0].balances} placeholder='Balances:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <textarea className='input' autoComplete='off' onChange={this.handleChangeData} readOnly={true} name='reservations' value={this.state.searchData[0].reservations} placeholder='Reservations:'/>
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
                                        <select className="input input-update form-control" onChange={this.handleChange} value={this.state.account}  name="account">
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
                                                    <button className="btn btn-block btn-outline-light" disabled={wallet_transaction} onClick={this.handleAddRemoveCredit} type="submit">Proceed</button>
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
                                    <div className="form-group billing-input">
                                        <ul className="unstyled centered">
                                            <li>
                                                <input className="styled-checkbox input" checked={this.state.activeAndDeactivation} disabled onChange={this.handleChange} name='activeAndDeactivation' id="styled-checkbox-1"
                                                       type="checkbox" />
                                                    <label htmlFor="styled-checkbox-1">Active</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <input className='input' type='password' autoComplete='off' value={this.state.password_active} onChange={this.handleChange} name='password_active'  placeholder='Password:'/>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-light" data-toggle="modal" data-target="#modal2" disabled={wallet_transaction} onClick={this.handleShowModalActive} type="submit">Proceed</button>
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
                                <form method="post">
                                    <div className='form-group billing-input'>
                                        <select className="input input-update form-control" name="subscription" value={this.state.subscription} onChange={this.handleChange}>
                                            <option value="">Subscription</option>
                                            <option value="200">postpaid</option>
                                            <option value="300">prepaid</option>
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <select className="input input-update form-control" name="plan" value={this.state.plan} onChange={this.handleChange}>
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
                                                    <button className="btn btn-block btn-outline-light" disabled={wallet_transaction} onClick={this.handleSubscription} type="submit">Activate</button>
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
                                        <select className="input input-update form-control" name="package_du_active" value={this.state.package_du_active} onChange={this.handleChange}>
                                            <option value=""></option>
                                            {this.state.dist_pack.map(function (item) {

                                                return <option key={item.value} value={item.value}>{item.value}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="row">
                                            <div className="col-lg-7">
                                                <ul className="unstyled centered">
                                                    <li>
                                                        <input className="styled-checkbox input" name='duration_active' value={this.state.duration_active} onChange={this.handleChange} id="styled-checkbox-2"
                                                               type="checkbox" />
                                                        <label htmlFor="styled-checkbox-2"> Duration</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-5">
                                                <select className="input input-update form-control" name="duration_select" disabled={this.state.duration_active?false:true} value={this.state.duration_select} onChange={this.handleChange}>
                                                    <option value=""></option>
                                                    {this.state.dist_duration.map(function (item) {

                                                        return <option key={item.value} value={item.value}>{item.value}</option>

                                                    })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <ul className="unstyled centered">
                                            <li>
                                                <input className="styled-checkbox input" name='active_sim_pack' value={this.state.active_sim_pack} disabled={this.state.duration_active?false:true} onChange={this.handleChange} id="activeSim"
                                                       type="checkbox" />
                                                <label htmlFor="activeSim"> Active Sim</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='form-group billing-input'>
                                        <div className="form-group billing-input">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <button className="btn btn-block btn-outline-light" disabled={wallet_transaction} type="submit">Activate</button>
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
                                        <select className="input input-update form-control" value={this.state.action_add} name="action_add" onChange={this.handleChange}>
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
                                                    <button className="btn btn-block btn-outline-light" disabled={wallet_transaction} onClick={this.handleAddReplaceTransfer} type="submit">Add/Replace...</button>
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
                                                    <button className="btn btn-block btn-outline-light" data-toggle="modal" data-target="#sessionTimeOut" disabled={wallet_transaction} onClick={this.handleWalletTransaction} type="submit">Transaction</button>
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
                                    <button type="button" className="btn btn-secondary"
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
                                            <p>Are you sure?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" onClick={this.handleCloseModal}>No
                                    </button>
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" onClick={this.handleActiveAndDeactivation}>Yes
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