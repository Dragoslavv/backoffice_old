import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class SimDetailsTable extends Component{
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
                    bPaginate:true,
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=number_sim',
                        type: 'POST',
                        data:{
                            user_id: parseInt(value),
                        }
                    },
                    order: [[ 4, "desc" ]],
                    columns: [
                        { title: "Number"},
                        { title: "Insert Time"},
                        { title: "Activation Time"},
                        { title: "Status"},
                        { title: "Bonus Activated"},
                        { title: "ICCID"},
                        { title: "Vendor"},
                        { title: "PUK1"},
                        { title: "PUK2"},
                        { title: "Sim Type"},
                        { title: "IMSI"},
                        { title: "PIN2"},
                        { title: "SQN"},
                        { title: "Ported"}
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