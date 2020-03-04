import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class TopUpTransactionTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                bAutoWidth:true,
                bProcessing: true,
                bScrollInfinite: true,
                bScrollCollapse: true,
                sScrollY: "330px",
                order: [[ 2, "desc" ]],
                pagingType: "simple",
                data:this.props.data,
                columns: [
                    { title: "ID"},
                    { title: "MSISDN"},
                    { title: "Created"},
                    { title: "Transaction Id"},
                    { title: "Amount"},
                    { title: "Currency"},
                    { title: "TopUp Status"}
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