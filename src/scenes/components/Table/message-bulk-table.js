import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from 'pubsub-js';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class MessageBulkTable extends Component{

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
                },
                bLengthChange: false,
                bPaginate:true,
                columns: [
                    { title: "ID"},
                    { title: "Bulk Name"},
                    { title: "Provider Name"},
                    { title: "Remove",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="remove_bulk" ><i class="fa fa-remove"></i></button>`
                    }
                ]
            }
        );



    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='message-bulk-table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}