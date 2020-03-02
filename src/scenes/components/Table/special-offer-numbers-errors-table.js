import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class SpecialOfferNumbersErrorsTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                data:this.props.data,
                columns: [
                    { title: "Number"},
                    { title: "Special Offer Regions ID"},
                    { title: "Reserved"},
                    { title: "Type"},
                    { title: "Brand"},
                    { title: "Provider"},
                    { title: "Price ID"},
                    { title: "Quarantine"},
                    { title: "Special Offer Cities ID"}
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