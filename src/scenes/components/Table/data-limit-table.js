import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class DataLimitTable extends Component{
    componentDidMount() {

            this.$el = $(this.el);
            this.$el.DataTable(
                {
                    info:false,
                    bLengthChange: false,
                    pagingType: "simple",

                    searching:false,
                    data:this.props.data,
                    columns: [
                        { title: "User ID"},
                        { title: "Billing ID"},
                        { title: "Number"},
                        { title: "Name"},
                        { title: "Imsi"},
                        { title: "Over 80%"},
                        { title: "Over 100%"},
                        { title: "Time"},
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