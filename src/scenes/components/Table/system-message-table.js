import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class SystemMessageTable extends Component{
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
                sScrollY: "650px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read_Message',
                    type: 'POST',
                    data:{
                        key: this.props.data.key,
                        brand: this.props.data.brand,
                        script: this.props.data.script,
                    }
                },
                columns: [
                    { title: "Id",
                        className: "id_pack"
                    },
                    { title: "Key",
                        className: "key"
                    },
                    { title: "Message",
                        className: "message"
                    },
                    { title: "Language",
                        className: "language"
                    },
                    { title: "Brand",
                        className: "brand"
                    },
                    { title: "Script",
                        className: "script"
                    },
                    { title: "Action",
                        targets: -1,
                        data: null,
                        defaultContent:`<p><button type="button" class="btn btn-info" id="edit_system_message" ><i class="fa fa-edit"></i></button><br/><br/> <button type="button" class="btn btn-danger" id="remove_system_message"><i class="fa fa-times-circle-o" ></i></button></p>`
                    },
                ]
            }
        );


        $(document).ready(() => {
            const table = $('table');

            table.on('click', '#remove_system_message', function () {

                const id = $(this).parent().parent().parent();

                var get_id = { 'id' : [] };

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                PubSub.publish('system_message_remove', get_id);

            });

            table.on('click', '#edit_system_message', function () {

                const id = $(this).parent().parent().parent();

                var get_id = {'id' : [], 'key' : [], 'brand' : [], 'message' : [], 'language' : [], 'script' : [] };

                id.find('.id_pack').each(function( index,item ) {

                    get_id['id'].push(item.innerHTML);
                });

                id.find('.key').each(function( index,item ) {

                    get_id['key'].push(item.innerHTML);
                });

                id.find('.brand').each(function( index,item ) {

                    get_id['brand'].push(item.innerHTML);
                });

                id.find('.message').each(function( index,item ) {

                    get_id['message'].push(item.innerHTML);
                });

                id.find('.language').each(function( index,item ) {

                    get_id['language'].push(item.innerHTML);
                });

                id.find('.script').each(function( index,item ) {

                    get_id['script'].push(item.innerHTML);
                });

                PubSub.publish('system_message_edit', get_id);

            });
        });
    }

    componentDidUpdate() {

        if(this.props.data.search_button === 'click') {


            let table = $('#system_message-table').DataTable();
            table.destroy();

            this.$elee = $(this.el);
            this.$elee.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    sScrollY: "650px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read_Message',
                        type: 'POST',
                        data:{
                            key: this.props.data.key,
                            brand: this.props.data.brand,
                            script: this.props.data.script,
                        }
                    },
                    columns: [
                        { title: "Id"},
                        { title: "Key"},
                        { title: "Message"},
                        { title: "Language"},
                        { title: "Brand"},
                        { title: "Script"},
                        { title: "Action",
                            targets: -1,
                            data: null,
                            defaultContent:`<p><button type="button" class="btn btn-info" id="edit_system_message" ><i class="fa fa-edit"></i></button><br/><br/> <button type="button" class="btn btn-danger" id="remove_system_message"><i class="fa fa-times-circle-o" ></i></button></p>`
                        },
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='system_message-table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}