import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PackageFirstTable extends Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onOpen();
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info: false,
                bProcessing: true,
                bServerSide: true,
                sProcessing: true,
                bLengthChange: false,
                bPaginate:true,
                pagingType: "simple",

                sScrollY: "300px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=promotion',
                    type: 'POST',
                    data: {
                        promo_id: this.props.data.promo_id,
                        package_group_id: this.props.data.package_group_id
                    }
                },
                columns: [
                    { title: "Actions buttons",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-success" id="edit_packages" ><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-danger" id="package_delete" ><i class="fa fa-times-circle-o"></i></button>`
                    },
                    { title: "Id",
                        className: 'id_pack'
                    },
                    { title: "Price",
                        className: 'id_price'
                    },
                    { title: "Params",
                        data: null,
                        defaultContent:`<p><button type="button" class="btn btn-outline-secondary" id="params_pack" >Params</button></p>`
                    },
                    { title: "Notification rules",
                        data: null,
                        defaultContent:`<p><button type="button" class="btn btn-outline-secondary" id="package_rules" >Rules</button></p>`
                    },
                    { title: "Auto renew",
                        className: 'auto_renew'
                    },
                    { title: "Duration",
                        className: 'id_duration'
                    },
                    { title: "Promo Group ID",
                        className: 'pack_group'
                    },
                    { title: "Visible",
                        className: 'visible'
                    },
                    { title: "Is Bundle",
                        className: 'is_bundle'
                    },
                    { title: "Copy ",
                        data: null,
                        className: 'copy',
                        defaultContent:`<p class="text-center" style="margin-top: 25px; margin-left: 20px;"><input style="display: block;" type="checkbox" id="copy_pack" name="copy_pack" /></p>`
                    }
                ]
            }
        );


        $(document).ready(() => {
            const table = $('#pack_first');

            table.on('click', '#edit_packages', function () {

                const id = $(this).parent().parent();

                var get_id = {'id' : [], 'price' : [], 'duration' : [], 'auto_renew' : [], 'pack_group_id' : [], 'visible' : [], 'is_bundle' : [] };

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                id.find('.id_price').each(function( index,item ) {

                    get_id['price'].push(item.innerHTML);
                });

                id.find('.id_duration').each(function( index,item ) {

                    get_id['duration'].push(item.innerHTML);
                });

                id.find('.auto_renew').each(function( index,item ) {

                    get_id['auto_renew'].push(item.innerHTML);
                });

                id.find('.pack_group').each(function( index,item ) {

                    get_id['pack_group_id'].push(item.innerHTML);
                });

                id.find('.visible').each(function( index,item ) {

                    get_id['visible'].push(item.innerHTML);
                });

                id.find('.is_bundle').each(function( index,item ) {

                    get_id['is_bundle'].push(item.innerHTML);
                });

                PubSub.publish('package_update', get_id);

            });

            table.on('click', '#params_pack', function () {

                const id = $(this).parent().parent().parent();

                var get_id = {'id' : []};

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                PubSub.publish('params_pack', get_id);

            });


            table.on('click', '#package_rules', function () {

                const id = $(this).parent().parent();

                var get_id = {'id' : []};

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                PubSub.publish('package_rules', get_id);

            });

            table.on('click', '#package_delete', function () {

                const id = $(this).parent().parent();

                var get_id = {'id' : []};

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                PubSub.publish('package_delete', get_id);

            });

            table.on('click', '#copy_pack', function () {

                const id = $(this).parent().parent().parent();

                var get_id = {'id' : [], 'check' : []};

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                if($(this).prop('checked') !== false){
                    get_id['check'].push(false);

                } else {
                    get_id['check'].push(true);

                }

                PubSub.publish('package_checkbox_copy', get_id);

            })

        });

    }


    componentDidUpdate() {

        if( this.props.search === true ) {
            let table = $('#pack_first').DataTable();
            table.destroy();


            this.$ele = $(this.el);
            this.$ele.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    sScrollY: "300px",
                    pagingType: "simple",

                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=promotion',
                        type: 'POST',
                        data: {
                            promo_id: this.props.data.promo_id,
                            package_group_id: this.props.data.package_group_id
                        }
                    },
                    columns: [
                        { title: "Actions buttons",
                            data: null,
                            defaultContent:`<button type="button" class="btn btn-success" id="edit_packages" ><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-danger" id="package_delete" ><i class="fa fa-times-circle-o"></i></button>`
                        },
                        { title: "Id",
                            className: 'id_pack'
                        },
                        { title: "Price",
                            className: 'id_price'
                        },
                        { title: "Params",
                            data: null,
                            defaultContent:`<p><button type="button" class="btn btn-outline-secondary" id="params_pack" >Params</button></p>`
                        },
                        { title: "Notification rules",
                            data: null,
                            defaultContent:`<p><button type="button" class="btn btn-outline-secondary" id="package_rules" >Rules</button></p>`
                        },
                        { title: "Auto renew",
                            className: 'auto_renew'
                        },
                        { title: "Duration",
                            className: 'id_duration'
                        },
                        { title: "Promo Group ID",
                            className: 'pack_group'
                        },
                        { title: "Visible",
                            className: 'visible'
                        },
                        { title: "Is Bundle",
                            className: 'is_bundle'
                        },
                        { title: "Copy ",
                            data: null,
                            className: 'copy',
                            defaultContent:`<p class="text-center" style="margin-top: 25px; margin-left: 20px;"><input style="display: block;" type="checkbox" id="copy_pack" name="copy_pack" /></p>`
                        }
                    ]
                }
            );

            this.handleChange();
        }
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='pack_first' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}