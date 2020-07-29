import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class ProcessPurchaselTable extends Component{

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
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=processPurchase',
                    type: 'POST',
                    data:{
                        // start_log: parseInt(value),
                        // end_log: parseInt(value)
                    }
                },
                order: [[ 4, "desc" ]],
                columns: [
                    { title: "id"},
                    { title: "oid"},
                    { title: "start datetime"},
                    { title: "amount"},
                    { title: "status"},
                    { title: "source"},
                    { title: "order number"},
                    { title: "packet id"}
                ]
            }
        );
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