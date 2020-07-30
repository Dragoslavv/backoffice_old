import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class VoipTable extends Component{
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
                    url: 'https://api.globaltel.rs/new-gui/?url=read_table_voip',
                    type: 'POST',
                    data:{
                        start_date: this.props.data.start,
                        end_date: this.props.data.end,
                        user_id: this.props.data.user_id,
                        active: this.props.data.active,
                        voip: this.props.data.voip
                    }
                },
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                order: [[ 4, "desc" ]],
                columns: [
                    { title: "id"},
                    { title: "user_id"},
                    { title: "amount"},
                    { title: "created_on"},
                    { title: "active"},
                    { title: "update"},
                    { title: "imei"},
                    { title: "voip"},
                    { title: "users"}
                ]
            }
        );
    }

    componentDidUpdate() {


        if(this.props.search === 'click') {
            let table = $('#voip_response').DataTable();
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
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read_table_voip',
                        type: 'POST',
                        data:{
                            start_date: this.props.data.start,
                            end_date: this.props.data.end,
                            user_id: this.props.data.user_id,
                            active: this.props.data.active,
                            voip: this.props.data.voip
                        }
                    },
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    order: [[ 4, "desc" ]],
                    columns: [
                        { title: "id"},
                        { title: "user_id"},
                        { title: "amount"},
                        { title: "created_on"},
                        { title: "active"},
                        { title: "update"},
                        { title: "imei"},
                        { title: "voip"},
                        { title: "users"}
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
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='voip_response' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}