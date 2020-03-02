import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PackageFirstTable} from "../../components/Table/package-first-table";
import {PackageOtherTable} from "../../components/Table/package-other-table";
import {
    addNewPackages,
    copyPackage,
    destroyPackages,
    distinctfield_display,
    editPackages, promo_view
} from "../../components/UserFunctions";
import $ from "jquery";
import PubSub from "pubsub-js";
import {store} from "react-notifications-component";
import {Redirect} from "react-router-dom";

class PackageDefault extends Component {
    constructor(props){
        super(props);


        this.state = {
            redirect: false,
            promo_id:'',
            package_group_id:'',
            distinctfield_display:[],
            search: false,
            modal:false,
            modalEdit:false,
            modalDelete:false,
            modalParams:false,
            modalRules:false,
            modalCopy:false,
            editId: '',
            editPrice: '',
            editDuration: '',
            editAutoRenew: false,
            editPackGroupId:'',
            editVisible:false,
            editIsBundle:false,
            createPrice: '',
            createDuration: '',
            createAutoRenew: false,
            createPackGroupId:'',
            createVisible:false,
            createIsBundle:false,
            deleteId: '',
            checkCopy: true,
            checkTrue: true,
            addCopy:'',
            params: 'object',
            collapse: false,
            editJson: true,
            objProperties: true,
            onLoadParams: '',
            onLoadNotificationRules:''
        };

        this.handleChanges = this.handleChanges.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleAddNewPackage = this.handleAddNewPackage.bind(this);
        this.handleClosePackage = this.handleClosePackage.bind(this);
        this.handleUpdatePackage = this.handleUpdatePackage.bind(this);
        this.handleUpdateParamsPack = this.handleUpdateParamsPack.bind(this);
        this.handleUpdateRulesPack = this.handleUpdateRulesPack.bind(this);
        this.handleDeletePack = this.handleDeletePack.bind(this);
        this.handleAddPackageModal = this.handleAddPackageModal.bind(this);
        this.handleEditPackageModal = this.handleEditPackageModal.bind(this);
        this.handleDestroyPackage = this.handleDestroyPackage.bind(this);
        this.handlePackageCheckboxCopy = this.handlePackageCheckboxCopy.bind(this);
        this.handlePackageCheckboxCopyLang = this.handlePackageCheckboxCopyLang.bind(this);
        this.handleCopyPackageButton = this.handleCopyPackageButton.bind(this);
        this.handleCopyWithExistsPackage = this.handleCopyWithExistsPackage.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleOpenTwo = this.handleOpenTwo.bind(this);
        this.handleEditJson = this.handleEditJson.bind(this);
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

    handleObjProperties = (e) => {
        e.preventDefault();

        this.setState({
            objProperties: !this.state.objProperties,
            editJson: true

        });
    };

    handleEditJson = (e) => {
        e.preventDefault();

        this.setState({
            editJson: !this.state.editJson,
            objProperties: true
        });
    };

    handleOpenTwo() {
        this.setState({
            checkCopy: true
        });
    }

    handleOpen (){
        this.setState({
            search: false
        });
    }

    handleCollapse = (e) => {
        e.preventDefault();

        this.setState({
            collapse: !this.state.collapse
        });

    };

    handleAddPackageModal = (e) => {
        e.preventDefault();

        let record = "{\"price\":\""+ this.state.createPrice +"\",\"promo_group_id\":\""+ this.state.createPackGroupId +"\",\"visible\":\""+ this.state.createVisible +"\",\"duration\":\""+ this.state.createDuration +"\",\"is_bundle\":\""+ this.state.createIsBundle +"\",\"auto_renew\":\""+ this.state.createAutoRenew +"\"}";


        addNewPackages(record).then(result => {

            if(result.status === true){
                store.addNotification({
                    title: 'Add New Packages',
                    message: 'Adding a package ',
                    type: 'success',                         // 'default', 'success', 'info', 'warning'
                    container: 'bottom-right',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000
                    }
                });
            }else {
                store.addNotification({
                    title: 'Add New Packages',
                    message: 'Parameter is not a valid (All fields are important)',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
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


    handlePackageCheckboxCopy(msg,dataSet) {

        this.setState({
           addCopy: dataSet['id'][0],
           checkCopy: dataSet['check'][0]
        });
    };

    handlePackageCheckboxCopyLang(msg,dataSet) {

        this.setState({
            checkTrue: dataSet['check_lang'][0],
            checkCopy: true
        });

        if(dataSet['check_lang'][0] === false){
            this.setState({
                checkCopy: true
            });
        } else {
            this.setState({
                checkCopy: false
            });
        }

    };

    handleCopyPackageButton = (e) => {
        e.preventDefault();
        $(this.modalCopy).show();

    };

    handleCopyWithExistsPackage = (e) => {
        e.preventDefault();

        copyPackage(this.state.addCopy).then(result => {

            if(result.status === true){
                store.addNotification({
                    title: 'Copy Packages',
                    message: 'You have successfully made the changes ',
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
                    title: 'Copy Packages',
                    message: 'Parameter is not a valid (missing id)',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
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

    handleUpdatePackage(msg,dataSet) {
        $(this.modalEdit).show();

        this.setState({
            editId: dataSet['id'][0],
            editPrice: dataSet['price'][0],
            editDuration: dataSet['duration'][0],
            editAutoRenew: dataSet['auto_renew'][0] === '1'?true:false,
            editPackGroupId: dataSet['pack_group_id'][0],
            editVisible: dataSet['visible'][0],
            editIsBundle:  dataSet['is_bundle'][0]
        });
    };

    handleEditPackageModal = (e) => {
        e.preventDefault();

        let promotionId = this.state.editId;
        let record = "{\"price\":\""+ this.state.editPrice +"\",\"promo_group_id\":\""+ this.state.editPackGroupId +"\",\"visible\":\""+ this.state.editVisible +"\",\"duration\":\""+ this.state.editDuration +"\",\"is_bundle\":\""+ this.state.editIsBundle +"\",\"auto_renew\":\""+ this.state.editAutoRenew +"\"}";

        editPackages(promotionId, record).then(result => {

            if( result.status === true){
                store.addNotification({
                    title: 'Edit Packages',
                    message: 'You have successfully made the changes ',
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
                    title: 'Edit Packages',
                    message: 'Please, check all params',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
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

    handleDestroyPackage = (e) => {
        e.preventDefault();

        destroyPackages(this.state.deleteId).then(result => {
            if(result.status === true){
                store.addNotification({
                    title: 'Remove Packages',
                    message: 'You have successfully remove package ',
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
                    title: 'Remove Packages',
                    message: 'No data deleted!',
                    type: 'warning',                         // 'default', 'success', 'info', 'warning'
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


    handleUpdateParamsPack (msg,dataSet) {
        $(this.modalParams).show();

        promo_view(dataSet['id'][0]).then(result => {

            this.setState({
                onLoadParams: result.data[0].params,
                onLoadNotificationRules: result.data[0].notification_rules
            });
        });

    }

    handleUpdateRulesPack (msg,dataSet) {
        $(this.modalRules).show();

    }

    handleDeletePack (msg,dataSet) {
        $(this.modalDelete).show();

        this.setState({
            deleteId: dataSet['id'][0]
        });

    }


    handleChanges = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name ] : e.target.value
        });


        if(e.target.name === 'params') {

            const load_param = this.state.onLoadParams;

            switch (e.target.value) {
                case 'string':
                    this.setState({
                        onLoadParamsChange: JSON.stringify( load_param )
                    });
                    break;
                case 'integer':
                    break;
                case 'number':
                    break;
                case 'boolean':
                    break;
                case 'object':
                    this.setState({
                        onLoadParamsChange: JSON.parse( this.state.onLoadParams )
                    });
                    break;
                case 'array':

                    break;
                case 'null':

                    break;
            }
        }

        switch (e.target.name) {
            case 'createVisible':
                this.setState({
                    createVisible : !this.state.createVisible,
                });
                break;
            case 'createIsBundle':
                this.setState({
                    createIsBundle : !this.state.createIsBundle,
                });
                break;
            case 'createAutoRenew':
                this.setState({
                    createAutoRenew : !this.state.createAutoRenew,
                });
                break;
            case 'editAutoRenew':
                this.setState({
                    editAutoRenew : !this.state.editAutoRenew,
                });
                break;
            case 'editIsBundle':
                this.setState({
                    editIsBundle : !this.state.editIsBundle,
                });
                break;
            case 'editVisible':
                this.setState({
                    editVisible : !this.state.editVisible,
                });
                break;
        }
    };

    handleAddNewPackage = (e) => {
        e.preventDefault();
        $(this.modal).show();

    };

    handleClosePackage = (e) => {
        e.preventDefault();
        $(this.modal).hide();
        $(this.modalEdit).hide();
        $(this.modalParams).hide();
        $(this.modalRules).hide();
        $(this.modalDelete).hide();
        $(this.modalCopy).hide();

    };

    handleReset = (e) => {
        e.preventDefault();

    };

    handleClick = (e) => {
        e.preventDefault();


        this.setState({
           search: true
        });

    };

    componentDidMount() {


        PubSub.subscribe('package_checkbox_copy_lang', this.handlePackageCheckboxCopyLang);

        $(this.modalCopy).hide();
        $(this.modalCopy).on('hidden.bs.modal', this.handleCopyPackageButton);

        PubSub.subscribe('package_checkbox_copy', this.handlePackageCheckboxCopy);

        $(this.modalEdit).hide();
        $(this.modalEdit).on('hidden.bs.modal', this.handleUpdatePackage);

        PubSub.subscribe('package_update', this.handleUpdatePackage);

        $(this.modalDelete).hide();
        $(this.modalDelete).on('hidden.bs.modal', this.handleDeletePack);

        PubSub.subscribe('package_delete', this.handleDeletePack);


        $(this.modalRules).hide();
        $(this.modalRules).on('hidden.bs.modal', this.handleUpdateRulesPack);

        PubSub.subscribe('package_rules', this.handleUpdateRulesPack);


        $(this.modalParams).hide();
        $(this.modalParams).on('hidden.bs.modal', this.handleUpdatePackage);

        PubSub.subscribe('params_pack', this.handleUpdateParamsPack);

        distinctfield_display().then(result => {
            this.setState({
                distinctfield_display: result.data
            });
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
                            <li className="breadcrumb-item active" aria-current="page">Package</li>
                        </ol>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <div className='wrap-border mb-5'>
                                <h6>Package Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='text' name='promo_id' value={this.state.promo_id} onChange={this.handleChanges} autoComplete='off' placeholder='Promo ID:'/>
                                    </div>
                                    <div className='form-group'>
                                        <select className="input" name="package_group_id" value={this.state.package_group_id} onChange={this.handleChanges}>
                                            <option value="">ALL</option>
                                            {this.state.distinctfield_display.map(function (item) {

                                                return <option key={item.value} value={item.value}>{item.display}</option>

                                            })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-light" onClick={this.handleClick} type="submit">Search</button>
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
                                            <button className="btn btn-block btn-outline-dark" onClick={this.handleAddNewPackage} type="submit">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border'>
                                <button className="btn btn-block btn-outline-dark" id='copy_package_button' disabled={this.state.checkCopy} onClick={this.handleCopyPackageButton} type="submit">Copy Package</button>

                                <PackageFirstTable search={this.state.search} onOpen={this.handleOpen} data={
                                    {
                                        promo_id: this.state.promo_id,
                                        package_group_id: this.state.package_group_id
                                    }
                                }>
                                </PackageFirstTable>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-6">
                            <button type='submit' disabled={this.state.checkCopy} className="btn btn-block btn-outline-light">Add Package Lang</button>
                        </div>
                        <div className="col-lg-6">
                            <button type='submit' disabled={this.state.checkTrue} className="btn btn-block btn-outline-light">Copy Lang Package</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className='wrap-border'>
                                <PackageOtherTable search={this.state.checkCopy} onOpen={this.handleOpenTwo} data={{
                                    promo_id: this.state.addCopy
                                }}>
                                </PackageOtherTable>
                            </div>
                        </div>
                    </div>



                    <div className="modal" id="PerCostUpdate" ref={modal => this.modal = modal} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className='form-group'>
                                                <input type='text' className="input" value={this.state.createPrice} onChange={this.handleChanges} name='createPrice' id='createPrice' placeholder='Price'  />
                                            </div>
                                            <div className='form-group'>
                                                <input type='text' className="input" value={this.state.createDuration} onChange={this.handleChanges} name='createDuration' id='createDuration' placeholder='Duration'  />
                                            </div>
                                            <div className='form-group text-left'>
                                                <input type="checkbox" id="createAutoRenew" value={this.state.createAutoRenew} onChange={this.handleChanges} name="createAutoRenew" />
                                                <label htmlFor="createAutoRenew"> Auto Renew</label>
                                            </div>
                                            <div className='form-group'>
                                                <select className="input" name="createPackGroupId" id="createPackGroupId" value={this.state.createPackGroupId} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    {this.state.distinctfield_display.map(function (item) {

                                                        return <option key={item.value} value={item.value}>{item.value}</option>

                                                    })
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group text-left'>
                                                <input className="input"  type="checkbox" id="createVisible" name="createVisible" value={this.state.createVisible} onChange={this.handleChanges}/>
                                                <label htmlFor="createVisible"> Visible</label>
                                            </div>
                                            <div className='form-group text-left'>
                                                <input className="input" type="checkbox" id="createIsBundle" name="createIsBundle" value={this.state.createIsBundle} onChange={this.handleChanges}/>
                                                <label htmlFor="createIsBundle"> Is bundle</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-light"
                                            data-dismiss="modal" onClick={this.handleAddPackageModal} >Add
                                    </button>
                                    <button type="button" className="btn btn-outline-light" onClick={this.handleClosePackage}
                                            data-dismiss="modal" >Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal" id="PerCostUpdate" ref={modalEdit => this.modalEdit = modalEdit} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className='form-group'>
                                                <input type='text' className="input" name='editPrice' value={this.state.editPrice} onChange={this.handleChanges} id='editPrice' placeholder='Price'  />
                                            </div>
                                            <div className='form-group'>
                                                <input type='text' className="input" name='editDuration' value={this.state.editDuration} onChange={this.handleChanges} id='editDuration' placeholder='Duration'  />
                                            </div>
                                            <div className='form-group text-left'>
                                                <input type="checkbox" id="editAutoRenew" name='editAutoRenew' value={this.state.editAutoRenew} onChange={this.handleChanges}/>
                                                <label htmlFor="editAutoRenew"> Auto Renew</label>
                                            </div>
                                            <div className='form-group'>
                                                <select className="input" name="editPackGroupId" value={this.state.editPackGroupId} onChange={this.handleChanges}>
                                                    <option value="">ALL</option>
                                                    {this.state.distinctfield_display.map(function (item) {

                                                        return <option key={item.value} value={item.value}>{item.value}</option>

                                                    })
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group text-left'>
                                                <input className="input"  type="checkbox" id="editVisible" name="editVisible" value={this.state.editVisible} onChange={this.handleChanges} />
                                                <label htmlFor="editVisible"> Visible</label>
                                            </div>
                                            <div className='form-group text-left'>
                                                <input className="input" type="checkbox" id="editIsBundle" name="editIsBundle" value={this.state.editIsBundle} onChange={this.handleChanges}/>
                                                <label htmlFor="editIsBundle"> Is bundle</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" onClick={this.handleEditPackageModal} >Update
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClosePackage}
                                            data-dismiss="modal" >Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal" id="PerCostUpdate" ref={modalParams => this.modalParams = modalParams} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header text-center">
                                    <h5 className='color-white'>Params</h5>
                                </div>

                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className='form-group'>
                                                <select className="input" name="params" value={this.state.params} onChange={this.handleChanges}>
                                                    <option value="string">string</option>
                                                    <option value="number">number</option>
                                                    <option value="integer">integer</option>
                                                    <option value="boolean">boolean</option>
                                                    <option value="object">object</option>
                                                    <option value="array">array</option>
                                                    <option value="null">null</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {this.state.params === 'object'?
                                        <div className="row mb-3">
                                            <div className="col-lg-4">
                                                <button type="button" className="btn btn-secondary btn-block" onClick={this.handleCollapse} >Collapse </button>
                                            </div>
                                            <div className="col-lg-4">
                                                <button type="button" className="btn btn-secondary btn-block" onClick={this.handleEditJson} >Edit JSON </button>
                                            </div>
                                            <div className="col-lg-4">
                                                <button type="button" className="btn btn-secondary btn-block" onClick={this.handleObjProperties} >Obj Properties </button>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'object'?
                                        <div className="row mb-3">
                                            <div className="col-lg-12">
                                                <div className={this.state.objProperties?'wrap-border-white hidden-ul': 'wrap-border-white mb-3'}>
                                                    <div className='row'>
                                                        <div className='col-lg-10'>
                                                            <input type='text' className="input" name='editDuration' id='editDuration' placeholder='Property name...'  />
                                                        </div>
                                                        <div className='col-lg-2'>
                                                            <button type="button" className="btn btn-secondary btn-block" >add </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={this.state.editJson?'wrap-border-white hidden-ul': 'wrap-border-white mb-3'}>
                                                    <div className='row'>
                                                        <div className='col-lg-10'>
                                                            <textarea className='input' autoComplete='off' value={this.state.onLoadParams} onChange={this.handleChanges}  name='onLoadParams' rows="6" />
                                                        </div>
                                                        <div className='col-lg-2'>
                                                            <button type="button" className="btn btn-secondary btn-block" >add </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={this.state.collapse?'wrap-border-white hidden-ul': 'wrap-border-white'}>

                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'object'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'null'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'string'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <input type='text' className="input" name='editDuration' id='editDuration' placeholder='{}'  />
                                                </div>
                                            </div>
                                        </div>
                                        : '' }
                                    {this.state.params === 'string'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'number'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <input type='number' className="input" name='editDuration' id='editDuration' placeholder='0'  />
                                                </div>
                                            </div>
                                        </div>
                                        : '' }
                                    {this.state.params === 'number'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'integer'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <input type='number' className="input" name='editDuration' id='editDuration' placeholder='0'  />
                                                </div>
                                            </div>
                                        </div>
                                        : '' }
                                    {this.state.params === 'integer'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'boolean'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <select className="input" onChange={this.handleChanges}>
                                                        <option value="undefined">undefined</option>
                                                        <option value="true">true</option>
                                                        <option value="false">false</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        : '' }
                                    {this.state.params === 'boolean'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'array'?
                                        <div className="row mb-3">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white mb-2">
                                                    <div className='row'>
                                                        <div className="col-lg-4">
                                                            <button type="button" className="btn btn-secondary btn-block" onClick={this.handleCollapse} >Collapse </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="wrap-border-white">
                                                    <div className='row'>
                                                        <div className="col-lg-4">
                                                            <button type="button" className="btn btn-secondary btn-block" >Add item </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    : '' }
                                    {this.state.params === 'array'?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="wrap-border-white">
                                                    <textarea className='input' autoComplete='off' value={this.state.onLoadParams} readOnly={true} onChange={this.handleChanges} rows="7" name='onLoadParams'/>
                                                </div>
                                            </div>
                                        </div>
                                        : '' }
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" >Update
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClosePackage}
                                            data-dismiss="modal" >Close
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>



                    <div className="modal" id="PerCostUpdate" ref={modalRules => this.modalRules = modalRules} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {this.state.onLoadNotificationRules}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" >Update
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClosePackage}
                                            data-dismiss="modal" >Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal" id="PerCostUpdate" ref={modalDelete => this.modalDelete = modalDelete} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h6 className='color-white'> Are you sure you want to delete the package id : [ {this.state.deleteId} ]</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" onClick={this.handleDestroyPackage} >YES
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClosePackage}
                                            data-dismiss="modal" >NO
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="modal" id="PerCostUpdate" ref={modalCopy => this.modalCopy = modalCopy} tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h6 className='color-white'> Are you sure you want to copy the package id : [ {this.state.addCopy} ]</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-dismiss="modal" onClick={this.handleCopyWithExistsPackage} >YES
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClosePackage}
                                            data-dismiss="modal" >NO
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

export default withRouter(PackageDefault);