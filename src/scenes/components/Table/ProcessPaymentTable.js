import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class ProcessPaymentTable extends Component{

    componentDidMount() {

        switch (this.props.data.type) {
            case '1':

                this.$el = $(this.el);
                this.$el.DataTable(
                    {
                        info: false,
                        bProcessing: true,
                        bServerSide: true,
                        sProcessing: true,
                        bLengthChange: false,
                        bPaginate:true,
                        bScrollInfinite: true,
                        bScrollCollapse: true,
                        sScrollY: "700px",
                        pagingType: "simple",
                        ajax: {
                            url: 'https://api.globaltel.rs/new-gui/?url=PaymentPurchase',
                            type: 'POST',
                            data:{
                                start_log: this.props.data.start,
                                end_log: this.props.data.end,
                                type: this.props.data.type
                            }
                        },
                        order: [[ 4, "desc" ]],
                        columns: [
                            { title: "id"},
                            { title: "oid"},
                            { title: "start_datetime"},
                            { title: "amount"},
                            { title: "status"},
                            { title: "source"},
                            { title: "order_number"},
                            { title: "packet_id"}
                        ]
                    }
                );
                break;

        }
    }

    componentDidUpdate() {

        switch (this.props.data.type) {
            case '1':
                if(this.props.search === 'click'){

                    let table = $('#payment_purchase1').DataTable();
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
                            bScrollInfinite: true,
                            bScrollCollapse: true,
                            sScrollY: "700px",
                            pagingType: "simple",
                            ajax: {
                                url: 'https://api.globaltel.rs/new-gui/?url=PaymentPurchase',
                                type: 'POST',
                                data:{
                                    start_log: this.props.data.start,
                                    end_log: this.props.data.end,
                                    type: this.props.data.type
                                }
                            },
                            order: [[ 4, "desc" ]],
                            columns: [
                                { title: "id"},
                                { title: "oid"},
                                { title: "start_datetime"},
                                { title: "amount"},
                                { title: "status"},
                                { title: "source"},
                                { title: "order_number"},
                                { title: "packet_id"}
                            ]
                        }
                    );
                }

                break;
        }

    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {

        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='payment_purchase1' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}