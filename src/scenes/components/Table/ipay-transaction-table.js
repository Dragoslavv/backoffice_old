import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class IPayTransactionTable extends Component{
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
                data:this.props.data,
                columns: [
                    { title: "ID"},
                    { title: "Created"},
                    { title: "User ID"},
                    { title: "User",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-info"></i></button>`
                    },
                    { title: "Amount"},
                    { title: "Currency"},
                    { title: "State"},
                    { title: "Transfer Type"},
                    { title: "Response ID"},
                    { title: "Core transaction id"},
                    { title: "Description"}
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