import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import Cookies from "universal-cookie";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class CdrOutboundTable extends Component{
    componentDidMount() {
        const cookies = new Cookies();

        // const userId = localForages.getItem('user_id_for_phone_numbers', function (err, value) {
        //     return value;
        // });
        //
        // userId.then(value => {

            this.$el = $(this.el);
            this.$el.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    pagingType: "simple",

                    bPaginate:true,
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=cdr_outhbound',
                        type: 'POST',
                        data:{
                            number: parseInt(cookies.get('number')),
                        }
                    },
                    order: [[ 0, "desc" ]],
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
                        { title: "Call Type"}
                    ]
                }
            );
        // });
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