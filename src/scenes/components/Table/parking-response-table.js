import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class ParkingResponseTable extends Component{
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
                    url: 'https://api.globaltel.rs/new-gui/?url=read_response_parking',
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
                    { title: "Response Time"},
                    { title: "Receiver Number"},
                    { title: "Sender Number"},
                    { title: "Charging Code"},
                    { title: "Reference ID"},
                    { title: "Status"},
                    { title: "Service price"}
                ]
            }
        );
    }

    componentDidUpdate() {


        if(this.props.search === 'click') {
            let table = $('#parking_response').DataTable();
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
                    pagingType: "simple",

                    sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read_response_parking',
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
                        { title: "Response Time"},
                        { title: "Receiver Number"},
                        { title: "Sender Number"},
                        { title: "Charging Code"},
                        { title: "Reference ID"},
                        { title: "Status"},
                        { title: "Service price"}
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='parking_response' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}