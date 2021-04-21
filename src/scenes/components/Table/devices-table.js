import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import Cookies from "universal-cookie";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class DevicesTable extends Component{
    componentDidMount() {
        const cookies = new Cookies();

        const userId = cookies.get('user_id_for_phone_numbers');

        // userId.then(value => {

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

                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=devices',
                        type: 'POST',
                        data:{
                            user_id: parseInt(userId),
                        }
                    },
                    columns: [
                        { title: "User ID"},
                        { title: "Platform"},
                        { title: "Platform Data",
                          className:'platform_data'
                        },
                        { title: "App Version"},
                        { title: "Device ID"},
                        { title: "Caller ID"},
                        { title: "HC Prefix"},
                        { title: "Created"},
                        { title: "Registered"}
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