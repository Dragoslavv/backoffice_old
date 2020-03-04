import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class CardTransactionTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                data:this.props.data,
                pagingType: "simple",
                columns: [
                    { title: "ID"},
                    { title: "Created"},
                    { title: "User Id"},
                    { title: "User",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-info"></i></button>`
                    },
                    { title: "Transaction Id"},
                    { title: "Amount"},
                    { title: "Currency"},
                    { title: "Status"},
                    { title: "Card Holder"},
                    { title: "Card Country"},
                    { title: "Card City"},
                    { title: "Customer IP"},
                    { title: "Card Type"}
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