import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import {Redirect} from "react-router-dom";
import PubSub from "pubsub-js";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class SimReportTable extends Component{
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
                sScrollY: "600px",
                pageLength: 25,
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=sim_report',
                    type: 'POST',
                    data: {
                        start_log: this.props.data.start_log,
                        end_log: this.props.data.end_log,
                        cash_type: this.props.data.cash_type,
                        data_type: this.props.data.data_type,
                        msisdn: this.props.data.msisdn,
                        voip: this.props.data.check_voip
                    }
                },
                columns: [
                    { title: "MSISDN"},
                    { title: "USER ID",
                      className: "get_user_ID"
                    },
                    { title: "User",
                        data: null,
                        defaultContent:`<p style="margin:0px !important;" ><button type="button" style="padding: 3px !important;" class="btn btn-info" id="user_id_get" >Get user ID</button></p>`
                    },
                    { title: "Voip",
                        data: null,
                        defaultContent:`<p style="margin:0px !important;" ><button type="button" style="padding: 3px !important;" class="btn btn-info" id="voip_id" >Voip</button></p>`
                    },
                    { title: "Billing ID"},
                    { title: "Activation Time"},
                    { title: "Cash"},
                    { title: "Data"},
                    { title: "Status"},
                    { title: "Check voip"}
                ]
            }
        );


        $(document).ready(() => {

            const table = $('#sim_report');

            table.on('click', '#user_id_get', function () {

                const id = $(this).parent().parent().parent();

                id.find('.get_user_ID').each(function( index,item ) {

                    PubSub.publish('id_from_sim_report', item.innerHTML);
                    localForages.setItem('id_from_sim_report', item.innerHTML);
                });
            });

            table.on('click', '#voip_id', function () {

                const id = $(this).parent().parent().parent();

                id.find('.get_user_ID').each(function( index,item ) {

                    PubSub.publish('get_voip_id', item.innerHTML);
                    localForages.setItem('get_voip_id', item.innerHTML);

                });
            });
        });



    }

    componentDidUpdate() {

        if(this.props.search === true) {

            let table = $('#sim_report').DataTable();
            table.destroy();


            this.$ele = $(this.el);

            this.$ele.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    sScrollY: "600px",
                    pageLength: 25,
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=sim_report',
                        type: 'POST',
                        data: {
                            start_log: this.props.data.start_log,
                            end_log: this.props.data.end_log,
                            cash_type: this.props.data.cash_type,
                            data_type: this.props.data.data_type,
                            msisdn: this.props.data.msisdn,
                            voip: this.props.data.check_voip

                        }
                    },
                    columns: [
                        { title: "MSISDN"},
                        { title: "USER ID",
                            className: "get_user_ID"
                        },
                        { title: "User",
                            data: null,
                            defaultContent:`<p style="margin:0px !important;" ><button type="button" style="padding: 3px !important;" class="btn btn-info" id="user_id_get" >Get user ID</button></p>`
                        },
                        { title: "Voip",
                            data: null,
                            defaultContent:`<p style="margin:0px !important;" ><button type="button" style="padding: 3px !important;" class="btn btn-info" id="voip_id" >Voip</button></p>`
                        },
                        { title: "Billing ID"},
                        { title: "Activation Time"},
                        { title: "Cash"},
                        { title: "Data"},
                        { title: "Status"},
                        { title: "Check voip"}
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='sim_report' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}