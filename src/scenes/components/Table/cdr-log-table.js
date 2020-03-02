import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from 'pubsub-js';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class CdrLogTable extends Component{

    componentDidMount() {
        this.$el = $(this.el);

        this.$el.DataTable(
            {
                info:false,
                bProcessing  : true,
                bServerSide  : true,
                sProcessing  : true,
                sScrollY: "300px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=store-cdr',
                    type: 'POST',
                    data: {
                        start_log: this.props.data.startLog,
                        end_log: this.props.data.endLog,
                        source: this.props.data.source,
                        destination: this.props.data.destination,
                        user_id: this.props.data.user_id,
                        user_id_b: this.props.data.user_id_b,
                        call_type: this.props.data.call_type,
                        brand: this.props.data.brand,
                        route: this.props.data.route,
                        disposition: this.props.data.disposition
                    }
                },
                drawCallback: function(settings){
                    var api = this.api();

                    PubSub.publish('billsec', api.ajax.json().billsec);

                },
                bLengthChange: false,
                bPaginate:true,
                columns: [
                    { title: "ID"},
                    { title: "Start"},
                    { title: "Billsec"},
                    { title: "Source"},
                    { title: "Destination"},
                    { title: "Route"},
                    { title: "User ID B"},
                    { title: "Destination"},
                    { title: "Status"},
                    { title: "CDR",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-info"></i></button>`
                    },
                    { title: "Cdr ID"},
                    { title: "Call Type"},
                    { title: "Route Name"}
                ]
            }
        );



    }



    componentDidUpdate() {

        if(this.props.search === 'click'){

            let table = $('#cdr-log-table').DataTable();
            table.destroy();

            this.$ell = $(this.el);

            this.$ell.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=store-cdr',
                        type: 'POST',
                        data: {
                            start_log: this.props.data.startLog,
                            end_log: this.props.data.endLog,
                            source: this.props.data.source,
                            destination: this.props.data.destination,
                            user_id: this.props.data.user_id,
                            user_id_b: this.props.data.user_id_b,
                            call_type: this.props.data.call_type,
                            brand: this.props.data.brand,
                            route: this.props.data.route,
                            disposition: this.props.data.disposition
                        }
                    },
                    bLengthChange: false,
                    bPaginate:true,
                    columns: [
                        { title: "ID"},
                        { title: "Start"},
                        { title: "Billsec"},
                        { title: "Source"},
                        { title: "Destination"},
                        { title: "Route"},
                        { title: "User ID B"},
                        { title: "Destination"},
                        { title: "Status"},
                        { title: "CDR",
                            data: null,
                            defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-info"></i></button>`
                        },
                        { title: "Cdr ID"},
                        { title: "Call Type"},
                        { title: "Route Name"}
                    ]
                }
            );
        }
    }

    componentWillUnmount() {
        $('#cdr-log-table').DataTable();
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='cdr-log-table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}