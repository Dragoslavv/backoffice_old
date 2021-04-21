import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import Cookies from "universal-cookie";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class CustomerPaymentTable extends Component{


    componentDidMount() {
        const cookies = new Cookies();

        const billing_id = cookies.get('billing_id_api');

        // billing_id.then(value => {

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

                    // sScrollY: "650px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=chargelog',
                        type: 'POST',
                        data:{
                            billing_id: parseInt(billing_id),
                        }
                    },
                    order: [[ 0, "desc" ]],
                    columns: [
                        { title: "Created"},
                        { title: "Expires"},
                        { title: "ID"},
                        { title: "Billing Type"},
                        { title: "Committed"},
                        { title: "Result"},
                        { title: "Meta Data"}
                    ]
                }
            );
        // });
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