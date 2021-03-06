import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PackageGroupFirstTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                data:this.props.data,
                pagingType: "simple",

                columns: [
                    { title: "Id"},
                    { title: "ParentId"},
                    { title: "Params"},
                    { title: "Type"},
                    { title: "Dedicated Account"},
                    { title: "Visible"},
                    { title: "Group order"}
                ]
            }
        );
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg" width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}