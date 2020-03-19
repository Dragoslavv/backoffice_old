import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from 'pubsub-js';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class MessageBulkTable extends Component{
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
                info:false,
                bProcessing  : true,
                bServerSide  : true,
                sProcessing  : true,
                pagingType: "simple",
                sScrollY: "300px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read_bulk',
                    type: 'POST',
                    data: {
                        bulk_name: this.props.data.bulk_name,
                        provider_name: this.props.data.provider_name,
                    }
                },
                bLengthChange: false,
                bPaginate:true,
                columns: [
                    { title: "ID",
                      className:'id_bulk'
                    },
                    { title: "Bulk Name",
                        className:'name_bulk'
                    },
                    { title: "Provider Id",
                        className:'provider_id_bulk'
                    },
                    { title: "Provider Name",
                        className:'provider_name_bulk'
                    },
                    { title: "Remove",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="remove_bulk" ><i class="fa fa-times-circle-o"></i></button>`
                    }
                ]
            }
        );




        $(document).ready(() => {

            const table = $('#message-bulk-table');

            table.on('click', '#remove_bulk', function () {

                const id = $(this).parent().parent();

                const get_id = { 'id_bulk' : [] , 'name_bulk' : [] , 'provider_id_bulk' : [] , 'provider_name_bulk' : [] };

                id.find('.id_bulk').each(function( index,item ) {
                    get_id['id_bulk'].push(item.innerHTML);
                });

                id.find('.name_bulk').each(function( index,item ) {
                    get_id['name_bulk'].push(item.innerHTML);
                });

                id.find('.provider_id_bulk').each(function( index,item ) {
                    get_id['provider_id_bulk'].push(item.innerHTML);
                });

                id.find('.provider_name_bulk').each(function( index,item ) {
                    get_id['provider_name_bulk'].push(item.innerHTML);
                });

                PubSub.publish('message_bulk', get_id);

            });
        });



    }

    componentDidUpdate() {

        if (this.props.search === true) {

            let table = $('#message-bulk-table').DataTable();
            table.destroy();

            this.$ele = $(this.el);

            this.$ele.DataTable(
                {
                    info:false,
                    bProcessing  : true,
                    bServerSide  : true,
                    sProcessing  : true,
                    pagingType: "simple",
                    sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read_bulk',
                        type: 'POST',
                        data: {
                            bulk_name: this.props.data.bulk_name,
                            provider_name: this.props.data.provider_name,
                        }
                    },
                    bLengthChange: false,
                    bPaginate:true,
                    columns: [
                        { title: "ID",
                            className:'id_bulk'
                        },
                        { title: "Bulk Name",
                            className:'name_bulk'
                        },
                        { title: "Provider Id",
                            className:'provider_id_bulk'
                        },
                        { title: "Provider Name",
                            className:'provider_name_bulk'
                        },
                        { title: "Remove",
                            data: null,
                            defaultContent:`<button type="button" class="btn btn-info" id="remove_bulk" ><i class="fa fa-times-circle-o"></i></button>`
                        }
                    ]
                }
            );

            this.handleChange();
        }
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='message-bulk-table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}