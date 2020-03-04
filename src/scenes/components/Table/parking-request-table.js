import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class ParkingRequestTable extends Component{
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

                sScrollY: "300px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read_request_parking',
                    type: 'POST',
                    data: {
                        start_log: this.props.data.start_log,
                        end_log: this.props.data.end_log,
                        destination: this.props.data.zone,
                        source: this.props.data.user_number
                    }
                },
                columns: [
                    { title: "Id"},
                    { title: "Destination"},
                    { title: "Source"},
                    { title: "Created"},
                    { title: "Text"},
                    { title: "Status"},
                    { title: "Service Price"},
                    { title: "Sms Price"},
                    { title: "Transaction Id"}
                ]
            }
        );
    }

    componentDidUpdate() {


        if(this.props.search === 'click') {
            let table = $('#parking_request').DataTable();
            table.destroy();

            this.$ele = $(this.el);
            this.$ele.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    pagingType: "simple",

                    bPaginate:true,
                    sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read_request_parking',
                        type: 'POST',
                        data: {
                            start_log: this.props.data.start_log,
                            end_log: this.props.data.end_log,
                            destination: this.props.data.zone,
                            source: this.props.data.user_number
                        }
                    },
                    columns: [
                        { title: "Id"},
                        { title: "Destination"},
                        { title: "Source"},
                        { title: "Created"},
                        { title: "Text"},
                        { title: "Status"},
                        { title: "Service Price"},
                        { title: "Sms Price"},
                        { title: "Transaction Id"}
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='parking_request' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}