import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class TransactionPaymentTable extends Component{
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
                order: [[ 5, "desc" ]],
                sScrollY: "270px",
                data:this.props.data,
                columns: [
                    { title: "Id"},
                    { title: "Billing ID"},
                    { title: "Meta Data"},
                    { title: "Start"},
                    { title: "End"},
                    { title: "Payment Type"},
                    { title: "Cash"},
                    { title: "Data"},
                    { title: "Minute"},
                    { title: "No.SMS"}
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