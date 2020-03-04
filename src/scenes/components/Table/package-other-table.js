import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PackageOtherTable extends Component{

    componentDidMount() {

        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info: false,
                bProcessing: true,
                bServerSide: true,
                pagingType: "simple",

                sProcessing: true,
                bLengthChange: false,
                bPaginate:true,
                sScrollY: "50px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=promotion_text',
                    type: 'POST',
                    data: {
                        promo_id: this.props.data.promo_id,
                    }
                },
                columns: [
                    { title: "Actions buttons",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-info" id="edit" ><i class="fa fa-times-circle-o"></i></button>`
                    },
                    { title: "Id",
                        className: 'id_pack'
                    },
                    { title: "Name"},
                    { title: "Description"},
                    { title: "Notifications",
                        data: null,
                        defaultContent:`<p><button type="button" class="btn btn-info" id="edit" >notif</button></p>`
                    },
                    { title: "Params Lang",
                        data: null,
                        defaultContent:`<p><button type="button" class="btn btn-info" id="edit" >lang</button></p>`
                    },
                    { title: "Deactivate Msg Time Limit"},
                    { title: "Deactivate Msg Consumed"},
                    { title: "Activate Msg"},
                    { title: "Renew Msg"},
                    { title: "Lang"},
                    { title: "Copy ",
                        data: null,
                        className: 'copy_lang',
                        defaultContent:`<p class="text-center" style="margin-top: 25px; margin-left: 20px;"><input type="checkbox" style="display: block;" id="copy_lang" name="copy_lang" /></p>`
                    }
                ]
            }
        );

        $(document).ready(() => {
            const table = $('#package_text_lang');

            table.on('click', '#copy_lang', function () {

                const id = $(this).parent().parent().parent();

                var get_id_lang = {'id_lang' : [], 'check_lang' : []};

                id.find('.id_pack').each(function( index,item ) {

                    get_id_lang['id_lang'].push(item.innerHTML);
                });

                if($(this).prop('checked') !== false){
                    get_id_lang['check_lang'].push(false);

                } else {
                    get_id_lang['check_lang'].push(true);

                }

                PubSub.publish('package_checkbox_copy_lang', get_id_lang);

            })

        });

    }


    componentDidUpdate() {

        if(this.props.search === false){

            let table = $('#package_text_lang').DataTable();
            table.destroy();

            this.$ele = $(this.el);
            this.$ele.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    pagingType: "simple",

                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    sScrollY: "250px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=promotion_text',
                        type: 'POST',
                        data: {
                            promo_id: this.props.data.promo_id,
                        }
                    },
                    columns: [
                        { title: "Actions buttons",
                            data: null,
                            defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-edit"></i></button> <button type="button" class="btn btn-info" id="edit" ><i class="fa fa-times-circle-o"></i></button>`
                        },
                        { title: "Id",
                            className: 'id_pack'
                        },
                        { title: "Name"},
                        { title: "Description"},
                        { title: "Notifications",
                            data: null,
                            defaultContent:`<p><button type="button" class="btn btn-info" id="edit" >notif</button></p>`
                        },
                        { title: "Params Lang",
                            data: null,
                            defaultContent:`<p><button type="button" class="btn btn-info" id="edit" >lang</button></p>`
                        },
                        { title: "Deactivate Msg Time Limit"},
                        { title: "Deactivate Msg Consumed"},
                        { title: "Activate Msg"},
                        { title: "Renew Msg"},
                        { title: "Lang"},
                        { title: "Copy ",
                            data: null,
                            className: 'copy_lang',
                            defaultContent:`<p class="text-center" style="margin-top: 25px; margin-left: 20px;"><input type="checkbox" style="display: block;" id="copy_lang" name="copy_lang" /></p>`
                        }
                    ]
                }
            );

        }

    }

    componentWillUnmount() {

        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='package_text_lang' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}