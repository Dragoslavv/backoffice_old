import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class NumberTypeTable extends Component{
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
                sScrollY: "300px",
                pagingType: "simple",

                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=numbers-type',
                    type: 'POST',
                    data: {
                        expiration_date: this.props.data.expiration_date,
                        start_log: this.props.data.start_log,
                        end_log: this.props.data.end_log,
                        number: this.props.data.number,
                        user_id: this.props.data.user_id,
                        type: this.props.data.type,
                        brand: this.props.data.brand
                    }
                },
                columns: [
                    { title: "Expire Date"},
                    { title: "Number"},
                    { title: "User ID"},
                    { title: "Create Date"},
                    { title: "Type"},
                    { title: "Brand"},
                    { title: "Provider"},
                    { title: "Price"},
                    { title: "Our Price"},
                    { title: "Auto Renewal"}
                ]
            }
        );
    }


    componentDidUpdate() {

        if(this.props.search === 'click') {

            let table = $('#number-type-table').DataTable();
            table.destroy();


            this.$elee = $(this.el);
            this.$elee.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    sScrollY: "300px",
                    pagingType: "simple",

                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=numbers-type',
                        type: 'POST',
                        data: {
                            expiration_date: this.props.data.expiration_date,
                            start_log: this.props.data.start_log,
                            end_log: this.props.data.end_log,
                            number: this.props.data.number,
                            user_id: this.props.data.user_id,
                            type: this.props.data.type,
                            brand: this.props.data.brand
                        }
                    },
                    columns: [
                        { title: "Expire Date"},
                        { title: "Number"},
                        { title: "User ID"},
                        { title: "Create Date"},
                        { title: "Type"},
                        { title: "Brand"},
                        { title: "Provider"},
                        { title: "Price"},
                        { title: "Our Price"},
                        { title: "Auto Renewal"}
                    ]
                }
            );
        }
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='number-type-table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}