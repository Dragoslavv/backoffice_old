import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class IpayConfTransactionsTable extends Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onOpen();
    }

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
                pagingType: "simple",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=ipay-cof-read',
                    type: 'POST',
                    data:{
                        start_log: this.props.data.start_log,
                        end_log: this.props.data.end_log,
                        user_id: this.props.data.user_id,
                        status: this.props.data.status,

                    },
                },
                drawCallback:function( settings){
                    PubSub.publish('totalAmount', settings.json);
                },
                columns: [
                    { title: "Id"},
                    { title: "User id"},
                    { title: "Start datetime"},
                    { title: "End datetime"},
                    { title: "Amount"},
                    { title: "Status"}
                ]
            }
        );


    }

    componentDidUpdate() {

        if(this.props.search === true) {


            let table = $('#ipay-cof-trans').DataTable();
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
                    pagingType: "simple",

                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=ipay-cof-read',
                        type: 'POST',
                        data:{
                            start_log: this.props.data.start_log,
                            end_log: this.props.data.end_log,
                            user_id: this.props.data.user_id,
                            status: this.props.data.status,

                        }
                    },
                    drawCallback:function( settings){
                        PubSub.publish('totalAmount', settings.json);
                    },
                    columns: [
                        { title: "Id"},
                        { title: "User id"},
                        { title: "Start datetime"},
                        { title: "End datetime"},
                        { title: "Amount"},
                        { title: "Status"}
                    ]
                }
            );


            this.handleChange();

        }
    }


    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='ipay-cof-trans' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}