import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PhoneNumbersTable extends Component{
    componentDidMount() {

        const userId = localForages.getItem('user_id_for_phone_numbers', function (err, value) {
            return value;
        });

        userId.then(value => {

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
                        url: 'https://api.globaltel.rs/new-gui/?url=phone_numbers',
                        type: 'POST',
                        data:{
                            userId: parseInt(value),
                        }
                    },
                    columns: [
                        { title: "Number"},
                        { title: "Type"},
                        { title: "Status"},
                        { title: "Autorenew"},
                        { title: "Created"},
                        { title: "Expiration Date"},
                        { title: "Iccid"},
                        { title: "Switch To Sim"}
                    ]
                }
            );

        });
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