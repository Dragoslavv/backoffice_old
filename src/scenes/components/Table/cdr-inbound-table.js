import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class CdrInboundTable extends Component{
    componentDidMount() {

        const userId = localForages.getItem('user_id_for_phone_numbers', function (err, value) {
            return value;
        });

        userId.then(value => {

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

                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=cdr_inbound',
                        type: 'POST',
                        data:{
                            user_id: parseInt(value),
                        }
                    },
                    order: [[ 1, "desc" ]],
                    columns: [
                        { title: "Start"},
                        { title: "End"},
                        { title: "Answer"},
                        { title: "Duration"},
                        { title: "Billsec"},
                        { title: "Source"},
                        { title: "Destination"},
                        { title: "Caller ID"},
                        { title: "Roaming"},
                        { title: "Disposition"},
                        { title: "Call Type"},
                        { title: "Route Name"}
                    ]
                }
            );

        });

    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}