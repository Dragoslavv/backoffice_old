import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class MessageLogTable extends Component{
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
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read-message-log',
                    type: 'POST',
                    data: {
                        start_log: this.props.data.startLog,
                        end_log: this.props.data.endLog,
                        fromNo: this.props.data.fromNo,
                        toNo: this.props.data.toNo,
                        type: this.props.data.type
                    }
                },
                columns: [
                    { title: "Created At"},
                    { title: "From"},
                    { title: "To"},
                    { title: "Msg Id"},
                    { title: "Group ID"},
                    { title: "Type"}
                ]
            }
        );
    }

    componentDidUpdate() {

        if(this.props.search === 'click') {

            let table = $('#message-log-table').DataTable();
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
                    sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read-message-log',
                        type: 'POST',
                        data: {
                            start_log: this.props.data.startLog,
                            end_log: this.props.data.endLog,
                            fromNo: this.props.data.fromNo,
                            toNo: this.props.data.toNo,
                            type: this.props.data.type
                        }
                    },
                    columns: [
                        { title: "Created At"},
                        { title: "From"},
                        { title: "To"},
                        { title: "Msg Id"},
                        { title: "Group ID"},
                        { title: "Type"}
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='message-log-table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}